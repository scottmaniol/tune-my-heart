import { Translation, PlanType } from './curriculum';

export type EmailReminderFrequency = 'daily' | 'weekly' | 'when-behind' | 'never';
export type PushNotificationFrequency = 'daily' | 'weekly' | 'when-behind' | 'never';

export interface UserPreferences {
  bibleTranslation: Translation;
  readingPlan: PlanType;
  fontSize: 'small' | 'medium' | 'large';
  darkMode: boolean;
  manualPaceMode?: boolean; // When true, user manually advances instead of following calendar-based schedule
  emailReminders?: EmailReminderFrequency; // Email reminder frequency for reading schedule
  pushNotifications?: PushNotificationFrequency; // Push notification frequency for reading schedule
  pushNotificationsEnabled?: boolean; // Master toggle for push notifications
}

export interface CompletionCycle {
  cycleNumber: number;
  completedAt: Date;
  certificateDownloaded?: boolean;
}

export interface NewYearSnapshot {
  year: number;              // e.g., 2025
  week: number;              // Where they were (e.g., Week 23)
  day: number;               // Day they were on (e.g., Day 3)
  startDate?: string;        // Their start date at time of snapshot
  completedReadings?: { [key: string]: any }; // Their progress
  snapshotDate: string;      // When snapshot was taken (ISO string)
}

export interface UserProgress {
  currentWeek: number;
  currentDay: number;
  lastAccessDate: string;
  startDate?: string; // Custom start date (ISO string), defaults to first Monday of year
  completedReadings?: { [key: string]: any }; // Store completed readings as a map
  hasCompletedAllWeeks?: boolean; // True when all 260 readings (52 weeks × 5 days) are done
  completionCycles?: CompletionCycle[]; // Track each time user completes the full plan
  showCompletionModal?: boolean; // True until user clicks "Start Over"
  hasSeenStartDateTip?: boolean; // True after user dismisses the start date tip
  newYearSnapshot?: NewYearSnapshot; // Snapshot taken on Dec 31 for recovery
  hasSeenNewYearTransition?: boolean; // True after user dismisses new year transition modal
}

export type UserRole = 'user' | 'admin';
export type AccountType = 'individual' | 'family';
export type SubscriptionStatus = 'free' | 'trial' | 'active' | 'past_due' | 'cancelled';
export type SubscriptionPlan = 'free' | 'individual' | 'family';

export interface Subscription {
  status: SubscriptionStatus;
  plan: SubscriptionPlan;
  trialEndsAt?: Date;
  currentPeriodEnd?: Date;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
}

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string | null;
  role: UserRole;
  accountType: AccountType;
  subscription: Subscription;
  familyId?: string;
  isHeadOfHousehold: boolean;
  createdBy?: string; // uid of parent for family member accounts
  preferences: UserPreferences;
  progress: UserProgress;
  fcmToken?: string; // Firebase Cloud Messaging token for push notifications
  fcmTokenUpdatedAt?: Date; // When the FCM token was last updated
  pushNotificationPrompted?: boolean; // True if user has been prompted for push notifications
  createdAt: Date;
  updatedAt: Date;
  welcomeEmailSent?: boolean; // True if welcome email was successfully sent
  welcomeEmailSentAt?: Date; // Timestamp when welcome email was sent
}

export interface FamilyMember {
  uid: string;
  displayName: string;
  email: string;
  familyId: string;
  createdBy: string;
  createdAt: Date;
}

export interface Family {
  id: string;
  headOfHousehold: string;
  members: string[]; // Array of member uids
  memberCount: number;
  maxMembers: number; // Default 6
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Helper Functions
 */

/**
 * Check if a user has an active premium subscription (not free)
 */
export const hasPremiumAccess = (user: User | null): boolean => {
  if (!user) return false;
  
  // Free users don't have premium access
  if (user.subscription.status === 'free') {
    return false;
  }
  
  // Active subscribers have access
  if (user.subscription.status === 'active') {
    return true;
  }
  
  // Trial users have access if trial hasn't expired
  if (user.subscription.status === 'trial') {
    if (!user.subscription.trialEndsAt) return false;
    return new Date() < new Date(user.subscription.trialEndsAt);
  }
  
  // Past due and cancelled users lose access
  return false;
};

/**
 * Check if a user's trial has expired
 */
export const isTrialExpired = (user: User): boolean => {
  if (user.subscription.status !== 'trial') {
    return false;
  }
  
  if (!user.subscription.trialEndsAt) {
    return true;
  }

  return new Date() > new Date(user.subscription.trialEndsAt);
};

/**
 * Get days remaining in trial
 */
export const getTrialDaysRemaining = (user: User): number => {
  if (user.subscription.status !== 'trial' || !user.subscription.trialEndsAt) {
    return 0;
  }
  
  const now = new Date();
  const trialEnd = new Date(user.subscription.trialEndsAt);
  const diffTime = trialEnd.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return Math.max(0, diffDays);
};
