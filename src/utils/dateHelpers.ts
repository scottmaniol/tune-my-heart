/**
 * Date utility functions for Tune My Heart curriculum
 * Handles week/day calculations for 52-week, 5-day-per-week schedule
 */

/**
 * Find the first Monday of a given year
 */
export function getFirstMondayOfYear(year: number): Date {
  const jan1 = new Date(year, 0, 1); // January 1st
  const dayOfWeek = jan1.getDay(); // 0 = Sunday, 1 = Monday, etc.
  
  let daysUntilMonday = 0;
  
  if (dayOfWeek === 0) {
    // Sunday - need to add 1 day
    daysUntilMonday = 1;
  } else if (dayOfWeek === 1) {
    // Already Monday
    daysUntilMonday = 0;
  } else {
    // Tuesday through Saturday - calculate days until next Monday
    daysUntilMonday = 8 - dayOfWeek;
  }
  
  const firstMonday = new Date(year, 0, 1 + daysUntilMonday);
  return firstMonday;
}

/**
 * Calculate which week and day the user should be on based on current date
 * Returns null if not within the 52-week curriculum period
 */
export function calculateCurrentWeekAndDay(
  startDate: Date,
  currentDate: Date = new Date()
): { week: number; day: number; isWeekend: boolean } | null {
  // Reset time portions for accurate day comparison
  const start = new Date(startDate);
  start.setHours(0, 0, 0, 0);
  
  const current = new Date(currentDate);
  current.setHours(0, 0, 0, 0);
  
  // Check if current date is before start date
  if (current < start) {
    return { week: 1, day: 1, isWeekend: false };
  }
  
  // Check what day of week it is
  const dayOfWeek = current.getDay();
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  
  // Count only weekdays (Mon-Fri)
  let weekdayCount = 0;
  let tempDate = new Date(start);
  
  while (tempDate <= current) {
    const tempDayOfWeek = tempDate.getDay();
    if (tempDayOfWeek >= 1 && tempDayOfWeek <= 5) {
      weekdayCount++;
    }
    tempDate.setDate(tempDate.getDate() + 1);
  }
  
  // Calculate week (1-52) and day (1-5)
  // Each week has 5 days
  const week = Math.ceil(weekdayCount / 5);
  const day = weekdayCount % 5 === 0 ? 5 : weekdayCount % 5;
  
  // Cap at week 52, day 5 (end of curriculum)
  if (week > 52) {
    return { week: 52, day: 5, isWeekend };
  }
  
  return { week, day, isWeekend };
}

/**
 * Get the date for a specific week and day
 */
export function getDateForWeekDay(startDate: Date, week: number, day: number): Date {
  // Calculate the number of weekdays to add
  const totalWeekdays = (week - 1) * 5 + (day - 1);
  
  let currentDate = new Date(startDate);
  let weekdaysAdded = 0;
  
  while (weekdaysAdded < totalWeekdays) {
    currentDate.setDate(currentDate.getDate() + 1);
    const dayOfWeek = currentDate.getDay();
    
    // Only count weekdays
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      weekdaysAdded++;
    }
  }
  
  return currentDate;
}

/**
 * Format a date for display
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Get the default start date (first Monday of current year)
 */
export function getDefaultStartDate(): Date {
  const currentYear = new Date().getFullYear();
  return getFirstMondayOfYear(currentYear);
}

/**
 * Check if two dates are the same day
 */
export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

/**
 * Get day name from day number (1-5)
 */
export function getDayName(day: number): string {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  return days[day - 1] || '';
}

/**
 * Calculate what start date would put the user at a specific week/day position today
 * Used for recovering a user's previous schedule position after a new year reset
 */
export function calculateRecoveryStartDate(targetWeek: number, targetDay: number, currentDate: Date = new Date()): string {
  // Calculate total weekdays needed to reach target position
  // Week 1, Day 1 = 0 weekdays from start
  // Week 1, Day 2 = 1 weekday from start
  // Week 2, Day 1 = 5 weekdays from start
  const totalWeekdaysFromStart = (targetWeek - 1) * 5 + (targetDay - 1);
  
  // Start from current date and count backwards
  let recoveryDate = new Date(currentDate);
  recoveryDate.setHours(0, 0, 0, 0);
  
  let weekdaysCountedBack = 0;
  
  // Count back the required number of weekdays
  while (weekdaysCountedBack < totalWeekdaysFromStart) {
    recoveryDate.setDate(recoveryDate.getDate() - 1);
    const dayOfWeek = recoveryDate.getDay();
    
    // Only count weekdays (Monday = 1, Friday = 5)
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      weekdaysCountedBack++;
    }
  }
  
  // Make sure we land on a Monday (start of week)
  // If not Monday, go back to the previous Monday
  const dayOfWeek = recoveryDate.getDay();
  if (dayOfWeek !== 1) {
    let daysToSubtract = 0;
    if (dayOfWeek === 0) {
      // Sunday, go back 6 days to Monday
      daysToSubtract = 6;
    } else {
      // Tuesday-Saturday, go back to Monday
      daysToSubtract = dayOfWeek - 1;
    }
    recoveryDate.setDate(recoveryDate.getDate() - daysToSubtract);
  }
  
  // Format as YYYY-MM-DD for consistency with startDate format
  const year = recoveryDate.getFullYear();
  const month = String(recoveryDate.getMonth() + 1).padStart(2, '0');
  const day = String(recoveryDate.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
}
