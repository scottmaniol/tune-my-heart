import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getFamilyMembers, createFamilyMember, deleteFamilyMember, updateMemberRole } from '../../services/familyService';
import { getJournalEntriesForUser } from '../../services/journalService';
import { User } from '../../types/user';
import { JournalEntry } from '../../types/journal';
import { Users, UserPlus, Trash2, Mail, Calendar, Shield, ShieldOff, Book, ChevronRight, FileText, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface FamilyTabsProps {
  onMessage: (message: { type: 'success' | 'error'; text: string } | null) => void;
}

const FamilyTabs = ({ onMessage }:FamilyTabsProps) => {
  const { currentUser } = useAuth();
  const [activeSubTab, setActiveSubTab] = useState<'management' | 'progress'>('management');
  const [members, setMembers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Management tab state
  const [newMember, setNewMember] = useState({
    displayName: '',
    email: '',
    password: '',
  });

  // Progress tab state
  const [selectedMember, setSelectedMember] = useState<User | null>(null);
  const [memberEntries, setMemberEntries] = useState<JournalEntry[]>([]);
  const [entriesLoading, setEntriesLoading] = useState(false);
  const [showingCount, setShowingCount] = useState(20);
  const [viewMode, setViewMode] = useState<'reflections' | 'calendar'>('reflections');

  // Load family members
  useEffect(() => {
    loadFamilyMembers();
  }, [currentUser]);

  const loadFamilyMembers = async () => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    if (!currentUser.familyId && currentUser.isHeadOfHousehold && currentUser.accountType === 'family') {
      try {
        setLoading(true);
        onMessage({ type: 'error', text: 'Setting up family account...' });
        const { createFamily } = await import('../../services/familyService');
        
        await createFamily(currentUser.uid);
        window.location.reload();
        return;
      } catch (error) {
        console.error('Error creating family:', error);
        onMessage({ type: 'error', text: 'Failed to create family account. Please contact support.' });
        setLoading(false);
        return;
      }
    }

    if (!currentUser.familyId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const familyMembers = await getFamilyMembers(currentUser.familyId);
      setMembers(familyMembers);
    } catch (error) {
      console.error('Error loading family members:', error);
      onMessage({ type: 'error', text: 'Failed to load family members' });
    } finally {
      setLoading(false);
    }
  };

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser?.familyId) {
      onMessage({ type: 'error', text: 'No family account found' });
      return;
    }

    const maxMembers = 6;
    if (members.length >= maxMembers) {
      onMessage({ 
        type: 'error', 
        text: `Family plan limited to ${maxMembers} members. Please upgrade or remove a member.` 
      });
      return;
    }

    try {
      setLoading(true);
      onMessage(null);

      await createFamilyMember(
        currentUser.familyId,
        currentUser.uid,
        newMember.displayName,
        newMember.email,
        newMember.password
      );

      onMessage({ type: 'success', text: 'Family member added successfully!' });
      setNewMember({ displayName: '', email: '', password: '' });
      setShowAddForm(false);
      
      await loadFamilyMembers();
      setTimeout(() => onMessage(null), 3000);
    } catch (error: any) {
      console.error('Error adding family member:', error);
      onMessage({ 
        type: 'error', 
        text: error.message || 'Failed to add family member. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveMember = async (memberId: string, memberName: string) => {
    if (!currentUser?.familyId) return;

    const confirmed = window.confirm(
      `Are you sure you want to remove ${memberName} from the family account? This action cannot be undone.`
    );

    if (!confirmed) return;

    try {
      setLoading(true);
      onMessage(null);

      await deleteFamilyMember(currentUser.familyId, currentUser.uid, memberId);

      onMessage({ type: 'success', text: 'Family member removed successfully' });
      await loadFamilyMembers();
      setTimeout(() => onMessage(null), 3000);
    } catch (error: any) {
      console.error('Error removing family member:', error);
      onMessage({ 
        type: 'error', 
        text: error.message || 'Failed to remove family member. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleToggleRole = async (memberId: string, memberName: string, currentIsHead: boolean) => {
    if (!currentUser?.familyId) return;

    const action = currentIsHead ? 'remove manager access from' : 'make a co-manager';
    const confirmed = window.confirm(
      `Are you sure you want to ${action} ${memberName}? ${
        currentIsHead 
          ? 'They will no longer be able to add or remove family members.'
          : 'They will be able to add and remove family members.'
      }`
    );

    if (!confirmed) return;

    try {
      setLoading(true);
      onMessage(null);

      await updateMemberRole(currentUser.familyId, currentUser.uid, memberId, !currentIsHead);

      onMessage({ 
        type: 'success', 
        text: `${memberName} ${currentIsHead ? 'is no longer' : 'is now'} a family manager` 
      });
      
      await loadFamilyMembers();
      setTimeout(() => onMessage(null), 3000);
    } catch (error: any) {
      console.error('Error updating member role:', error);
      onMessage({ 
        type: 'error', 
        text: error.message || 'Failed to update member role. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  const loadMemberEntries = async (member: User) => {
    setSelectedMember(member);
    setEntriesLoading(true);
    
    try {
      const entries = await getJournalEntriesForUser(member.uid);
      setMemberEntries(entries);
    } catch (error) {
      console.error('Error loading member entries:', error);
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
    return Math.round((completedCount / totalReadings) * 100);
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 75) return 'bg-green-500';
    if (percentage >= 50) return 'bg-blue-500';
    if (percentage >= 25) return 'bg-yellow-500';
    return 'bg-gray-400';
  };

  if (!currentUser?.isHeadOfHousehold || currentUser.accountType !== 'family') {
    return (
      <div className="card">
        <h2 className="text-xl font-heading text-primary mb-4">Family Management</h2>
        <p className="text-text-light font-body">
          This section is only accessible to family account managers.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Sub-Tab Navigation */}
      <div className="card">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveSubTab('management')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-body font-semibold transition ${
              activeSubTab === 'management'
                ? 'bg-primary text-white'
                : 'text-text hover:bg-gray-100'
            }`}
          >
            <Users size={20} />
            Member Management
          </button>
          <button
            onClick={() => setActiveSubTab('progress')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-body font-semibold transition ${
              activeSubTab === 'progress'
                ? 'bg-primary text-white'
                : 'text-text hover:bg-gray-100'
            }`}
          >
            <TrendingUp size={20} />
            Progress Tracking
          </button>
        </div>
      </div>

      {activeSubTab === 'management' ? (
        <>
          {/* Add Member Form */}
          {showAddForm && (
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-heading text-primary">Add Family Member</h2>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setNewMember({ displayName: '', email: '', password: '' });
                  }}
                  className="text-text-light hover:text-text"
                >
                  ✕ Cancel
                </button>
              </div>

              <form onSubmit={handleAddMember} className="space-y-4">
                <div>
                  <label className="block text-sm font-body text-text mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={newMember.displayName}
                    onChange={(e) => setNewMember({ ...newMember, displayName: e.target.value })}
                    required
                    className="input-field"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-body text-text mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={newMember.email}
                    onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                    required
                    className="input-field"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-body text-text mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={newMember.password}
                    onChange={(e) => setNewMember({ ...newMember, password: e.target.value })}
                    required
                    minLength={6}
                    className="input-field"
                    placeholder="Minimum 6 characters"
                  />
                  <p className="text-xs text-text-light font-body mt-1">
                    The member can change this password after logging in
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary disabled:opacity-50"
                  >
                    {loading ? 'Adding...' : 'Add Member'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddForm(false);
                      setNewMember({ displayName: '', email: '', password: '' });
                    }}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Family Members List */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-heading text-primary">
                Family Members ({members.length}/6)
              </h2>
              {!showAddForm && members.length < 6 && (
                <button
                  onClick={() => setShowAddForm(true)}
                  className="btn-primary flex items-center gap-2"
                >
                  <UserPlus size={20} />
                  Add Member
                </button>
              )}
            </div>

            {loading && members.length === 0 ? (
              <p className="text-text-light font-body text-center py-8">
                Loading family members...
              </p>
            ) : members.length === 0 ? (
              <div className="text-center py-8">
                <Users className="w-16 h-16 mx-auto text-text-light mb-4" />
                <p className="text-text-light font-body mb-4">
                  No family members added yet
                </p>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <UserPlus size={20} />
                  Add Your First Member
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {members.map((member) => (
                  <div
                    key={member.uid}
                    className="flex items-center justify-between p-4 bg-background-dark rounded-lg border border-gray-200"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center">
                        <span className="text-lg font-heading">
                          {member.displayName.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-body text-text font-semibold">
                            {member.displayName}
                          </h3>
                          {member.isHeadOfHousehold && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                              <Shield size={12} />
                              Manager
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-text-light font-body mt-1">
                          <div className="flex items-center gap-1">
                            <Mail size={14} />
                            {member.email}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            Added {new Date(member.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleRole(member.uid, member.displayName, member.isHeadOfHousehold)}
                        disabled={loading}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition disabled:opacity-50 ${
                          member.isHeadOfHousehold
                            ? 'text-orange-600 hover:bg-orange-50'
                            : 'text-blue-600 hover:bg-blue-50'
                        }`}
                        title={member.isHeadOfHousehold ? 'Remove manager access' : 'Make co-manager'}
                      >
                        {member.isHeadOfHousehold ? <ShieldOff size={18} /> : <Shield size={18} />}
                        {member.isHeadOfHousehold ? 'Remove Manager' : 'Make Manager'}
                      </button>
                      
                      <button
                        onClick={() => handleRemoveMember(member.uid, member.displayName)}
                        disabled={loading}
                        className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition disabled:opacity-50"
                      >
                        <Trash2 size={18} />
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info Card */}
          <div className="card bg-blue-50 border border-blue-200">
            <h3 className="font-heading text-primary mb-2">📌 Family Account Details</h3>
            <ul className="text-sm text-text-light font-body space-y-1 list-disc list-inside">
              <li>Family plans include up to 10 members</li>
              <li>Each member gets their own login credentials</li>
              <li>Members can track their own progress independently</li>
              <li>All members share access to premium content</li>
              <li>You can designate other members as co-managers</li>
              <li>Managers can add and remove family members</li>
            </ul>
          </div>
        </>
      ) : (
        // Progress Tab
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
                              // Check actual completed readings, not just journal entries
                              const readingKey = `${weekNum}-${day}`;
                              const isCompleted = selectedMember?.progress?.completedReadings?.[readingKey]?.completed || false;
                              return (
                                <div
                                  key={day}
                                  className={`text-xs px-2 py-1 rounded ${
                                    isCompleted
                                      ? 'bg-green-100 text-green-800'
                                      : 'bg-gray-100 text-gray-400'
                                  }`}
                                >
                                  Day {day} {isCompleted && '✓'}
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
      )}
    </div>
  );
};

export default FamilyTabs;
