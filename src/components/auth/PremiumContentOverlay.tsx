import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Lock, Crown } from 'lucide-react';
import { hasPremiumAccess } from '../../types/user';

interface PremiumContentOverlayProps {
  children: ReactNode;
  heading?: ReactNode;
  className?: string;
}

const PremiumContentOverlay = ({ children, className = '' }: PremiumContentOverlayProps) => {
  const { currentUser } = useAuth();

  // If user has premium access (trial or active subscription), show content without overlay
  if (currentUser && hasPremiumAccess(currentUser)) {
    return <>{children}</>;
  }

  // Determine if user is logged in but on free plan
  const isFreeUser = currentUser && currentUser.subscription?.plan === 'free';

  // Show content with headings visible and text blurred
  return (
    <div className={`relative ${className}`}>
      {/* Content with blur only on text, not headings/structure */}
      <div className="pointer-events-none select-none">
        {children}
      </div>
      
      {/* Overlay - positioned to cover content */}
      <div className="absolute inset-0 flex items-start justify-center pt-8 pointer-events-none">
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm text-center border-2 border-blue-100 pointer-events-auto">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full mb-4">
            {isFreeUser ? <Crown className="w-8 h-8 text-blue-600" /> : <Lock className="w-8 h-8 text-blue-600" />}
          </div>
          
          {isFreeUser ? (
            <>
              <h3 className="text-xl font-bold text-gray-800 mb-2">✨ Premium Content</h3>
              <p className="text-gray-600 mb-6">
                Upgrade to Individual or Family plan to access summaries, notes, and devotionals.
              </p>
              <Link
                to="/upgrade"
                className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition shadow-md"
              >
                Upgrade Now - $15/year
              </Link>
              <p className="text-xs text-gray-500 mt-3">
                🎁 7-day free trial included
              </p>
            </>
          ) : (
            <>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Premium Content</h3>
              <p className="text-gray-600 mb-6">
                Create an account to access this content and save your progress.
              </p>
              <Link
                to="/signup"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition shadow-md"
              >
                Get Started
              </Link>
              <p className="text-sm text-gray-500 mt-4">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                  Sign in
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PremiumContentOverlay;
