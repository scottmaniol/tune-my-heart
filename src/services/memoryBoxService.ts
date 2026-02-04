/**
 * Memory Box Service
 * Handles scripture memory box system operations and scheduling
 */

import { doc, updateDoc, Timestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { 
  MemoryBoxVerse, 
  BoxSystemProgress, 
  BoxLevel, 
  BOX_INTERVALS,
  DueVerse,
  ReviewSession
} from '../types/memoryBox';

/**
 * Check if a date is a weekend (Saturday or Sunday)
 */
export const isWeekend = (date: Date): boolean => {
  const day = date.getDay();
  return day === 0 || day === 6; // 0 = Sunday, 6 = Saturday
};

/**
 * Calculate the next weekday (skips Saturday and Sunday)
 */
export const getNextWeekday = (date: Date): Date => {
  const next = new Date(date);
  next.setDate(next.getDate() + 1);
  
  while (isWeekend(next)) {
    next.setDate(next.getDate() + 1);
  }
  
  return next;
};

/**
 * Add weekdays to a date (skipping weekends)
 */
export const addWeekdays = (startDate: Date, weekdaysToAdd: number): Date => {
  let current = new Date(startDate);
  let daysAdded = 0;
  
  while (daysAdded < weekdaysToAdd) {
    current = getNextWeekday(current);
    daysAdded++;
  }
  
  return current;
};

/**
 * Calculate weekday difference between two dates
 */
export const getWeekdayDifference = (startDate: Date, endDate: Date): number => {
  let count = 0;
  const current = new Date(startDate);
  const end = new Date(endDate);
  
  // Reset times to midnight for accurate comparison
  current.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);
  
  while (current < end) {
    if (!isWeekend(current)) {
      count++;
    }
    current.setDate(current.getDate() + 1);
  }
  
  return count;
};

/**
 * Calculate the next review date based on box level
 */
export const calculateNextReviewDate = (box: BoxLevel, fromDate: Date = new Date()): Date => {
  const interval = BOX_INTERVALS[box];
  return addWeekdays(fromDate, interval);
};

/**
 * Initialize empty box system progress
 */
export const initializeBoxSystem = (): BoxSystemProgress => {
  return {
    verses: {},
    reviewHistory: [],
    currentStreak: 0,
    longestStreak: 0,
    lastReviewDate: null,
    totalReviewSessions: 0,
    overallAccuracy: 0,
  };
};

/**
 * Add a verse to the box system (starts in Box 1)
 */
export const addVerseToSystem = (
  week: number,
  reference: string,
  currentProgress: BoxSystemProgress
): BoxSystemProgress => {
  const now = new Date();
  const nextReview = calculateNextReviewDate(1, now);
  
  const newVerse: MemoryBoxVerse = {
    week,
    reference,
    box: 1,
    lastReviewDate: now.toISOString(),
    nextReviewDate: nextReview.toISOString(),
    correctCount: 0,
    incorrectCount: 0,
    addedToSystemDate: now.toISOString(),
    consecutiveCorrect: 0,
  };
  
  return {
    ...currentProgress,
    verses: {
      ...currentProgress.verses,
      [week]: newVerse,
    },
  };
};

/**
 * Move a verse to a different box
 */
export const moveVerseToBox = (
  week: number,
  newBox: BoxLevel,
  currentProgress: BoxSystemProgress
): BoxSystemProgress => {
  const verse = currentProgress.verses[week];
  if (!verse) return currentProgress;
  
  const now = new Date();
  const nextReview = calculateNextReviewDate(newBox, now);
  
  const updatedVerse: MemoryBoxVerse = {
    ...verse,
    box: newBox,
    lastReviewDate: now.toISOString(),
    nextReviewDate: nextReview.toISOString(),
  };
  
  return {
    ...currentProgress,
    verses: {
      ...currentProgress.verses,
      [week]: updatedVerse,
    },
  };
};

/**
 * Mark a verse as correct during review
 */
export const markVerseCorrect = (
  week: number,
  currentProgress: BoxSystemProgress
): BoxSystemProgress => {
  const verse = currentProgress.verses[week];
  if (!verse) return currentProgress;
  
  const now = new Date();
  let newBox = verse.box;
  
  // Move to next box if consecutive correct count is high enough
  // Box 1: Need 5 consecutive correct
  // Box 2-4: Need 3 consecutive correct
  // Box 5: Stay in Box 5
  const consecutiveCorrect = verse.consecutiveCorrect + 1;
  
  if (verse.box === 1 && consecutiveCorrect >= 5) {
    newBox = 2;
  } else if (verse.box >= 2 && verse.box < 5 && consecutiveCorrect >= 3) {
    newBox = Math.min(5, verse.box + 1) as BoxLevel;
  }
  
  const nextReview = calculateNextReviewDate(newBox, now);
  
  const updatedVerse: MemoryBoxVerse = {
    ...verse,
    box: newBox,
    correctCount: verse.correctCount + 1,
    consecutiveCorrect,
    lastReviewDate: now.toISOString(),
    nextReviewDate: nextReview.toISOString(),
  };
  
  return {
    ...currentProgress,
    verses: {
      ...currentProgress.verses,
      [week]: updatedVerse,
    },
  };
};

/**
 * Mark a verse as incorrect during review (moves back to Box 1)
 */
