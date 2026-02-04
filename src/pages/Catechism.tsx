import { useState, useMemo } from 'react';
import { PartyPopper, Info, BookOpen, X, Volume2, Eye, EyeOff, ChevronRight, ChevronDown, BookMarked, Calendar, CalendarClock, HelpCircle, Printer } from 'lucide-react';
import { useUserPreferences } from '../contexts/UserPreferencesContext';
import { getCatechismQuestion, getAllCatechismQuestions } from '../data/catechismData';
import { getTodaysReviewVerses, getReviewSystemExplanation } from '../services/memoryScheduleService';

const Catechism = () => {
  const { selectedWeek, selectedDay, setSelectedWeek, preferences } = useUserPreferences();
  const [showAllQuestions, setShowAllQuestions] = useState(false);
  const [showSystemInfo, setShowSystemInfo] = useState(false);
  const [showAnswers, setShowAnswers] = useState<{ [week: number]: boolean }>({});
  const [showProofTexts, setShowProofTexts] = useState<{ [week: number]: boolean }>({});

  const question = getCatechismQuestion(selectedWeek);

  // Create a mock date based on selectedDay
  const mockDate = useMemo(() => {
    const today = new Date();
    const currentDayOfWeek = today.getDay();
    const targetDayOfWeek = selectedDay;
    const dayDifference = targetDayOfWeek - currentDayOfWeek;
    
    const adjustedDate = new Date(today);
    adjustedDate.setDate(today.getDate() + dayDifference);
    return adjustedDate;
  }, [selectedDay]);

  // Get review questions based on selected week and day
  const reviewVerses = getTodaysReviewVerses(selectedWeek, mockDate);
  const isWeekend = reviewVerses.length === 0;

  // Helper function to create Bible Gateway link
  const getBibleGatewayLink = (reference: string) => {
    const encodedReference = encodeURIComponent(reference);
    return `https://www.biblegateway.com/passage/?search=${encodedReference}&version=${preferences.bibleTranslation}`;
  };

  // Toggle answer visibility for a specific week
  const toggleAnswer = (weekNum: number) => {
    setShowAnswers(prev => ({ ...prev, [weekNum]: !prev[weekNum] }));
  };

  // Toggle proof texts visibility for a specific week
  const toggleProofTexts = (weekNum: number) => {
    setShowProofTexts(prev => ({ ...prev, [weekNum]: !prev[weekNum] }));
  };

  const changeWeek = (newWeek: number) => {
    setSelectedWeek(newWeek);
    setShowAnswers({});
    setShowProofTexts({});
  };

  if (!question) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-heading text-primary mb-2">
            52 Week Catechism
          </h1>
          <p className="text-text-light font-body">
            Questions and Answers for Family Worship
          </p>
        </div>
        <div className="card">
          <p className="text-text-light font-body italic">
            Question not found for week {selectedWeek}
          </p>
        </div>
      </div>
    );
  }

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
              The catechism review system takes a break on weekends. Enjoy your rest and come back Monday!
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="card">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-heading text-primary mb-2 flex items-center gap-3">
                <div className="bg-accent text-white rounded-lg p-2">
                  <HelpCircle className="w-6 h-6" />
                </div>
                52 Week Catechism
              </h1>
              <p className="text-text-light font-body">
                Week {selectedWeek} of 52
              </p>
            </div>
            <a 
              href="https://g3min.org/library-resources/52-week-tune-my-heart-catechism/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-primary transition-colors p-1 md:hidden"
              title="View Catechism Resource"
            >
              <Printer className="w-5 h-5" />
            </a>
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
              onClick={() => setShowAllQuestions(!showAllQuestions)}
              className="btn-secondary text-sm"
            >
              {showAllQuestions ? 'Hide List' : 'All Questions'}
            </button>
            <a 
              href="https://g3min.org/library-resources/52-week-tune-my-heart-catechism/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-primary transition-colors p-1 hidden md:block"
              title="View Catechism Resource"
            >
              <Printer className="w-5 h-5" />
            </a>
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

      {/* All Questions List */}
      {showAllQuestions && (
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-heading text-primary">All 52 Questions</h2>
            <button
              onClick={() => setShowAllQuestions(false)}
              className="text-text-light hover:text-text"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {getAllCatechismQuestions().map((q) => (
              <button
                key={q.week}
                onClick={() => {
                  changeWeek(q.week);
                  setShowAllQuestions(false);
                }}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  selectedWeek === q.week
                    ? 'bg-primary text-white'
                    : 'bg-background-dark hover:bg-gray-200'
                }`}
              >
                <span className="font-body font-semibold">Week {q.week}:</span>{' '}
                <span className="font-body">{q.question}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Today's Review Questions */}
      {!isWeekend && reviewVerses.length > 0 && (
        <div className="space-y-6">
          {reviewVerses.map((reviewVerse) => {
            const questionData = getCatechismQuestion(reviewVerse.week);
            if (!questionData) return null;

            const isAnswerShown = showAnswers[reviewVerse.week] || false;
            const areProofTextsShown = showProofTexts[reviewVerse.week] || false;

            return (
              <div key={`${reviewVerse.category}-${reviewVerse.week}`} className="card bg-gradient-to-br from-white to-blue-50 border-2 border-blue-200 shadow-lg">
                <div className="space-y-6">
                  {/* Category Label & Week Badge */}
                  <div className="flex items-center justify-between pb-4 border-b-2 border-blue-100">
                    <h3 className="text-xl font-heading text-primary flex items-center gap-3">
                      <div className="bg-primary text-white rounded-lg p-2">
                        {reviewVerse.category === 'daily' && <BookMarked className="w-5 h-5" />}
                        {(reviewVerse.category === 'odd' || reviewVerse.category === 'even') && <BookOpen className="w-5 h-5" />}
                        {reviewVerse.category === 'weekday' && <Calendar className="w-5 h-5" />}
                        {reviewVerse.category === 'monthly' && <CalendarClock className="w-5 h-5" />}
                      </div>
                      {reviewVerse.label}
                    </h3>
                    <span className="px-4 py-2 bg-accent text-white rounded-full text-sm font-heading font-bold">
                      Week {reviewVerse.week}
                    </span>
                  </div>

                  {/* Question */}
                  <div className="bg-white rounded-xl p-6 border-2 border-primary shadow-sm">
                    <p className="text-xs font-body text-primary font-semibold mb-3 uppercase tracking-wider">
                      Question {reviewVerse.week}
                    </p>
                    <p className="text-3xl font-heading text-text leading-relaxed">
                      {questionData.question}
                    </p>
                  </div>

                  {/* Audio Buttons - Improved Grid Layout */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* For week 1, show both Q1a and Q1b buttons */}
                    {reviewVerse.week === 1 && (
                      <>
                        <button
                          onClick={() => {
                            const audio = new Audio(`https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/catechism%2FQ1a.mp3?alt=media`);
                            audio.play();
                          }}
                        className="btn-secondary flex items-center gap-2"
                      >
                        <Volume2 className="w-4 h-4" />
                        Play Question 1a
                      </button>
                        <button
                          onClick={() => {
                            const audio = new Audio(`https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/catechism%2FQ1b.mp3?alt=media`);
                            audio.play();
                          }}
                          className="btn-secondary flex items-center gap-2"
                        >
                          <Volume2 className="w-4 h-4" />
                          Play Question 1b
                        </button>
                      </>
                    )}
                    {/* For all other weeks, use Q#.mp3 */}
                    {reviewVerse.week > 1 && (
                      <button
                        onClick={() => {
                          const fileName = `Q${reviewVerse.week}.mp3`;
                          const audio = new Audio(`https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/catechism%2F${encodeURIComponent(fileName)}?alt=media`);
                          audio.play();
                        }}
                        className="btn-secondary flex items-center gap-2"
                      >
                        <Volume2 className="w-4 h-4" />
                        Play Question
                      </button>
                    )}
                    {/* QA button for all weeks */}
                    <button
                      onClick={() => {
                        const fileName = `QA${reviewVerse.week}.mp3`;
                        const audio = new Audio(`https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/catechism%2F${encodeURIComponent(fileName)}?alt=media`);
                        audio.play();
                      }}
                      className="btn-secondary flex items-center gap-2"
                    >
                      <Volume2 className="w-4 h-4" />
                      Play Question + Answer
                    </button>
                  </div>

                  {/* Hide/Reveal Answer Button */}
                  <div>
                    <button
                      onClick={() => toggleAnswer(reviewVerse.week)}
                      className="btn-primary flex items-center gap-2"
                    >
                      {isAnswerShown ? (
                        <>
                          <EyeOff className="w-4 h-4" />
                          Hide Answer
                        </>
                      ) : (
                        <>
                          <Eye className="w-4 h-4" />
                          Reveal Answer
                        </>
                      )}
                    </button>
                  </div>

                  {/* Answer */}
                  {isAnswerShown && (
                    <div className="bg-background-dark rounded-lg p-6 border-2 border-primary">
                      <h3 className="text-sm font-body text-text-light mb-2">Answer:</h3>
                      <p className="text-xl font-heading text-text mb-4">
                        {questionData.answer}
                      </p>
                      
                      {questionData.answerChild && questionData.answerChild !== questionData.answer && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <p className="text-sm font-body text-text-light mb-2">
                            <em>For younger children to memorize:</em>
                          </p>
                          <p className="text-lg font-heading text-text italic">
                            {questionData.answerChild}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Proof Texts Toggle */}
                  <div>
                    <button
                      onClick={() => toggleProofTexts(reviewVerse.week)}
                      className="btn-secondary flex items-center gap-2"
                    >
                      {areProofTextsShown ? (
                        <>
                          <ChevronDown className="w-4 h-4" />
                          Hide Proof Texts
                        </>
                      ) : (
                        <>
                          <ChevronRight className="w-4 h-4" />
                          Show Proof Texts
                        </>
                      )}
                    </button>
                  </div>

                  {/* Proof Texts */}
                  {areProofTextsShown && (
                    <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
                      <h3 className="text-sm font-body text-text-light mb-4">
                        Scriptural Proof Texts ({preferences.bibleTranslation}):
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {questionData.proofTexts.map((proofText, index) => (
                          <a
                            key={index}
                            href={getBibleGatewayLink(proofText.reference)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors font-body font-semibold text-sm"
                          >
                            {proofText.reference}
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Info Card */}
      <div className="card bg-background-dark">
        <h3 className="text-lg font-heading text-primary mb-2">
          About This Catechism
        </h3>
        <p className="text-sm text-text-light font-body">
          The Tune My Heart Catechism has deep roots in the traditions of Christians who have gone before. 
          It is based on historic catechisms, including the Heidelberg catechism, the Westminster catechism, 
          Benjamin Keach's catechism, and Charles Spurgeon's catechism.
        </p>
      </div>
    </div>
  );
};

export default Catechism;
