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
  deleteDoc,
  increment
} from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';
import { db, functions } from '../config/firebase';
import { Family, FamilyMember, User, UserPreferences, UserProgress } from '../types/user';
import { getDefaultStartDate } from '../utils/dateHelpers';

const MAX_FAMILY_MEMBERS = 10;

/**
 * Create a family document when a user signs up with family plan
 */
export const createFamily = async (headOfHouseholdUid: string): Promise<string> => {
  const familyRef = doc(collection(db, 'families'));
  const familyId = familyRef.id;

  const familyData: Omit<Family, 'id'> = {
    headOfHousehold: headOfHouseholdUid,
    members: [headOfHouseholdUid],
    memberCount: 1,
    maxMembers: MAX_FAMILY_MEMBERS,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await setDoc(familyRef, {
    ...familyData,
    createdAt: Timestamp.fromDate(familyData.createdAt),
    updatedAt: Timestamp.fromDate(familyData.updatedAt),
  });

  // Update user document with familyId
  await updateDoc(doc(db, 'users', headOfHouseholdUid), {
    familyId,
    updatedAt: Timestamp.now(),
  });

  return familyId;
};

/**
 * Get family document
 */
export const getFamily = async (familyId: string): Promise<Family | null> => {
  const familyDoc = await getDoc(doc(db, 'families', familyId));
  
  if (!familyDoc.exists()) {
    return null;
  }

  const data = familyDoc.data();
  return {
    id: familyDoc.id,
    ...data,
    createdAt: data.createdAt?.toDate() || new Date(),
    updatedAt: data.updatedAt?.toDate() || new Date(),
  } as Family;
};

/**
 * Create a family member account using Cloud Function
 * This prevents the head of household from being logged out
 */
export const createFamilyMember = async (
  familyId: string,
  headOfHouseholdUid: string,
  displayName: string,
  email: string,
  password: string
): Promise<string> => {
  // Call Cloud Function to create family member
  const createMemberFunction = httpsCallable(functions, 'createFamilyMemberAccount');
  
  try {
    const result = await createMemberFunction({
      familyId,
      displayName,
      email,
      password,
    });

    const data = result.data as { success: boolean; memberId: string; message: string };
    
    if (!data.success) {
      throw new Error(data.message || 'Failed to create family member');
    }

    return data.memberId;
  } catch (error: any) {
    console.error('Error calling createFamilyMemberAccount:', error);
    
    // Extract error message from Cloud Function error
    if (error.code === 'functions/already-exists') {
      throw new Error('An account with this email already exists');
    } else if (error.code === 'functions/invalid-argument') {
      throw new Error(error.message || 'Invalid input');
    } else if (error.code === 'functions/permission-denied') {
      throw new Error('Only head of household can create family members');
    } else if (error.code === 'functions/resource-exhausted') {
      throw new Error  (error.message || 'Maximum family members reached');
    } else if (error.code === 'functions/not-found') {
      throw new Error('Family not found');
    }
    
    throw new Error(error.message || 'Failed to create family member. Please try again.');
  }
};

/**
 * Get all family members
 */
export const getFamilyMembers = async (familyId: string): Promise<User[]> => {
  const q = query(
    collection(db, 'users'),
    where('familyId', '==', familyId)
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
 * Delete a family member
 */
export const deleteFamilyMember = async (
  familyId: string,
  headOfHouseholdUid: string,
  memberUid: string
): Promise<void> => {
  // Verify family exists and user is head of household
  const family = await getFamily(familyId);
  if (!family) {
    throw new Error('Family not found');
  }
  if (family.headOfHousehold !== headOfHouseholdUid) {
    throw new Error('Only head of household can delete family members');
  }
  if (memberUid === headOfHouseholdUid) {
    throw new Error('Cannot delete head of household');
  }

  // Verify member is part of this family
  const memberDoc = await getDoc(doc(db, 'users', memberUid));
  if (!memberDoc.exists() || memberDoc.data().familyId !== familyId) {
    throw new Error('Member not found in this family');
  }

  // Delete user document
  await deleteDoc(doc(db, 'users', memberUid));

  // Delete any journal entries for this member
  const journalQuery = query(
    collection(db, 'journal_entries'),
    where('userId', '==', memberUid)
  );
  const journalSnapshot = await getDocs(journalQuery);
  const deletePromises = journalSnapshot.docs.map(doc => deleteDoc(doc.ref));
  await Promise.all(deletePromises);

  // Update family document
  const updatedMembers = family.members.filter(uid => uid !== memberUid);
  await updateDoc(doc(db, 'families', familyId), {
    members: updatedMembers,
    memberCount: increment(-1),
    updatedAt: Timestamp.now(),
  });

  // Note: Firebase Auth user deletion requires admin SDK and should be done via Cloud Function
  // For now, we just disable the account by removing from Firestore
};

/**
 * Check if user can add more family members
 */
export const canAddFamilyMember = async (familyId: string): Promise<boolean> => {
  const family = await getFamily(familyId);
  if (!family) {
    return false;
  }
  return family.memberCount < family.maxMembers;
};

/**
 * Get family member count
 */
export const getFamilyMemberCount = async (familyId: string): Promise<number> => {
  const family = await getFamily(familyId);
  return family?.memberCount || 0;
};

/**
 * Update member's head of household status
 */
export const updateMemberRole = async (
  familyId: string,
  requestingUserUid: string,
  memberUid: string,
  isHeadOfHousehold: boolean
): Promise<void> => {
  // Verify family exists and requesting user is head of household
  const family = await getFamily(familyId);
  if (!family) {
    throw new Error('Family not found');
  }
  
  // Check if requesting user is a head of household
  const requestingUserDoc = await getDoc(doc(db, 'users', requestingUserUid));
  if (!requestingUserDoc.exists() || !requestingUserDoc.data().isHeadOfHousehold) {
    throw new Error('Only heads of household can change member roles');
  }

  // Verify member is part of this family
  const memberDoc = await getDoc(doc(db, 'users', memberUid));
  if (!memberDoc.exists() || memberDoc.data().familyId !== familyId) {
    throw new Error('Member not found in this family');
  }

  // Update member's isHeadOfHousehold status
  await updateDoc(doc(db, 'users', memberUid), {
    isHeadOfHousehold,
    updatedAt: Timestamp.now(),
  });
};