export const markVerseIncorrect = (
  week: number,
  currentProgress: BoxSystemProgress
): BoxSystemProgress => {
  const verse = currentProgress.verses[week];
  if (!verse) return currentProgress;
  
  const now = new Date();
  const nextReview = calculateNextReviewDate(1, now);
  
  const updatedVerse: MemoryBoxVerse = {
    ...verse,
    box: 1,
    incorrectCount: verse.incorrectCount + 1,
    consecutiveCorrect: 0, // Reset consecutive correct
    lastReviewDate: now.toISOString(),
    nextReviewDate: nextReview.toISOString(),
  };
  
  return {
    ...currentProgress,
    verses: {
      ...currentProgress.verses,
      [week]: updatedVerse,
    },
  };
};

/**
 * Get all verses that are due for review today
 */
export const getDueVerses = (
  currentProgress: BoxSystemProgress,
  currentWeek: number,
  referenceDate: Date = new Date()
): DueVerse[] => {
  const today = new Date(referenceDate);
  today.setHours(0, 0, 0, 0);
  
  // Skip if it's a weekend
  if (isWeekend(today)) {
    return [];
  }
  
  const dueVerses: DueVerse[] = [];
  
  // Always include current week's verse (if it exists in system)
  const currentWeekVerse = currentProgress.verses[currentWeek];
  if (currentWeekVerse) {
    dueVerses.push({
      verse: currentWeekVerse,
      daysOverdue: 0,
      isCurrentWeek: true,
    });
  }
  
  // Check all other verses
  Object.values(currentProgress.verses).forEach(verse => {
    if (verse.week === currentWeek) return; // Skip current week (already added)
    
    const nextReview = new Date(verse.nextReviewDate);
    nextReview.setHours(0, 0, 0, 0);
    
    if (nextReview <= today) {
      const daysOverdue = getWeekdayDifference(nextReview, today);
      dueVerses.push({
        verse,
        daysOverdue,
        isCurrentWeek: false,
      });
    }
  });
  
  // Sort: current week first, then by days overdue (most overdue first), then by week
  return dueVerses.sort((a, b) => {
    if (a.isCurrentWeek) return -1;
    if (b.isCurrentWeek) return 1;
    if (a.daysOverdue !== b.daysOverdue) return b.daysOverdue - a.daysOverdue;
    return a.verse.week - b.verse.week;
  });
};

/**
 * Complete a review session and update progress
 */
export const completeReviewSession = (
  currentProgress: BoxSystemProgress,
  session: ReviewSession
): BoxSystemProgress => {
  const today = new Date().toISOString().split('T')[0];
  const lastReviewDate = currentProgress.lastReviewDate?.split('T')[0];
  
  // Update streak
  let newStreak = currentProgress.currentStreak;
  if (lastReviewDate) {
    const lastDate = new Date(lastReviewDate);
    const todayDate = new Date(today);
    const weekdayDiff = getWeekdayDifference(lastDate, todayDate);
    
    if (weekdayDiff === 1) {
      // Consecutive weekday
      newStreak++;
    } else if (weekdayDiff === 0) {
      // Same day, keep streak
      newStreak = currentProgress.currentStreak;
    } else {
      // Streak broken
      newStreak = 1;
    }
  } else {
    newStreak = 1;
  }
  
  // Calculate overall accuracy
  const totalCorrect = session.versesReviewed.filter(v => v.wasCorrect).length;
  const totalReviewed = session.versesReviewed.length;
  const allVerses = Object.values(currentProgress.verses);
  const allTimeCorrect = allVerses.reduce((sum, v) => sum + v.correctCount, 0) + totalCorrect;
  const allTimeIncorrect = allVerses.reduce((sum, v) => sum + v.incorrectCount, 0) + (totalReviewed - totalCorrect);
  const overallAccuracy = allTimeCorrect + allTimeIncorrect > 0
    ? Math.round((allTimeCorrect / (allTimeCorrect + allTimeIncorrect)) * 100)
    : 0;
  
  return {
    ...currentProgress,
    reviewHistory: [...currentProgress.reviewHistory, session],
    currentStreak: newStreak,
    longestStreak: Math.max(currentProgress.longestStreak, newStreak),
    lastReviewDate: today,
    totalReviewSessions: currentProgress.totalReviewSessions + 1,
    overallAccuracy,
  };
};

/**
 * Save box system progress to Firestore
 */
export const saveBoxSystemProgress = async (
  userId: string,
  progress: BoxSystemProgress
): Promise<void> => {
  const userRef = doc(db, 'users', userId);
  
  await updateDoc(userRef, {
    memoryBoxes: progress,
    updatedAt: Timestamp.now(),
  });
};

/**
 * Get verses grouped by box
 */
export const getVersesByBox = (progress: BoxSystemProgress): Record<BoxLevel, MemoryBoxVerse[]> => {
  const grouped: Record<BoxLevel, MemoryBoxVerse[]> = {
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
  };
  
  Object.values(progress.verses).forEach(verse => {
    grouped[verse.box].push(verse);
  });
  
  // Sort each box by week number
  Object.keys(grouped).forEach(key => {
    const box = parseInt(key) as BoxLevel;
    grouped[box].sort((a, b) => a.week - b.week);
  });
  
  return grouped;
};
