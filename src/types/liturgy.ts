/**
 * Daily Liturgy Types
 * Types and interfaces for the liturgy component
 */

export type LiturgyPartType =
  | 'call-to-worship'
  | 'votum'
  | 'confession'
  | 'assurance'
  | 'psalm'
  | 'illumination'
  | 'reading'
  | 'intercession'
  | 'lords-prayer'
  | 'doxology';

export type SpecialOccasion =
  | 'advent'
  | 'christmas'
  | 'epiphany'
  | 'good-friday'
  | 'easter'
  | 'pentecost';

export interface TranslatedContent {
  esv: string;
  kjv: string;
}

export interface LiturgyPart {
  type: LiturgyPartType;
  title: string;
  content: string | TranslatedContent;
  scriptureReference?: string;
}

export interface Liturgy {
  id: string;
  type: 'daily' | 'special';
  dayOfMonth?: number; // 1-31 for daily liturgies
  specialOccasion?: SpecialOccasion;
  name: string;
  description?: string;
  parts: LiturgyPart[];
}

export interface DoxologyMedia {
  sheetMusicUrl: string;
  pianoAccompanimentUrl: string;
}
