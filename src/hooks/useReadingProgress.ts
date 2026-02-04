import { useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { calculateCurrentWeekAndDay } from '../utils/dateHelpers';

export interface ReadingProgressStats {
  completedCount: number;
  expectedCount: number;
  totalCount: number; // 260 total readings (52 weeks × 5 days)
  percentageComplete: number;
  percentageExpected: number;
  status: 'ahead' | 'on-track' | 'behind';
  daysAhead: number; // positive if ahead, negative if behind
  message: string;
}

export const useReadingProgress = (): ReadingProgressStats | null => {
  const { currentUser } = useAuth();

  return useMemo(() => {
    if (!currentUser) return null;

    const totalReadings = 260; // 52 weeks × 5 days
    
    // Get completed readings count
    const completedReadings = currentUser.progress.completedReadings || {};
    const completedCount = Object.keys(completedReadings).length;

    // Calculate expected progress based on start date
    const startDateStr = currentUser.progress.startDate;
    if (!startDateStr) return null;

    // Parse the date string correctly to avoid timezone issues
    // Format is 'YYYY-MM-DD', so split and create date in local time
    const [startYear, startMonth, startDay] = startDateStr.split('-').map(Number);
    const startDate = new Date(startYear, startMonth - 1, startDay); // month is 0-indexed
    const currentProgress = calculateCurrentWeekAndDay(startDate, new Date());
    
    if (!currentProgress) return null;

    const { week, day } = currentProgress;
    
    // Calculate expected number of completed readings
    // (week - 1) * 5 days + current day
    const expectedCount = Math.min((week - 1) * 5 + day, totalReadings);

    // Debug logging
    console.log('Reading Progress Debug:', {
      startDate: startDateStr,
      currentWeek: week,
      currentDay: day,
      completedCount,
      expectedCount,
      difference: completedCount - expectedCount
    });

    // Calculate percentages
    const percentageComplete = (completedCount / totalReadings) * 100;
    const percentageExpected = (expectedCount / totalReadings) * 100;

    // Determine status and days ahead/behind
    const daysAhead = completedCount - expectedCount;
    
    let status: 'ahead' | 'on-track' | 'behind';
    let message: string;

    if (daysAhead > 2) {
      status = 'ahead';
      message = `You're ${daysAhead} days ahead! Great work! 🎉`;
    } else if (daysAhead >= -2) {
      status = 'on-track';
      message = `You're on track! Keep it up! 📖`;
    } else if (daysAhead >= -7) {
      status = 'behind';
      const daysBehind = Math.abs(daysAhead);
      message = `${daysBehind} day${daysBehind > 1 ? 's' : ''} behind - you've got this! 💪`;
    } else {
      status = 'behind';
      const daysBehind = Math.abs(daysAhead);
      message = `${daysBehind} days behind - try to catch up this weekend! 📚`;
    }

    return {
      completedCount,
      expectedCount,
      totalCount: totalReadings,
      percentageComplete,
      percentageExpected,
      status,
      daysAhead,
      message,
    };
  }, [currentUser]);
};
