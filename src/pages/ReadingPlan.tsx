import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check, Calendar, BookOpen, Printer } from 'lucide-react';
import { useCurrentWeek } from '../hooks/useCurrentWeek';
import { useUserPreferences } from '../contexts/UserPreferencesContext';
import { useProgress } from '../hooks/useProgress';
import { useAuth } from '../contexts/AuthContext';
import { hasPremiumAccess } from '../types/user';
import BibleText from '../components/reading/BibleText';
import PlanToggle from '../components/reading/PlanToggle';
import ScheduleModal from '../components/reading/ScheduleModal';
import PremiumContentOverlay from '../components/auth/PremiumContentOverlay';
import { getDayName, formatDate } from '../utils/dateHelpers';
import { getReading } from '../data/readingSchedule';
import { getWholeBibleReading } from '../data/wholeBibleSchedule';
import { getCurriculumDay } from '../services/curriculumService';
import { saveJournalEntry, getJournalEntry } from '../services/journalService';
import { Translation, DailyReading } from '../types/curriculum';

const ReadingPlan = () => {
  const { week, day, isWeekend, startDate } = useCurrentWeek();
  const { preferences, updatePreferences, selectedWeek, selectedDay, setSelectedWeek, setSelectedDay } = useUserPreferences();
  const { progress, isComplete, markComplete, markIncomplete } = useProgress();
  const { currentUser } = useAuth();
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [firestoreReading, setFirestoreReading] = useState<DailyReading | null>(null);
  const [loadingFirestore, setLoadingFirestore] = useState(false);
  const [journalText, setJournalText] = useState('');
  const [savingJournal, setSavingJournal] = useState(false);
  const [journalSaved, setJournalSaved] = useState(false);

  // Fetch curriculum from Firestore when week/day changes
  useEffect(() => {
    const fetchCurriculum = async () => {
      if (preferences?.readingPlan === 'narrative') {
        setLoadingFirestore(true);
        try {
          const data = await getCurriculumDay(selectedWeek, selectedDay);
          setFirestoreReading(data);
        } catch (error) {
          console.error('Error fetching curriculum:', error);
          setFirestoreReading(null);
        } finally {
          setLoadingFirestore(false);
        }
      }
    };

    fetchCurriculum();
  }, [selectedWeek, selectedDay, preferences?.readingPlan]);

  // Load existing journal entry when week/day changes
  useEffect(() => {
    const loadJournalEntry = async () => {
      if (currentUser && preferences?.readingPlan) {
        try {
          const entry = await getJournalEntry(
            currentUser.uid,
            selectedWeek,
            selectedDay,
            preferences.readingPlan
          );
          if (entry) {
            setJournalText(entry.freeformNotes || '');
            setJournalSaved(true);
          } else {
            setJournalText('');
            setJournalSaved(false);
          }
        } catch (error) {
          console.error('Error loading journal entry:', error);
        }
      }
    };

    loadJournalEntry();
  }, [currentUser, selectedWeek, selectedDay, preferences?.readingPlan]);

  // Save journal entry
  const handleSaveJournal = async () => {
    if (!currentUser || !preferences?.readingPlan) return;

    try {
      setSavingJournal(true);
      await saveJournalEntry({
        userId: currentUser.uid,
        weekNumber: selectedWeek,
        dayNumber: selectedDay,
        planType: preferences.readingPlan,
        questionAnswers: [], // Not implementing question-by-question answers yet
        freeformNotes: journalText,
      });
      setJournalSaved(true);
      setTimeout(() => setJournalSaved(false), 3000); // Reset after 3 seconds
    } catch (error) {
      console.error('Error saving journal entry:', error);
      alert('Failed to save journal entry. Please try again.');
    } finally {
      setSavingJournal(false);
    }
  };

  // Get actual reading from schedule based on user's plan preference
  // Use Firestore data if available, otherwise fall back to local data
  let reading;
  if (preferences?.readingPlan === 'wholeBible') {
    reading = getWholeBibleReading(selectedWeek, selectedDay);
  } else {
    // Try Firestore first, fall back to local data
    reading = firestoreReading || getReading(selectedWeek, selectedDay);
  }

  const reference = reading?.reference || `Reading ${selectedWeek}-${selectedDay}`;
  const title = reading?.title || '';
  const completed = isComplete(selectedWeek, selectedDay);
  const isPremium = hasPremiumAccess(currentUser);

  const handleToggleComplete = async () => {
    if (completed) {
      await markIncomplete(selectedWeek, selectedDay);
    } else {
      await markComplete(
        selectedWeek,
        selectedDay,
        reference,
        preferences?.bibleTranslation || 'ESV'
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Weekend Notice */}
      {isWeekend && (
        <div className="card bg-blue-50 border-blue-200">
          <h3 className="text-lg font-heading text-primary mb-2">
            Weekend - Catch-Up & Review
          </h3>
          <p className="text-text font-body text-sm">
            Take this time to review this week's readings or catch up on missed days.
          </p>
        </div>
      )}

      {/* Behind Schedule Notice - Moved to top for visibility */}
      {currentUser && !preferences?.manualPaceMode && (() => {
        // Calculate how many days behind
        const completedReadings = progress?.completedReadings || {};
        let totalExpected = (week - 1) * 5 + day; // Expected readings up to today
        totalExpected = Math.min(totalExpected, 260); // Cap at 260 (52 weeks * 5 days)
        
        const totalCompleted = Object.values(completedReadings).filter((r: any) => r && r.completed).length;
        const daysBehind = totalExpected - totalCompleted;
        
        // Only show if behind by more than just today (i.e., missed yesterday or earlier)
        if (daysBehind > 1) {
          return (
            <div className="card bg-orange-50 border-orange-300">
              <h3 className="text-lg font-heading text-orange-800 mb-2">
                ⏰ You're {daysBehind} reading{daysBehind > 1 ? 's' : ''} behind schedule
              </h3>
              <p className="text-orange-700 font-body text-sm">
                Don't worry! You can catch up at your own pace. Consider switching to Manual Pace Mode in Preferences if you'd like to progress without calendar pressure.
              </p>
            </div>
          );
        }
        return null;
      })()}

      {/* Header */}
      <div className="card">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-heading text-primary mb-2 flex items-center gap-3">
              <div className="bg-accent text-white rounded-lg p-2">
                <BookOpen className="w-6 h-6" />
              </div>
              Daily Reading Plan
            </h1>
            <p className="text-text-light font-body">
              Week {selectedWeek} • {getDayName(selectedDay)}
            </p>
          </div>
          <a 
            href="https://drive.google.com/file/d/18aDbGfpyS77Akit2SwcA86-OB0d_QAZL/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-primary transition-colors p-1"
            title="Print Reading Plan"
          >
            <Printer className="w-5 h-5" />
          </a>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <PlanToggle />
            <div className="flex items-center flex-wrap gap-3">
              <button
                onClick={() => setShowScheduleModal(true)}
                className="btn-secondary text-sm flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                View Full Schedule
              </button>
              <label className={`flex items-center space-x-3 ${currentUser ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}>
                <input
                  type="checkbox"
                  checked={completed}
                  onChange={handleToggleComplete}
                  disabled={!currentUser}
                  className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                />
                <span className="font-body text-text">
                  {completed ? (
                    <><Check className="w-4 h-4 inline-block mr-1" />Reading Complete</>
                  ) : (
                    'Mark as Complete'
                  )}
                  {!currentUser && ' (Login Required)'}
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scripture Text with Title */}
      <BibleText
        reference={reference}
        translation={preferences?.bibleTranslation || 'ESV'}
        title={title}
      />

      {/* Premium Content Section - Only for Narrative Plan */}
      {preferences?.readingPlan === 'narrative' && (
        <>
          <PremiumContentOverlay>
            <div className="space-y-6">
              {/* Summary */}
              <div className="card">
                <h3 className="text-xl font-heading text-primary mb-4">Summary</h3>
                <div className={!isPremium ? "blur-sm" : ""}>
                  {reading?.summary ? (
                    <p className="text-text font-body leading-relaxed">
                      {reading.summary}
                    </p>
                  ) : (
                    <p className="text-text-light font-body italic">
                      [Summary content will be added from curriculum materials]
                    </p>
                  )}
                </div>
              </div>

              {/* Study Notes */}
              <div className="card">
                <h3 className="text-xl font-heading text-primary mb-4">Study Notes</h3>
                <div className={!isPremium ? "blur-sm" : ""}>
                  {reading?.studyNotes ? (
                    <div className="space-y-3">
                      {reading.studyNotes.split(/\.\s+(?=(?:Chapter \d+, )?Verses? \d+)/).map((note, index) => {
                        const trimmed = note.trim();
                        if (!trimmed) return null;
                        
                        // Add back the period that was removed by split
                        const noteWithPeriod = trimmed.endsWith('.') ? trimmed : trimmed + '.';
                        
                        // Match everything up to and including the second period (reference and keyword)
                        // Format: "Revelation 22, Verse 7. Quickly." followed by explanation
                        const match = noteWithPeriod.match(/^(.*?\..*?\.)\s*(.*)$/s);
                        
                        if (match && match[2]) {
                          const referenceAndKeyword = match[1]; // e.g., "Revelation 22, Verse 7. Quickly."
                          const explanation = match[2]; // Everything after the second period
                          
                          return (
                            <p key={index} className="text-text font-body leading-relaxed">
                              <em>{referenceAndKeyword}</em> {explanation}
                            </p>
                          );
                        }
                        
                        // Fallback for notes that don't match the pattern
                        return (
                          <p key={index} className="text-text font-body leading-relaxed">
                            {noteWithPeriod}
                          </p>
                        );
                      }).filter(Boolean)}
                    </div>
                  ) : (
                    <p className="text-text-light font-body italic">
                      [Study notes will be added from curriculum materials]
                    </p>
                  )}
                </div>
              </div>

              {/* Devotional */}
              <div className="card">
                <h3 className="text-xl font-heading text-primary mb-4">Daily Devotional</h3>
                <div className={!isPremium ? "blur-sm" : ""}>
                  {reading?.devotional ? (
                    <div className="space-y-2">
                      <p className="text-text font-body leading-relaxed whitespace-pre-line">
                        {reading.devotional}
                      </p>
                      <p className="text-text-light font-body italic text-sm">
                        *by Charles Huckaby
                      </p>
                    </div>
                  ) : (
                    <p className="text-text-light font-body italic">
                      [Devotional by Charles Huckaby will be added from curriculum materials]
                    </p>
                  )}
                </div>
              </div>
            </div>
          </PremiumContentOverlay>

          {/* Reflection Questions - Outside overlay, available to all logged-in users */}
          <div className="card">
            <h3 className="text-xl font-heading text-primary mb-4">Reflection Questions</h3>
            {currentUser ? (
              <div>
                {reading?.reflectionQuestions && reading.reflectionQuestions.length > 0 ? (
                  <>
                    <ol className="list-decimal list-outside ml-5 space-y-4 mb-6">
                      {reading.reflectionQuestions.map((question, index) => (
                        <li key={index} className="text-text font-body leading-relaxed pl-2">
                          {question}
                        </li>
                      ))}
                    </ol>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-body text-text mb-2">
                          Your Response
                        </label>
                        <textarea
                          className="input-field min-h-[120px]"
                          placeholder="Write your reflections here..."
                          value={journalText}
                          onChange={(e) => setJournalText(e.target.value)}
                        />
                      </div>
                      <div className="flex items-center gap-3">
                        <button 
                          className="btn-primary"
                          onClick={handleSaveJournal}
                          disabled={savingJournal || !journalText.trim()}
                        >
                          {savingJournal ? 'Saving...' : journalSaved ? '✓ Saved!' : 'Save Journal Entry'}
                        </button>
                        {journalSaved && !savingJournal && (
                          <span className="text-green-600 text-sm font-medium">
                            Entry saved successfully!
                          </span>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="text-text-light font-body italic">
                    [Reflection questions will be added from curriculum materials]
                  </p>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-text-light font-body mb-4">
                  Sign in to access reflection questions and save your journal entries.
                </p>
                <Link to="/login" className="btn-primary inline-block">
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </>
      )}

      {/* Schedule Modal */}
      <ScheduleModal
        key={`modal-${showScheduleModal ? 'open' : 'closed'}-${completed}`}
        isOpen={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
        onSelectDay={(week, day) => {
          setSelectedWeek(week);
          setSelectedDay(day);
        }}
      />
    </div>
  );
};

export default ReadingPlan;
