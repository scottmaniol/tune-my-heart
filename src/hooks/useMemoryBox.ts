/**
 * useMemoryBox Hook
 * Manages scripture memory box system state and operations
 */

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  BoxSystemProgress, 
  DueVerse,
  ReviewSession,
  BoxLevel,
  MemoryBoxVerse
} from '../types/memoryBox';
import {
  initializeBoxSystem,
  addVerseToSystem,
  markVerseCorrect,
  markVerseIncorrect,
  getDueVerses,
  completeReviewSession,
  saveBoxSystemProgress,
  getVersesByBox,
  moveVerseToBox,
} from '../services/memoryBoxService';

export const useMemoryBox = () => {
  const { currentUser } = useAuth();
  const [progress, setProgress] = useState<BoxSystemProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Load progress from current user
  useEffect(() => {
    if (currentUser) {
      // Check if user has memoryBoxes data
      const userBoxes = (currentUser as any).memoryBoxes as BoxSystemProgress | undefined;
      
      if (userBoxes) {
        setProgress(userBoxes);
      } else {
        // Initialize empty box system
        setProgress(initializeBoxSystem());
      }
      setLoading(false);
    } else {
      setProgress(null);
      setLoading(false);
    }
  }, [currentUser]);

  /**
   * Add a verse to the box system
   */
  const addVerse = useCallback(async (week: number, reference: string) => {
    if (!currentUser || !progress) {
      console.error('Cannot add verse: user not authenticated or progress not loaded');
      return;
    }

    // Check if verse already exists
    if (progress.verses[week]) {
      console.log(`Verse for week ${week} already in system`);
      return;
    }

    try {
      setSaving(true);
      const updatedProgress = addVerseToSystem(week, reference, progress);
      setProgress(updatedProgress);
      await saveBoxSystemProgress(currentUser.uid, updatedProgress);
    } catch (error) {
      console.error('Error adding verse:', error);
      throw error;
    } finally {
      setSaving(false);
    }
  }, [currentUser, progress]);

  /**
   * Manually move a verse to a different box
   */
  const moveToBox = useCallback(async (week: number, box: BoxLevel) => {
    if (!currentUser || !progress) {
      console.error('Cannot move verse: user not authenticated or progress not loaded');
      return;
    }

    try {
      setSaving(true);
      const updatedProgress = moveVerseToBox(week, box, progress);
      setProgress(updatedProgress);
      await saveBoxSystemProgress(currentUser.uid, updatedProgress);
    } catch (error) {
      console.error('Error moving verse:', error);
      throw error;
    } finally {
      setSaving(false);
    }
  }, [currentUser, progress]);

  /**
   * Start a review session
   */
  const startReviewSession = useCallback(() => {
    return {
      versesReviewed: [] as ReviewSession['versesReviewed'],
      totalReviewed: 0,
      totalCorrect: 0,
      totalIncorrect: 0,
    };
  }, []);

  /**
   * Mark a verse as correct in the current session
   */
  const recordCorrect = useCallback((week: number, sessionData: any) => {
    if (!progress) return sessionData;

    const verse = progress.verses[week];
    if (!verse) return sessionData;

    const previousBox = verse.box;
    const updatedProgress = markVerseCorrect(week, progress);
    const newBox = updatedProgress.verses[week].box;

    return {
      ...sessionData,
      versesReviewed: [
        ...sessionData.versesReviewed,
        {
          week,
          wasCorrect: true,
          previousBox,
          newBox,
        },
      ],
      totalReviewed: sessionData.totalReviewed + 1,
      totalCorrect: sessionData.totalCorrect + 1,
    };
  }, [progress]);

  /**
   * Mark a verse as incorrect in the current session
   */
  const recordIncorrect = useCallback((week: number, sessionData: any) => {
    if (!progress) return sessionData;

    const verse = progress.verses[week];
    if (!verse) return sessionData;

    const previousBox = verse.box;

    return {
      ...sessionData,
      versesReviewed: [
        ...sessionData.versesReviewed,
        {
          week,
          wasCorrect: false,
          previousBox,
          newBox: 1 as BoxLevel,
        },
      ],
      totalReviewed: sessionData.totalReviewed + 1,
      totalIncorrect: sessionData.totalIncorrect + 1,
    };
  }, [progress]);

  /**
   * Complete and save a review session
   */
  const finishReviewSession = useCallback(async (sessionData: any) => {
    if (!currentUser || !progress) {
      console.error('Cannot finish session: user not authenticated or progress not loaded');
      return;
    }

    try {
      setSaving(true);
      
      // Apply all the verse updates
      let updatedProgress = progress;
      
      for (const review of sessionData.versesReviewed) {
        if (review.wasCorrect) {
          updatedProgress = markVerseCorrect(review.week, updatedProgress);
        } else {
          updatedProgress = markVerseIncorrect(review.week, updatedProgress);
        }
      }

      // Create the session record
      const session: ReviewSession = {
        date: new Date().toISOString(),
        versesReviewed: sessionData.versesReviewed,
        totalReviewed: sessionData.totalReviewed,
        totalCorrect: sessionData.totalCorrect,
        totalIncorrect: sessionData.totalIncorrect,
      };

      // Update progress with session
      updatedProgress = completeReviewSession(updatedProgress, session);
      
      setProgress(updatedProgress);
      await saveBoxSystemProgress(currentUser.uid, updatedProgress);
      
      return updatedProgress;
    } catch (error) {
      console.error('Error finishing review session:', error);
      throw error;
    } finally {
      setSaving(false);
    }
  }, [currentUser, progress]);

  /**
   * Get verses due for review today
   */
  const getDueVersesToday = useCallback((currentWeek: number): DueVerse[] => {
    if (!progress) return [];
    return getDueVerses(progress, currentWeek);
  }, [progress]);

  /**
   * Get verses organized by box
   */
  const getBoxes = useCallback((): Record<BoxLevel, MemoryBoxVerse[]> => {
    if (!progress) {
      return { 1: [], 2: [], 3: [], 4: [], 5: [] };
    }
    return getVersesByBox(progress);
  }, [progress]);

  /**
   * Check if a specific verse is in the system
   */
  const hasVerse = useCallback((week: number): boolean => {
    if (!progress) return false;
    return !!progress.verses[week];
  }, [progress]);

  /**
   * Get a specific verse from the system
   */
  const getVerse = useCallback((week: number): MemoryBoxVerse | null => {
    if (!progress) return null;
    return progress.verses[week] || null;
  }, [progress]);

  return {
    progress,
    loading,
    saving,
    addVerse,
    moveToBox,
    startReviewSession,
    recordCorrect,
    recordIncorrect,
    finishReviewSession,
    getDueVersesToday,
    getBoxes,
    hasVerse,
    getVerse,
  };
};
