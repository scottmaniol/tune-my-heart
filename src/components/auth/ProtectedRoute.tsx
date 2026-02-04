import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Check if trial has expired and subscription is not active
  const isTrialExpired = 
    currentUser.subscription.status === 'trial' && 
    currentUser.subscription.trialEndsAt &&
    new Date() > currentUser.subscription.trialEndsAt;

  const hasActiveSubscription = 
    currentUser.subscription.status === 'active' ||
    currentUser.subscription.status === 'trial';

  if (isTrialExpired || !hasActiveSubscription) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Subscription Required</h2>
          <p className="text-gray-600 mb-6">
            {isTrialExpired 
              ? 'Your free trial has expired. Please manage your subscription to continue accessing Tune My Heart.'
              : 'Your subscription is inactive. Please update your payment method or renew your subscription to continue.'}
          </p>
          <Link
            to="/preferences"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Manage Subscription
          </Link>
          <p className="mt-4 text-sm text-gray-500">
            Update your payment method or view subscription details in your preferences.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
