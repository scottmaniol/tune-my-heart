/**
 * Memory Box System Types
 * Implements a 5-box spaced repetition system for scripture memory
 */

export type BoxLevel = 1 | 2 | 3 | 4 | 5;

export interface MemoryBoxVerse {
  week: number;
  reference: string;
  box: BoxLevel;
  lastReviewDate: string; // ISO date string
  nextReviewDate: string; // ISO date string
  correctCount: number; // Total times answered correctly
  incorrectCount: number; // Total times answered incorrectly
  addedToSystemDate: string; // When first added to box system
  consecutiveCorrect: number; // Consecutive correct answers (resets on wrong)
}

export interface ReviewSession {
  date: string; // ISO date string
  versesReviewed: {
    week: number;
    wasCorrect: boolean;
    previousBox: BoxLevel;
    newBox: BoxLevel;
  }[];
  totalReviewed: number;
  totalCorrect: number;
  totalIncorrect: number;
}

export interface BoxSystemProgress {
  verses: {
    [week: number]: MemoryBoxVerse;
  };
  reviewHistory: ReviewSession[];
  currentStreak: number; // Consecutive days with reviews
  longestStreak: number;
  lastReviewDate: string | null;
  totalReviewSessions: number;
  overallAccuracy: number; // Percentage
}

export interface DueVerse {
  verse: MemoryBoxVerse;
  daysOverdue: number;
  isCurrentWeek: boolean;
}

/**
 * Box review intervals (in days, counting only weekdays)
 */
export const BOX_INTERVALS: Record<BoxLevel, number> = {
  1: 1,  // Daily (current week verse + struggling verses)
  2: 3,  // Every 3 weekdays
  3: 7,  // Weekly (5 weekdays)
  4: 14, // Bi-weekly (10 weekdays)
  5: 30, // Monthly (approximately 22 weekdays)
};

/**
 * Box display names
 */
export const BOX_NAMES: Record<BoxLevel, string> = {
  1: 'Learning',
  2: 'Reviewing',
  3: 'Familiar',
  4: 'Well Known',
  5: 'Mastered',
};

/**
 * Box colors for UI
 */
export const BOX_COLORS: Record<BoxLevel, { bg: string; text: string; border: string }> = {
  1: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-300' },
  2: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-300' },
  3: { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-300' },
  4: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-300' },
  5: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-300' },
};
