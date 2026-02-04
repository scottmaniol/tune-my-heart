import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  CreditCard, 
  Calendar, 
  Check, 
  X, 
  ExternalLink, 
  TrendingUp,
  AlertCircle,
  Users,
  Clock,
  Crown,
  ArrowUpCircle
} from 'lucide-react';
import { getTrialDaysRemaining, hasPremiumAccess } from '../../types/user';
import { createPortalSession, cancelSubscription } from '../../services/stripeService';

interface SubscriptionTabProps {
  onMessage: (message: { type: 'success' | 'error'; text: string } | null) => void;
}

const SubscriptionTab = ({ onMessage }: SubscriptionTabProps) => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelling, setCancelling] = useState(false);

  if (!currentUser) {
    return (
      <div className="card text-center py-12">
        <h2 className="text-2xl font-heading text-text mb-4">Sign In Required</h2>
        <p className="text-text-light font-body mb-6">
          Please sign in to view your subscription details.
        </p>
        <Link to="/login" className="btn-primary inline-block">
          Sign In
        </Link>
      </div>
    );
  }

  const { subscription, accountType } = currentUser;
  const isPremium = hasPremiumAccess(currentUser);
  const trialDaysRemaining = getTrialDaysRemaining(currentUser);

  // Format date for display
  const formatDate = (date: Date | undefined) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get status color and label
  const getStatusBadge = () => {
    switch (subscription.status) {
      case 'active':
        return { color: 'bg-green-100 text-green-800', label: 'Active' };
      case 'trial':
        return { color: 'bg-blue-100 text-blue-800', label: 'Trial' };
      case 'free':
        return { color: 'bg-gray-100 text-gray-800', label: 'Free' };
      case 'past_due':
        return { color: 'bg-yellow-100 text-yellow-800', label: 'Past Due' };
      case 'cancelled':
        return { color: 'bg-red-100 text-red-800', label: 'Cancelled' };
      default:
        return { color: 'bg-gray-100 text-gray-800', label: subscription.status };
    }
  };

  // Get plan display name
  const getPlanName = () => {
    switch (subscription.plan) {
      case 'individual':
        return 'Individual Plan';
      case 'family':
        return 'Family Plan';
      default:
        return 'Free Plan';
    }
  };

  // Get plan price
  const getPlanPrice = () => {
    switch (subscription.plan) {
      case 'individual':
        return '$15.00';
      case 'family':
        return '$20.00';
      default:
        return '$0.00';
    }
  };

  // Handle Stripe portal
  const handleManageBilling = async () => {
    try {
      setLoading(true);
      const { url } = await createPortalSession(window.location.href);
      window.location.href = url;
    } catch (error: any) {
      console.error('Error opening portal:', error);
      onMessage({ type: 'error', text: 'Failed to open billing portal. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  // Handle cancellation
  const handleCancelSubscription = async () => {
    try {
      setCancelling(true);
      await cancelSubscription();
      onMessage({ type: 'success', text: 'Your subscription has been cancelled. You will retain access until the end of your billing period.' });
      setShowCancelModal(false);
      window.location.reload();
    } catch (error: any) {
      console.error('Error cancelling subscription:', error);
      onMessage({ type: 'error', text: 'Failed to cancel subscription. Please try again or contact support.' });
    } finally {
      setCancelling(false);
    }
  };

  const statusBadge = getStatusBadge();

  return (
    <div className="space-y-6">
      {/* Subscription Management for Individual Accounts */}
      {accountType !== 'family' && (
        <div className="card bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              {isPremium ? (
                <Crown className="w-10 h-10 text-yellow-600" />
              ) : (
                <CreditCard className="w-10 h-10 text-gray-400" />
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-heading text-primary flex items-center gap-2">
                  Subscription & Billing
                  {isPremium && <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-bold">PREMIUM</span>}
                </h2>
                <span className={`px-4 py-2 rounded-full font-heading text-sm ${statusBadge.color}`}>
                  {statusBadge.label}
                </span>
              </div>
              
              {/* Free User */}
              {subscription?.plan === 'free' && (
                <div className="space-y-3">
                  <p className="text-sm text-text-light font-body">
                    You're currently on the <strong>Free Plan</strong>
                  </p>
                  <p className="text-xs text-text-light font-body">
                    Upgrade to Individual ($15/year) or Family ($20/year) to unlock premium content including summaries, notes, and devotionals.
                  </p>
                  <a
                    href="/upgrade"
                    className="inline-flex items-center gap-2 btn-primary text-sm"
                  >
                    <ArrowUpCircle size={18} />
                    Upgrade to Premium
                  </a>
                </div>
              )}

              {/* Trial User */}
              {subscription.status === 'trial' && (
                <div className="space-y-3">
                  <p className="text-sm text-text font-body">
                    You're on a <strong>7-day free trial</strong> of the <strong>{subscription.plan === 'individual' ? 'Individual' : 'Family'}</strong> plan
                  </p>
                  {trialDaysRemaining !== null && (
                    <p className="text-xs text-blue-700 font-body font-semibold">
                      ⏰ {trialDaysRemaining} day{trialDaysRemaining !== 1 ? 's' : ''} remaining in your trial
                    </p>
                  )}
                  <p className="text-xs text-text-light font-body">
                    ${subscription.plan === 'individual' ? '15' : '20'}/year billing starts after trial ends
                  </p>
                  <button
                    onClick={handleManageBilling}
                    disabled={loading}
                    className="inline-flex items-center gap-2 btn-secondary text-sm"
                  >
                    <CreditCard size={18} />
                    {loading ? 'Loading...' : 'Manage Billing & Payment'}
                  </button>
                </div>
              )}

              {/* Active Paid User */}
              {subscription?.status === 'active' && subscription.plan !== 'free' && (
                <div className="space-y-3">
                  <p className="text-sm text-text font-body">
                    Active <strong>{subscription.plan === 'individual' ? 'Individual' : 'Family'}</strong> subscription
                  </p>
                  <p className="text-xs text-text-light font-body">
                    ${subscription.plan === 'individual' ? '15' : '20'}/year • Renews automatically
                  </p>
                  <button
                    onClick={handleManageBilling}
                    disabled={loading}
                    className="inline-flex items-center gap-2 btn-secondary text-sm"
                  >
                    <CreditCard size={18} />
                    {loading ? 'Loading...' : 'Manage Subscription & Billing'}
                  </button>
                  <p className="text-xs text-text-light font-body mt-2">
                    Update payment method, view invoices, or cancel subscription
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Past Due Warning */}
      {subscription.status === 'past_due' && accountType !== 'family' && (
        <div className="card bg-yellow-50 border-2 border-yellow-300">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg font-heading text-yellow-800 mb-2">
                Payment Required
              </h3>
              <p className="text-yellow-700 font-body text-sm mb-3">
                Your last payment failed. Please update your payment method to restore access.
              </p>
              <button
                onClick={handleManageBilling}
                disabled={loading}
                className="btn-primary text-sm"
              >
                Update Payment Method
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Trial Countdown */}
      {subscription.status === 'trial' && trialDaysRemaining !== null && trialDaysRemaining > 0 && (
        <div className="card bg-blue-50 border-2 border-blue-300">
          <div className="flex items-start gap-4">
            <Clock className="w-8 h-8 text-blue-600 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-2xl font-heading text-blue-800 mb-2">
                {trialDaysRemaining} Day{trialDaysRemaining !== 1 ? 's' : ''} Remaining
              </h3>
              <p className="text-blue-700 font-body mb-3">
                Your free trial ends on {formatDate(subscription.trialEndsAt)}. 
                After that, you'll be charged {getPlanPrice()}/year for the {getPlanName()}.
              </p>
              {subscription.currentPeriodEnd && (
                <p className="text-sm text-blue-600 font-body">
                  Next billing date: {formatDate(subscription.currentPeriodEnd)}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Current Plan Card */}
        <div className="card">
          <h2 className="text-xl font-heading text-primary mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Current Plan
          </h2>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-text-light font-body">Plan Type</p>
              <p className="text-2xl font-heading text-text">{getPlanName()}</p>
            </div>

            <div>
              <p className="text-sm text-text-light font-body">Price</p>
              <p className="text-2xl font-heading text-text">
                {getPlanPrice()}<span className="text-base text-text-light">/year</span>
              </p>
            </div>

            {subscription.status !== 'free' && subscription.currentPeriodEnd && (
              <div>
                <p className="text-sm text-text-light font-body">
                  {subscription.status === 'cancelled' ? 'Access Expires' : 'Next Billing Date'}
                </p>
                <p className="text-lg font-heading text-text flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {formatDate(subscription.currentPeriodEnd)}
                </p>
              </div>
            )}

            {accountType === 'family' && (
              <div>
                <p className="text-sm text-text-light font-body">Account Type</p>
                <p className="text-lg font-heading text-text flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Family (up to 10 members)
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Features Card */}
        <div className="card">
          <h2 className="text-xl font-heading text-primary mb-4">
            {subscription.plan === 'free' ? 'Your Features' : 'Premium Features Included'}
          </h2>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-body text-text">Reflection Questions & Journal</p>
                <p className="text-xs text-text-light">Available on all plans</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-body text-text">Save Progress & Preferences</p>
                <p className="text-xs text-text-light">Track your daily readings</p>
              </div>
            </div>

            <div className={`flex items-start gap-3 ${!isPremium ? 'opacity-50' : ''}`}>
              {isPremium ? (
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              ) : (
                <X className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
              )}
              <div>
                <p className="font-body text-text">Summary Content</p>
                <p className="text-xs text-text-light">Premium feature</p>
              </div>
            </div>

            <div className={`flex items-start gap-3 ${!isPremium ? 'opacity-50' : ''}`}>
              {isPremium ? (
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              ) : (
                <X className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
              )}
              <div>
                <p className="font-body text-text">Study Notes</p>
                <p className="text-xs text-text-light">Premium feature</p>
              </div>
            </div>

            <div className={`flex items-start gap-3 ${!isPremium ? 'opacity-50' : ''}`}>
              {isPremium ? (
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              ) : (
                <X className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
              )}
              <div>
                <p className="font-body text-text">Daily Devotional</p>
                <p className="text-xs text-text-light">Premium feature</p>
              </div>
            </div>

            {subscription.plan === 'family' && (
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-body text-text">Family Members</p>
                  <p className="text-xs text-text-light">Up to 10 family members</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Actions Card - Only show to individual accounts */}
      {accountType !== 'family' && (
        <div className="card">
          <h2 className="text-xl font-heading text-primary mb-4">Manage Subscription</h2>
          
          <div className="space-y-3">
            {subscription.status !== 'free' && (
              <button
                onClick={handleManageBilling}
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-5 h-5" />
                {loading ? 'Opening...' : 'Manage Billing & Invoices'}
              </button>
            )}

            {subscription.plan === 'free' && (
              <Link to="/upgrade" className="btn-primary w-full inline-block text-center">
                Upgrade to Premium
              </Link>
            )}

            {subscription.plan === 'individual' && subscription.status !== 'cancelled' && (
              <Link to="/upgrade" className="btn-secondary w-full inline-block text-center">
                Upgrade to Family Plan
              </Link>
            )}

            {subscription.status === 'active' && (
              <button
                onClick={() => setShowCancelModal(true)}
                className="btn-secondary w-full text-red-600 hover:bg-red-50"
              >
                Cancel Subscription
              </button>
            )}

            {subscription.status === 'cancelled' && (
              <button
                onClick={handleManageBilling}
                disabled={loading}
                className="btn-primary w-full"
              >
                Reactivate Subscription
              </button>
            )}
          </div>

          {subscription.status !== 'free' && (
            <p className="text-xs text-text-light font-body mt-4">
              Billing is managed securely through Stripe. You can update your payment method, 
              view invoices, and manage your subscription details.
            </p>
          )}
        </div>
      )}

      {/* Family Info Card - Show to ALL family account users */}
      {accountType === 'family' && (
        <div className="card bg-blue-50 border-2 border-blue-200">
          <div className="flex items-start gap-3">
            <Users className="w-6 h-6 text-blue-600 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-heading text-blue-900 mb-2">
                Family Account
              </h3>
              <p className="text-blue-800 font-body text-sm">
                Your subscription is managed by the family administrator. You have full access 
                to all premium features included in the family plan.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Upgrade Prompt for Free Users */}
      {subscription.plan === 'free' && (
        <div className="card bg-gradient-to-r from-primary to-primary-dark text-white">
          <h2 className="text-2xl font-heading mb-3">Unlock Premium Features</h2>
          <p className="text-white opacity-90 font-body mb-6">
            Get access to summary content, study notes, and daily devotionals to enrich 
            your worship experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link 
              to="/upgrade" 
              className="bg-white text-primary px-6 py-3 rounded-lg font-heading hover:bg-gray-100 transition-colors text-center"
            >
              Individual Plan - $15/year
            </Link>
            <Link 
              to="/upgrade" 
              className="bg-accent text-white px-6 py-3 rounded-lg font-heading hover:bg-accent-dark transition-colors text-center"
            >
              Family Plan - $20/year
            </Link>
          </div>
        </div>
      )}

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-heading text-text mb-4">Cancel Subscription?</h3>
            <p className="text-text-light font-body mb-6">
              Are you sure you want to cancel your subscription? You'll lose access to:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2 text-text-light font-body">
                <X className="w-4 h-4 text-red-500" />
                Summary content
              </li>
              <li className="flex items-center gap-2 text-text-light font-body">
                <X className="w-4 h-4 text-red-500" />
                Study notes
              </li>
              <li className="flex items-center gap-2 text-text-light font-body">
                <X className="w-4 h-4 text-red-500" />
                Daily devotionals
              </li>
              {subscription.plan === 'family' && (
                <li className="flex items-center gap-2 text-text-light font-body">
                  <X className="w-4 h-4 text-red-500" />
                  Family member accounts
                </li>
              )}
            </ul>
            <p className="text-sm text-text-light font-body mb-6">
              You'll retain access until {formatDate(subscription.currentPeriodEnd)}.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="btn-primary flex-1"
                disabled={cancelling}
              >
                Keep Subscription
              </button>
              <button
                onClick={handleCancelSubscription}
                className="btn-secondary flex-1 text-red-600"
                disabled={cancelling}
              >
                {cancelling ? 'Cancelling...' : 'Cancel Subscription'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionTab;
