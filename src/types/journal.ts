import { PlanType } from './curriculum';

export interface QuestionAnswer {
  question: string;
  answer: string;
}

export interface JournalEntry {
  entryId: string;
  userId: string;
  weekNumber: number;
  dayNumber: number;
  planType: PlanType;
  questionAnswers: QuestionAnswer[];
  freeformNotes: string;
  createdAt: Date;
  updatedAt: Date;
}
