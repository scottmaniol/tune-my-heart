import { useMemo } from 'react';
import { calculateCurrentWeekAndDay, getDefaultStartDate } from '../utils/dateHelpers';
import { useAuth } from '../contexts/AuthContext';

/**
 * Hook to get the current week and day based on the user's custom start date
 */
export function useCurrentWeek() {
  const { currentUser } = useAuth();
  
  const currentPosition = useMemo(() => {
    // Use user's custom start date if available, otherwise use default
    let startDate: Date;
    
    if (currentUser?.progress?.startDate) {
      // Parse the date string correctly to avoid timezone issues
      const [year, month, day] = currentUser.progress.startDate.split('-').map(Number);
      startDate = new Date(year, month - 1, day); // month is 0-indexed
    } else {
      startDate = getDefaultStartDate();
    }
    
    // Calculate current position
    const position = calculateCurrentWeekAndDay(startDate);
    
    return {
      week: position?.week || 1,
      day: position?.day || 1,
      isWeekend: position?.isWeekend || false,
      startDate
    };
  }, [currentUser?.progress?.startDate]);
  
  return currentPosition;
}
