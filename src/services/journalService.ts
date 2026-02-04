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
  orderBy
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { JournalEntry } from '../types/journal';

/**
 * Create or update a journal entry
 */
export const saveJournalEntry = async (entry: Omit<JournalEntry, 'entryId' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  const now = new Date();
  
  // Check if entry already exists for this user/week/day/plan
  const existingEntry = await getJournalEntry(entry.userId, entry.weekNumber, entry.dayNumber, entry.planType);
  
  if (existingEntry) {
    // Update existing entry
    const entryRef = doc(db, 'journal_entries', existingEntry.entryId);
    await updateDoc(entryRef, {
      questionAnswers: entry.questionAnswers,
      freeformNotes: entry.freeformNotes,
      updatedAt: Timestamp.fromDate(now),
    });
    return existingEntry.entryId;
  } else {
    // Create new entry
    const entryRef = doc(collection(db, 'journal_entries'));
    const entryId = entryRef.id;
    
    const journalData: JournalEntry = {
      entryId,
      ...entry,
      createdAt: now,
      updatedAt: now,
    };

    await setDoc(entryRef, {
      ...journalData,
      createdAt: Timestamp.fromDate(journalData.createdAt),
      updatedAt: Timestamp.fromDate(journalData.updatedAt),
    });
    
    return entryId;
  }
};

/**
 * Get a specific journal entry
 */
export const getJournalEntry = async (
  userId: string,
  weekNumber: number,
  dayNumber: number,
  planType: string
): Promise<JournalEntry | null> => {
  const q = query(
    collection(db, 'journal_entries'),
    where('userId', '==', userId),
    where('weekNumber', '==', weekNumber),
    where('dayNumber', '==', dayNumber),
    where('planType', '==', planType)
  );

  const snapshot = await getDocs(q);
  
  if (snapshot.empty) {
    return null;
  }

  const data = snapshot.docs[0].data();
  return {
    ...data,
    createdAt: data.createdAt?.toDate() || new Date(),
    updatedAt: data.updatedAt?.toDate() || new Date(),
  } as JournalEntry;
};

/**
 * Get all journal entries for a user
 */
export const getUserJournalEntries = async (userId: string): Promise<JournalEntry[]> => {
  const q = query(
    collection(db, 'journal_entries'),
    where('userId', '==', userId),
    orderBy('weekNumber', 'desc'),
    orderBy('dayNumber', 'desc')
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      ...data,
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date(),
    } as JournalEntry;
  });
};

/**
 * Get journal entries for a specific week
 */
export const getWeekJournalEntries = async (
  userId: string,
  weekNumber: number
): Promise<JournalEntry[]> => {
  const q = query(
    collection(db, 'journal_entries'),
    where('userId', '==', userId),
    where('weekNumber', '==', weekNumber),
    orderBy('dayNumber', 'desc')
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      ...data,
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date(),
    } as JournalEntry;
  });
};

/**
 * Delete a journal entry
 */
export const deleteJournalEntry = async (entryId: string): Promise<void> => {
  await deleteDoc(doc(db, 'journal_entries', entryId));
};

/**
 * Get journal entries for family members (for family dashboard)
 */
export const getFamilyJournalEntries = async (familyMemberIds: string[]): Promise<JournalEntry[]> => {
  if (familyMemberIds.length === 0) {
    return [];
  }

  // Firestore 'in' queries are limited to 10 items, so we need to batch if more than 10
  const batches: Promise<JournalEntry[]>[] = [];
  
  for (let i = 0; i < familyMemberIds.length; i += 10) {
    const batch = familyMemberIds.slice(i, i + 10);
    const q = query(
      collection(db, 'journal_entries'),
      where('userId', 'in', batch),
      orderBy('weekNumber', 'desc'),
      orderBy('dayNumber', 'desc')
    );
    
    batches.push(
      getDocs(q).then(snapshot =>
        snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            ...data,
            createdAt: data.createdAt?.toDate() || new Date(),
            updatedAt: data.updatedAt?.toDate() || new Date(),
          } as JournalEntry;
        })
      )
    );
  }

  const results = await Promise.all(batches);
  return results.flat();
};

/**
 * Check if a journal entry exists
 */
export const hasJournalEntry = async (
  userId: string,
  weekNumber: number,
  dayNumber: number,
  planType: string
): Promise<boolean> => {
  const entry = await getJournalEntry(userId, weekNumber, dayNumber, planType);
  return entry !== null;
};

/**
 * Alias for getUserJournalEntries (for family progress dashboard)
 */
export const getJournalEntriesForUser = getUserJournalEntries;
