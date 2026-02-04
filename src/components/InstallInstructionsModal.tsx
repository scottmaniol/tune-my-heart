import { X, Smartphone, Monitor, Apple, Chrome } from 'lucide-react';
import { useEffect, useState } from 'react';

interface InstallInstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Platform = 'ios' | 'android' | 'desktop-chrome' | 'desktop-edge' | 'desktop-safari' | 'desktop-firefox' | 'other';

const InstallInstructionsModal = ({ isOpen, onClose }: InstallInstructionsModalProps) => {
  const [platform, setPlatform] = useState<Platform>('other');

  useEffect(() => {
    if (isOpen) {
      detectPlatform();
    }
  }, [isOpen]);

  const detectPlatform = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(userAgent);
    const isAndroid = /android/.test(userAgent);
    const isChrome = /chrome/.test(userAgent) && !/edg/.test(userAgent);
    const isEdge = /edg/.test(userAgent);
    const isSafari = /safari/.test(userAgent) && !/chrome/.test(userAgent);
    const isFirefox = /firefox/.test(userAgent);

    if (isIOS) {
      setPlatform('ios');
    } else if (isAndroid) {
      setPlatform('android');
    } else if (isChrome) {
      setPlatform('desktop-chrome');
    } else if (isEdge) {
      setPlatform('desktop-edge');
    } else if (isSafari) {
      setPlatform('desktop-safari');
    } else if (isFirefox) {
      setPlatform('desktop-firefox');
    } else {
      setPlatform('other');
    }
  };

  if (!isOpen) return null;

  const instructions: Record<Platform, { title: string; icon: React.ReactNode; steps: string[] }> = {
    ios: {
      title: 'Install on iOS (iPhone/iPad)',
      icon: <Apple className="w-8 h-8 text-primary" />,
      steps: [
        'Tap the Share button (square with arrow pointing up) at the bottom of Safari',
        'Scroll down and tap "Add to Home Screen"',
        'Enter a name for the app (or keep "Tune My Heart")',
        'Tap "Add" in the top right corner',
        'The app icon will appear on your home screen',
      ],
    },
    android: {
      title: 'Install on Android',
      icon: <Smartphone className="w-8 h-8 text-primary" />,
      steps: [
        'Tap the menu button (three dots) in the top right corner of Chrome',
        'Tap "Add to Home screen" or "Install app"',
        'Enter a name for the app (or keep "Tune My Heart")',
        'Tap "Add"',
        'The app icon will appear on your home screen',
      ],
    },
    'desktop-chrome': {
      title: 'Install on Desktop (Chrome)',
      icon: <Chrome className="w-8 h-8 text-primary" />,
      steps: [
        'Look for the install icon (⊕ or computer icon) in the address bar',
        'Click the install icon, or click the menu (three dots) → "Install Tune My Heart"',
        'Click "Install" in the dialog that appears',
        'The app will open in its own window and be added to your applications',
      ],
    },
    'desktop-edge': {
      title: 'Install on Desktop (Edge)',
      icon: <Monitor className="w-8 h-8 text-primary" />,
      steps: [
        'Look for the install icon (⊕ or app icon) in the address bar',
        'Click the install icon, or click the menu (three dots) → "Apps" → "Install Tune My Heart"',
        'Click "Install" in the dialog that appears',
        'The app will be added to your Start Menu and Desktop',
      ],
    },
    'desktop-safari': {
      title: 'Install on Desktop (Safari)',
      icon: <Apple className="w-8 h-8 text-primary" />,
      steps: [
        'Safari on macOS doesn\'t support installing web apps like Chrome or Edge',
        'However, you can bookmark this page for quick access:',
        'Click "Bookmarks" → "Add Bookmark"',
        'Or add it to your Dock by dragging the URL to the Dock',
      ],
    },
    'desktop-firefox': {
      title: 'Bookmark in Firefox',
      icon: <Monitor className="w-8 h-8 text-primary" />,
      steps: [
        'Firefox doesn\'t support installing Progressive Web Apps',
        'However, you can bookmark this page for quick access:',
        'Click the star icon in the address bar',
        'Or press Ctrl+D (Windows) / Cmd+D (Mac)',
      ],
    },
    other: {
      title: 'Install Instructions',
      icon: <Monitor className="w-8 h-8 text-primary" />,
      steps: [
        'Installation is supported on modern browsers like Chrome, Edge, and Safari (iOS)',
        'Look for an install button or icon in your browser\'s address bar or menu',
        'Or add this website to your bookmarks for quick access',
      ],
    },
  };

  const currentInstructions = instructions[platform];

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 z-50" 
        onClick={onClose}
      />
      <div className="fixed inset-4 sm:inset-8 md:inset-16 lg:inset-24 z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-full overflow-hidden flex flex-col">
          {/* Modal Header */}
          <div className="bg-primary px-6 py-4 flex items-center justify-between border-b border-primary-dark">
            <div className="flex items-center gap-3">
              {currentInstructions.icon}
              <h2 className="text-xl sm:text-2xl font-heading text-white font-bold">
                Save App to Device
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="overflow-y-auto p-6 space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800 font-body">
                Installing this app will allow you to access it directly from your device's home screen or applications menu, just like a native app!
              </p>
            </div>

            <div>
              <h3 className="font-heading text-lg text-primary mb-3 font-semibold">
                {currentInstructions.title}
              </h3>
              <ol className="space-y-3">
                {currentInstructions.steps.map((step, index) => (
                  <li key={index} className="flex gap-3 font-body text-text">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    <span className="pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Show other platforms */}
            {platform !== 'other' && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setPlatform('other')}
                  className="text-sm text-primary hover:underline font-body"
                >
                  Using a different device or browser?
                </button>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition font-body font-semibold"
            >
              Got it!
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default InstallInstructionsModal;
