/**
 * Liturgical Calendar Helpers
 * Functions to calculate liturgical dates and determine appropriate liturgy
 */

import { SpecialOccasion } from '../types/liturgy';

/**
 * Calculate Easter Sunday for a given year using Computus algorithm
 * (Anonymous Gregorian algorithm)
 */
export function calculateEaster(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  
  return new Date(year, month - 1, day);
}

/**
 * Calculate Ash Wednesday (46 days before Easter)
 */
export function calculateAshWednesday(year: number): Date {
  const easter = calculateEaster(year);
  const ashWednesday = new Date(easter);
  ashWednesday.setDate(easter.getDate() - 46);
  return ashWednesday;
}

/**
 * Calculate the Thursday before Easter (last day of Lent)
 */
export function calculateMaundyThursday(year: number): Date {
  const easter = calculateEaster(year);
  const maundyThursday = new Date(easter);
  maundyThursday.setDate(easter.getDate() - 3);
  return maundyThursday;
}

/**
 * Calculate Good Friday (Friday before Easter)
 */
export function calculateGoodFriday(year: number): Date {
  const easter = calculateEaster(year);
  const goodFriday = new Date(easter);
  goodFriday.setDate(easter.getDate() - 2);
  return goodFriday;
}

/**
 * Calculate Pentecost Sunday (50 days after Easter)
 */
export function calculatePentecost(year: number): Date {
  const easter = calculateEaster(year);
  const pentecost = new Date(easter);
  pentecost.setDate(easter.getDate() + 49);
  return pentecost;
}

/**
 * Calculate the first Sunday of Advent (4th Sunday before Christmas)
 */
export function calculateAdventStart(year: number): Date {
  const christmas = new Date(year, 11, 25); // December 25
  const christmasDayOfWeek = christmas.getDay();
  
  // Calculate how many days until the Sunday before Christmas
  const daysUntilSunday = christmasDayOfWeek === 0 ? 0 : 7 - christmasDayOfWeek;
  const sundayBeforeChristmas = new Date(christmas);
  sundayBeforeChristmas.setDate(christmas.getDate() - christmasDayOfWeek);
  
  // Go back 3 more weeks (21 days) to get the 4th Sunday before Christmas
  const adventStart = new Date(sundayBeforeChristmas);
  adventStart.setDate(sundayBeforeChristmas.getDate() - 21);
  
  return adventStart;
}

/**
 * Check if a date falls within the Lent season
 */
export function isLentSeason(date: Date): boolean {
  const year = date.getFullYear();
  const ashWednesday = calculateAshWednesday(year);
  const maundyThursday = calculateMaundyThursday(year);
  
  return date >= ashWednesday && date <= maundyThursday;
}

/**
 * Check if a date falls within the Advent season
 */
export function isAdventSeason(date: Date): boolean {
  const year = date.getFullYear();
  const adventStart = calculateAdventStart(year);
  const christmas = new Date(year, 11, 25);
  
  return date >= adventStart && date < christmas;
}

/**
 * Determine if today is a special liturgical occasion
 * Returns the special occasion or null if it's a regular day
 */
export function getSpecialOccasion(date: Date = new Date()): SpecialOccasion | null {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  
  // Christmas - December 25
  if (month === 11 && day === 25) {
    return 'christmas';
  }
  
  // Epiphany - January 6
  if (month === 0 && day === 6) {
    return 'epiphany';
  }
  
  // Easter
  const easter = calculateEaster(year);
  if (date.toDateString() === easter.toDateString()) {
    return 'easter';
  }
  
  // Good Friday
  const goodFriday = calculateGoodFriday(year);
  if (date.toDateString() === goodFriday.toDateString()) {
    return 'good-friday';
  }
  
  // Pentecost
  const pentecost = calculatePentecost(year);
  if (date.toDateString() === pentecost.toDateString()) {
    return 'pentecost';
  }
  
  // Advent - First Sunday of Advent
  const adventStart = calculateAdventStart(year);
  if (date.toDateString() === adventStart.toDateString()) {
    return 'advent';
  }
  
  return null;
}

/**
 * Get the day of the month (1-31)
 */
export function getDayOfMonth(date: Date = new Date()): number {
  return date.getDate();
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
 * Format a date for display in liturgy selector
 */
export function formatLiturgicalDate(specialOccasion: SpecialOccasion, year: number): string {
  const occasions: Record<SpecialOccasion, (year: number) => Date> = {
    'advent': calculateAdventStart,
    'christmas': (y) => new Date(y, 11, 25),
    'epiphany': (y) => new Date(y, 0, 6),
    'good-friday': calculateGoodFriday,
    'easter': calculateEaster,
    'pentecost': calculatePentecost,
  };
  
  const date = occasions[specialOccasion](year);
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

/**
 * Get a user-friendly name for a special occasion
 */
export function getSpecialOccasionName(occasion: SpecialOccasion): string {
  const names: Record<SpecialOccasion, string> = {
    'advent': 'Beginning of Advent',
    'christmas': 'Christmas',
    'epiphany': 'Epiphany',
    'good-friday': 'Good Friday',
    'easter': 'Easter',
    'pentecost': 'Pentecost',
  };
  
  return names[occasion];
}
