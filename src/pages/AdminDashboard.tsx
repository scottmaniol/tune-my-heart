import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  UserCheck, 
  UserX, 
  Search,
  Shield,
  Edit2,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  ArrowLeft,
  BookOpen,
  Plus,
  Link as LinkIcon,
  FileText,
  GripVertical,
  Mail,
  MailCheck
} from 'lucide-react';
import { getAllUsers, updateSubscription, updateUserRole, deleteUser, createUserByAdmin, updateUserPlan, sendWelcomeEmailManually } from '../services/userService';
import { User, SubscriptionStatus, SubscriptionPlan, AccountType } from '../types/user';
import { Resource } from '../data/resourcesData';
import { resourceService } from '../services/resourceService';
import ResourceForm from '../components/admin/ResourceForm';
import AddUserModal from '../components/admin/AddUserModal';

interface Stats {
  totalUsers: number;
  paidSubscribers: number; // Users who are actually paying (individual + family heads)
  activeSubscriptions: number;
  trialUsers: number;
  freeUsers: number;
  individualSubscriptions: number;
  familySubscriptions: number; // Paying family heads only
  addedFamilyMembers: number; // Non-paying family members
}

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'resources'>('users');
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    paidSubscribers: 0,
    activeSubscriptions: 0,
    trialUsers: 0,
    freeUsers: 0,
    individualSubscriptions: 0,
    familySubscriptions: 0,
    addedFamilyMembers: 0,
  });
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showAddUser, setShowAddUser] = useState(false);

  // Resources management state
  const [resources, setResources] = useState<(Resource & { id: string })[]>([]);
  const [editingResource, setEditingResource] = useState<(Resource & { id: string }) | null>(null);
  const [showAddResource, setShowAddResource] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [newResourceImageFile, setNewResourceImageFile] = useState<File | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  useEffect(() => {
    loadUsers();
    loadResources();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, searchTerm, filterStatus]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const allUsers = await getAllUsers();
      setUsers(allUsers);
      calculateStats(allUsers);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadResources = async () => {
    try {
      const data = await resourceService.getAllResources();
      setResources(data);
    } catch (error) {
      console.error('Error loading resources:', error);
    }
  };

  const handleAddResource = async (resource: Omit<Resource, 'id'>) => {
    try {
      const resourceId = await resourceService.addResource(resource);
      
      // If a new image file was selected, upload it
      if (newResourceImageFile && resourceId) {
        const imageUrl = await resourceService.uploadCoverImage(newResourceImageFile, resourceId);
        await resourceService.updateResource(resourceId, { coverImage: imageUrl });
        setNewResourceImageFile(null);
      }
      
      await loadResources();
      setShowAddResource(false);
      alert('Resource added successfully!');
    } catch (error) {
      console.error('Error adding resource:', error);
      alert('Failed to add resource');
    }
  };

  const handleNewResourceImageSelect = (file: File) => {
    setNewResourceImageFile(file);
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      return;
    }

    const newResources = [...resources];
    const [draggedResource] = newResources.splice(draggedIndex, 1);
    newResources.splice(dropIndex, 0, draggedResource);

    // Update local state immediately for better UX
    setResources(newResources);
    setDraggedIndex(null);

    // Update order in Firestore
    try {
      const updates = newResources.map((resource, index) => ({
        id: resource.id,
        order: index
      }));

      await resourceService.updateResourcesOrder(updates);
      await loadResources();
    } catch (error) {
      console.error('Error updating resource order:', error);
      alert('Failed to update resource order');
      // Reload to restore correct order
      await loadResources();
    }
  };

  const handleUpdateResource = async (id: string, updates: Partial<Omit<Resource, 'id'>>) => {
    try {
      await resourceService.updateResource(id, updates);
      await loadResources();
      setEditingResource(null);
      alert('Resource updated successfully!');
    } catch (error) {
      console.error('Error updating resource:', error);
      alert('Failed to update resource');
    }
  };

  const handleDeleteResource = async (id: string, coverImageUrl?: string) => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      try {
        await resourceService.deleteResource(id, coverImageUrl);
        await loadResources();
        alert('Resource deleted successfully!');
      } catch (error) {
        console.error('Error deleting resource:', error);
        alert('Failed to delete resource');
      }
    }
  };

  const handleImageUpload = async (file: File, resourceId: string) => {
    try {
      setUploadingImage(true);
      const imageUrl = await resourceService.uploadCoverImage(file, resourceId);
      await resourceService.updateResource(resourceId, { coverImage: imageUrl });
      
      // Reload resources to get the updated data from Firestore
      const updatedResources = await resourceService.getAllResources();
      setResources(updatedResources);
      
      // Update the editing resource state to reflect the new image
      const updatedResource = updatedResources.find(r => r.id === resourceId);
      if (updatedResource) {
        setEditingResource(updatedResource);
      }
      
      alert('Image uploaded successfully! Close the dialog to see it in the table.');
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  };

  const calculateStats = (userList: User[]) => {
    // Individual subscriptions = users with subscription.plan === 'individual' (regardless of status)
    const individualSubscriptions = userList.filter(u => u.subscription.plan === 'individual').length;
    
    // Family subscriptions = users with subscription.plan === 'family' who are the original subscriber
    // Original subscriber is the one whose uid === familyId OR legacy: oldest head of household
    const familySubscribers = userList.filter(u => {
      if (u.subscription.plan !== 'family') return false;
      if (!u.familyId) return false;
      
      // Check if this is the original subscriber
      if (u.uid === u.familyId) return true;
      
      // Legacy check: is this the oldest head in the family?
      const familyUsers = userList.filter(fu => fu.familyId === u.familyId && fu.accountType === 'family');
      const hasUserWithMatchingId = familyUsers.some(fu => fu.uid === u.familyId);
      
      if (!hasUserWithMatchingId && u.isHeadOfHousehold) {
        const heads = familyUsers.filter(fu => fu.isHeadOfHousehold);
        heads.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        return heads.length > 0 && heads[0].uid === u.uid;
      }
      
      return false;
    });
    
    const familySubscriptions = familySubscribers.length;
    
    // Added family members = family accountType users who are NOT paying subscribers
    const addedFamilyMembers = userList.filter(u => {
      if (u.accountType !== 'family') return false;
      if (!u.familyId) return false;
      
      // If they're a family subscriber (counted above), they're not an "added" member
      return !familySubscribers.some(fs => fs.uid === u.uid);
    }).length;
    
    const paidSubscribers = individualSubscriptions + familySubscriptions;
    
    const stats: Stats = {
      totalUsers: userList.length,
      paidSubscribers,
      activeSubscriptions: userList.filter(u => u.subscription.status === 'active').length,
      trialUsers: userList.filter(u => u.subscription.status === 'trial').length,
      freeUsers: userList.filter(u => u.subscription.status === 'free').length,
      individualSubscriptions,
      familySubscriptions,
      addedFamilyMembers,
    };
    setStats(stats);
  };

  const filterUsers = () => {
    let filtered = users;

    // Apply status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(u => u.subscription.status === filterStatus);
    }

    // Apply search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(u => 
        u.displayName.toLowerCase().includes(search) ||
        u.email.toLowerCase().includes(search) ||
        u.uid.toLowerCase().includes(search)
      );
    }

    // Group family members under their head of household
    // ONLY group users who actually have a familyId
    const sorted: User[] = [];
    const processed = new Set<string>();
    
    // Build a map of familyId to all users in that family
    // Only include users with both accountType='family' AND a familyId
    const familyGroups = new Map<string, User[]>();
    filtered.forEach(user => {
      if (user.accountType === 'family' && user.familyId) {
        if (!familyGroups.has(user.familyId)) {
          familyGroups.set(user.familyId, []);
        }
        familyGroups.get(user.familyId)!.push(user);
      }
    });
    
    // For each family group, find the original subscriber and add members
    familyGroups.forEach((familyUsers, familyId) => {
      // Original subscriber is either:
      // 1. User whose uid equals familyId (new way), OR
      // 2. If no match, find the oldest user with isHeadOfHousehold=true (legacy way)
      let originalSubscriber = familyUsers.find(u => u.uid === familyId);
      
      if (!originalSubscriber) {
        // Legacy: find the oldest head of household
        const heads = familyUsers.filter(u => u.isHeadOfHousehold);
        if (heads.length > 0) {
          heads.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
          originalSubscriber = heads[0];
        }
      }
      
      if (originalSubscriber && !processed.has(originalSubscriber.uid)) {
        // Add the original subscriber
        sorted.push(originalSubscriber);
        processed.add(originalSubscriber.uid);
        
        // Add all other family members, sorted by creation date
        const members = familyUsers.filter(u => u.uid !== originalSubscriber!.uid && !processed.has(u.uid));
        members.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        
        members.forEach(member => {
          sorted.push(member);
          processed.add(member.uid);
        });
      }
    });
    
    // Then add individual accounts that haven't been processed
    const individuals = filtered
      .filter(u => u.accountType === 'individual' && !processed.has(u.uid))
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    sorted.push(...individuals);
    individuals.forEach(u => processed.add(u.uid));
    
    // Finally, add any remaining users that weren't caught above (orphaned family members)
    filtered.forEach(user => {
      if (!processed.has(user.uid)) {
        sorted.push(user);
        processed.add(user.uid);
      }
    });

    setFilteredUsers(sorted);
  };

  const handleUpdateSubscription = async (userId: string, status: SubscriptionStatus) => {
    try {
      await updateSubscription(userId, { status });
      await loadUsers();
      setEditingUser(null);
    } catch (error) {
      console.error('Error updating subscription:', error);
      alert('Failed to update subscription');
    }
  };

  const handleToggleAdmin = async (user: User) => {
    try {
      const newRole = user.role === 'admin' ? 'user' : 'admin';
      await updateUserRole(user.uid, newRole);
      await loadUsers();
    } catch (error) {
      console.error('Error updating role:', error);
      alert('Failed to update user role');
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      try {
        await deleteUser(userId);
        await loadUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Failed to delete user');
      }
    }
  };

  const handleAddUser = async (
    email: string,
    displayName: string,
    plan: SubscriptionPlan,
    accountType: AccountType,
    isAdmin: boolean
  ) => {
    try {
      await createUserByAdmin(email, displayName, plan, accountType, isAdmin);
      await loadUsers();
      // Modal will close itself after success
    } catch (error: any) {
      console.error('Error adding user:', error);
      throw error; // Re-throw to let modal handle the error display
    }
  };

  const handleUpdateUserPlan = async (userId: string, plan: SubscriptionPlan) => {
    try {
      await updateUserPlan(userId, plan);
      await loadUsers();
    } catch (error) {
      console.error('Error updating plan:', error);
      alert('Failed to update subscription plan');
    }
  };

  const handleSendWelcomeEmail = async (userId: string) => {
    if (window.confirm('Send welcome email to this user?')) {
      try {
        await sendWelcomeEmailManually(userId);
        await loadUsers();
        alert('Welcome email sent successfully!');
      } catch (error) {
        console.error('Error sending welcome email:', error);
        alert('Failed to send welcome email');
      }
    }
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const getStatusBadge = (status: SubscriptionStatus) => {
    const badges: Record<SubscriptionStatus, { color: string; icon: any; text: string }> = {
      free: { color: 'bg-gray-100 text-gray-800', icon: UserX, text: 'Free' },
      trial: { color: 'bg-yellow-100 text-yellow-800', icon: Clock, text: 'Trial' },
      active: { color: 'bg-green-100 text-green-800', icon: CheckCircle, text: 'Active' },
      past_due: { color: 'bg-orange-100 text-orange-800', icon: XCircle, text: 'Past Due' },
      cancelled: { color: 'bg-red-100 text-red-800', icon: XCircle, text: 'Cancelled' },
    };
    const badge = badges[status];
    const Icon = badge.icon;
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badge.color}`}>
        <Icon className="w-3 h-3 mr-1" />
        {badge.text}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 transition"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Shield className="w-8 h-8 mr-3 text-blue-600" />
            Admin Dashboard
          </h1>
          <p className="mt-2 text-gray-600">Manage users, subscriptions, and system analytics</p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('users')}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'users'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Users className="w-5 h-5 inline-block mr-2" />
                Users Management
              </button>
              <button
                onClick={() => setActiveTab('resources')}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'resources'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <BookOpen className="w-5 h-5 inline-block mr-2" />
                Resources Management
              </button>
            </nav>
          </div>
        </div>

        {/* Stats Grid */}
        {activeTab === 'users' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
              </div>
              <Users className="w-12 h-12 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Paid Subscribers</p>
                <p className="text-3xl font-bold text-green-600">{stats.paidSubscribers}</p>
                <p className="text-xs text-gray-500 mt-1">Individual + Family heads</p>
              </div>
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Subscriptions</p>
                <p className="text-3xl font-bold text-green-600">{stats.activeSubscriptions}</p>
              </div>
              <UserCheck className="w-12 h-12 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Trial Users</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.trialUsers}</p>
              </div>
              <Clock className="w-12 h-12 text-yellow-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Free Users</p>
                <p className="text-3xl font-bold text-gray-600">{stats.freeUsers}</p>
                <p className="text-xs text-gray-500 mt-1">No subscription</p>
              </div>
              <UserX className="w-12 h-12 text-gray-400" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Individual Subscriptions</p>
                <p className="text-3xl font-bold text-indigo-600">{stats.individualSubscriptions}</p>
              </div>
              <UserCheck className="w-12 h-12 text-indigo-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Family Subscriptions</p>
                <p className="text-3xl font-bold text-purple-600">{stats.familySubscriptions}</p>
                <p className="text-xs text-gray-500 mt-1">Paying family heads</p>
              </div>
              <Users className="w-12 h-12 text-purple-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Added Family Members</p>
                <p className="text-3xl font-bold text-purple-400">{stats.addedFamilyMembers}</p>
                <p className="text-xs text-gray-500 mt-1">Non-paying members</p>
              </div>
              <UserCheck className="w-12 h-12 text-purple-300" />
            </div>
          </div>
        </div>
        )}

        {activeTab === 'users' && (
          <>
        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, email, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Statuses</option>
              <option value="trial">Trial</option>
              <option value="active">Active</option>
              <option value="free">Free</option>
              <option value="cancelled">Cancelled</option>
              <option value="past_due">Past Due</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              Users ({filteredUsers.length})
            </h2>
            <button
              onClick={() => setShowAddUser(true)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add User
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Account Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Welcome Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => {
                  // Check if this user is the original subscriber of their family
                  // Original subscriber is the one whose uid === familyId
                  // OR if no such user exists (legacy), the oldest head of household in that family
                  let isOriginalSubscriber = false;
                  if (user.accountType === 'family' && user.familyId) {
                    // Check if uid matches familyId
                    if (user.uid === user.familyId) {
                      isOriginalSubscriber = true;
                    } else {
                      // Legacy check: is this the oldest head in the family?
                      const familyUsers = users.filter(u => u.familyId === user.familyId && u.accountType === 'family');
                      const hasUserWithMatchingId = familyUsers.some(u => u.uid === user.familyId);
                      
                      if (!hasUserWithMatchingId && user.isHeadOfHousehold) {
                        // Find the oldest head of household
                        const heads = familyUsers.filter(u => u.isHeadOfHousehold);
                        heads.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
                        isOriginalSubscriber = heads.length > 0 && heads[0].uid === user.uid;
                      }
                    }
                  }
                  
                  const shouldIndent = user.accountType === 'family' && !isOriginalSubscriber;
                  
                  return (
                  <tr key={user.uid} className={`hover:bg-gray-50 ${shouldIndent ? 'bg-gray-50' : ''}`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={shouldIndent ? 'pl-6' : ''}>
                        <div className="flex items-center">
                          {shouldIndent && (
                            <span className="text-gray-400 mr-2">└─</span>
                          )}
                          <div>
                            <div className="text-sm font-medium text-gray-900">{user.displayName}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.accountType === 'family' ? (
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.isHeadOfHousehold 
                            ? 'bg-purple-100 text-purple-800' 
                            : 'bg-purple-50 text-purple-600'
                        }`}>
                          {user.isHeadOfHousehold ? (
                            <>
                              <Users className="w-3 h-3 mr-1" />
                              Head of Family
                            </>
                          ) : (
                            <>
                              <UserCheck className="w-3 h-3 mr-1" />
                              Family Member
                            </>
                          )}
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          <UserCheck className="w-3 h-3 mr-1" />
                          Individual
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(user.subscription.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.welcomeEmailSent ? (
                        <span 
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 cursor-help"
                          title={`Sent ${formatDate(user.welcomeEmailSentAt)}`}
                        >
                          <MailCheck className="w-3 h-3 mr-1" />
                          Sent
                        </span>
                      ) : (
                        <button
                          onClick={() => handleSendWelcomeEmail(user.uid)}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 hover:bg-red-200 transition"
                          title="Click to send welcome email"
                        >
                          <Mail className="w-3 h-3 mr-1" />
                          Not Sent
                        </button>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.role === 'admin' ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          <Shield className="w-3 h-3 mr-1" />
                          Admin
                        </span>
                      ) : (
                        <span className="text-sm text-gray-500">User</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => setEditingUser(user)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Edit User"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleToggleAdmin(user)}
                          className="text-yellow-600 hover:text-yellow-900"
                          title={user.role === 'admin' ? 'Remove Admin' : 'Make Admin'}
                        >
                          <Shield className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.uid)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete User"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
          </>
        )}

        {/* Resources Management */}
        {activeTab === 'resources' && (
          <>
            {/* Resources Header */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Manage Resources ({resources.length})
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Add, edit, or remove resources from the Resources page
                  </p>
                </div>
                <button
                  onClick={() => setShowAddResource(true)}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Resource
                </button>
              </div>
            </div>

            {/* Resources Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-8">
                        
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Resource
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Link
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {resources.map((resource, index) => (
                      <tr 
                        key={resource.id} 
                        draggable
                        onDragStart={() => handleDragStart(index)}
                        onDragOver={(e) => handleDragOver(e, index)}
                        onDrop={(e) => handleDrop(e, index)}
                        className={`hover:bg-gray-50 transition ${draggedIndex === index ? 'opacity-50' : ''}`}
                      >
                        <td className="px-3 py-4 cursor-move">
                          <GripVertical className="w-4 h-4 text-gray-400" />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            {resource.coverImage && (
                              <img
                                src={resource.coverImage}
                                alt={resource.title}
                                className="h-12 w-12 object-cover rounded mr-3"
                              />
                            )}
                            <div>
                              <div className="text-sm font-medium text-gray-900 line-clamp-1">
                                {resource.title}
                              </div>
                              <div className="text-sm text-gray-500 line-clamp-1">
                                {resource.description.substring(0, 60)}...
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {resource.type === 'book' && <BookOpen className="w-3 h-3 mr-1" />}
                            {resource.type === 'pdf' && <FileText className="w-3 h-3 mr-1" />}
                            {resource.type === 'link' && <LinkIcon className="w-3 h-3 mr-1" />}
                            {resource.type.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            resource.category === 'print' ? 'bg-purple-100 text-purple-800' :
                            resource.category === 'download' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {resource.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {resource.price || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <a
                            href={resource.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-900 flex items-center"
                          >
                            <LinkIcon className="w-4 h-4 mr-1" />
                            View
                          </a>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => setEditingResource(resource)}
                              className="text-blue-600 hover:text-blue-900"
                              title="Edit Resource"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteResource(resource.id, resource.coverImage)}
                              className="text-red-600 hover:text-red-900"
                              title="Delete Resource"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Add User Modal */}
        {showAddUser && (
          <AddUserModal
            onClose={() => setShowAddUser(false)}
            onSubmit={handleAddUser}
          />
        )}

        {/* Edit User Modal */}
        {editingUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Edit User: {editingUser.displayName}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subscription Plan
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['free', 'individual', 'family'] as SubscriptionPlan[]).map((planOption) => (
                      <button
                        key={planOption}
                        onClick={() => handleUpdateUserPlan(editingUser.uid, planOption)}
                        className={`px-4 py-2 rounded-lg border-2 transition ${
                          editingUser.subscription.plan === planOption
                            ? 'border-green-600 bg-green-50 text-green-700 font-semibold'
                            : 'border-gray-300 hover:border-green-400'
                        }`}
                      >
                        {planOption.charAt(0).toUpperCase() + planOption.slice(1)}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Current plan: {editingUser.subscription.plan}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subscription Status
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['trial', 'active', 'inactive', 'cancelled'] as SubscriptionStatus[]).map((status) => (
                      <button
                        key={status}
                        onClick={() => handleUpdateSubscription(editingUser.uid, status)}
                        className={`px-4 py-2 rounded-lg border-2 transition ${
                          editingUser.subscription.status === status
                            ? 'border-blue-600 bg-blue-50 text-blue-700 font-semibold'
                            : 'border-gray-300 hover:border-blue-400'
                        }`}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Email:</span> {editingUser.email}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-semibold">Account Type:</span> {editingUser.accountType}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-semibold">Created:</span> {formatDate(editingUser.createdAt)}
                  </p>
                  {editingUser.subscription.trialEndsAt && (
                    <p className="text-sm text-gray-600 mt-1">
                      <span className="font-semibold">Trial Ends:</span> {formatDate(editingUser.subscription.trialEndsAt)}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Resource Modal */}
        {showAddResource && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 my-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Add New Resource
              </h3>
              <ResourceForm
                onSubmit={handleAddResource}
                onCancel={() => setShowAddResource(false)}
                onNewResourceImageSelect={handleNewResourceImageSelect}
              />
            </div>
          </div>
        )}

        {/* Edit Resource Modal */}
        {editingResource && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 my-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Edit Resource: {editingResource.title}
              </h3>
              <ResourceForm
                resource={editingResource}
                onSubmit={(data) => handleUpdateResource(editingResource.id, data)}
                onCancel={() => setEditingResource(null)}
                onImageUpload={handleImageUpload}
                uploadingImage={uploadingImage}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
