import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { useProgress } from '../hooks/useProgress';
import { useCurrentWeek } from '../hooks/useCurrentWeek';
import { useUserPreferences } from '../contexts/UserPreferencesContext';
import { getDateForWeekDay, formatDate, getDayName } from '../utils/dateHelpers';
import { getReading } from '../data/readingSchedule';
import { getWholeBibleReading } from '../data/wholeBibleSchedule';
import { expandBookNames } from '../utils/bibleBooks';

const Schedule = () => {
  const { progress, isComplete } = useProgress();
  const { startDate } = useCurrentWeek();
  const { preferences } = useUserPreferences();
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);

  // Calculate total completion statistics
  const totalReadings = 52 * 5; // 260 readings total
  const completedCount = progress
    ? Object.values(progress.completedReadings).filter((r) => r.completed).length
    : 0;
  const completionPercentage = Math.round((completedCount / totalReadings) * 100);

  // Generate schedule entries for a specific week
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
      };
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-heading text-primary mb-2">
          Full Reading Schedule
        </h1>
        <p className="text-text-light font-body">
          52 Weeks • 260 Days • Track Your Progress
        </p>
      </div>

      {/* Progress Overview */}
      <div className="card">
        <h2 className="text-xl font-heading text-primary mb-4">Your Progress</h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-body text-text">
                {completedCount} of {totalReadings} readings complete
              </span>
              <span className="text-sm font-body font-bold text-primary">
                {completionPercentage}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-primary h-3 rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
          <p className="text-xs text-text-light font-body">
            Started on {formatDate(startDate)}
          </p>
        </div>
      </div>

      {/* Week Grid */}
      <div className="card">
        <h2 className="text-xl font-heading text-primary mb-4">Select a Week</h2>
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-10 lg:grid-cols-13 gap-2">
          {Array.from({ length: 52 }, (_, i) => {
            const weekNum = i + 1;
            const weekCompleted = Array.from({ length: 5 }, (_, j) => j + 1).every((day) =>
              isComplete(weekNum, day)
            );
            const weekInProgress = Array.from({ length: 5 }, (_, j) => j + 1).some((day) =>
              isComplete(weekNum, day)
            );

            return (
              <button
                key={weekNum}
                onClick={() => setSelectedWeek(selectedWeek === weekNum ? null : weekNum)}
                className={`
                  px-3 py-2 rounded-lg font-body text-sm transition-colors
                  ${selectedWeek === weekNum 
                    ? 'bg-primary text-white' 
                    : weekCompleted
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : weekInProgress
                    ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }
                `}
              >
                W{weekNum}
              </button>
            );
          })}
        </div>
        <div className="mt-4 flex items-center space-x-4 text-xs font-body text-text-light">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-100 rounded" />
            <span>Complete</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-100 rounded" />
            <span>In Progress</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-100 rounded" />
            <span>Not Started</span>
          </div>
        </div>
      </div>

      {/* Week Details */}
      {selectedWeek && (
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-heading text-primary">
              Week {selectedWeek} Details
            </h2>
            <button
              onClick={() => setSelectedWeek(null)}
              className="text-text-light hover:text-text"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="space-y-3">
            {getWeekSchedule(selectedWeek).map((entry) => (
              <Link
                key={`${entry.week}-${entry.day}`}
                to={`/reading?week=${entry.week}&day=${entry.day}`}
                className={`
                  block p-4 rounded-lg border-2 transition-all hover:shadow-md
                  ${entry.completed 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-white border-gray-200 hover:border-primary'
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      {entry.completed && (
                        <Check className="w-5 h-5 text-green-600" />
                      )}
                      <div>
                        <h3 className="font-heading text-text">
                          Day {entry.day} - {entry.dayName}
                        </h3>
                        <p className="text-sm text-text-light font-body">
                          {formatDate(entry.date)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-body text-text-light">
                      {entry.reference}
                    </p>
                    <span className="text-xs text-primary font-body">
                      Read →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Back Button */}
      <div className="card">
        <Link to="/reading" className="btn-secondary w-full text-center">
          ← Back to Reading Plan
        </Link>
      </div>
    </div>
  );
};

export default Schedule;
