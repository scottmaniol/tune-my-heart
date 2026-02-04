export type Translation = 'ESV' | 'KJV' | 'NKJV' | 'NASB' | 'LSB';
export type PlanType = 'narrative' | 'wholeBible';
export type DayOfWeek = 1 | 2 | 3 | 4 | 5;

export interface DailyReading {
  week: number;
  day: number;
  reference: string;
  title: string;
  summary?: string;
  studyNotes?: string;
  devotional?: string;
  reflectionQuestions?: string[];
}

export interface ReadingPlan {
  references: string[]; // 5 entries for 5 days
  studyNotes: string[];
  reflectionQuestions: string[];
}

export interface Devotional {
  day: number;
  title: string;
  author: string;
  content: string;
}

export interface ProofText {
  reference: string;
  text: string;
}

export interface Catechism {
  questionNumber: number;
  question: string;
  answer: string;
  proofTexts: ProofText[];
  videoUrl: string;
  audioUrl: string;
}

export interface Hymn {
  title: string;
  author: string;
  lyrics: string;
  sheetMusicUrl: string;
  audioUrl: string;
  history: string;
}

export interface MemoryVerse {
  reference: string;
  text: string;
}

export interface ChildrensBibleDay {
  day: number;
  title: string;
  story: string;
  imageUrl: string;
  discussionQuestions: string[];
}

export interface CurriculumWeek {
  weekId: string;
  weekNumber: number;
  theme: string;
  narrativePlan: ReadingPlan;
  wholeBiblePlan: ReadingPlan;
  devotionals: Devotional[];
  catechism: Catechism;
  hymn: Hymn;
  memoryVerse: MemoryVerse;
  childrensBible: ChildrensBibleDay[];
}

export interface ScriptureText {
  reference: string;
  translation: Translation;
  text: string;
  passages: string[];
}
