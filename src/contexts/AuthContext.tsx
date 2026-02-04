import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  User as FirebaseUser,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { auth } from '../config/firebase';
import { httpsCallable } from 'firebase/functions';
import { functions } from '../config/firebase';
import { User } from '../types/user';
import { createUserDocument, getUserDocument, createUserDocumentWithFamilyCheck } from '../services/userService';
import { createFamily } from '../services/familyService';

interface AuthContextType {
  currentUser: User | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  signup: (email: string, password: string, displayName: string, accountType: 'individual' | 'family', plan?: 'free' | 'individual' | 'family') => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  /**
   * Sign up a new user
   */
  const signup = async (
    email: string,
    password: string,
    displayName: string,
    accountType: 'individual' | 'family',
    plan: 'free' | 'individual' | 'family' = 'free'
  ): Promise<void> => {
    // Create Firebase Auth user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update display name in Firebase Auth
    await updateProfile(user, { displayName });

    // Create Firestore user document with plan selection
    await createUserDocument(user.uid, email, displayName, accountType, plan);

    // If family plan, create family document
    if (accountType === 'family') {
      await createFamily(user.uid);
    }

    // Fetch the complete user document
    const userDoc = await getUserDocument(user.uid);
    setCurrentUser(userDoc);
  };

  /**
   * Sign in existing user
   */
  const login = async (email: string, password: string): Promise<void> => {
    await signInWithEmailAndPassword(auth, email, password);
    // User will be set via onAuthStateChanged listener
  };

  /**
   * Sign out current user
   */
  const logout = async (): Promise<void> => {
    await signOut(auth);
    setCurrentUser(null);
    setFirebaseUser(null);
  };

  /**
   * Send password reset email using custom branded email
   */
  const resetPassword = async (email: string): Promise<void> => {
    const requestPasswordResetFn = httpsCallable(functions, 'requestPasswordReset');
    await requestPasswordResetFn({ email });
  };

  /**
   * Refresh user data from Firestore
   */
  const refreshUser = async (): Promise<void> => {
    if (firebaseUser) {
      console.log('🔄 Refreshing user data...');
      const userDoc = await getUserDocument(firebaseUser.uid);
      console.log('📥 Fresh user data:', userDoc?.progress?.startDate);
      setCurrentUser(userDoc);
      console.log('✓ User state updated');
    }
  };

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user);
      
      if (user) {
        try {
          // Fetch user document from Firestore
          let userDoc = await getUserDocument(user.uid);
          
          // If user document doesn't exist, create one with automatic family subscription inheritance
          // This handles legacy users AND family members who may be missing user documents
          // BUT: Skip this for admin-created users (they have a createdBy field)
          if (!userDoc && user.email) {
            console.log('User document not found, creating profile with family check for:', user.email);
            
            // Use smart creation that checks if user is part of a family
            // and automatically inherits the family subscription if so
            await createUserDocumentWithFamilyCheck(
              user.uid,
              user.email,
              user.displayName || user.email.split('@')[0]
            );
            
            // Fetch the newly created document
            userDoc = await getUserDocument(user.uid);
          }
          
          // Additional safety check: If user was created by admin (has createdBy field),
          // they should never be auto-assigned to families
          if (userDoc && (userDoc as any).createdBy && !userDoc.familyId && userDoc.accountType === 'family') {
            // This is an admin-created family plan user who doesn't have a familyId yet
            // They should create their own family when they first log in
            console.log('Admin-created family user logging in for first time, creating family:', user.email);
            await createFamily(user.uid);
            // Refresh user doc
            userDoc = await getUserDocument(user.uid);
          }
          
          setCurrentUser(userDoc);
        } catch (error) {
          console.error('Error fetching user document:', error);
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    currentUser,
    firebaseUser,
    loading,
    signup,
    login,
    logout,
    resetPassword,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
