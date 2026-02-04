import { useState } from 'react';
import Confetti from 'react-confetti';
import { X, Award, Download, FileText, RotateCcw } from 'lucide-react';
import CompletionCertificate from './CompletionCertificate';

interface CompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartOver: () => Promise<void>;
  userName: string;
  completionDate: Date;
  cycleNumber: number;
  onCertificateDownload?: () => void;
  bibleTranslation?: string;
}

const CompletionModal = ({
  isOpen,
  onClose,
  onStartOver,
  userName,
  completionDate,
  cycleNumber,
  onCertificateDownload,
  bibleTranslation = 'ESV',
}: CompletionModalProps) => {
  const [showCertificate, setShowCertificate] = useState(false);
  const [showConfetti, setShowConfetti] = useState(true);
  const [isResetting, setIsResetting] = useState(false);

  if (!isOpen) return null;

  const getOrdinal = (n: number) => {
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  const handleStartOver = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to start over? This will reset all your reading progress to Week 1, Day 1. Your completion history will be preserved.'
    );

    if (!confirmed) return;

    try {
      setIsResetting(true);
      await onStartOver();
    } catch (error) {
      console.error('Error resetting progress:', error);
      alert('Failed to reset progress. Please try again.');
      setIsResetting(false);
    }
  };

  if (showCertificate) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">
        <div className="min-h-screen p-4 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            {/* Certificate Header */}
            <div className="bg-primary px-6 py-4 flex items-center justify-between sticky top-0 z-10">
              <h2 className="text-2xl font-heading text-white font-bold">Your Certificate</h2>
              <button
                onClick={() => setShowCertificate(false)}
                className="text-white hover:text-gray-200 transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Certificate Component */}
            <div className="p-6">
              <CompletionCertificate
                userName={userName}
                completionDate={completionDate}
                cycleNumber={cycleNumber}
                onDownload={onCertificateDownload}
                bibleTranslation={bibleTranslation}
              />
            </div>

            {/* Back Button */}
            <div className="p-6 border-t flex justify-center">
              <button
                onClick={() => setShowCertificate(false)}
                className="btn-secondary"
              >
                Back to Celebration
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Confetti */}
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={500}
          onConfettiComplete={() => setShowConfetti(false)}
        />
      )}

      {/* Modal */}
      <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">
        <div className="min-h-screen p-4 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary via-accent to-gold px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-heading text-white font-bold flex items-center gap-2">
                <Award className="w-6 h-6" />
                Congratulations!
              </h2>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200 transition"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-8 space-y-6">
              {/* Celebration Message */}
              <div className="text-center space-y-4">
                <div className="text-6xl">🎉</div>
                <h3 className="text-3xl font-heading text-primary font-bold">
                  {userName}!
                </h3>
                <p className="text-xl font-body text-text">
                  You've completed the 52-Week Bible Reading Plan!
                </p>
                {cycleNumber > 1 && (
                  <p className="text-lg font-body text-gold font-semibold">
                    This is your {getOrdinal(cycleNumber)} completion - Amazing dedication!
                  </p>
                )}
                <p className="text-base font-body text-text-light max-w-lg mx-auto">
                  You've journeyed through the narratives of Scripture, completing all 52 weeks 
                  and 260 daily readings of God's Word.
                </p>
              </div>

              {/* Achievement Stats */}
              <div className="bg-background-dark rounded-lg p-6 grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-heading text-primary font-bold">260</div>
                  <div className="text-sm font-body text-text-light">Readings Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-heading text-primary font-bold">52</div>
                  <div className="text-sm font-body text-text-light">Weeks Finished</div>
                </div>
              </div>

              {/* Scripture */}
              <div className="bg-primary/5 border-l-4 border-primary p-4 rounded">
                <p className="text-sm font-body text-text italic">
                  "Well done, good and faithful servant. You have been faithful over a little; 
                  I will set you over much. Enter into the joy of your master."
                </p>
                <p className="text-xs font-body text-text-light mt-2">
                  Matthew 25:21
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => setShowCertificate(true)}
                  className="w-full btn-primary flex items-center justify-center gap-2"
                >
                  <FileText className="w-5 h-5" />
                  View & Download Certificate
                </button>

                <button
                  onClick={handleStartOver}
                  disabled={isResetting}
                  className="w-full btn-secondary flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  {isResetting ? 'Resetting...' : 'Start Over (Begin New Cycle)'}
                </button>
              </div>

              {/* Info Note */}
              <p className="text-xs font-body text-text-light text-center italic">
                You can access your certificate anytime from your dashboard. 
                Your completion history will be preserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompletionModal;
