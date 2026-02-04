import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getFamilyMembers } from '../services/familyService';
import { getJournalEntriesForUser } from '../services/journalService';
import { User } from '../types/user';
import { JournalEntry } from '../types/journal';
import { Users, Book, Calendar, ChevronRight, FileText, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const FamilyProgress = () => {
  const { currentUser } = useAuth();
  const [members, setMembers] = useState<User[]>([]);
  const [selectedMember, setSelectedMember] = useState<User | null>(null);
  const [memberEntries, setMemberEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [entriesLoading, setEntriesLoading] = useState(false);
  const [showingCount, setShowingCount] = useState(20);
  const [viewMode, setViewMode] = useState<'reflections' | 'calendar'>('reflections');

  useEffect(() => {
    loadFamilyMembers();
  }, [currentUser]);

  const loadFamilyMembers = async () => {
    if (!currentUser?.familyId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const familyMembers = await getFamilyMembers(currentUser.familyId);
      setMembers(familyMembers);
    } catch (error) {
      console.error('Error loading family members:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMemberEntries = async (member: User) => {
    setSelectedMember(member);
    setEntriesLoading(true);
    
    try {
      console.log('Loading entries for member:', member.uid, member.displayName);
      const entries = await getJournalEntriesForUser(member.uid);
      console.log('Loaded entries:', entries.length, entries);
      setMemberEntries(entries);
    } catch (error) {
      console.error('Error loading member entries:', error);
      console.error('Error details:', error);
      setMemberEntries([]);
    } finally {
      setEntriesLoading(false);
    }
  };

  const getProgressPercentage = (member: User) => {
    if (!member.progress) return 0;
    
    const completedReadings = member.progress.completedReadings || {};
    let completedCount = 0;
    
    // Count actual completed readings
    for (const key in completedReadings) {
      if (completedReadings[key]?.completed) {
        completedCount++;
      }
    }
    
    const totalReadings = 52 * 5; // 260 total days (52 weeks × 5 days)
    const percentage = Math.round((completedCount / totalReadings) * 100);
    
    // Debug logging
    console.log(`Progress for ${member.displayName}:`, {
      completedCount,
      totalReadings,
      percentage,
      completedReadingsKeys: Object.keys(completedReadings)
    });
    
    return percentage;
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 75) return 'bg-green-500';
    if (percentage >= 50) return 'bg-blue-500';
    if (percentage >= 25) return 'bg-yellow-500';
    return 'bg-gray-400';
  };

  // Check if user is head of household
  if (!currentUser?.isHeadOfHousehold || currentUser.accountType !== 'family') {
    return (
      <div className="card">
        <h1 className="text-2xl font-heading text-primary mb-4">Family Progress</h1>
        <p className="text-text-light font-body">
          This page is only accessible to family account managers.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="card">
        <p className="text-center text-text-light">Loading family progress...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card">
        <div className="flex items-center gap-3">
          <TrendingUp className="text-primary" size={32} />
          <div>
            <h1 className="text-3xl font-heading text-primary">Family Progress Dashboard</h1>
            <p className="text-text-light font-body">
              Track Bible reading progress and reflections for {members.length} family members
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Members List */}
        <div className="lg:col-span-1">
          <div className="card">
            <h2 className="text-xl font-heading text-primary mb-4 flex items-center gap-2">
              <Users size={24} />
              Family Members
            </h2>

            <div className="space-y-3">
              {members.map((member) => {
                const progressPercent = getProgressPercentage(member);
                const isSelected = selectedMember?.uid === member.uid;

                return (
                  <motion.button
                    key={member.uid}
                    onClick={() => loadMemberEntries(member)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full text-left p-4 rounded-lg border-2 transition ${
                      isSelected
                        ? 'border-primary bg-blue-50'
                        : 'border-gray-200 hover:border-primary hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center">
                          <span className="font-heading">
                            {member.displayName.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-body font-semibold text-text">
                            {member.displayName}
                          </h3>
                          <p className="text-xs text-text-light">
                            Week {member.progress?.currentWeek || 1}, Day {member.progress?.currentDay || 1}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="text-text-light" size={20} />
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${getProgressColor(progressPercent)}`}
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                    <p className="text-xs text-text-light mt-1">{progressPercent}% Complete</p>
                  </motion.button>
                );
              })}

              {members.length === 0 && (
                <p className="text-center text-text-light py-8 font-body">
                  No family members yet
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Member Details & Reflections */}
        <div className="lg:col-span-2">
          {!selectedMember ? (
            <div className="card text-center py-16">
              <Book className="w-16 h-16 mx-auto text-text-light mb-4" />
              <h3 className="text-xl font-heading text-text mb-2">
                Select a Family Member
              </h3>
              <p className="text-text-light font-body">
                Choose a family member to view their progress and reflections
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Member Info Card */}
              <div className="card bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-heading text-primary mb-1">
                      {selectedMember.displayName}'s Progress
                    </h2>
                    <p className="text-text-light font-body">
                      {selectedMember.email}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-heading text-primary">
                      {getProgressPercentage(selectedMember)}%
                    </div>
                    <p className="text-sm text-text-light">Complete</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-text-light text-sm font-body mb-1">Current Week</p>
                    <p className="text-2xl font-heading text-primary">
                      {selectedMember.progress?.currentWeek || 1}
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-text-light text-sm font-body mb-1">Current Day</p>
                    <p className="text-2xl font-heading text-primary">
                      {selectedMember.progress?.currentDay || 1}
                    </p>
                  </div>
                </div>
              </div>

              {/* Reflections & Schedule */}
              <div className="card">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setViewMode('reflections')}
                      className={`px-4 py-2 rounded-lg font-body text-sm font-semibold transition ${
                        viewMode === 'reflections'
                          ? 'bg-primary text-white'
                          : 'text-text hover:bg-gray-100'
                      }`}
                    >
                      <FileText className="inline mr-2" size={16} />
                      Reflections ({memberEntries.length})
                    </button>
                    <button
                      onClick={() => setViewMode('calendar')}
                      className={`px-4 py-2 rounded-lg font-body text-sm font-semibold transition ${
                        viewMode === 'calendar'
                          ? 'bg-primary text-white'
                          : 'text-text hover:bg-gray-100'
                      }`}
                    >
                      <Calendar className="inline mr-2" size={16} />
                      Schedule
                    </button>
                  </div>
                </div>

                {entriesLoading ? (
                  <p className="text-center py-8 text-text-light">Loading...</p>
                ) : viewMode === 'calendar' ? (
                  <div className="grid grid-cols-5 gap-2 max-h-[600px] overflow-y-auto">
                    {Array.from({ length: 52 }, (_, week) => week + 1).map((weekNum) => (
                      <div key={weekNum} className="border rounded-lg p-3">
                        <p className="font-semibold text-xs text-primary mb-2">Week {weekNum}</p>
                        <div className="space-y-1">
                          {[1, 2, 3, 4, 5].map((day) => {
                            const hasEntry = memberEntries.some(
                              (e) => e.weekNumber === weekNum && e.dayNumber === day
                            );
                            return (
                              <div
                                key={day}
                                className={`text-xs px-2 py-1 rounded ${
                                  hasEntry
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-gray-100 text-gray-400'
                                }`}
                              >
                                Day {day} {hasEntry && '✓'}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : memberEntries.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 mx-auto text-text-light mb-3" />
                    <p className="text-text-light font-body">No reflections yet</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 max-h-[600px] overflow-y-auto">
                      {memberEntries.slice(0, showingCount).map((entry) => (
                        <motion.div
                          key={entry.entryId}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <Calendar size={16} className="text-primary" />
                              <span className="text-sm font-medium text-text">
                                {new Date(entry.createdAt).toLocaleDateString('en-US', {
                                  weekday: 'short',
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                })}
                              </span>
                            </div>
                            <span className="text-xs text-text-light">
                              Week {entry.weekNumber}, Day {entry.dayNumber}
                            </span>
                          </div>
                          
                          <p className="text-xs font-medium text-primary mb-2">
                            {entry.planType === 'narrative' ? '📖 Narrative' : '📚 Whole Bible'}
                          </p>
                          
                          {entry.questionAnswers && entry.questionAnswers.length > 0 && (
                            <div className="space-y-2 mb-3">
                              {entry.questionAnswers.map((qa, idx) => (
                                <div key={idx} className="text-sm">
                                  <p className="font-medium text-text-light">{qa.question}</p>
                                  <p className="text-text mt-1">{qa.answer}</p>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          {entry.freeformNotes && (
                            <div className="mt-3 pt-3 border-t border-gray-300">
                              <p className="text-xs text-text-light mb-1 font-medium">Notes:</p>
                              <p className="text-text font-body text-sm whitespace-pre-wrap">
                                {entry.freeformNotes}
                              </p>
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                    {showingCount < memberEntries.length && (
                      <div className="mt-4 text-center">
                        <button
                          onClick={() => setShowingCount(showingCount + 20)}
                          className="btn-primary"
                        >
                          Load More ({memberEntries.length - showingCount} remaining)
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FamilyProgress;
