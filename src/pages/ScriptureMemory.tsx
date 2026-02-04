import { useState, useMemo } from 'react';
import { PartyPopper, Info, BookOpen, X, Check, Copy, Eye, Target, RotateCcw, FileText, BookMarked, Calendar, CalendarClock, Lightbulb } from 'lucide-react';
import { useCurrentWeek } from '../hooks/useCurrentWeek';
import { useUserPreferences } from '../contexts/UserPreferencesContext';
import { getMemoryVerse, getAllMemoryVerses } from '../data/memoryVerses';
import { getTodaysReviewVerses, getReviewSystemExplanation } from '../services/memoryScheduleService';

const ScriptureMemory = () => {
  const { week } = useCurrentWeek();
  const { selectedWeek, selectedDay, setSelectedWeek, preferences } = useUserPreferences();
  const [practiceMode, setPracticeMode] = useState(false);
  const [difficultyLevel, setDifficultyLevel] = useState(1);
  const [showAllVerses, setShowAllVerses] = useState(false);
  const [copiedWeek, setCopiedWeek] = useState<number | null>(null);
  const [showSystemInfo, setShowSystemInfo] = useState(false);
  const [practiceModeWeek, setPracticeModeWeek] = useState<number | null>(null);
  const [practiceDifficulty, setPracticeDifficulty] = useState<{ [week: number]: number }>({});

  const verse = getMemoryVerse(selectedWeek, preferences.bibleTranslation);
  
  // Create a mock date based on selectedDay (1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri)
  // Use current date as base but override day of week
  const mockDate = useMemo(() => {
    const today = new Date();
    const currentDayOfWeek = today.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat
    const targetDayOfWeek = selectedDay; // 1=Mon, 2=Tue, ..., 5=Fri
    const dayDifference = targetDayOfWeek - currentDayOfWeek;
    
    const adjustedDate = new Date(today);
    adjustedDate.setDate(today.getDate() + dayDifference);
    return adjustedDate;
  }, [selectedDay]);
  
  // Get review verses based on selected week and day
  const reviewVerses = getTodaysReviewVerses(selectedWeek, mockDate);
  const isWeekend = reviewVerses.length === 0;

  // Get practice difficulty for a specific week
  const getDifficulty = (weekNum: number) => practiceDifficulty[weekNum] || 1;
  
  // Set practice difficulty for a specific week
  const setDifficulty = (weekNum: number, difficulty: number) => {
    setPracticeDifficulty(prev => ({ ...prev, [weekNum]: difficulty }));
  };

  // Generate practice text for any verse
  const generatePracticeText = (text: string, difficulty: number) => {
    const words = text.split(' ');
    
    let hiddenWords: string[] = [];
    
    switch (difficulty) {
      case 1: // Hide every 5th word
        hiddenWords = words.map((word, idx) => 
          (idx + 1) % 5 === 0 ? '_____' : word
        );
        break;
      case 2: // Hide every 3rd word
        hiddenWords = words.map((word, idx) => 
          (idx + 1) % 3 === 0 ? '_____' : word
        );
        break;
      case 3: // Hide every other word
        hiddenWords = words.map((word, idx) => 
          idx % 2 === 0 ? '_____' : word
        );
        break;
      case 4: // Show only first letter
        hiddenWords = words.map(word => {
          const firstChar = word.charAt(0);
          const punctuation = word.match(/[.,;:!?'"]/g);
          return firstChar + '_____' + (punctuation ? punctuation.join('') : '');
        });
        break;
      case 5: // Hide all words
        hiddenWords = words.map(() => '_____');
        break;
      default:
        hiddenWords = words;
    }
    
    return hiddenWords.join(' ');
  };

  // Generate practice text with hidden words based on difficulty
  const practiceText = useMemo(() => {
    if (!verse || !practiceMode) return null;
    return generatePracticeText(verse.text, difficultyLevel);
  }, [verse, practiceMode, difficultyLevel]);

  const copyToClipboard = async (text: string, weekNum: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedWeek(weekNum);
      setTimeout(() => setCopiedWeek(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const resetPractice = () => {
    setDifficultyLevel(1);
    setPracticeMode(false);
  };

  const changeWeek = (newWeek: number) => {
    setSelectedWeek(newWeek);
    resetPractice();
  };

  if (!verse) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-heading text-primary mb-2">
            Scripture Memory
          </h1>
          <p className="text-text-light font-body">
            Hide God's Word in Your Heart
          </p>
        </div>
        <div className="card">
          <p className="text-text-light font-body italic">
            Verse not found for week {selectedWeek}
          </p>
        </div>
      </div>
    );
  }

  // Main view
  return (
    <div className="space-y-6">
      {/* Weekend Notice */}
      {isWeekend && (
        <div className="card bg-purple-50 border-2 border-purple-300">
          <div className="text-center">
            <h3 className="text-lg font-heading text-purple-700 mb-2 flex items-center justify-center gap-2">
              <PartyPopper className="w-5 h-5" />
              Weekend Rest
            </h3>
            <p className="text-sm font-body text-text-light">
              The memory box system takes a break on weekends. Enjoy your rest and come back Monday!
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="card">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-heading text-primary mb-2 flex items-center gap-3">
              <div className="bg-accent text-white rounded-lg p-2">
                <Lightbulb className="w-6 h-6" />
              </div>
              Scripture Memory
            </h1>
            <p className="text-text-light font-body">
              Week {selectedWeek} of 52
            </p>
          </div>
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <button
              onClick={() => setShowSystemInfo(!showSystemInfo)}
              className="btn-primary text-sm flex items-center gap-2"
            >
              <Info className="w-4 h-4" />
              How It Works
            </button>
            <button
              onClick={() => setShowAllVerses(!showAllVerses)}
              className="btn-secondary text-sm"
            >
              {showAllVerses ? 'Hide List' : 'All Verses'}
            </button>
          </div>
        </div>
      </div>

      {/* System Info */}
      {showSystemInfo && (
        <div className="card bg-blue-50 border-2 border-blue-300">
          <div className="flex items-start justify-between mb-3">
            <h2 className="text-xl font-heading text-blue-700 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Review System Explained
            </h2>
            <button
              onClick={() => setShowSystemInfo(false)}
              className="text-blue-700 hover:text-blue-900"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="text-sm font-body text-text-light whitespace-pre-line">
            {getReviewSystemExplanation()}
          </div>
        </div>
      )}

      {/* All Verses List */}
      {showAllVerses && (
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-heading text-primary">All 52 Memory Verses</h2>
            <button
              onClick={() => setShowAllVerses(false)}
              className="text-text-light hover:text-text"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {getAllMemoryVerses(preferences.bibleTranslation).map((v) => (
              <div
                key={v.week}
                className={`p-3 rounded-lg transition-colors ${
                  selectedWeek === v.week
                    ? 'bg-primary text-white'
                    : 'bg-background-dark hover:bg-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => {
                      changeWeek(v.week);
                      setShowAllVerses(false);
                    }}
                    className="flex-1 text-left font-body font-semibold"
                  >
                    Week {v.week}: {v.reference}
                  </button>
                  <button
                    onClick={() => copyToClipboard(`${v.reference}\n\n${v.text}`, v.week)}
                    className={`ml-2 px-2 py-1 text-xs rounded flex items-center gap-1 ${
                      copiedWeek === v.week
                        ? 'bg-green-500 text-white'
                        : selectedWeek === v.week
                        ? 'bg-white text-primary hover:bg-gray-100'
                        : 'bg-gray-300 text-text hover:bg-gray-400'
                    }`}
                  >
                    {copiedWeek === v.week ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Today's Review Verses */}
      {!isWeekend && reviewVerses.length > 0 && (
        <div className="space-y-4">
          {reviewVerses.map((reviewVerse) => {
            const verseData = getMemoryVerse(reviewVerse.week, preferences.bibleTranslation);
            if (!verseData) return null;

            const isPracticing = practiceModeWeek === reviewVerse.week;
            const difficulty = getDifficulty(reviewVerse.week);

            return (
              <div key={`${reviewVerse.category}-${reviewVerse.week}`} className="card">
                <div className="space-y-4">
                  {/* Category Label */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-heading text-primary flex items-center gap-2">
                      {reviewVerse.category === 'daily' && <BookMarked className="w-5 h-5" />}
                      {(reviewVerse.category === 'odd' || reviewVerse.category === 'even') && <BookOpen className="w-5 h-5" />}
                      {reviewVerse.category === 'weekday' && <Calendar className="w-5 h-5" />}
                      {reviewVerse.category === 'monthly' && <CalendarClock className="w-5 h-5" />}
                      {reviewVerse.label}
                    </h3>
                    <span className="text-sm text-text-light font-body">
                      Week {reviewVerse.week}
                    </span>
                  </div>

                  {/* Reference */}
                  <div className="text-center">
                    <h4 className="text-xl font-heading text-primary mb-2 flex items-center justify-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      {verseData.reference}
                    </h4>
                    <button
                      onClick={() => copyToClipboard(`${verseData.reference}\n\n${verseData.text}`, reviewVerse.week)}
                      className="btn-secondary text-sm flex items-center gap-2 mx-auto"
                    >
                      {copiedWeek === reviewVerse.week ? (
                        <>
                          <Check className="w-4 h-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy Verse
                        </>
                      )}
                    </button>
                  </div>

                  {/* Verse Text */}
                  <div className="bg-background-dark rounded-lg p-6 border-2 border-primary min-h-[120px] flex items-center justify-center">
                    <div className="text-lg font-body text-text text-center leading-relaxed">
                      {isPracticing ? (
                        <span className="font-mono">{generatePracticeText(verseData.text, difficulty)}</span>
                      ) : (
                        <>
                          {verseData.text.split('\n\n').map((paragraph, index) => (
                            <p key={index} className="mb-2 last:mb-0">{paragraph}</p>
                          ))}
                        </>
                      )}
                    </div>
                  </div>

                  {/* Practice Controls */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-center space-x-4">
                      <button
                        onClick={() => {
                          if (!isPracticing) {
                            setPracticeModeWeek(reviewVerse.week);
                          } else {
                            setPracticeModeWeek(null);
                          }
                        }}
                        className={`${isPracticing ? 'btn-secondary' : 'btn-primary'} flex items-center gap-2`}
                      >
                        {isPracticing ? (
                          <>
                            <Eye className="w-4 h-4" />
                            Show Full Verse
                          </>
                        ) : (
                          <>
                            <Target className="w-4 h-4" />
                            Practice Mode
                          </>
                        )}
                      </button>
                      
                      {isPracticing && (
                        <button
                          onClick={() => {
                            setPracticeModeWeek(null);
                            setDifficulty(reviewVerse.week, 1);
                          }}
                          className="btn-secondary flex items-center gap-2"
                        >
                          <RotateCcw className="w-4 h-4" />
                          Reset
                        </button>
                      )}
                    </div>

                    {/* Difficulty Selector */}
                    {isPracticing && (
                      <div className="bg-gold-light rounded-lg p-4 border border-gold">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-sm font-body text-text font-semibold">
                            Difficulty Level: {difficulty} of 5
                          </h3>
                          <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5].map((level) => (
                              <div
                                key={level}
                                className={`w-8 h-2 rounded ${
                                  level <= difficulty ? 'bg-primary' : 'bg-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setDifficulty(reviewVerse.week, Math.max(1, difficulty - 1))}
                            disabled={difficulty === 1}
                            className="btn-secondary text-sm disabled:opacity-50"
                          >
                            ← Easier
                          </button>
                          
                          <div className="flex-1">
                            <input
                              type="range"
                              min="1"
                              max="5"
                              value={difficulty}
                              onChange={(e) => setDifficulty(reviewVerse.week, parseInt(e.target.value))}
                              className="w-full"
                            />
                          </div>
                          
                          <button
                            onClick={() => setDifficulty(reviewVerse.week, Math.min(5, difficulty + 1))}
                            disabled={difficulty === 5}
                            className="btn-secondary text-sm disabled:opacity-50"
                          >
                            Harder →
                          </button>
                        </div>
                        
                        <div className="mt-3 text-xs text-text-light font-body text-center flex items-center justify-center gap-2">
                          <FileText className="w-3 h-3" />
                          {difficulty === 1 && 'Every 5th word hidden'}
                          {difficulty === 2 && 'Every 3rd word hidden'}
                          {difficulty === 3 && 'Every other word hidden'}
                          {difficulty === 4 && 'Only first letters shown'}
                          {difficulty === 5 && 'All words hidden'}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Info Card */}
      <div className="card bg-background-dark">
        <h3 className="text-lg font-heading text-primary mb-2">
          About Scripture Memory
        </h3>
        <p className="text-sm text-text-light font-body mb-3">
          These 52 verses are carefully selected to guide you through key biblical truths over the course of a year.
          Memorizing Scripture helps us internalize God's Word and apply it in our daily lives.
        </p>
        <p className="text-sm text-text-light font-body italic">
          "I have stored up your word in my heart, that I might not sin against you." - Psalm 119:11
        </p>
      </div>
    </div>
  );
};

export default ScriptureMemory;
