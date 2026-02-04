import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';
import { UserPlus, Mail, Lock, User, AlertCircle, CreditCard, Check, ArrowLeft, BookOpen, FileText, Heart, Music, Brain, Baby, Church, Users } from 'lucide-react';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { getStripe, createPaymentMethod, createSubscription } from '../../services/stripeService';

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

type PlanType = 'free' | 'individual' | 'family';

const SignUpForm = () => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('free');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const planDetails: Record<PlanType, {
    name: string;
    price: string;
    period: string;
    features: Array<{ text: string; icon?: any }>;
    excluded?: string[];
  }> = {
    free: {
      name: 'Free Limited',
      price: '$0',
      period: '',
      features: [
        { text: 'Reflection questions only' },
        { text: 'Save answers & progress' },
        { text: 'Bible preferences' },
        { text: 'Schedule tracking' }
      ],
      excluded: [
        'Bible summaries & study notes',
        'Daily devotionals',
        'Catechism with audio/video',
        'Hymns with accompaniment',
        'Scripture memory tools',
        'Children\'s Story Bible',
        'Daily liturgies'
      ]
    },
    individual: {
      name: 'Individual',
      price: '$15',
      period: '/year',
      features: [
        { text: 'Complete Bible reading plan', icon: BookOpen },
        { text: 'Summaries & study notes', icon: FileText },
        { text: 'Daily devotionals', icon: Heart },
        { text: 'Catechism with audio/video', icon: Music },
        { text: 'Hymns with sheet music & audio', icon: Music },
        { text: 'Scripture memory tools', icon: Brain },
        { text: 'Children\'s Story Bible', icon: Baby },
        { text: 'Daily liturgies', icon: Church },
        { text: '7-day free trial' }
      ]
    },
    family: {
      name: 'Family',
      price: '$20',
      period: '/year',
      features: [
        { text: 'Everything in Individual' },
        { text: 'Up to 10 family members', icon: Users },
        { text: 'Shared progress tracking' },
        { text: 'Family management dashboard' },
        { text: '7-day free trial' }
      ]
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!displayName || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    // For paid plans, validate Stripe
    if (selectedPlan !== 'free') {
      if (!stripe || !elements) {
        setError('Payment system not loaded. Please refresh the page.');
        return;
      }
    }

    try {
      setError('');
      setLoading(true);

      // Determine account type from plan
      const accountType: 'individual' | 'family' = selectedPlan === 'family' ? 'family' : 'individual';

      // If free plan, just create account
      if (selectedPlan === 'free') {
        await signup(email, password, displayName, accountType, 'free');
        navigate('/');
        return;
      }

      // For paid plans, create payment method first
      const paymentMethodId = await createPaymentMethod(stripe!, elements!, {
        name: displayName,
        email: email,
      });

      // Create account
      await signup(email, password, displayName, accountType, selectedPlan);

      // Create subscription with trial
      await createSubscription(selectedPlan, paymentMethodId);

      navigate('/');
    } catch (err: any) {
      console.error('Signup error:', err);
      if (err.code === 'auth/email-already-in-use') {
        setError('This email is already registered');
      } else if (err.code === 'auth/invalid-email') {
        setError('Invalid email address');
      } else if (err.code === 'auth/weak-password') {
        setError('Password is too weak');
      } else {
        setError(err.message || 'Failed to create account. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#2a5876' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-xl p-8 w-full max-w-4xl"
      >
        <Link 
          to="/" 
          className="inline-flex items-center text-text-light hover:text-text mb-6 transition"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span className="text-sm font-medium font-body">Back to App</span>
        </Link>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-background-dark rounded-full mb-4">
            <UserPlus className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-heading text-text">Create Account</h1>
          <p className="text-text-light font-body mt-2">Start your spiritual journey today</p>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(Object.keys(planDetails) as PlanType[]).map((plan) => {
                const details = planDetails[plan];
                const isSelected = selectedPlan === plan;
                return (
                  <button
                    key={plan}
                    type="button"
                    onClick={() => setSelectedPlan(plan)}
                    className={`p-5 border-2 rounded-lg transition text-left ${
                      isSelected
                        ? 'border-primary bg-background-light shadow-md'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className={`font-heading font-bold text-lg ${
                          isSelected ? 'text-primary' : 'text-text'
                        }`}>
                          {details.name}
                        </h3>
                        <div className="flex items-baseline mt-1">
                          <span className="text-2xl font-bold text-text">{details.price}</span>
                          {details.period && (
                            <span className="text-sm text-text-light font-body ml-1">{details.period}</span>
                          )}
                        </div>
                      </div>
                      {isSelected && (
                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                    <ul className="space-y-2">
                      {details.features.map((feature, idx) => {
                        const Icon = feature.icon;
                        return (
                          <li key={idx} className="flex items-start text-sm text-gray-700">
                            {Icon ? (
                              <Icon className="w-4 h-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                            ) : (
                              <Check className="w-4 h-4 text-accent mr-2 flex-shrink-0 mt-0.5" />
                            )}
                            <span>{feature.text}</span>
                          </li>
                        );
                      })}
                      {details.excluded && details.excluded.map((feature, idx) => (
                        <li key={`ex-${idx}`} className="flex items-start text-sm text-gray-400 line-through">
                          <span className="mr-2">✗</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Account Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="displayName"
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
          </div>

          {/* Payment Info (only for paid plans) */}
          {selectedPlan !== 'free' && (
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
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Account...' : 
             selectedPlan === 'free' ? 'Create Free Account' : 
             'Start 7-Day Free Trial'}
          </button>

          {selectedPlan !== 'free' && (
            <p className="text-xs text-center text-text-light font-body">
              By continuing, you agree to start your 7-day free trial. 
              You'll be charged {selectedPlan === 'individual' ? '$15' : '$20'}/year after the trial ends.
            </p>
          )}
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm font-body text-text-light">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:text-accent font-medium transition">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

// Wrap with Stripe Elements provider
const SignUp = () => {
  const stripePromise = getStripe();

  return (
    <Elements stripe={stripePromise}>
      <SignUpForm />
    </Elements>
  );
};

export default SignUp;
