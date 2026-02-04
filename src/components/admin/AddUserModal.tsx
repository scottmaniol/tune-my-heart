import { useState, FormEvent } from 'react';
import { X, Mail, User as UserIcon, Shield, Users, AlertCircle, CheckCircle } from 'lucide-react';
import { SubscriptionPlan, AccountType } from '../../types/user';

interface AddUserModalProps {
  onClose: () => void;
  onSubmit: (
    email: string,
    displayName: string,
    plan: SubscriptionPlan,
    accountType: AccountType,
    isAdmin: boolean
  ) => Promise<void>;
}

const AddUserModal = ({ onClose, onSubmit }: AddUserModalProps) => {
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [plan, setPlan] = useState<SubscriptionPlan>('free');
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!email || !displayName) {
      setError('Email and display name are required');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Derive account type from plan
    const accountType: AccountType = plan === 'family' ? 'family' : 'individual';

    try {
      setLoading(true);
      await onSubmit(email, displayName, plan, accountType, isAdmin);
      setSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        setEmail('');
        setDisplayName('');
        setPlan('free');
        setIsAdmin(false);
        setSuccess(false);
      }, 2000);
    } catch (err: any) {
      console.error('Error adding user:', err);
      setError(err.message || 'Failed to create user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <UserIcon className="w-6 h-6 mr-2 text-blue-600" />
            Add New User
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
            disabled={loading}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
              <AlertCircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start">
              <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-green-800 text-sm font-medium">User created successfully!</p>
                <p className="text-green-700 text-sm mt-1">
                  They will receive an email with instructions to set their password and log in.
                </p>
              </div>
            </div>
          )}

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="user@example.com"
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Display Name */}
          <div>
            <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-2">
              Display Name *
            </label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="displayName"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="John Smith"
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Subscription Plan */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subscription Plan *
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(['free', 'individual', 'family'] as SubscriptionPlan[]).map((planOption) => (
                <button
                  key={planOption}
                  type="button"
                  onClick={() => setPlan(planOption)}
                  disabled={loading}
                  className={`px-4 py-3 rounded-lg border-2 transition text-center ${
                    plan === planOption
                      ? 'border-blue-600 bg-blue-50 text-blue-700 font-semibold'
                      : 'border-gray-300 hover:border-blue-400 text-gray-700'
                  }`}
                >
                  {planOption.charAt(0).toUpperCase() + planOption.slice(1)}
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {plan === 'family' && 'Account type: Family'}
              {plan === 'individual' && 'Account type: Individual'}
              {plan === 'free' && 'Account type: Individual'}
              {plan !== 'free' && ' • User will start with a 7-day trial period'}
            </p>
          </div>

          {/* Admin Checkbox */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <label className="flex items-start cursor-pointer">
              <input
                type="checkbox"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
                disabled={loading}
                className="mt-1 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              />
              <div className="ml-3">
                <div className="flex items-center">
                  <Shield className="w-4 h-4 text-red-600 mr-2" />
                  <span className="text-sm font-medium text-red-900">
                    Grant Administrator Privileges
                  </span>
                </div>
                <p className="text-sm text-red-700 mt-1">
                  Admins can manage users, subscriptions, and access the admin dashboard.
                  Only grant this to trusted users.
                </p>
              </div>
            </label>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-blue-900 mb-2">What happens next?</h4>
            <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
              <li>User account will be created in Firebase</li>
              <li>Password reset email will be sent automatically</li>
              <li>Welcome email with account details and setup instructions</li>
              <li>User can set their password and log in immediately</li>
            </ul>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating User...
                </>
              ) : (
                <>
                  <UserIcon className="w-4 h-4 mr-2" />
                  Create User
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
