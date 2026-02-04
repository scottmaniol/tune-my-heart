/**
 * Progress tracking types for Tune My Heart
 */

export interface ReadingProgress {
  userId: string;
  week: number;
  day: number;
  completed: boolean;
  completedAt?: Date;
  reference: string;
  translation: string;
}

export interface UserProgress {
  userId: string;
  startDate: Date;
  completedReadings: {
    [key: string]: ReadingProgress; // key format: "week-day" e.g., "1-1", "1-2"
  };
  lastAccessedWeek: number;
  lastAccessedDay: number;
  updatedAt: Date;
}

export interface ScheduleEntry {
  week: number;
  day: number;
  date: Date;
  reference: string;
  completed: boolean;
  completedAt?: Date;
}
