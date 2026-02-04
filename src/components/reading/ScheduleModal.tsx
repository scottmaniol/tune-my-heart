import { useState, useEffect } from 'react';
import { X, Calendar, CheckCircle2 } from 'lucide-react';
import { useProgress } from '../../hooks/useProgress';
import { useCurrentWeek } from '../../hooks/useCurrentWeek';
import { useUserPreferences } from '../../contexts/UserPreferencesContext';
import { getDateForWeekDay, formatDate, getDayName } from '../../utils/dateHelpers';
import { getReading } from '../../data/readingSchedule';
import { getWholeBibleReading } from '../../data/wholeBibleSchedule';
import { expandBookNames } from '../../utils/bibleBooks';

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDay: (week: number, day: number) => void;
}

const ScheduleModal = ({ isOpen, onClose, onSelectDay }: ScheduleModalProps) => {
  const { progress, isComplete, markComplete, markIncomplete } = useProgress();
  const { startDate } = useCurrentWeek();
  const { preferences } = useUserPreferences();
  
  // Find first incomplete week to expand by default
  const getFirstIncompleteWeek = (): number => {
    for (let week = 1; week <= 52; week++) {
      for (let day = 1; day <= 5; day++) {
        if (!isComplete(week, day)) {
          return week;
        }
      }
    }
    return 1; // Default to week 1 if all complete
  };
  
  const [expandedWeeks, setExpandedWeeks] = useState<Set<number>>(new Set([1]));

  // Update expanded week when modal opens with progress data
  useEffect(() => {
    if (isOpen && progress) {
      const firstIncompleteWeek = getFirstIncompleteWeek();
      setExpandedWeeks(new Set([firstIncompleteWeek]));
    }
  }, [isOpen, progress]);

  if (!isOpen) return null;

  const toggleWeek = (weekNum: number) => {
    const newExpanded = new Set(expandedWeeks);
    if (newExpanded.has(weekNum)) {
      newExpanded.delete(weekNum);
    } else {
      newExpanded.add(weekNum);
    }
    setExpandedWeeks(newExpanded);
  };

  const handleDayClick = (week: number, day: number) => {
    onSelectDay(week, day);
    onClose();
  };

  const handleToggleComplete = async (e: React.ChangeEvent<HTMLInputElement>, week: number, day: number, reading: any) => {
    e.stopPropagation();
    const completed = isComplete(week, day);
    
    if (completed) {
      await markIncomplete(week, day);
    } else {
      const reference = reading?.reference || `Reading ${week}-${day}`;
      await markComplete(week, day, reference, preferences?.bibleTranslation || 'ESV');
    }
  };

  // Calculate total completion statistics
  const totalReadings = 52 * 5; // 260 readings total
  const completedCount = progress
    ? Object.values(progress.completedReadings).filter((r) => r && r.completed).length
    : 0;
  const completionPercentage = Math.round((completedCount / totalReadings) * 100);

  const getWeekTitle = (weekNum: number) => {
    const firstDayReading = preferences?.readingPlan === 'wholeBible'
      ? getWholeBibleReading(weekNum, 1)
      : getReading(weekNum, 1);
    return firstDayReading?.title || `Week ${weekNum}`;
  };

  const getWeekSchedule = (weekNum: number) => {
    return Array.from({ length: 5 }, (_, i) => {
      const day = i + 1;
      const date = getDateForWeekDay(startDate, weekNum, day);
      const completed = isComplete(weekNum, day);
      const reading = preferences?.readingPlan === 'wholeBible'
        ? getWholeBibleReading(weekNum, day)
        : getReading(weekNum, day);
      const reference = reading?.reference || `Week ${weekNum}, Day ${day}`;
      const expandedReference = expandBookNames(reference);
      const title = reading?.title || '';
      
      return {
        week: weekNum,
        day,
        date,
        reference: expandedReference,
        title,
        completed,
        dayName: getDayName(day),
        reading,
      };
    });
  };

  const getWeekCompletionStats = (weekNum: number) => {
    const schedule = getWeekSchedule(weekNum);
    const completed = schedule.filter(entry => entry.completed).length;
    return { completed, total: 5, percentage: (completed / 5) * 100 };
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 bg-primary text-white">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <h2 className="text-xl font-heading font-bold">Full Reading Schedule</h2>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-primary-dark rounded-lg p-2 transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span>
                {completedCount} of {totalReadings} readings complete
              </span>
              <span className="font-bold">
                {completionPercentage}%
              </span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            <p className="text-xs text-white/80">
              Started on {formatDate(startDate)}
            </p>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {Array.from({ length: 52 }, (_, i) => {
              const weekNum = i + 1;
              const isExpanded = expandedWeeks.has(weekNum);
              const weekStats = getWeekCompletionStats(weekNum);
              const weekTitle = getWeekTitle(weekNum);

              return (
                <div key={weekNum} className="border border-gray-200 rounded-lg overflow-hidden">
                  {/* Week Header */}
                  <button
                    onClick={() => toggleWeek(weekNum)}
                    className="w-full p-2.5 bg-gray-50 hover:bg-gray-100 transition flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center ${
                        weekStats.completed === 5 
                          ? 'bg-green-100 text-green-700'
                          : weekStats.completed > 0
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {weekStats.completed === 5 ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          <span className="text-xs font-bold">{weekNum}</span>
                        )}
                      </div>
                      <div className="text-left">
                        <h3 className="font-heading font-medium text-sm text-gray-900">
                          Week {weekNum}{weekTitle && `: ${weekTitle}`}
                        </h3>
                        <p className="text-[10px] text-gray-500">
                          {weekStats.completed} of {weekStats.total} days complete
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full transition-all ${
                            weekStats.percentage === 100 ? 'bg-green-500' : 'bg-blue-500'
                          }`}
                          style={{ width: `${weekStats.percentage}%` }}
                        />
                      </div>
                      <svg
                        className={`w-4 h-4 text-gray-400 transition-transform ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>

                  {/* Week Days */}
                  {isExpanded && (
                    <div className="divide-y divide-gray-100">
                      {getWeekSchedule(weekNum).map((entry) => (
                        <div
                          key={`${entry.week}-${entry.day}`}
                          className={`p-2 hover:bg-gray-50 transition cursor-pointer ${
                            entry.completed ? 'bg-green-50/50' : ''
                          }`}
                          onClick={() => handleDayClick(entry.week, entry.day)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2 flex-1">
                              {/* Checkbox */}
                              <input
                                type="checkbox"
                                checked={entry.completed}
                                onChange={(e) => handleToggleComplete(e, entry.week, entry.day, entry.reading)}
                                onClick={(e) => e.stopPropagation()}
                                className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500 cursor-pointer flex-shrink-0"
                              />
                              
                              {/* Day Info */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-1.5">
                                  <h4 className="font-body font-medium text-xs text-gray-900">
                                    {entry.dayName}
                                  </h4>
                                  {entry.title && (
                                    <span className="text-[11px] text-gray-600">• {entry.title}</span>
                                  )}
                                </div>
                                <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[10px] text-gray-500 mt-0.5">
                                  <span>{formatDate(entry.date)}</span>
                                  <span>•</span>
                                  <span className="font-mono">{entry.reference}</span>
                                </div>
                              </div>
                            </div>

                            {/* Status Indicator */}
                            {entry.completed && (
                              <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 ml-2" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between text-[10px] text-gray-600">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1.5">
                <div className="w-3 h-3 bg-green-100 rounded" />
                <span>Complete</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <div className="w-3 h-3 bg-blue-100 rounded" />
                <span>In Progress</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <div className="w-3 h-3 bg-gray-200 rounded" />
                <span>Not Started</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="btn-secondary"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleModal;
