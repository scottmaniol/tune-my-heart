import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  collection,
  query,
  where,
  getDocs,
  Timestamp,
} from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { db } from '../config/firebase';
import { User, UserPreferences, UserProgress, Subscription } from '../types/user';
import { getDefaultStartDate } from '../utils/dateHelpers';

/**
 * Create a new user document in Firestore
 */
export const createUserDocument = async (
  uid: string,
  email: string,
  displayName: string,
  accountType: 'individual' | 'family',
  plan: 'free' | 'individual' | 'family' = 'free'
): Promise<void> => {
  const now = new Date();
  
  // Create subscription based on plan selection
  const subscription: Subscription = plan === 'free' 
    ? {
        status: 'free',
        plan: 'free',
      }
    : {
        status: 'trial',
        plan: plan,
        trialEndsAt: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      };

  const defaultPreferences: UserPreferences = {
    bibleTranslation: 'ESV',
    readingPlan: 'narrative',
    fontSize: 'medium',
    darkMode: false,
    emailReminders: 'daily', // Default to daily email reminders
  };

  const defaultProgress: UserProgress = {
    currentWeek: 1,
    currentDay: 1,
    lastAccessDate: now.toISOString(),
    startDate: getDefaultStartDate().toISOString(),
  };

  // Check if user is admin based on email
  const role = email === 'saniol@gmail.com' ? 'admin' : 'user';

  const userData: User = {
    uid,
    email,
    displayName,
    photoURL: null,
    role,
    accountType,
    subscription,
    isHeadOfHousehold: accountType === 'family',
    preferences: defaultPreferences,
    progress: defaultProgress,
    createdAt: now,
    updatedAt: now,
  };

  await setDoc(doc(db, 'users', uid), {
    ...userData,
    createdAt: Timestamp.fromDate(userData.createdAt),
    updatedAt: Timestamp.fromDate(userData.updatedAt),
    subscription: {
      ...userData.subscription,
      trialEndsAt: userData.subscription.trialEndsAt 
        ? Timestamp.fromDate(userData.subscription.trialEndsAt)
        : null,
    }
  });
};

/**
 * Dismiss new year transition modal and update to current year's default start date
 * This resets the user to Week 1, Day 1 with a fresh start
 */
export const dismissNewYearTransition = async (userId: string): Promise<void> => {
  const userRef = doc(db, 'users', userId);
  const startDateObj = getDefaultStartDate();
  
  // Format as YYYY-MM-DD to avoid timezone issues
  const year = startDateObj.getFullYear();
  const month = String(startDateObj.getMonth() + 1).padStart(2, '0');
  const day = String(startDateObj.getDate()).padStart(2, '0');
  const currentYearStartDate = `${year}-${month}-${day}`;
  
  // Reset everything for a fresh start
  await updateDoc(userRef, {
    'progress.startDate': currentYearStartDate,
    'progress.currentWeek': 1,
    'progress.currentDay': 1,
    'progress.completedReadings': {}, // Clear all checkboxes
    'progress.hasSeenNewYearTransition': true,
    updatedAt: Timestamp.now(),
  });
};

/**
 * Recover previous schedule from new year snapshot
 * Restores user's exact position by setting a custom start date
 */
export const recoverPreviousSchedule = async (userId: string): Promise<void> => {
  const userRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userRef);
  
  if (!userDoc.exists()) throw new Error('User not found');
  
  const snapshot = userDoc.data().progress?.newYearSnapshot;
  if (!snapshot) throw new Error('No snapshot found to recover from');
  
  // Import the recovery function
  const { calculateRecoveryStartDate } = await import('../utils/dateHelpers');
  
  // Calculate what start date would put user back at their snapshot position
  const recoveryStartDate = calculateRecoveryStartDate(snapshot.week, snapshot.day);
  
  // Restore user's position
  await updateDoc(userRef, {
    'progress.startDate': recoveryStartDate,
    'progress.currentWeek': snapshot.week,
    'progress.currentDay': snapshot.day,
    'progress.completedReadings': snapshot.completedReadings || {},
    'progress.hasSeenNewYearTransition': true,
    updatedAt: Timestamp.now(),
  });
};

/**
 * Set a custom start date for the user's reading schedule
 * This keeps their current progress intact but adjusts the calendar-based schedule
 */
