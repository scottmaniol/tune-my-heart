import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getFamilyMembers, createFamilyMember, deleteFamilyMember, updateMemberRole } from '../services/familyService';
import { User } from '../types/user';
import { Users, UserPlus, Trash2, Mail, Calendar, Shield, ShieldOff } from 'lucide-react';

const FamilyManagement = () => {
  const { currentUser } = useAuth();
  const [members, setMembers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  // New member form
  const [newMember, setNewMember] = useState({
    displayName: '',
    email: '',
    password: '',
  });

  // Load family members
  useEffect(() => {
    loadFamilyMembers();
  }, [currentUser]);

  const loadFamilyMembers = async () => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    // If user is head of household but no familyId, create the family
    if (!currentUser.familyId && currentUser.isHeadOfHousehold && currentUser.accountType === 'family') {
      try {
        setLoading(true);
        setMessage({ type: 'error', text: 'Setting up family account...' });
        const { createFamily } = await import('../services/familyService');
        
        // Create family document
        await createFamily(currentUser.uid);
        
        // Refresh user to get updated familyId
        window.location.reload(); // Force reload to get updated user data
        return;
      } catch (error) {
        console.error('Error creating family:', error);
        setMessage({ type: 'error', text: 'Failed to create family account. Please contact support.' });
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
      setMessage({ type: 'error', text: 'Failed to load family members' });
    } finally {
      setLoading(false);
    }
  };

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser?.familyId) {
      setMessage({ type: 'error', text: 'No family account found' });
      return;
    }

    // Validate family plan allows more members
    const maxMembers = 10; // Default for family plan
    if (members.length >= maxMembers) {
      setMessage({ 
        type: 'error', 
        text: `Family plan limited to ${maxMembers} members. Please upgrade or remove a member.` 
      });
      return;
    }

    try {
      setLoading(true);
      setMessage(null);

      await createFamilyMember(
        currentUser.familyId,
        currentUser.uid,
        newMember.displayName,
        newMember.email,
        newMember.password
      );

      setMessage({ type: 'success', text: 'Family member added successfully!' });
      setNewMember({ displayName: '', email: '', password: '' });
      setShowAddForm(false);
      
      // Reload members list
      await loadFamilyMembers();

      // Clear success message after 3 seconds
      setTimeout(() => setMessage(null), 3000);
    } catch (error: any) {
      console.error('Error adding family member:', error);
      setMessage({ 
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
      setMessage(null);

      await deleteFamilyMember(currentUser.familyId, currentUser.uid, memberId);

      setMessage({ type: 'success', text: 'Family member removed successfully' });
      
      // Reload members list
      await loadFamilyMembers();

      // Clear success message after 3 seconds
      setTimeout(() => setMessage(null), 3000);
    } catch (error: any) {
      console.error('Error removing family member:', error);
      setMessage({ 
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
      setMessage(null);

      await updateMemberRole(currentUser.familyId, currentUser.uid, memberId, !currentIsHead);

      setMessage({ 
        type: 'success', 
        text: `${memberName} ${currentIsHead ? 'is no longer' : 'is now'} a family manager` 
      });
      
      // Reload members list
      await loadFamilyMembers();

      // Clear success message after 3 seconds
      setTimeout(() => setMessage(null), 3000);
    } catch (error: any) {
      console.error('Error updating member role:', error);
      setMessage({ 
        type: 'error', 
        text: error.message || 'Failed to update member role. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  // Check if user is head of household
  if (!currentUser?.isHeadOfHousehold || currentUser.accountType !== 'family') {
    return (
      <div className="card">
        <h1 className="text-2xl font-heading text-primary mb-4">Family Management</h1>
        <p className="text-text-light font-body">
          This page is only accessible to family account heads. Please contact support if you believe this is an error.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Users className="text-primary" size={32} />
            <div>
              <h1 className="text-3xl font-heading text-primary">
                Family Management
              </h1>
              <p className="text-text-light font-body">
                Manage your family members ({members.length}/10)
              </p>
            </div>
          </div>

          {!showAddForm && members.length < 10 && (
            <button
              onClick={() => setShowAddForm(true)}
              className="btn-primary flex items-center gap-2"
            >
              <UserPlus size={20} />
              Add Member
            </button>
          )}
        </div>
      </div>

      {/* Message Display */}
      {message && (
        <div
          className={`card ${
            message.type === 'success'
              ? 'bg-green-50 border-green-300'
              : 'bg-red-50 border-red-300'
          }`}
        >
          <p
            className={`font-body ${
              message.type === 'success' ? 'text-green-800' : 'text-red-800'
            }`}
          >
            {message.text}
          </p>
        </div>
      )}

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
        <h2 className="text-xl font-heading text-primary mb-4">
          Family Members
        </h2>

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
    </div>
  );
};

export default FamilyManagement;
