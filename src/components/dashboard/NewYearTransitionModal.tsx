import { useState } from 'react';
import { X, Calendar, RefreshCw, Sparkles, AlertCircle } from 'lucide-react';
import { calculateRecoveryStartDate } from '../../utils/dateHelpers';

interface NewYearTransitionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRecoverSchedule: () => Promise<void>;
  onStartFresh: () => Promise<void>;
  snapshot: {
    week: number;
    day: number;
    year: number;
  } | null;
  hasAlreadyReset: boolean; // True if we're past Jan 1 and reset has occurred
}

const NewYearTransitionModal = ({
  isOpen,
  onClose,
  onRecoverSchedule,
  onStartFresh,
  snapshot,
  hasAlreadyReset,
}: NewYearTransitionModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleRecovery = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await onRecoverSchedule();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to recover schedule');
      setIsLoading(false);
    }
  };

  const handleStartFresh = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await onStartFresh();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to update schedule');
      setIsLoading(false);
    }
  };

  const currentYear = new Date().getFullYear();
  const newStartDate = currentYear === 2026 ? 'Monday, January 5, 2026' : `First Monday of ${currentYear}`;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-4 sm:inset-8 md:inset-16 lg:inset-24 z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-full overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 rounded-full p-2">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-heading text-white font-bold">
                {hasAlreadyReset ? '⚠️ Your Reading Plan Has Reset' : '📅 Start of a New Year!'}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="overflow-y-auto p-6 space-y-6">
            {/* Main Message */}
            <div className="space-y-4">
              {hasAlreadyReset ? (
                // Post-reset message
                <div className="bg-amber-50 border-2 border-amber-300 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-text font-body mb-3">
                        Your schedule automatically reset to <span className="font-semibold">Week 1, Day 1</span> on {newStartDate} because you were following the default calendar-based schedule.
                      </p>
                      {snapshot && (
                        <div className="bg-white rounded-lg p-3 border border-amber-200">
                          <p className="text-sm text-text font-body">
                            <span className="font-semibold">Your Previous Position:</span> Week {snapshot.week}, Day {snapshot.day}
                          </p>
                          <p className="text-sm text-text font-body mt-1">
                            <span className="font-semibold">Current Position:</span> Week 1, Day 1
                          </p>
                        </div>
                      )}
                      <p className="text-text font-body mt-3">
                        Don't worry! You can recover your previous progress if you'd like to continue where you left off.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                // Pre-reset message
                <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      {snapshot && (
                        <>
                          <p className="text-text font-body mb-3">
                            You're currently on <span className="font-semibold">Week {snapshot.week}, Day {snapshot.day}</span> of the curriculum.
                          </p>
                          <p className="text-text font-body">
                            Since you're following the default schedule, your reading plan will automatically reset to <span className="font-semibold">Week 1, Day 1</span> on {newStartDate}.
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <p className="text-text font-body">
                <span className="font-semibold">What would you like to do?</span>
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
                <p className="text-red-800 font-body text-sm">{error}</p>
              </div>
            )}

            {/* Options */}
            <div className="space-y-4">
              {/* Option 1: Recover/Keep Progress */}
              <button
                onClick={handleRecovery}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-primary to-accent text-white rounded-lg p-6 hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-left group"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-white/20 rounded-full p-3 group-hover:bg-white/30 transition">
                    <RefreshCw className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-heading font-bold mb-2">
                      {hasAlreadyReset ? '🔄 Recover My Previous Schedule' : '✅ Keep My Current Progress'}
                    </h3>
                    <p className="text-white/90 text-sm font-body">
                      {hasAlreadyReset ? (
                        <>
                          {snapshot && `Return to Week ${snapshot.week}, Day ${snapshot.day}. `}
                          We'll set a custom start date that puts you right back where you were.
                        </>
                      ) : (
                        <>
                          {snapshot && `Continue from Week ${snapshot.week}, Day ${snapshot.day}. `}
                          We'll set a custom start date so your schedule doesn't reset.
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </button>

              {/* Option 2: Start Fresh */}
              <button
                onClick={handleStartFresh}
                disabled={isLoading}
                className="w-full bg-gray-100 text-text rounded-lg p-6 hover:bg-gray-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-left border-2 border-gray-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-gray-300 rounded-full p-3 group-hover:bg-gray-400 transition">
                    <Sparkles className="w-6 h-6 text-gray-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-heading font-bold mb-2 text-text">
                      {hasAlreadyReset ? '✨ Continue with Fresh Start' : '✨ Start Fresh on ' + newStartDate.split(',')[0]}
                    </h3>
                    <p className="text-text-light text-sm font-body">
                      {hasAlreadyReset ? (
                        "Keep the reset and begin anew with Week 1, Day 1. Perfect for a fresh start!"
                      ) : (
                        `Reset to Week 1, Day 1 on ${newStartDate}. A perfect opportunity for a fresh start in the new year!`
                      )}
                    </p>
                  </div>
                </div>
              </button>
            </div>

            {/* Info Box */}
            <div className="bg-gray-50 border border-gray-300 rounded-lg p-4">
              <p className="text-sm text-text-light font-body">
                <span className="font-semibold text-text">💡 Tip:</span> You can always change your start date later in Preferences to customize your reading schedule.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewYearTransitionModal;