export const setCustomStartDate = async (userId: string, startDate: string): Promise<void> => {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    'progress.startDate': startDate,
    updatedAt: Timestamp.now(),
  });
};

/**
 * Mark the reading plan as completed and record the completion cycle
 */
export const recordPlanCompletion = async (userId: string): Promise<void> => {
  const userRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userRef);
  
  if (!userDoc.exists()) throw new Error('User not found');
  
  const progress = userDoc.data().progress || {};
  const existingCycles = progress.completionCycles || [];
  const cycleNumber = existingCycles.length + 1;
  
  const newCycle = {
    cycleNumber,
    completedAt: Timestamp.now(),
    certificateDownloaded: false,
  };
  
  await updateDoc(userRef, {
    'progress.hasCompletedAllWeeks': true,
    'progress.showCompletionModal': true,
    'progress.completionCycles': [...existingCycles, newCycle],
    updatedAt: Timestamp.now(),
  });
};

/**
 * Reset the reading plan to start over
 */
export const resetReadingPlan = async (userId: string): Promise<void> => {
  const userRef = doc(db, 'users', userId);
  
  await updateDoc(userRef, {
    'progress.currentWeek': 1,
    'progress.currentDay': 1,
    'progress.completedReadings': {},
    'progress.hasCompletedAllWeeks': false,
    'progress.showCompletionModal': false,
    updatedAt: Timestamp.now(),
  });
};

/**
 * Mark certificate as downloaded
 */
export const markCertificateDownloaded = async (
  userId: string, 
  cycleNumber: number
): Promise<void> => {
  const userRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userRef);
  
  if (!userDoc.exists()) return;
  
  const cycles = userDoc.data().progress?.completionCycles || [];
  const updatedCycles = cycles.map((cycle: any) =>
    cycle.cycleNumber === cycleNumber
      ? { ...cycle, certificateDownloaded: true }
      : cycle
  );
  
  await updateDoc(userRef, {
    'progress.completionCycles': updatedCycles,
    updatedAt: Timestamp.now(),
  });
};

/**
 * Dismiss completion modal (but keep hasCompletedAllWeeks true)
 */
export const dismissCompletionModal = async (userId: string): Promise<void> => {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    'progress.showCompletionModal': false,
    updatedAt: Timestamp.now(),
  });
};

/**
 * Dismiss start date tip
 */
export const dismissStartDateTip = async (userId: string): Promise<void> => {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    'progress.hasSeenStartDateTip': true,
    updatedAt: Timestamp.now(),
  });
};

/**
 * Get user document from Firestore
 * Forces server read to avoid stale cache data
 */
export const getUserDocument = async (uid: string): Promise<User | null> => {
  // Force server read to get fresh data (not from cache)
  const userDoc = await getDoc(doc(db, 'users', uid));
  
  if (!userDoc.exists()) {
    return null;
  }

  const data = userDoc.data();
  return {
    ...data,
    createdAt: data.createdAt?.toDate() || new Date(),
    updatedAt: data.updatedAt?.toDate() || new Date(),
    subscription: {
      ...data.subscription,
      trialEndsAt: data.subscription?.trialEndsAt?.toDate(),
      currentPeriodEnd: data.subscription?.currentPeriodEnd?.toDate(),
    }
  } as User;
};

/**
 * Update user preferences
 */
export const updateUserPreferences = async (
  uid: string,
  preferences: Partial<UserPreferences>
): Promise<void> => {
  const userRef = doc(db, 'users', uid);
  
  // Convert preferences fields to dot notation for proper merging
  // This prevents overwriting the entire preferences object
  const updates: any = {
    updatedAt: Timestamp.now(),
  };
  
  Object.keys(preferences).forEach((key) => {
    updates[`preferences.${key}`] = preferences[key as keyof UserPreferences];
  });
  
  await updateDoc(userRef, updates);
};

/**
 * Update user progress
 */
export const updateUserProgress = async (
  uid: string,
  progress: Partial<UserProgress>
): Promise<void> => {
  const userRef = doc(db, 'users', uid);
  
  // Convert progress fields to dot notation for proper merging
  // This prevents overwriting the entire progress object
  const updates: any = {
    updatedAt: Timestamp.now(),
  };
  
  Object.keys(progress).forEach((key) => {
    updates[`progress.${key}`] = progress[key as keyof UserProgress];
  });
  
  await updateDoc(userRef, updates);
};

