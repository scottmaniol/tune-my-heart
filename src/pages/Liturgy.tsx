import { useState, useMemo, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useUserPreferences } from '../contexts/UserPreferencesContext';
import { getDayOfMonth, getSpecialOccasion, getSpecialOccasionName } from '../utils/liturgyHelpers';
import { getLiturgyByDay, getLiturgyByOccasion, doxologyMedia } from '../data/liturgyData';
import { SpecialOccasion, TranslatedContent as TranslatedContentType } from '../types/liturgy';
import { getReading } from '../data/readingSchedule';
import { getWholeBibleReading } from '../data/wholeBibleSchedule';
import { getCurriculumDay } from '../services/curriculumService';
import { DailyReading } from '../types/curriculum';
import { BookOpen, Calendar, Info, X, Volume2, FileText, Heart, MessageCircle, Church, Play, Pause, Square } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PremiumContentOverlay from '../components/auth/PremiumContentOverlay';
import BibleGatewayLink from '../components/reading/BibleGatewayLink';
import ExpandableSection from '../components/reading/ExpandableSection';

const Liturgy = () => {
  const { currentUser } = useAuth();
  const { preferences, selectedWeek, selectedDay } = useUserPreferences();
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<'today' | 'daily' | 'special'>('today');
  const [selectedDayOfMonth, setSelectedDayOfMonth] = useState<number>(getDayOfMonth());
  const [selectedOccasion, setSelectedOccasion] = useState<SpecialOccasion | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const [firestoreReading, setFirestoreReading] = useState<DailyReading | null>(null);
  const [loadingFirestore, setLoadingFirestore] = useState(false);
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Get today's special occasion
  const todaySpecialOccasion = useMemo(() => getSpecialOccasion(), []);

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

  // Determine which liturgy to show
  const currentLiturgy = useMemo(() => {
    if (selectedType === 'today') {
      // Check if today is a special occasion
      if (todaySpecialOccasion) {
        return getLiturgyByOccasion(todaySpecialOccasion);
      }
      // Otherwise, use day of month
      return getLiturgyByDay(getDayOfMonth());
    } else if (selectedType === 'daily') {
      return getLiturgyByDay(selectedDayOfMonth);
    } else if (selectedType === 'special' && selectedOccasion) {
      return getLiturgyByOccasion(selectedOccasion);
    }
    return null;
  }, [selectedType, selectedDayOfMonth, selectedOccasion, todaySpecialOccasion]);

  // Get the translated content (always ESV)
  const getContent = (content: string | TranslatedContentType): string => {
    if (typeof content === 'string') {
      return content;
    }
    return content.esv;
  };

  // Get today's reading based on the reading plan preference
  // Use Firestore data if available, otherwise fall back to local data
  const todaysReading = useMemo(() => {
    if (preferences?.readingPlan === 'wholeBible') {
      return getWholeBibleReading(selectedWeek, selectedDay);
    }
    // Try Firestore first, fall back to local data
    return firestoreReading || getReading(selectedWeek, selectedDay);
  }, [selectedWeek, selectedDay, preferences?.readingPlan, firestoreReading]);

  const specialOccasions: SpecialOccasion[] = [
    'advent',
    'christmas',
    'epiphany',
    'good-friday',
    'easter',
    'pentecost',
  ];

  return (
    <div className="space-y-6 relative">
      {/* Header and Selector Combined */}
      <div className="card">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-heading text-primary mb-2 flex items-center gap-3">
              <div className="bg-accent text-white rounded-lg p-2">
                <Church className="w-6 h-6" />
              </div>
              Daily Liturgy
            </h1>
            <p className="text-text-light font-body">
              For Individual or Family Worship
            </p>
          </div>
          
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="btn-secondary text-sm flex items-center gap-2"
          >
            <Info className="w-4 h-4" />
            About
          </button>
        </div>

        {/* Liturgy Selector - Moved inside header card */}
        <div className="pt-4 border-t border-gray-200">
          <div className="space-y-4">
            {/* Type Selector */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedType('today')}
                className={`px-4 py-2 rounded-lg font-body font-semibold text-sm transition flex items-center gap-2 ${
                  selectedType === 'today'
                    ? 'bg-primary text-white'
                    : 'bg-background-dark text-text hover:bg-gray-200'
                }`}
              >
                <Calendar className="w-4 h-4" />
                Today's Liturgy
              </button>
              <button
                onClick={() => setSelectedType('daily')}
                className={`px-4 py-2 rounded-lg font-body font-semibold text-sm transition ${
                  selectedType === 'daily'
                    ? 'bg-primary text-white'
                    : 'bg-background-dark text-text hover:bg-gray-200'
                }`}
              >
                Daily Liturgy
              </button>
              <button
                onClick={() => setSelectedType('special')}
                className={`px-4 py-2 rounded-lg font-body font-semibold text-sm transition ${
                  selectedType === 'special'
                    ? 'bg-primary text-white'
                    : 'bg-background-dark text-text hover:bg-gray-200'
                }`}
              >
                Special Occasions
              </button>
            </div>

            {/* Day of Month Selector (for daily) */}
            {selectedType === 'daily' && (
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                  <button
                    key={day}
                    onClick={() => setSelectedDayOfMonth(day)}
                    className={`px-3 py-2 rounded-lg font-body font-semibold text-sm transition ${
                      selectedDayOfMonth === day
                        ? 'bg-accent text-white'
                        : 'bg-background-dark text-text hover:bg-gray-200'
                    }`}
                  >
                    Day {day}
                  </button>
                ))}
              </div>
            )}

            {/* Special Occasion Selector */}
            {selectedType === 'special' && (
              <div className="flex flex-wrap gap-2">
                {specialOccasions.map((occasion) => (
                  <button
                    key={occasion}
                    onClick={() => setSelectedOccasion(occasion)}
                    className={`px-4 py-2 rounded-lg font-body font-semibold text-sm transition ${
                      selectedOccasion === occasion
                        ? 'bg-accent text-white'
                        : 'bg-background-dark text-text hover:bg-gray-200'
                    }`}
                  >
                    {getSpecialOccasionName(occasion)}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Info Modal */}
      {showInfo && (
        <div className="card bg-blue-50 border-2 border-blue-300">
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-xl font-heading text-blue-700 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              About Daily Liturgy
            </h2>
            <button
              onClick={() => setShowInfo(false)}
              className="text-blue-700 hover:text-blue-900"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex flex-col md:flex-row gap-6">
            {/* Book Cover */}
            <div className="flex-shrink-0">
              <a 
                href="https://shop.g3min.org/products/the-daily-worship-book"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <img 
                  src="https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/public%2FG3_TWB_COVER%20SINGLE.jpg?alt=media"
                  alt="The Daily Worship Book by Michael Howard"
                  className="w-48 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                />
              </a>
            </div>
            
            {/* Text Content */}
            <div className="text-sm font-body text-text-light space-y-3 flex-1">
              <p className="font-semibold text-primary">
                The daily liturgies are from <em>The Daily Worship Book</em> by Michael Howard.
              </p>
              <a 
                href="https://shop.g3min.org/products/the-daily-worship-book"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block btn-primary text-sm"
              >
                Purchase The Daily Worship Book
              </a>
              
              <p className="pt-2">
                Each liturgy contains the following parts to guide your worship:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Call to Worship</strong> - Scripture to begin</li>
                <li><strong>The Votum</strong> - Psalm 124:8</li>
                <li><strong>Prayer of Confession</strong> - Historic prayers</li>
                <li><strong>Assurance of Forgiveness</strong> - Scripture promises</li>
                <li><strong>Psalm</strong> - A Psalm to read or sing</li>
                <li><strong>Prayer of Illumination</strong> - Before reading God's Word</li>
                <li><strong>Daily Bible Reading</strong> - From your reading schedule</li>
                <li><strong>Personal Intercession</strong> - Prayer guidance</li>
                <li><strong>The Lord's Prayer</strong> - ESV</li>
                <li><strong>Doxology</strong> - "Praise God from Whom All Blessings Flow"</li>
              </ul>
              <p>
                There are 31 daily liturgies (one for each day of the month) and special liturgies 
                for Advent, Christmas, Epiphany, Good Friday, Easter, and Pentecost.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Today's Special Notice */}
      {selectedType === 'today' && todaySpecialOccasion && (
        <div className="card bg-purple-50 border-2 border-purple-300">
          <div className="text-center">
            <h3 className="text-lg font-heading text-purple-700 mb-2">
              Special Liturgy for {getSpecialOccasionName(todaySpecialOccasion)}
            </h3>
            <p className="text-sm font-body text-text-light">
              Today's liturgy is customized for this special occasion
            </p>
          </div>
        </div>
      )}

      {/* Liturgy Content */}
      <PremiumContentOverlay>
      {currentLiturgy && (
        <div className="space-y-6">
          {/* Title */}
          <div className="card bg-primary text-white print:bg-white print:text-primary print:border print:border-gray-300">
            <h2 className="text-2xl font-heading text-center">
              {currentLiturgy.name}
            </h2>
            {currentLiturgy.description && (
              <p className="text-center mt-2 text-sm opacity-90 print:text-gray-600">
                {currentLiturgy.description}
              </p>
            )}
          </div>

          {/* Liturgy Parts */}
          {currentLiturgy.parts.map((part, index) => (
            <div key={index} className="card">
              <h3 className="text-xl font-heading text-primary mb-3 flex items-center gap-2">
                {part.type === 'reading' && <BookOpen className="w-5 h-5" />}
                {part.title}
                {part.scriptureReference && (
                  <span className="text-sm text-text-light font-body">
                    ({part.scriptureReference})
                  </span>
                )}
              </h3>
              
              {/* Daily Bible Reading - Enhanced with Bible Gateway and expandable sections */}
              {part.type === 'reading' && todaysReading ? (
                <div className={`space-y-4 ${!currentUser ? 'blur-sm' : ''}`}>
                  {/* Week, Day, and Title */}
                  <div className="mb-4">
                    <p className="font-body text-text-light text-sm mb-1">
                      Week {selectedWeek}, Day {selectedDay}
                    </p>
                    <h4 className="font-heading text-2xl text-primary">
                      {todaysReading.title}
                    </h4>
                  </div>

                  {/* Bible Gateway Link */}
                  <BibleGatewayLink 
                    reference={todaysReading.reference}
                    translation={preferences?.bibleTranslation || 'ESV'}
                  />

                  {/* Summary Section */}
                  {todaysReading.summary && (
                    <ExpandableSection
                      title="Summary"
                      icon={<BookOpen className="w-5 h-5" />}
                      defaultExpanded={false}
                    >
                      <p className="font-body text-text leading-relaxed whitespace-pre-line">
                        {todaysReading.summary}
                      </p>
                    </ExpandableSection>
                  )}

                  {/* Study Notes Section */}
                  {todaysReading.studyNotes && (
                    <ExpandableSection
                      title="Study Notes"
                      icon={<FileText className="w-5 h-5" />}
                      defaultExpanded={false}
                    >
                      <div className="space-y-3">
                        {todaysReading.studyNotes.split(/\.\s+(?=(?:Chapter \d+, )?Verses? \d+)/).map((note, index) => {
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
                    </ExpandableSection>
                  )}

                  {/* Devotional Section */}
                  {todaysReading.devotional && (
                    <ExpandableSection
                      title="Devotional"
                      icon={<Heart className="w-5 h-5" />}
                      defaultExpanded={false}
                    >
                      <div className="space-y-2">
                        <p className="font-body text-text leading-relaxed whitespace-pre-line">
                          {todaysReading.devotional}
                        </p>
                        <p className="font-body text-text-light italic text-sm">
                          *by Charles Huckaby
                        </p>
                      </div>
                    </ExpandableSection>
                  )}

                  {/* Reflection Questions & Journal Section */}
                  {todaysReading.reflectionQuestions && todaysReading.reflectionQuestions.length > 0 && (
                    <ExpandableSection
                      title="Reflection & Journal"
                      icon={<MessageCircle className="w-5 h-5" />}
                      defaultExpanded={false}
                    >
                      <div className="space-y-4">
                        <ul className="space-y-3">
                          {todaysReading.reflectionQuestions.map((question, qIdx) => (
                            <li key={qIdx} className="font-body text-text flex gap-2">
                              <span className="text-accent font-bold">•</span>
                              <span>{question}</span>
                            </li>
                          ))}
                        </ul>
                        <button
                          onClick={() => navigate('/reading')}
                          className="btn-primary flex items-center gap-2 print:hidden"
                        >
                          <FileText className="w-4 h-4" />
                          Go to Reading Plan
                        </button>
                      </div>
                    </ExpandableSection>
                  )}
                </div>
              ) : (
                <div className={`font-body text-text whitespace-pre-line leading-relaxed ${!currentUser ? 'blur-sm' : ''}`}>
                  {getContent(part.content)}
                </div>
              )}

              {/* Doxology with media */}
              {part.type === 'doxology' && (
                <div className="mt-4 print:hidden">
                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={doxologyMedia.sheetMusicUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary text-sm flex items-center gap-2"
                    >
                      <FileText className="w-4 h-4" />
                      View Sheet Music
                    </a>
                    <button
                      onClick={() => {
                        if (!showAudioPlayer && audioRef.current) {
                          audioRef.current.play();
                          setIsPlaying(true);
                          setShowAudioPlayer(true);
                        }
                      }}
                      className="btn-secondary text-sm flex items-center gap-2"
                      disabled={showAudioPlayer}
                    >
                      <Volume2 className="w-4 h-4" />
                      Play Piano Accompaniment
                    </button>
                    
                    {/* Stop Button - appears inline to the right */}
                    {showAudioPlayer && (
                      <button
                        onClick={() => {
                          if (audioRef.current) {
                            audioRef.current.pause();
                            audioRef.current.currentTime = 0;
                            setIsPlaying(false);
                            setShowAudioPlayer(false);
                          }
                        }}
                        className="btn-secondary text-sm flex items-center gap-2"
                      >
                        <Square className="w-4 h-4" />
                        Stop
                      </button>
                    )}
                  </div>
                  
                  {/* Hidden audio element */}
                  <audio
                    ref={audioRef}
                    src={doxologyMedia.pianoAccompanimentUrl}
                    onEnded={() => {
                      setIsPlaying(false);
                      setShowAudioPlayer(false);
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {!currentLiturgy && (
        <div className="card text-center">
          <p className="text-text-light font-body italic">
            Please select a liturgy to display
          </p>
        </div>
      )}
      </PremiumContentOverlay>
    </div>
  );
};

export default Liturgy;
