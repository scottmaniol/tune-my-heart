import { useState, useEffect } from 'react';
import { doc, updateDoc, Timestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { UserProgress as UserProgressType, ReadingProgress } from '../types/progress';
import { useAuth } from '../contexts/AuthContext';
import { updateUserProgress, recordPlanCompletion } from '../services/userService';

export const useProgress = () => {
  const { currentUser, refreshUser } = useAuth();
  const [progress, setProgress] = useState<UserProgressType | null>(null);
  const [loading, setLoading] = useState(true);

  // Load progress from current user
  useEffect(() => {
    if (currentUser) {
      const userProgress: UserProgressType = {
        userId: currentUser.uid,
        startDate: currentUser.progress.startDate 
          ? new Date(currentUser.progress.startDate) 
          : new Date(),
        completedReadings: currentUser.progress.completedReadings || {},
        lastAccessedWeek: currentUser.progress.currentWeek,
        lastAccessedDay: currentUser.progress.currentDay,
        updatedAt: currentUser.updatedAt,
      };
      setProgress(userProgress);
      setLoading(false);
    } else {
      setProgress(null);
      setLoading(false);
    }
  }, [currentUser]);

  // Check for completion whenever progress changes
  useEffect(() => {
    const checkCompletion = async () => {
      if (!currentUser?.progress) return;
      
      const completedReadings = currentUser.progress.completedReadings || {};
      let completedCount = 0;
      
      // Count total completed readings
      for (let week = 1; week <= 52; week++) {
        for (let day = 1; day <= 5; day++) {
          const key = `${week}-${day}`;
          if (completedReadings[key]?.completed) {
            completedCount++;
          }
        }
      }
      
      // If just completed all 260 and not yet recorded
      if (completedCount === 260 && !currentUser.progress.hasCompletedAllWeeks) {
        try {
          await recordPlanCompletion(currentUser.uid);
          await refreshUser(); // Refresh to show completion modal
        } catch (error) {
          console.error('Error recording completion:', error);
        }
      }
    };
    
    checkCompletion();
  }, [currentUser, refreshUser]);

  const markComplete = async (week: number, day: number, reference: string, translation: string) => {
    if (!currentUser || !progress) {
      console.error('Cannot mark complete: user not authenticated');
      return;
    }

    try {
      const key = `${week}-${day}`;
      const reading: ReadingProgress = {
        userId: currentUser.uid,
        week,
        day,
        completed: true,
        completedAt: new Date(),
        reference,
        translation,
      };

      const updatedReadings = {
        ...progress.completedReadings,
        [key]: reading,
      };

      // Update local state
      setProgress(prev => prev ? {
        ...prev,
        completedReadings: updatedReadings,
        lastAccessedWeek: week,
        lastAccessedDay: day,
        updatedAt: new Date(),
      } : null);

      // Update in Firestore (store as subcollection or in user doc)
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, {
        [`progress.completedReadings.${key}`]: {
          userId: currentUser.uid,
          week,
          day,
          completed: true,
          completedAt: Timestamp.fromDate(new Date()),
          reference,
          translation,
        },
        'progress.lastAccessedWeek': week,
        'progress.lastAccessedDay': day,
        'progress.currentWeek': week,
        'progress.currentDay': day,
        'progress.lastAccessDate': new Date().toISOString(),
        updatedAt: Timestamp.now(),
      });
      
      // Refresh currentUser to sync the data
      await refreshUser();
    } catch (error) {
      console.error('Error marking complete:', error);
      throw error;
    }
  };

  const markIncomplete = async (week: number, day: number) => {
    if (!currentUser || !progress) {
      console.error('Cannot mark incomplete: user not authenticated');
      return;
    }

    try {
      const key = `${week}-${day}`;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [key]: removed, ...remainingReadings } = progress.completedReadings;

      // Update local state
      setProgress(prev => prev ? {
        ...prev,
        completedReadings: remainingReadings,
        updatedAt: new Date(),
      } : null);

      // Update in Firestore
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, {
        [`progress.completedReadings.${key}`]: null,
        updatedAt: Timestamp.now(),
      });
    } catch (error) {
      console.error('Error marking incomplete:', error);
      throw error;
    }
  };

  const isComplete = (week: number, day: number): boolean => {
    if (!progress) return false;
    const key = `${week}-${day}`;
    return progress.completedReadings[key]?.completed || false;
  };

  const updateStartDate = async (newStartDate: Date) => {
    if (!currentUser) {
      console.error('Cannot update start date: user not authenticated');
      return;
    }

    try {
      // Update local state
      setProgress(prev => prev ? { ...prev, startDate: newStartDate } : null);

      // Update in Firestore
      await updateUserProgress(currentUser.uid, {
        startDate: newStartDate.toISOString(),
      });
    } catch (error) {
      console.error('Error updating start date:', error);
      throw error;
    }
  };

  return {
    progress,
    loading,
    markComplete,
    markIncomplete,
    isComplete,
    updateStartDate,
  };
};