/**
 * Update subscription status
 */
export const updateSubscription = async (
  uid: string,
  subscription: Partial<Subscription>
): Promise<void> => {
  const userRef = doc(db, 'users', uid);
  const updates: any = {
    updatedAt: Timestamp.now(),
  };

  // Only update fields that are provided
  if (subscription.status !== undefined) {
    updates['subscription.status'] = subscription.status;
  }
  if (subscription.plan !== undefined) {
    updates['subscription.plan'] = subscription.plan;
  }
  if (subscription.trialEndsAt) {
    updates['subscription.trialEndsAt'] = Timestamp.fromDate(subscription.trialEndsAt);
  }
  if (subscription.currentPeriodEnd) {
    updates['subscription.currentPeriodEnd'] = Timestamp.fromDate(subscription.currentPeriodEnd);
  }
  if (subscription.stripeCustomerId) {
    updates['subscription.stripeCustomerId'] = subscription.stripeCustomerId;
  }
  if (subscription.stripeSubscriptionId) {
    updates['subscription.stripeSubscriptionId'] = subscription.stripeSubscriptionId;
  }

  await updateDoc(userRef, updates);
};


/**
 * Get all users (admin only)
 */
export const getAllUsers = async (): Promise<User[]> => {
  const usersSnapshot = await getDocs(collection(db, 'users'));
  return usersSnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      ...data,
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date(),
      subscription: {
        ...data.subscription,
        trialEndsAt: data.subscription?.trialEndsAt?.toDate(),
        currentPeriodEnd: data.subscription?.currentPeriodEnd?.toDate(),
      }
    } as User;
  });
};

/**
 * Get users by subscription status (admin only)
 */
export const getUsersBySubscriptionStatus = async (status: string): Promise<User[]> => {
  const q = query(
    collection(db, 'users'),
    where('subscription.status', '==', status)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      ...data,
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date(),
      subscription: {
        ...data.subscription,
        trialEndsAt: data.subscription?.trialEndsAt?.toDate(),
        currentPeriodEnd: data.subscription?.currentPeriodEnd?.toDate(),
      }
    } as User;
  });
};

/**
 * Delete user and all associated data (admin only)
 * This calls a Cloud Function to:
 * - Delete the Firebase Authentication user
 * - Delete the user's Firestore document
 * - Delete all user's associated data (journal entries, progress, memory box, etc.)
 * - Handle family associations
 */
export const deleteUser = async (uid: string): Promise<void> => {
  const functions = getFunctions();
  const deleteUserAccount = httpsCallable(functions, 'deleteUserAccount');
  
  try {
    const result = await deleteUserAccount({ userId: uid });
    console.log('User deleted successfully:', result.data);
  } catch (error: any) {
    console.error('Error deleting user:', error);
    throw new Error(error.message || 'Failed to delete user');
  }
};

/**
 * Update user role (admin only)
 */
export const updateUserRole = async (uid: string, role: 'user' | 'admin'): Promise<void> => {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    role,
    updatedAt: Timestamp.now(),
  });
};

/**
 * Update user's subscription plan (admin only)
 */
export const updateUserPlan = async (
  uid: string, 
  plan: 'free' | 'individual' | 'family'
): Promise<void> => {
  const userRef = doc(db, 'users', uid);
  const updates: any = {
    'subscription.plan': plan,
    updatedAt: Timestamp.now(),
  };

  // If changing to free, set status to free
  if (plan === 'free') {
    updates['subscription.status'] = 'free';
    updates['subscription.trialEndsAt'] = null;
  } 
  // If changing from free to paid plan, set to trial with 7 days
  else {
    const currentUser = await getUserDocument(uid);
    if (currentUser?.subscription.status === 'free') {
      updates['subscription.status'] = 'trial';
      updates['subscription.trialEndsAt'] = Timestamp.fromDate(
        new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      );
    }
  }

  await updateDoc(userRef, updates);
};

/**
 * Create a new user account (admin only)
 * Calls Cloud Function to create Firebase Auth user and Firestore document
 */
