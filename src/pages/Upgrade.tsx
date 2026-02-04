import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { CreditCard, Check, ArrowLeft, Crown, AlertCircle } from 'lucide-react';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { getStripe, createPaymentMethod, createSubscription } from '../services/stripeService';

// Stripe Elements appearance
const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#9e2146',
    },
  },
};

type PaidPlanType = 'individual' | 'family';

const UpgradeForm = () => {
  const { currentUser } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<PaidPlanType>('individual');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  // Redirect if not logged in
  if (!currentUser) {
    navigate('/signup');
    return null;
  }

  // Redirect if already premium
  if (currentUser.subscription?.plan !== 'free') {
    navigate('/subscription');
    return null;
  }

  const planDetails: Record<PaidPlanType, {
    name: string;
    price: string;
    period: string;
    features: string[];
  }> = {
    individual: {
      name: 'Individual',
      price: '$15',
      period: '/year',
      features: [
        'All free features',
        '✨ Summary content',
        '✨ Study notes',
        '✨ Daily devotional',
        '7-day free trial'
      ]
    },
    family: {
      name: 'Family',
      price: '$20',
      period: '/year',
      features: [
        'All Individual features',
        '👨‍👩‍👧‍👦 Up to 10 family members',
        'Shared progress tracking',
        '7-day free trial'
      ]
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      setError('Payment system not loaded. Please refresh the page.');
      return;
    }

    try {
      setError('');
      setLoading(true);

      // Create payment method
      const paymentMethodId = await createPaymentMethod(stripe, elements, {
        name: currentUser.displayName || currentUser.email || '',
        email: currentUser.email || '',
      });

      // Create subscription with trial
      await createSubscription(selectedPlan, paymentMethodId);

      // Navigate to subscription page
      navigate('/subscription');
    } catch (err: any) {
      console.error('Upgrade error:', err);
      setError(err.message || 'Failed to upgrade. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-xl p-8 w-full max-w-3xl"
      >
        <Link 
          to="/subscription" 
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span className="text-sm font-medium">Back to Subscription</span>
        </Link>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full mb-4">
            <Crown className="w-8 h-8 text-yellow-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Upgrade to Premium</h1>
          <p className="text-gray-600 mt-2">Welcome back, {currentUser.displayName || 'there'}!</p>
          <p className="text-sm text-gray-500 mt-1">Choose your plan and complete payment</p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start"
          >
            <AlertCircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
            <p className="text-red-800 text-sm">{error}</p>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Plan Selection */}
          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-4">
              Choose Your Plan
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(Object.keys(planDetails) as PaidPlanType[]).map((plan) => {
                const details = planDetails[plan];
                const isSelected = selectedPlan === plan;
                return (
                  <button
                    key={plan}
                    type="button"
                    onClick={() => setSelectedPlan(plan)}
                    className={`p-6 border-2 rounded-lg transition text-left ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50 shadow-md'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className={`font-bold text-xl ${
                          isSelected ? 'text-blue-600' : 'text-gray-800'
                        }`}>
                          {details.name}
                        </h3>
                        <div className="flex items-baseline mt-1">
                          <span className="text-3xl font-bold text-gray-900">{details.price}</span>
                          <span className="text-sm text-gray-500 ml-1">{details.period}</span>
                        </div>
                      </div>
                      {isSelected && (
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                    <ul className="space-y-2">
                      {details.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start text-sm text-gray-700">
                          <Check className="w-4 h-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Current Account Info */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Account Information</h3>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Name:</span> {currentUser.displayName || 'Not set'}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Email:</span> {currentUser.email}
              </p>
            </div>
          </div>

          {/* Payment Info */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <CreditCard className="w-5 h-5 mr-2" />
              Payment Information
            </label>
            <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
              <CardElement options={CARD_ELEMENT_OPTIONS} />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              💳 You won't be charged during your 7-day free trial. Cancel anytime.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-4 rounded-lg font-medium text-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-md"
          >
            {loading ? 'Processing...' : `Start 7-Day Free Trial - ${planDetails[selectedPlan].price}/year`}
          </button>

          <p className="text-xs text-center text-gray-500">
            By continuing, you agree to start your 7-day free trial. 
            You'll be charged {planDetails[selectedPlan].price}/year after the trial ends. Cancel anytime.
          </p>
        </form>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="text-sm font-semibold text-blue-900 mb-2">✨ What You Get:</h4>
          <ul className="text-xs text-blue-800 space-y-1">
            <li>• Instant access to all premium features</li>
            <li>• 7 full days to try everything risk-free</li>
            <li>• Cancel anytime with one click</li>
            <li>• All your progress and preferences are saved</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

// Wrap with Stripe Elements provider
const Upgrade = () => {
  const stripePromise = getStripe();

  return (
    <Elements stripe={stripePromise}>
      <UpgradeForm />
    </Elements>
  );
};

export default Upgrade;
