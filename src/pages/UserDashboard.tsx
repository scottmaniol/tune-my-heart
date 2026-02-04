import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Settings, CreditCard, Users } from 'lucide-react';
import PreferencesTab from '../components/dashboard/PreferencesTab';
import SubscriptionTab from '../components/dashboard/SubscriptionTab';
import FamilyTabs from '../components/dashboard/FamilyTabs';

const UserDashboard = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'preferences' | 'subscription' | 'family'>('preferences');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Determine which tabs to show based on account type
  const showFamilyTab = currentUser?.isHeadOfHousehold && currentUser.accountType === 'family';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card">
        <div className="flex items-center gap-3">
          <Settings className="text-primary" size={32} />
          <div>
            <h1 className="text-3xl font-heading text-primary">
              User Dashboard
            </h1>
            <p className="text-text-light font-body">
              Manage your account settings and preferences
            </p>
          </div>
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

      {/* Tab Navigation */}
      <div className="card">
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setActiveTab('preferences')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-body font-semibold transition ${
              activeTab === 'preferences'
                ? 'bg-primary text-white'
                : 'text-text hover:bg-gray-100'
            }`}
          >
            <Settings size={20} />
            Preferences
          </button>

          <button
            onClick={() => setActiveTab('subscription')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-body font-semibold transition ${
              activeTab === 'subscription'
                ? 'bg-primary text-white'
                : 'text-text hover:bg-gray-100'
            }`}
          >
            <CreditCard size={20} />
            Subscription
          </button>

          {showFamilyTab && (
            <button
              onClick={() => setActiveTab('family')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-body font-semibold transition ${
                activeTab === 'family'
                  ? 'bg-primary text-white'
                  : 'text-text hover:bg-gray-100'
              }`}
            >
              <Users size={20} />
              Family
            </button>
          )}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'preferences' && <PreferencesTab onMessage={setMessage} />}
      {activeTab === 'subscription' && <SubscriptionTab onMessage={setMessage} />}
      {activeTab === 'family' && showFamilyTab && <FamilyTabs onMessage={setMessage} />}
    </div>
  );
};

export default UserDashboard;
