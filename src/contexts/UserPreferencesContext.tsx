import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserPreferences } from '../types/user';
import { useAuth } from './AuthContext';
import { updateUserPreferences } from '../services/userService';

const defaultPreferences: UserPreferences = {
  bibleTranslation: 'ESV',
  readingPlan: 'narrative',
  fontSize: 'medium',
  darkMode: false,
  manualPaceMode: false,
  emailReminders: 'daily',
  pushNotifications: 'daily',
  pushNotificationsEnabled: true,
};

interface UserPreferencesContextType {
  preferences: UserPreferences;
  updatePreferences: (updates: Partial<UserPreferences>) => Promise<void>;
  loading: boolean;
  selectedWeek: number;
  selectedDay: number;
  setSelectedWeek: (week: number) => void;
  setSelectedDay: (day: number) => void;
}

const UserPreferencesContext = createContext<UserPreferencesContextType | undefined>(undefined);

export const useUserPreferences = () => {
  const context = useContext(UserPreferencesContext);
  if (!context) {
    throw new Error('useUserPreferences must be used within a UserPreferencesProvider');
  }
  return context;
};

interface UserPreferencesProviderProps {
  children: ReactNode;
}

// Helper function to calculate current week and day
const calculateCurrentWeekAndDay = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  
  // Calculate current week
  const firstMonday = new Date(today.getFullYear(), 0, 1);
  const daysOffset = (firstMonday.getDay() === 0 ? 6 : firstMonday.getDay() - 1);
  firstMonday.setDate(firstMonday.getDate() - daysOffset);
  const diffTime = today.getTime() - firstMonday.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const currentWeek = Math.min(52, Math.max(1, Math.floor(diffDays / 7) + 1));
  
  // Set day (Mon=1, Tue=2, Wed=3, Thu=4, Fri=5, Weekend defaults to 1)
  let currentDay = dayOfWeek;
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    currentDay = 1; // Weekend defaults to Monday
  } else if (dayOfWeek > 5) {
    currentDay = 5;
  }
  
  return { week: currentWeek, day: currentDay };
};

export const UserPreferencesProvider = ({ children }: UserPreferencesProviderProps) => {
  const { currentUser } = useAuth();
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);
  const [loading, setLoading] = useState(false);
  
  // Global week/day selection - starts with current week/day
  const todayCalculation = calculateCurrentWeekAndDay();
  const [selectedWeek, setSelectedWeek] = useState(todayCalculation.week);
  const [selectedDay, setSelectedDay] = useState(todayCalculation.day);

  // Load preferences from current user and set initial week/day
  useEffect(() => {
    if (currentUser?.preferences) {
      setPreferences(currentUser.preferences);
    } else {
      setPreferences(defaultPreferences);
    }
    
    // Helper to find first incomplete reading
    const findFirstIncomplete = (): { week: number; day: number } => {
      const completedReadings = currentUser?.progress?.completedReadings || {};
      
      for (let week = 1; week <= 52; week++) {
        for (let day = 1; day <= 5; day++) {
          const key = `${week}-${day}`;
          if (!completedReadings[key]?.completed) {
            return { week, day };
          }
        }
      }
      // All complete - STOP at week 52, day 5 until user clicks "Start Over"
      // Completion modal will be shown by Dashboard
      return { week: 52, day: 5 };
    };
    
    // Set initial week/day based on pace mode
    const isManualMode = currentUser?.preferences?.manualPaceMode || false;
    
    if (isManualMode) {
      // Manual mode: Use saved progress position
      if (currentUser?.progress) {
        setSelectedWeek(currentUser.progress.currentWeek || 1);
        setSelectedDay(currentUser.progress.currentDay || 1);
      } else {
        // No progress saved, start at week 1 day 1
        setSelectedWeek(1);
        setSelectedDay(1);
      }
    } else if (currentUser) {
      // Logged-in users in automatic mode: Default to first incomplete reading
      const firstIncomplete = findFirstIncomplete();
      setSelectedWeek(firstIncomplete.week);
      setSelectedDay(firstIncomplete.day);
    } else {
      // Not logged in: Default to current calendar day
      setSelectedWeek(todayCalculation.week);
      setSelectedDay(todayCalculation.day);
    }
  }, [currentUser]);

  // Update preferences in Firestore
  const updatePreferences = async (updates: Partial<UserPreferences>) => {
    const updatedPreferences = { ...preferences, ...updates };
    
    // Always update local state immediately
    setPreferences(updatedPreferences);
    
    // If user is authenticated, also save to Firestore
    if (!currentUser) {
      return;
    }

    try {
      setLoading(true);
      
      // Update in Firestore
      await updateUserPreferences(currentUser.uid, updatedPreferences);
    } catch (error) {
      console.error('Error updating preferences:', error);
      // Revert local state on error
      setPreferences(preferences);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value: UserPreferencesContextType = {
    preferences,
    updatePreferences,
    loading,
    selectedWeek,
    selectedDay,
    setSelectedWeek,
    setSelectedDay,
  };

  return (
    <UserPreferencesContext.Provider value={value}>
      {children}
    </UserPreferencesContext.Provider>
  );
};
