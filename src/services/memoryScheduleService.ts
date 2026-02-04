/**
 * Memory Schedule Service
 * Calculates which verses should be reviewed based on time-based progression
 */

export interface ReviewVerse {
  week: number;
  category: 'daily' | 'odd' | 'even' | 'weekday' | 'monthly';
  label: string;
}

/**
 * Calculate which verses should be reviewed today
 * @param currentWeek - The user's current week (1-52)
 * @param currentDate - The current date (defaults to today)
 * @returns Array of verses to review
 */
export const getTodaysReviewVerses = (
  currentWeek: number,
  currentDate: Date = new Date()
): ReviewVerse[] => {
  const verses: ReviewVerse[] = [];
  const usedWeeks = new Set<number>(); // Track which weeks we've already added
  
  // Get day of week (0 = Sunday, 1 = Monday, etc.)
  const dayOfWeek = currentDate.getDay();
  
  // Get day of month (1-31)
  const dayOfMonth = currentDate.getDate();
  
  // Skip weekends
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    return [];
  }
  
  // 1. DAILY - Current week verse
  verses.push({
    week: currentWeek,
    category: 'daily',
    label: 'Daily (Current Week)'
  });
  usedWeeks.add(currentWeek);
  
  // 2. ODD/EVEN - Verses from 1-2 weeks ago
  const isOddDay = dayOfMonth % 2 === 1;
  
  if (isOddDay) {
    // Odd day: show verse from 1 week ago
    const oddWeek = currentWeek - 1;
    if (oddWeek >= 1 && !usedWeeks.has(oddWeek)) {
      verses.push({
        week: oddWeek,
        category: 'odd',
        label: 'Odd Day Review'
      });
      usedWeeks.add(oddWeek);
    }
  } else {
    // Even day: show verse from 2 weeks ago
    const evenWeek = currentWeek - 2;
    if (evenWeek >= 1 && !usedWeeks.has(evenWeek)) {
      verses.push({
        week: evenWeek,
        category: 'even',
        label: 'Even Day Review'
      });
      usedWeeks.add(evenWeek);
    }
  }
  
  // 3. DAY OF WEEK - Verses from 3-7 weeks ago
  // Monday (1) = week - 3, Tuesday (2) = week - 4, etc.
  const weeksAgoForWeekday = dayOfWeek + 2; // Mon=3, Tue=4, Wed=5, Thu=6, Fri=7
  const weekdayVerseWeek = currentWeek - weeksAgoForWeekday;
  
  if (weekdayVerseWeek >= 1 && !usedWeeks.has(weekdayVerseWeek)) {
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    verses.push({
      week: weekdayVerseWeek,
      category: 'weekday',
      label: `${dayNames[dayOfWeek]} Review`
    });
    usedWeeks.add(weekdayVerseWeek);
  }
  
  // 4. MONTHLY - Verses from 8-38 weeks ago
  // Day 1 = week - 8, Day 2 = week - 9, etc.
  const weeksAgoForMonthly = dayOfMonth + 7; // Day 1 = 8 weeks, Day 2 = 9 weeks, etc.
  const monthlyVerseWeek = currentWeek - weeksAgoForMonthly;
  
  if (monthlyVerseWeek >= 1 && !usedWeeks.has(monthlyVerseWeek)) {
    verses.push({
      week: monthlyVerseWeek,
      category: 'monthly',
      label: `Monthly (Day ${dayOfMonth})`
    });
    usedWeeks.add(monthlyVerseWeek);
  }
  
  return verses;
};

/**
 * Get explanation of the review system
 */
export const getReviewSystemExplanation = (): string => {
  return `Each verse progresses through a time-based review schedule:
  
• Week 1: Daily (current week)
• Week 2: Odd/Even review
• Weeks 3-7: Weekday review (Mon-Fri)
• Weeks 8-38: Monthly review (Days 1-31)
• Week 39+: Fully memorized

Your review verses are automatically selected based on today's date and your current week.`;
};

/**
 * Calculate what stage a verse is in
 */
export const getVerseStage = (verseWeek: number, currentWeek: number): string => {
  const weeksElapsed = currentWeek - verseWeek;
  
  if (weeksElapsed === 0) return 'Current Week (Daily)';
  if (weeksElapsed === 1) return 'Odd/Even Review';
  if (weeksElapsed === 2) return 'Odd/Even Review';
  if (weeksElapsed >= 3 && weeksElapsed <= 7) return 'Weekday Review';
  if (weeksElapsed >= 8 && weeksElapsed <= 38) return 'Monthly Review';
  return 'Fully Memorized';
};