export const createUserByAdmin = async (
  email: string,
  displayName: string,
  plan: 'free' | 'individual' | 'family',
  accountType: 'individual' | 'family',
  isAdmin: boolean
): Promise<{ success: boolean; message: string; userId?: string }> => {
  const functions = getFunctions();
  const createUser = httpsCallable(functions, 'createUserByAdmin');
  
  try {
    const result = await createUser({
      email,
      displayName,
      plan,
      accountType,
      isAdmin,
    });
    
    return result.data as { success: boolean; message: string; userId?: string };
  } catch (error: any) {
    console.error('Error creating user:', error);
    throw new Error(error.message || 'Failed to create user');
  }
};

/**
 * Manually send welcome email to a user (admin only)
 * Calls Cloud Function to send appropriate welcome email based on user's plan
 */
export const sendWelcomeEmailManually = async (userId: string): Promise<void> => {
  const functions = getFunctions();
  const sendWelcomeEmail = httpsCallable(functions, 'sendWelcomeEmailManually');
  
  try {
    const result = await sendWelcomeEmail({ userId });
    console.log('Welcome email sent successfully:', result.data);
  } catch (error: any) {
    console.error('Error sending welcome email:', error);
    throw new Error(error.message || 'Failed to send welcome email');
  }
};

/**
 * Check if user belongs to a family and get family plan status
 */
const getFamilySubscription = async (uid: string): Promise<{familyId: string; subscription: Subscription} | null> => {
  // Query families collection to see if this uid is a member
  const familiesQuery = query(
    collection(db, 'families'),
    where('members', 'array-contains', uid)
  );
  
  const familiesSnapshot = await getDocs(familiesQuery);
  
  if (familiesSnapshot.empty) {
    return null;
  }
  
  // User is part of a family - get the head of household's subscription
  const familyDoc = familiesSnapshot.docs[0];
  const familyData = familyDoc.data();
  const headOfHouseholdUid = familyData.headOfHousehold;
  
  // Get head of household's user document
  const headDoc = await getDoc(doc(db, 'users', headOfHouseholdUid));
  
  if (!headDoc.exists()) {
    return null;
  }
  
  const headData = headDoc.data();
  const headSubscription = headData.subscription;
  
  // Return family subscription info
  return {
    familyId: familyDoc.id,
    subscription: {
      status: 'active', // Family members always have active status
      plan: headSubscription.plan || 'family',
      // Note: Family members don't have their own Stripe IDs
    }
  };
};

/**
 * Create user document with automatic family subscription inheritance
 */
export const createUserDocumentWithFamilyCheck = async (
  uid: string,
  email: string,
  displayName: string
): Promise<void> => {
  const now = new Date();
  
  // Check if user is part of a family
  const familyInfo = await getFamilySubscription(uid);
  
  let subscription: Subscription;
  let accountType: 'individual' | 'family';
  let familyId: string | undefined;
  
  if (familyInfo) {
    // User is a family member - inherit subscription
    subscription = familyInfo.subscription;
    accountType = 'family';
    familyId = familyInfo.familyId;
  } else {
    // Not part of a family - default to free
    subscription = {
      status: 'free',
      plan: 'free',
    };
    accountType = 'individual';
  }

  const defaultPreferences: UserPreferences = {
    bibleTranslation: 'ESV',
    readingPlan: 'narrative',
    fontSize: 'medium',
    darkMode: false,
    emailReminders: 'daily', // Default to daily email reminders
  };

  const defaultProgress: UserProgress = {
    currentWeek: 1,
    currentDay: 1,
    lastAccessDate: now.toISOString(),
    startDate: getDefaultStartDate().toISOString(),
  };

  const userData: User = {
    uid,
    email,
    displayName,
    photoURL: null,
    role: 'user',
    accountType,
    subscription,
    isHeadOfHousehold: false,
    preferences: defaultPreferences,
    progress: defaultProgress,
    createdAt: now,
    updatedAt: now,
  };
  
  if (familyId) {
    (userData as any).familyId = familyId;
  }

  await setDoc(doc(db, 'users', uid), {
    ...userData,
    createdAt: Timestamp.fromDate(userData.createdAt),
    updatedAt: Timestamp.fromDate(userData.updatedAt),
    subscription: {
      ...userData.subscription,
      trialEndsAt: userData.subscription.trialEndsAt 
        ? Timestamp.fromDate(userData.subscription.trialEndsAt)
        : null,
    }
  });
};
