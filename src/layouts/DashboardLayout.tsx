import { useState, useMemo, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useUserPreferences } from '../contexts/UserPreferencesContext';
import { useReadingProgress } from '../hooks/useReadingProgress';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { User, LogOut, Settings, Shield, Calendar, Crown, ChevronLeft, ChevronRight, Menu, X, Info, HelpCircle, Download, MessageCircle, BookOpen } from 'lucide-react';
import { Translation } from '../types/curriculum';
import InstallInstructionsModal from '../components/InstallInstructionsModal';
import ContactModal from '../components/ContactModal';
import { calculateCurrentWeekAndDay } from '../utils/dateHelpers';
import { enablePushNotifications } from '../services/notificationService';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

const DashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const { preferences, updatePreferences, selectedWeek, selectedDay, setSelectedWeek, setSelectedDay } = useUserPreferences();
  const readingProgress = useReadingProgress();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const { isInstallable, isInstalled, promptInstall } = usePWAInstall();

  const translations: Translation[] = ['ESV', 'KJV', 'NKJV', 'NASB', 'LSB'];

  const isActive = (path: string) => {
    return location.pathname === path
      ? 'bg-primary text-white'
      : 'text-text hover:bg-background-dark';
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  const getTrialDaysRemaining = () => {
    if (currentUser?.subscription.status === 'trial' && currentUser.subscription.trialEndsAt) {
      const now = new Date();
      const trialEnd = currentUser.subscription.trialEndsAt;
      const daysRemaining = Math.ceil((trialEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      return Math.max(0, daysRemaining);
    }
    return null;
  };

  const trialDays = getTrialDaysRemaining();

  // Auto-prompt for push notifications on first visit
  useEffect(() => {
    const promptForPushNotifications = async () => {
      // Only prompt if:
      // 1. User is logged in
      // 2. They haven't been prompted before
      // 3. Push notifications are enabled in preferences (default is true)
      if (
        currentUser &&
        !currentUser.pushNotificationPrompted &&
        preferences?.pushNotificationsEnabled !== false
      ) {
        console.log('📢 Auto-prompting for push notifications on first visit');
        
        try {
          // Request permission and get FCM token
          const result = await enablePushNotifications(currentUser.uid);
          
          if (result.success) {
            console.log('✅ Push notifications enabled successfully');
          } else {
            console.log('⚠️ Push notifications prompt:', result.error);
          }
        } catch (error) {
          console.error('Error during auto-prompt for push notifications:', error);
        } finally {
          // Mark as prompted regardless of success/failure
          // This prevents repeated prompts
          try {
            const userRef = doc(db, 'users', currentUser.uid);
            await updateDoc(userRef, {
              pushNotificationPrompted: true,
            });
            console.log('✅ Marked user as prompted for push notifications');
          } catch (updateError) {
            console.error('Error updating pushNotificationPrompted flag:', updateError);
          }
        }
      }
    };

    promptForPushNotifications();
  }, [currentUser, preferences?.pushNotificationsEnabled]);

  const handleSaveApp = async () => {
    setShowUserMenu(false);
    
    if (isInstallable) {
      // Try to show native install prompt
      const installed = await promptInstall();
      if (!installed) {
        // If user dismissed the prompt, show instructions as fallback
        setShowInstallModal(true);
      }
    } else {
      // Show manual instructions
      setShowInstallModal(true);
    }
  };

  // Navigate forward/backward by one day
  const navigateDay = (direction: 'forward' | 'backward') => {
    if (direction === 'forward') {
      if (selectedDay < 5) {
        setSelectedDay(selectedDay + 1);
      } else {
        // Move to next week, day 1
        setSelectedDay(1);
        setSelectedWeek(Math.min(52, selectedWeek + 1));
      }
    } else {
      if (selectedDay > 1) {
        setSelectedDay(selectedDay - 1);
      } else {
        // Move to previous week, day 5
        setSelectedDay(5);
        setSelectedWeek(Math.max(1, selectedWeek - 1));
      }
    }
  };

  const handleTodayClick = () => {
    // Use the user's custom start date if available, otherwise use the default
    const startDateStr = currentUser?.progress?.startDate;
    let startDate: Date;
    
    if (startDateStr) {
      // Parse the date string correctly to avoid timezone issues
      // Format is 'YYYY-MM-DD', so split and create date in local time
      const [year, month, day] = startDateStr.split('-').map(Number);
      startDate = new Date(year, month - 1, day); // month is 0-indexed
    } else {
      // Fallback to the first Monday of the year if no custom start date
      const firstMonday = new Date(new Date().getFullYear(), 0, 1);
      const daysOffset = (firstMonday.getDay() === 0 ? 6 : firstMonday.getDay() - 1);
      firstMonday.setDate(firstMonday.getDate() - daysOffset);
      startDate = firstMonday;
    }
    
    // Calculate current week and day based on the start date
    const position = calculateCurrentWeekAndDay(startDate, new Date());
    
    if (position) {
      setSelectedWeek(position.week);
      setSelectedDay(position.day);
    }
  };

  const navigationLinks = [
    { to: '/', label: 'Dashboard' },
    { to: '/reading', label: 'Reading Plan' },
    { to: '/catechism', label: 'Catechism' },
    { to: '/hymnal', label: 'Hymn' },
    { to: '/memory', label: 'Scripture Memory' },
    { to: '/children', label: "Children's Bible" },
    { to: '/liturgy', label: 'Daily Liturgy' },
    { to: '/resources', label: 'Resources' },
  ];

  const handleNavClick = () => {
    setShowMobileMenu(false);
  };

  // Calculate today's position based on user's start date
  const todayPosition = useMemo(() => {
    if (!currentUser) return null;
    
    const startDateStr = currentUser?.progress?.startDate;
    if (!startDateStr) return null;
    
    // Parse the date string correctly to avoid timezone issues
    const [year, month, day] = startDateStr.split('-').map(Number);
    const startDate = new Date(year, month - 1, day);
    
    return calculateCurrentWeekAndDay(startDate, new Date());
  }, [currentUser]);

  // Find the next unread reading in the schedule
  const findNextUnreadReading = (): { week: number; day: number } | null => {
    if (!currentUser) return null;
    
    const completedReadings = currentUser.progress.completedReadings || {};
    
    // Iterate through all weeks and days
    for (let week = 1; week <= 52; week++) {
      for (let day = 1; day <= 5; day++) {
        const key = `${week}-${day}`;
        if (!completedReadings[key]) {
          return { week, day };
        }
      }
    }
    
    return null; // All readings completed
  };

  // Get next unread reading
  const nextUnread = useMemo(() => {
    return findNextUnreadReading();
  }, [currentUser]);

  // Handler for Next Unread button
  const handleNextUnreadClick = () => {
    const nextUnread = findNextUnreadReading();
    if (nextUnread) {
      setSelectedWeek(nextUnread.week);
      setSelectedDay(nextUnread.day);
    }
  };

  // Calculate progress bar styling for footer border only
  const getProgressBorderStyle = (): React.CSSProperties | null => {
    if (!readingProgress) {
      return null;
    }

    const { percentageComplete, status } = readingProgress;
    
    // Determine colors based on status
    let progressColor: string;
    let remainingColor: string;
    
    if (status === 'ahead') {
      progressColor = '#10b981'; // Green (emerald-500)
      remainingColor = 'rgba(255, 255, 255, 0.3)';
    } else if (status === 'on-track') {
      progressColor = '#f59e0b'; // Gold (amber-500)
      remainingColor = 'rgba(255, 255, 255, 0.3)';
    } else {
      // Behind - use amber with red tint
      progressColor = '#fbbf24'; // Amber-400
      remainingColor = 'rgba(239, 68, 68, 0.5)'; // Red with opacity
    }
    
    // Create a gradient for the border only
    const gradient = `linear-gradient(to right, ${progressColor} 0%, ${progressColor} ${percentageComplete}%, ${remainingColor} ${percentageComplete}%, ${remainingColor} 100%)`;
    
    return {
      borderTopWidth: '3px',
      borderTopStyle: 'solid' as const,
      borderImageSource: gradient,
      borderImageSlice: '1',
    } as React.CSSProperties;
  };

  return (
    <div className="min-h-screen bg-primary">
      {/* Header */}
      <header className="bg-primary shadow-sm border-b border-primary-dark">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          {/* Main Header Row */}
          <div className="flex justify-between items-center h-14 sm:h-16">
            {/* Title - Left */}
            <div className="flex items-center flex-shrink-0">
              <h1 className="text-lg sm:text-2xl font-heading text-white font-bold">
                Tune My Heart
              </h1>
            </div>

            {/* Centered Logo */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <img 
                src="/tune-my-heart-logo.png" 
                alt="Tune My Heart" 
                className="h-8 sm:h-12"
              />
            </div>

            {/* Desktop Controls - User Menu Only */}
            {currentUser ? (
              <div className="hidden sm:flex items-center gap-3">
                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition"
                    title={currentUser.displayName || 'User menu'}
                  >
                    <User className="w-5 h-5 text-white" />
                  </button>

                  {showUserMenu && (
                    <>
                      <div 
                        className="fixed inset-0 z-10" 
                        onClick={() => setShowUserMenu(false)}
                      />
                      <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl z-20 overflow-hidden">
                        <div className="p-4 border-b border-gray-200">
                          <p className="font-medium text-gray-800">{currentUser.displayName}</p>
                          <p className="text-sm text-gray-600">{currentUser.email}</p>
                          <div className="mt-2">
                            {currentUser.subscription.status === 'trial' && trialDays !== null && (
                              <span className="inline-block text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                                Trial: {trialDays} days left
                              </span>
                            )}
                            {currentUser.subscription.status === 'active' && (
                              <span className="inline-block text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                {currentUser.accountType === 'family' ? 'Family Plan' : 'Individual Plan'}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="py-2">
                          <button
                            onClick={() => {
                              setShowUserMenu(false);
                              setShowAboutModal(true);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition"
                          >
                            <Info className="w-4 h-4" />
                            <span>About this Resource</span>
                          </button>
                          
                          <Link
                            to="/preferences"
                            onClick={() => setShowUserMenu(false)}
                            className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition"
                          >
                            <Settings className="w-4 h-4" />
                            <span>User Dashboard</span>
                          </Link>
                          
                          {currentUser.subscription?.plan === 'free' && (
                            <Link
                              to="/upgrade"
                              onClick={() => setShowUserMenu(false)}
                              className="flex items-center gap-3 px-4 py-2 text-yellow-600 hover:bg-yellow-50 transition font-medium"
                            >
                              <Crown className="w-4 h-4" />
                              <span>Upgrade to Premium</span>
                            </Link>
                          )}
                          
                          {currentUser.role === 'admin' && (
                            <Link
                              to="/admin"
                              onClick={() => setShowUserMenu(false)}
                              className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition"
                            >
                              <Shield className="w-4 h-4" />
                              <span>Admin Dashboard</span>
                            </Link>
                          )}
                          
                          <Link
                            to="/help"
                            onClick={() => setShowUserMenu(false)}
                            className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition"
                          >
                            <HelpCircle className="w-4 h-4" />
                            <span>Help</span>
                          </Link>

                          <button
                            onClick={() => {
                              setShowUserMenu(false);
                              setShowContactModal(true);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition"
                          >
                            <MessageCircle className="w-4 h-4" />
                            <span>Contact</span>
                          </button>

                          {!isInstalled && (
                            <button
                              onClick={handleSaveApp}
                              className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition"
                            >
                              <Download className="w-4 h-4" />
                              <span>Save App</span>
                            </button>
                          )}

                          <button
                            onClick={() => {
                              setShowUserMenu(false);
                              handleLogout();
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 transition"
                          >
                            <LogOut className="w-4 h-4" />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-white hover:text-gray-200 font-medium transition text-sm sm:text-base"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-white text-primary px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-medium hover:bg-gray-100 transition text-sm sm:text-base"
                >
                  Create Account
                </Link>
              </div>
            )}

            {/* Mobile Menu Button and User Icon */}
            <div className="flex lg:hidden items-center gap-2">
              {currentUser && (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition"
                    title={currentUser.displayName || 'User menu'}
                  >
                    <User className="w-5 h-5 text-white" />
                  </button>

                  {showUserMenu && (
                    <>
                      <div 
                        className="fixed inset-0 z-10" 
                        onClick={() => setShowUserMenu(false)}
                      />
                      <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl z-20 overflow-hidden">
                        <div className="p-4 border-b border-gray-200">
                          <p className="font-medium text-gray-800">{currentUser.displayName}</p>
                          <p className="text-sm text-gray-600">{currentUser.email}</p>
                          <div className="mt-2">
                            {currentUser.subscription.status === 'trial' && trialDays !== null && (
                              <span className="inline-block text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                                Trial: {trialDays} days left
                              </span>
                            )}
                            {currentUser.subscription.status === 'active' && (
                              <span className="inline-block text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                {currentUser.accountType === 'family' ? 'Family Plan' : 'Individual Plan'}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="py-2">
                          <button
                            onClick={() => {
                              setShowUserMenu(false);
                              setShowAboutModal(true);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition"
                          >
                            <Info className="w-4 h-4" />
                            <span>About this Resource</span>
                          </button>
                          
                          <Link
                            to="/preferences"
                            onClick={() => setShowUserMenu(false)}
                            className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition"
                          >
                            <Settings className="w-4 h-4" />
                            <span>User Dashboard</span>
                          </Link>
                          
                          {currentUser.subscription?.plan === 'free' && (
                            <Link
                              to="/upgrade"
                              onClick={() => setShowUserMenu(false)}
                              className="flex items-center gap-3 px-4 py-2 text-yellow-600 hover:bg-yellow-50 transition font-medium"
                            >
                              <Crown className="w-4 h-4" />
                              <span>Upgrade to Premium</span>
                            </Link>
                          )}
                          
                          {currentUser.role === 'admin' && (
                            <Link
                              to="/admin"
                              onClick={() => setShowUserMenu(false)}
                              className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition"
                            >
                              <Shield className="w-4 h-4" />
                              <span>Admin Dashboard</span>
                            </Link>
                          )}
                          
                          <Link
                            to="/help"
                            onClick={() => setShowUserMenu(false)}
                            className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition"
                          >
                            <HelpCircle className="w-4 h-4" />
                            <span>Help</span>
                          </Link>

                          <button
                            onClick={() => {
                              setShowUserMenu(false);
                              setShowContactModal(true);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition"
                          >
                            <MessageCircle className="w-4 h-4" />
                            <span>Contact</span>
                          </button>

                          {!isInstalled && (
                            <button
                              onClick={handleSaveApp}
                              className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition"
                            >
                              <Download className="w-4 h-4" />
                              <span>Save App</span>
                            </button>
                          )}

                          <button
                            onClick={() => {
                              setShowUserMenu(false);
                              handleLogout();
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 transition"
                          >
                            <LogOut className="w-4 h-4" />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
              
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="w-10 h-10 bg-white/10 rounded flex items-center justify-center hover:bg-white/20 transition"
                aria-label="Toggle menu"
              >
                {showMobileMenu ? (
                  <X className="w-6 h-6 text-white" />
                ) : (
                  <Menu className="w-6 h-6 text-white" />
                )}
              </button>
            </div>
          </div>

        </div>
      </header>

      {/* Desktop Navigation Tabs */}
      <nav className="hidden lg:block bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">
            <div className="flex space-x-2 flex-1">
              {navigationLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-5 py-2.5 rounded-lg font-body text-base font-bold transition-all whitespace-nowrap ${isActive(link.to)}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>


      {/* Mobile Navigation Menu */}
      {showMobileMenu && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
            onClick={() => setShowMobileMenu(false)}
          />
          <div className="fixed top-14 sm:top-16 left-0 right-0 bg-white shadow-xl z-50 lg:hidden max-h-[calc(100vh-3.5rem)] sm:max-h-[calc(100vh-4rem)] overflow-y-auto">
            <nav className="py-2">
              {navigationLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={handleNavClick}
                  className={`block px-6 py-3 font-body text-base font-semibold transition-colors border-l-4 ${
                    location.pathname === link.to
                      ? 'bg-primary/10 text-primary border-primary'
                      : 'text-text hover:bg-background-dark border-transparent'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Mobile-only auth links when not logged in */}
              {!currentUser && (
                <div className="mt-4 px-6 pb-4 space-y-2 border-t pt-4">
                  <Link
                    to="/login"
                    onClick={handleNavClick}
                    className="block w-full text-center bg-primary text-white px-4 py-3 rounded-lg font-medium hover:bg-primary-dark transition"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={handleNavClick}
                    className="block w-full text-center bg-white text-primary border-2 border-primary px-4 py-3 rounded-lg font-medium hover:bg-gray-50 transition"
                  >
                    Create Account
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-8 pb-24 sm:pb-20">
        <Outlet />
      </main>

      {/* Persistent Bottom Navigation Bar - Week/Day Controls */}
      <div 
        className={`fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-r from-primary via-primary-dark to-primary shadow-lg ${readingProgress ? '' : 'border-t-2 border-gold/60'}`}
        style={getProgressBorderStyle() || undefined}
        title={readingProgress ? readingProgress.message : 'Reading Progress'}
      >
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
          {/* Mobile: Two-row layout, Desktop: Single row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 py-2 sm:py-2.5 footer-nav-safe">
            
            {/* Row 1 (Mobile) / Left Section (Desktop): Navigation Controls */}
            <div className="flex items-center justify-center gap-2 w-full sm:w-auto">
              {/* Back Button */}
              <button
                onClick={() => navigateDay('backward')}
                className="flex-shrink-0 p-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all duration-200 active:scale-95"
                title="Previous day"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Week Selector */}
              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-lg px-2 sm:px-3 py-1.5">
                <label htmlFor="nav-week" className="text-xs font-body text-white/90 font-medium whitespace-nowrap">
                  Week
                </label>
                <input
                  id="nav-week"
                  type="number"
                  min="1"
                  max="52"
                  value={selectedWeek}
                  onChange={(e) => setSelectedWeek(Math.min(52, Math.max(1, parseInt(e.target.value) || 1)))}
                  className="w-12 sm:w-14 px-2 py-1.5 border border-white/30 rounded text-sm font-body font-semibold focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold bg-white/95 text-primary"
                />
              </div>

              {/* Day Selector */}
              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-lg px-2 sm:px-3 py-1.5">
                <label htmlFor="nav-day" className="text-xs font-body text-white/90 font-medium whitespace-nowrap">
                  Day
                </label>
                <input
                  id="nav-day"
                  type="number"
                  min="1"
                  max="5"
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(Math.min(5, Math.max(1, parseInt(e.target.value) || 1)))}
                  className="w-10 sm:w-12 px-2 py-1.5 border border-white/30 rounded text-sm font-body font-semibold focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold bg-white/95 text-primary"
                />
              </div>

              {/* Forward Button */}
              <button
                onClick={() => navigateDay('forward')}
                className="flex-shrink-0 p-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all duration-200 active:scale-95"
                title="Next day"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Divider - Only visible on desktop */}
            <div className="hidden sm:block h-6 w-px bg-white/30"></div>

            {/* Row 2 (Mobile) / Right Section (Desktop): Action Buttons */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto">
              {/* Today Button */}
              <button
                onClick={handleTodayClick}
                className="flex-shrink-0 px-4 py-1.5 bg-gold text-primary-dark rounded-lg hover:bg-gold-light transition-all duration-200 active:scale-95 font-body font-bold text-xs sm:text-sm flex items-center gap-1.5"
                title="Go to today"
              >
                <Calendar className="w-4 h-4" />
                <span>Today</span>
              </button>

              {/* Next Unread Button - Only show if user is behind */}
              {nextUnread && todayPosition && 
               (nextUnread.week < todayPosition.week || 
                (nextUnread.week === todayPosition.week && nextUnread.day < todayPosition.day)) && (
                <button
                  onClick={handleNextUnreadClick}
                  className="flex-shrink-0 px-4 py-1.5 text-white rounded-lg transition-all duration-200 active:scale-95 font-body font-bold text-xs sm:text-sm flex items-center gap-1.5"
                  style={{ backgroundColor: '#922c1f' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#7a2419'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#922c1f'}
                  title={`Go to next unread reading (Week ${nextUnread.week}, Day ${nextUnread.day})`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Next</span>
                </button>
              )}

              {/* Divider - Only visible on desktop */}
              <div className="hidden sm:block h-6 w-px bg-white/30"></div>

              {/* Bible Translation Selector */}
              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-lg px-2 sm:px-3 py-1.5">
                <label htmlFor="footer-translation" className="text-xs font-body text-white/90 font-medium whitespace-nowrap hidden sm:inline">
                  Bible
                </label>
                <select
                  id="footer-translation"
                  value={preferences?.bibleTranslation || 'ESV'}
                  onChange={(e) => updatePreferences({ bibleTranslation: e.target.value as Translation })}
                  className="px-2 py-1.5 border border-white/30 rounded text-sm font-body font-semibold focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold bg-white/95 text-primary"
                  title="Select Bible translation"
                >
                  {translations.map((translation) => (
                    <option key={translation} value={translation}>
                      {translation}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
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

      {/* Install Instructions Modal */}
      <InstallInstructionsModal 
        isOpen={showInstallModal}
        onClose={() => setShowInstallModal(false)}
      />

      {/* Contact Modal */}
      <ContactModal 
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
      />
    </div>
  );
};

export default DashboardLayout;
