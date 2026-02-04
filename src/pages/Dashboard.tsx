import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useUserPreferences } from '../contexts/UserPreferencesContext';
import { dismissCompletionModal, resetReadingPlan, markCertificateDownloaded, dismissStartDateTip, dismissNewYearTransition, recoverPreviousSchedule } from '../services/userService';
import CompletionModal from '../components/completion/CompletionModal';
import NewYearTransitionModal from '../components/dashboard/NewYearTransitionModal';
import { getFirstMondayOfYear } from '../utils/dateHelpers';
import { BookOpen, HelpCircle, Music, Lightbulb, Info, X, Baby, Church, Calendar, Settings } from 'lucide-react';

const Dashboard = () => {
  const { currentUser, refreshUser } = useAuth();
  const { selectedWeek, selectedDay, preferences } = useUserPreferences();
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [showStartDateTip, setShowStartDateTip] = useState(false);
  const [showNewYearTransitionModal, setShowNewYearTransitionModal] = useState(false);

  // Get current day of week (0 = Sunday, 6 = Saturday)
  const today = new Date();
  const dayOfWeek = today.getDay();
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

  // Check if user should see completion modal
  useEffect(() => {
    if (currentUser?.progress?.hasCompletedAllWeeks && 
        currentUser?.progress?.showCompletionModal) {
      setShowCompletionModal(true);
    }
  }, [currentUser]);

  // Check if user should see start date tip (new users only)
  useEffect(() => {
    if (currentUser && !currentUser.progress?.hasSeenStartDateTip) {
      setShowStartDateTip(true);
    }
  }, [currentUser]);

  // Check if user should see new year transition modal
  useEffect(() => {
    console.log('🔍 NEW YEAR MODAL CHECK:', {
      hasCurrentUser: !!currentUser,
      progress: currentUser?.progress,
    });
    
    if (!currentUser) return;
    
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth(); // 0 = January, 11 = December
    const currentDayOfMonth = now.getDate();
    
    // Modal window: Dec 26 (month 11, day 26) through Jan 15 (month 0, day 15)
    const isInModalWindow = 
      (currentMonth === 11 && currentDayOfMonth >= 26) || // Dec 26-31
      (currentMonth === 0 && currentDayOfMonth <= 15);     // Jan 1-15
    
    // Check if user has a CUSTOM start date (not the default from previous year)
    // Calculate previous year's default dynamically
    const previousYear = currentYear - 1;
    const previousYearMondayDate = getFirstMondayOfYear(previousYear);
    const prevYear = previousYearMondayDate.getFullYear();
    const prevMonth = String(previousYearMondayDate.getMonth() + 1).padStart(2, '0');
    const prevDay = String(previousYearMondayDate.getDate()).padStart(2, '0');
    const previousYearDefault = `${prevYear}-${prevMonth}-${prevDay}`;
    
    const hasCustomStartDate = currentUser.progress?.startDate && 
                                currentUser.progress.startDate !== previousYearDefault;
    
    console.log('🔍 MODAL CHECKS:', {
      isInModalWindow,
      hasSeenNewYearTransition: currentUser.progress?.hasSeenNewYearTransition,
      startDate: currentUser.progress?.startDate,
      previousYearDefault,
      hasCustomStartDate,
      hasCompletedAllWeeks: currentUser.progress?.hasCompletedAllWeeks,
      hasSnapshot: !!currentUser.progress?.newYearSnapshot,
    });
    
    if (!isInModalWindow) {
      console.log('❌ Not in modal window, returning');
      return;
    }
    if (currentUser.progress?.hasSeenNewYearTransition) {
      console.log('❌ User already seen transition, returning');
      return;
    }
    if (hasCustomStartDate) {
      console.log('❌ User has truly custom start date, returning');
      return;
    }
    if (currentUser.progress?.hasCompletedAllWeeks) {
      console.log('❌ User completed all weeks, returning');
      return;
    }
    
    // Check if there's a snapshot OR we should show warning
    const hasSnapshot = currentUser.progress?.newYearSnapshot;
    
    console.log('✅ SHOWING MODAL!', { hasSnapshot, isInModalWindow });
    
    if (hasSnapshot || isInModalWindow) {
      setShowNewYearTransitionModal(true);
    }
  }, [currentUser]);

  // Get latest completion cycle info
  const latestCycle = currentUser?.progress?.completionCycles?.slice(-1)[0];

  const handleDismissModal = async () => {
    if (!currentUser) return;
    try {
      await dismissCompletionModal(currentUser.uid);
      setShowCompletionModal(false);
      await refreshUser();
    } catch (error) {
      console.error('Error dismissing modal:', error);
    }
  };

  const handleStartOver = async () => {
    if (!currentUser) return;
    try {
      await resetReadingPlan(currentUser.uid);
      setShowCompletionModal(false);
      await refreshUser();
    } catch (error) {
      console.error('Error resetting plan:', error);
      throw error;
    }
  };

  const handleCertificateDownload = async () => {
    if (!currentUser || !latestCycle) return;
    try {
      await markCertificateDownloaded(currentUser.uid, latestCycle.cycleNumber);
      await refreshUser();
    } catch (error) {
      console.error('Error marking certificate as downloaded:', error);
    }
  };

  const handleDismissStartDateTip = async () => {
    if (!currentUser) return;
    try {
      await dismissStartDateTip(currentUser.uid);
      setShowStartDateTip(false);
      await refreshUser();
    } catch (error) {
      console.error('Error dismissing start date tip:', error);
    }
  };

  const handleRecoverSchedule = async () => {
    if (!currentUser) return;
    await recoverPreviousSchedule(currentUser.uid);
    await refreshUser();
  };

  const handleStartFresh = async () => {
    if (!currentUser) return;
    await dismissNewYearTransition(currentUser.uid);
    await refreshUser();
  };

  // Determine if we're in post-reset scenario
  const now = new Date();
  const isPostReset = now.getMonth() === 0 && now.getDate() <= 15; // Jan 1-15

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="text-center relative">
        {/* About Button - Only for non-logged-in users */}
        {!currentUser && (
          <button
            onClick={() => setShowAboutModal(true)}
            className="absolute left-0 top-0 flex items-center gap-2 px-3 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition text-sm font-body"
            title="About this Resource"
          >
            <Info className="w-4 h-4" />
            <span className="hidden sm:inline">About</span>
          </button>
        )}
        
        <h1 className="text-4xl font-heading text-white mb-2">
          Daily Worship
        </h1>
        <p className="text-lg text-gray-200 font-body">
          Week {selectedWeek} {isWeekend ? '• Catch-Up & Review' : `• Day ${selectedDay}`}
        </p>
      </div>

      {/* Start Date Tip Banner - Only for new users */}
      {showStartDateTip && currentUser && (
        <div className="card bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="bg-blue-500 text-white rounded-full p-3">
                <Calendar className="w-6 h-6" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-heading text-primary mb-2 flex items-center gap-2">
                💡 Welcome Tip
              </h3>
              <p className="text-text font-body mb-3">
                You can customize your schedule start date in Preferences! This allows you to align your reading plan with when you actually begin, ensuring you're always on the right week and day.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/preferences"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-accent transition text-sm font-body font-semibold"
                >
                  <Settings className="w-4 h-4" />
                  Go to Preferences
                </Link>
                <button
                  onClick={handleDismissStartDateTip}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition text-sm font-body"
                >
                  Got it, dismiss
                </button>
              </div>
            </div>
            <button
              onClick={handleDismissStartDateTip}
              className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition"
              aria-label="Dismiss tip"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Five Daily Elements */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Reading Plan */}
        <Link to="/reading" className="card hover:shadow-xl hover:scale-105 transition-all duration-200">
          <div className="flex items-start space-x-4">
            <div className="bg-accent text-white rounded-lg p-3">
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-heading text-text mb-1">
                Reading Plan
              </h3>
              <p className="text-text font-body text-sm">
                Read Scripture with study notes, devotionals, and reflection questions.
              </p>
            </div>
          </div>
        </Link>

        {/* Daily Liturgy */}
        <Link to="/liturgy" className="card hover:shadow-xl hover:scale-105 transition-all duration-200">
          <div className="flex items-start space-x-4">
            <div className="bg-accent text-white rounded-lg p-3">
              <Church className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-heading text-text mb-1">
                Daily Liturgy
              </h3>
              <p className="text-text font-body text-sm">
                Guided liturgy for individual or family worship.
              </p>
            </div>
          </div>
        </Link>

        {/* Catechism */}
        <Link to="/catechism" className="card hover:shadow-xl hover:scale-105 transition-all duration-200">
          <div className="flex items-start space-x-4">
            <div className="bg-accent text-white rounded-lg p-3">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-heading text-text mb-1">
                Catechism
              </h3>
              <p className="text-text font-body text-sm">
                Learn foundational truths with video, audio, and scriptural proofs.
              </p>
            </div>
          </div>
        </Link>

        {/* Scripture Memory */}
        <Link to="/memory" className="card hover:shadow-xl hover:scale-105 transition-all duration-200">
          <div className="flex items-start space-x-4">
            <div className="bg-accent text-white rounded-lg p-3">
              <Lightbulb className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-heading text-text mb-1">
                Scripture Memory
              </h3>
              <p className="text-text font-body text-sm">
                Memorize God's Word with progressive hiding tools.
              </p>
            </div>
          </div>
        </Link>

        {/* Hymn of the Week */}
        <Link to="/hymnal" className="card hover:shadow-xl hover:scale-105 transition-all duration-200">
          <div className="flex items-start space-x-4">
            <div className="bg-accent text-white rounded-lg p-3">
              <Music className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-heading text-text mb-1">
                Hymn of the Week
              </h3>
              <p className="text-text font-body text-sm">
                Learn hymns with lyrics, sheet music, and piano accompaniment.
              </p>
            </div>
          </div>
        </Link>

        {/* Children's Story Bible */}
        <Link to="/children" className="card hover:shadow-xl hover:scale-105 transition-all duration-200">
          <div className="flex items-start space-x-4">
            <div className="bg-accent text-white rounded-lg p-3">
              <Baby className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-heading text-text mb-1">
                Children's Story Bible
              </h3>
              <p className="text-text font-body text-sm">
                Age-appropriate stories with illustrations and discussion questions for children.
              </p>
            </div>
          </div>
        </Link>
      </div>

      {/* About This Resource Modal */}
      {showAboutModal && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-50" 
            onClick={() => setShowAboutModal(false)}
          />
          <div className="fixed inset-4 sm:inset-8 md:inset-16 lg:inset-24 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-full overflow-hidden flex flex-col">
              {/* Modal Header */}
              <div className="bg-primary px-6 py-4 flex items-center justify-between border-b border-primary-dark">
                <h2 className="text-2xl font-heading text-white font-bold">About This Resource</h2>
                <button
                  onClick={() => setShowAboutModal(false)}
                  className="text-white hover:text-gray-200 transition"
                  aria-label="Close"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="overflow-y-auto p-6 space-y-6 text-text font-body leading-relaxed">
                <div>
                  <h3 className="font-heading text-lg text-primary mb-2">Stories Shape Us</h3>
                  <p className="mb-3">
                    When we read a story, we enter a world that the author has created and thus become shaped by that world. Experiencing the world of the story forms our imaginations of reality, our perceptions and affections, and even our worldview and beliefs.
                  </p>
                  <p className="mb-3">
                    The same is true—perhaps even more so—with the stories of Scripture. Biblical narratives shape our imagination of who God is, what he is like, and what he expects of his people. The difference, of course, between biblical stories and fictional stories is that the narratives of Scripture actually happened, but the power of stories in the Bible is no different—they help to form who we are. When we read biblical narratives, we enter the stories of historic events in God's providential plan ourselves, and they affect us as if we were living those stories ourselves.
                  </p>
                  <p>
                    This is exactly why God gave us his revelation in various aesthetic literary forms. Scripture is filled with narratives and poetry; even the more didactic portions of the Bible are filled with poetic devices that shape our minds and our hearts. God the Holy Spirit, "carrying along" men of God (2 Pet 1:21), inspired the stories of Scripture—he literally "breathed them out" (2 Tim 3:16)—in order to form us into the people he intended for us to be.
                  </p>
                </div>

                <div>
                  <h3 className="font-heading text-lg text-primary mb-2">The Power of Aesthetic Forms</h3>
                  <p className="mb-3">
                    The aesthetic forms of Scripture provide a way of communicating God's truth that would be impossible with systematic statements of fact alone. Since God is a spirit and does not have a body like man, since he is infinite, eternal, and totally other than us, God chose to use particular aesthetic forms to communicate truth about himself that would not have been possible otherwise. These aesthetic forms are essential to the truth itself since God's inspired Word is exactly the best way that truth could be presented.
                  </p>
                  <p>
                    There is a reason the Bible calls God a "king" rather than simply asserting the doctrinal fact of his rulership. There is a reason the Bible calls God a shepherd, fortress, father, husband, and potter rather than simply stating the ideas underlying these metaphors. These images of God paint a picture that goes far beyond mere doctrinal accuracy. They communicate something that could not be expressed in mere prose. They shape our imagination of who God is, both expressing and shaping right affections for God, which are central to Christianity.
                  </p>
                </div>

                <div>
                  <h3 className="font-heading text-lg text-primary mb-2">Components of This Resource</h3>
                  <p className="mb-3">
                    The goal of this resource is to help you immerse yourself in God's Word. This 52-week Bible reading plan focuses on the narratives of Scripture, along with all of the psalms and proverbs. The plan schedules readings for five days per week, giving you the weekend to catch up if you fall behind.
                  </p>
                  <p className="mb-3">
                    Additionally, this resource includes a 52-week catechism, compiling focused questions and answers from historic catechisms like the Westminster Shorter Catechism, the Heidelberg Catechism, Benjamin Keach's catechism, and Charles Spurgeon's catechism. Narrowing this tool to 52 questions and answers allows you or your family to memorize one per week, and then review again in subsequent years, allowing these doctrinal statements to form and shape belief.
                  </p>
                  <p className="mb-3">
                    Notes, summaries, and questions for personal reflection or group discussion are provided. The notes are designed to answer some of the more challenging issues of the texts, give historical context, or provide classic, conservative interpretation and application.
                  </p>
                  <p>
                    Finally, each week of reading also has a passage of Scripture to memorize and a hymn to sing, both of which usually correspond to the primary themes of the Bible readings, the catechism, or both.
                  </p>
                </div>

                <div>
                  <h3 className="font-heading text-lg text-primary mb-2">Ways to Use This Resource</h3>
                  <p className="mb-3">
                    This resource could be used in a number of ways:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 mb-3">
                    <li>An individual could use this for personal Bible study and meditation</li>
                    <li>Perfect for upper elementary age children (ages 8-10 and up)</li>
                    <li>Parents could use this for family worship, reading passages together and using the questions for discussion</li>
                    <li>A whole family could read through the plan together, with parents and older children reading individually and using the memory passages, hymns, catechisms, and reflection questions during family worship</li>
                  </ul>
                  <p className="mb-3">
                    While originally intended to begin in January and run through the calendar year, you can start any time—perhaps at the start of a school year or any other time. It is designed to begin on Monday, however, so even if you begin in January, wait to start on the first Monday of the month.
                  </p>
                  <p className="italic text-text-light">
                    My prayer is that this guide can be a useful resource for helping the stories and poetry of Scripture to shape us into mature, God-fearing Christians, to the glory of God. —Scott Aniol
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Completion Modal */}
      {showCompletionModal && currentUser && latestCycle && (
        <CompletionModal
          isOpen={showCompletionModal}
          onClose={handleDismissModal}
          onStartOver={handleStartOver}
          userName={currentUser.displayName || 'Student'}
          completionDate={
            (latestCycle.completedAt as any)?.toDate 
              ? (latestCycle.completedAt as any).toDate() 
              : latestCycle.completedAt instanceof Date 
                ? latestCycle.completedAt 
                : new Date()
          }
          cycleNumber={latestCycle.cycleNumber}
          onCertificateDownload={handleCertificateDownload}
          bibleTranslation={preferences.bibleTranslation}
        />
      )}

      {/* New Year Transition Modal */}
      {showNewYearTransitionModal && currentUser && (
        <NewYearTransitionModal
          isOpen={showNewYearTransitionModal}
          onClose={() => setShowNewYearTransitionModal(false)}
          onRecoverSchedule={handleRecoverSchedule}
          onStartFresh={handleStartFresh}
          snapshot={currentUser.progress?.newYearSnapshot || null}
          hasAlreadyReset={isPostReset}
        />
      )}
    </div>
  );
};

export default Dashboard;
