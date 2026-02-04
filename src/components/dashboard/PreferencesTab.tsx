import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useUserPreferences } from '../../contexts/UserPreferencesContext';
import { updateUserProgress, resetReadingPlan } from '../../services/userService';
import { Translation, PlanType } from '../../types/curriculum';
import { Mail, Lock, Eye, EyeOff, Bell, RotateCcw, AlertTriangle } from 'lucide-react';
import { EmailReminderFrequency, PushNotificationFrequency } from '../../types/user';
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { enablePushNotifications, disablePushNotifications, getNotificationPermission } from '../../services/notificationService';

interface PreferencesTabProps {
  onMessage: (message: { type: 'success' | 'error'; text: string } | null) => void;
}

const PreferencesTab = ({ onMessage }: PreferencesTabProps) => {
  const { currentUser } = useAuth();
  const { preferences, updatePreferences } = useUserPreferences();
  const [saving, setSaving] = useState(false);

  const [localPrefs, setLocalPrefs] = useState({
    bibleTranslation: preferences?.bibleTranslation || 'ESV',
    readingPlan: preferences?.readingPlan || 'narrative',
    startDate: currentUser?.progress?.startDate || new Date().toISOString().split('T')[0],
    manualPaceMode: preferences?.manualPaceMode || false,
    emailReminders: preferences?.emailReminders || 'daily',
    pushNotifications: preferences?.pushNotifications || 'daily',
    pushNotificationsEnabled: preferences?.pushNotificationsEnabled !== false,
  });

  // Password change state
  const [changingPassword, setChangingPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Reset schedule state
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [resetting, setResetting] = useState(false);

  const translations: Translation[] = ['ESV', 'KJV', 'NKJV', 'NASB', 'LSB'];
  const plans: { value: PlanType; label: string; description: string }[] = [
    {
      value: 'narrative',
      label: 'Narrative Plan',
      description: '5-day weekly plan focusing on Bible narratives, Psalms, and Proverbs',
    },
    {
      value: 'wholeBible',
      label: 'Whole Bible Plan',
      description: '5-day weekly plan to read through the entire Bible',
    },
  ];

  const handleSave = async () => {
    if (!currentUser) {
      onMessage({ type: 'error', text: 'You must be logged in to save preferences' });
      return;
    }

    try {
      setSaving(true);
      onMessage(null);

      console.log('=== SAVE PREFERENCES DEBUG ===');
      console.log('Start date to save:', localPrefs.startDate);

      await updatePreferences({
        bibleTranslation: localPrefs.bibleTranslation as Translation,
        readingPlan: localPrefs.readingPlan as PlanType,
        manualPaceMode: localPrefs.manualPaceMode,
        emailReminders: localPrefs.emailReminders as EmailReminderFrequency,
        pushNotifications: localPrefs.pushNotifications as PushNotificationFrequency,
        pushNotificationsEnabled: localPrefs.pushNotificationsEnabled,
      });
      console.log('✓ Preferences updated');

      // Handle push notification enablement/disablement
      if (localPrefs.pushNotificationsEnabled && currentUser) {
        const permission = getNotificationPermission();
        if (permission !== 'granted') {
          // Request permission and get token
          const result = await enablePushNotifications(currentUser.uid);
          if (!result.success) {
            console.warn('Failed to enable push notifications:', result.error);
            onMessage({ type: 'error', text: `Push notifications: ${result.error}` });
          } else {
            console.log('✓ Push notifications enabled');
          }
        }
      } else if (!localPrefs.pushNotificationsEnabled && currentUser) {
        // Disable push notifications
        await disablePushNotifications(currentUser.uid);
        console.log('✓ Push notifications disabled');
      }

      await updateUserProgress(currentUser.uid, {
        startDate: localPrefs.startDate,
      });
      console.log('✓ Start date updated');

      // Reload page to ensure all components get the fresh data
      console.log('📍 Reloading page...');
      window.location.reload();
    } catch (error) {
      console.error('❌ Error saving preferences:', error);
      onMessage({ type: 'error', text: 'Failed to save preferences. Please try again.' });
      setSaving(false);
    }
  };

  const handleReset = () => {
    setLocalPrefs({
      bibleTranslation: preferences?.bibleTranslation || 'ESV',
      readingPlan: preferences?.readingPlan || 'narrative',
      startDate: currentUser?.progress?.startDate || new Date().toISOString().split('T')[0],
      manualPaceMode: preferences?.manualPaceMode || false,
      emailReminders: preferences?.emailReminders || 'daily',
      pushNotifications: preferences?.pushNotifications || 'daily',
      pushNotificationsEnabled: preferences?.pushNotificationsEnabled !== false,
    });
    onMessage(null);
  };

  const handleChangePassword = async () => {
    if (!auth.currentUser || !currentUser?.email) {
      onMessage({ type: 'error', text: 'You must be logged in to change your password' });
      return;
    }

    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      onMessage({ type: 'error', text: 'Please fill in all password fields' });
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      onMessage({ type: 'error', text: 'New passwords do not match' });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      onMessage({ type: 'error', text: 'New password must be at least 6 characters' });
      return;
    }

    try {
      setChangingPassword(true);
      onMessage(null);

      // Re-authenticate user
      const credential = EmailAuthProvider.credential(
        currentUser.email,
        passwordData.currentPassword
      );
      await reauthenticateWithCredential(auth.currentUser, credential);

      // Update password
      await updatePassword(auth.currentUser, passwordData.newPassword);

      onMessage({ type: 'success', text: 'Password changed successfully!' });
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });

      setTimeout(() => onMessage(null), 3000);
    } catch (error: any) {
      console.error('Error changing password:', error);
      if (error.code === 'auth/wrong-password') {
        onMessage({ type: 'error', text: 'Current password is incorrect' });
      } else if (error.code === 'auth/weak-password') {
        onMessage({ type: 'error', text: 'New password is too weak' });
      } else {
        onMessage({ type: 'error', text: 'Failed to change password. Please try again.' });
      }
    } finally {
      setChangingPassword(false);
    }
  };

  const handleResetSchedule = async () => {
    if (!currentUser || !showResetConfirm) {
      setShowResetConfirm(true);
      return;
    }

    try {
      setResetting(true);
      onMessage(null);
      
      await resetReadingPlan(currentUser.uid);
      
      setShowResetConfirm(false);
      onMessage({ type: 'success', text: 'Schedule reset successfully! All readings have been unchecked and you are back to Week 1, Day 1.' });
      
      // Reload page after a brief delay
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error('Error resetting schedule:', error);
      onMessage({ type: 'error', text: 'Failed to reset schedule. Please try again.' });
      setShowResetConfirm(false);
    } finally {
      setResetting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Bible Translation */}
      <div className="card">
        <h2 className="text-xl font-heading text-primary mb-4">
          Bible Translation
        </h2>
        <p className="text-sm text-text-light font-body mb-4">
          Select your preferred Bible translation for reading Scripture
        </p>

        <div className="space-y-2">
          {translations.map((translation) => (
            <label
              key={translation}
              className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-background-dark cursor-pointer transition"
            >
              <input
                type="radio"
                name="translation"
                value={translation}
                checked={localPrefs.bibleTranslation === translation}
                onChange={(e) =>
                  setLocalPrefs({ ...localPrefs, bibleTranslation: e.target.value as Translation })
                }
                className="w-4 h-4 text-primary focus:ring-primary"
              />
              <span className="font-body text-text font-semibold">{translation}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Reading Plan */}
      <div className="card">
        <h2 className="text-xl font-heading text-primary mb-4">
          Reading Plan
        </h2>
        <p className="text-sm text-text-light font-body mb-4">
          Choose which reading plan to follow
        </p>

        <div className="space-y-3">
          {plans.map((plan) => (
            <label
              key={plan.value}
              className="flex items-start space-x-3 p-4 rounded-lg border border-gray-200 hover:bg-background-dark cursor-pointer transition"
            >
              <input
                type="radio"
                name="plan"
                value={plan.value}
                checked={localPrefs.readingPlan === plan.value}
                onChange={(e) =>
                  setLocalPrefs({ ...localPrefs, readingPlan: e.target.value as PlanType })
                }
                className="w-4 h-4 mt-1 text-primary focus:ring-primary"
              />
              <div className="flex-1">
                <div className="font-body text-text font-semibold mb-1">
                  {plan.label}
                </div>
                <div className="text-sm text-text-light font-body">
                  {plan.description}
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Schedule Pace Mode */}
      <div className="card">
        <h2 className="text-xl font-heading text-primary mb-4">
          Schedule Pace Mode
        </h2>
        <p className="text-sm text-text-light font-body mb-4">
          Choose how you want to progress through the curriculum
        </p>

        <div className="space-y-3">
          <label className="flex items-start space-x-3 p-4 rounded-lg border border-gray-200 hover:bg-background-dark cursor-pointer transition">
            <input
              type="radio"
              name="paceMode"
              value="automatic"
              checked={!localPrefs.manualPaceMode}
              onChange={() =>
                setLocalPrefs({ ...localPrefs, manualPaceMode: false })
              }
              className="w-4 h-4 mt-1 text-primary focus:ring-primary"
            />
            <div className="flex-1">
              <div className="font-body text-text font-semibold mb-1">
                Automatic (Date-Based)
              </div>
              <div className="text-sm text-text-light font-body">
                Follow the 5-day weekly schedule (Monday-Friday) based on calendar dates. The app automatically shows you the current week and day.
              </div>
            </div>
          </label>

          <label className="flex items-start space-x-3 p-4 rounded-lg border border-gray-200 hover:bg-background-dark cursor-pointer transition">
            <input
              type="radio"
              name="paceMode"
              value="manual"
              checked={localPrefs.manualPaceMode}
              onChange={() =>
                setLocalPrefs({ ...localPrefs, manualPaceMode: true })
              }
              className="w-4 h-4 mt-1 text-primary focus:ring-primary"
            />
            <div className="flex-1">
              <div className="font-body text-text font-semibold mb-1">
                Manual (Self-Paced)
              </div>
              <div className="text-sm text-text-light font-body">
                Advance at your own pace. You manually control which week and day you're on, regardless of calendar dates.
              </div>
            </div>
          </label>
        </div>

        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-900 font-body">
            <strong>💡 Tip:</strong> Manual mode is perfect if you want to go faster or slower than the standard 5-day weekly schedule, or if you're starting mid-year and don't want to jump ahead.
          </p>
        </div>
      </div>

      {/* Start Date */}
      <div className="card">
        <h2 className="text-xl font-heading text-primary mb-4">
          Schedule Start Date
        </h2>
        <p className="text-sm text-text-light font-body mb-4">
          {localPrefs.manualPaceMode 
            ? 'Set your reference start date (only used if you switch back to automatic mode)'
            : 'Set when you want to begin the curriculum (defaults to first Monday of the year)'}
        </p>

        <div className="max-w-md">
          <label className="block text-sm font-body text-text mb-2">
            Start Date
          </label>
          <input
            type="date"
            value={localPrefs.startDate}
            onChange={(e) =>
              setLocalPrefs({ ...localPrefs, startDate: e.target.value })
            }
            className="input-field"
            disabled={localPrefs.manualPaceMode}
          />
          <p className="text-xs text-text-light font-body mt-2">
            {localPrefs.manualPaceMode
              ? '🔒 Start date is disabled in manual pace mode'
              : '💡 Tip: Choose a Monday to align with the 5-day weekly schedule (Monday-Friday)'}
          </p>
        </div>
      </div>

      {/* Email Reminders */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <Mail className="text-primary" size={24} />
          <h2 className="text-xl font-heading text-primary">
            Email Reminders
          </h2>
        </div>
        <p className="text-sm text-text-light font-body mb-4">
          Choose how often you'd like to receive email reminders to keep up with your reading schedule
        </p>

        <div className="space-y-3">
          <label className="flex items-start space-x-3 p-4 rounded-lg border border-gray-200 hover:bg-background-dark cursor-pointer transition">
            <input
              type="radio"
              name="emailReminders"
              value="daily"
              checked={localPrefs.emailReminders === 'daily'}
              onChange={(e) =>
                setLocalPrefs({ ...localPrefs, emailReminders: e.target.value as EmailReminderFrequency })
              }
              className="w-4 h-4 mt-1 text-primary focus:ring-primary"
            />
            <div className="flex-1">
              <div className="font-body text-text font-semibold mb-1">
                Daily
              </div>
              <div className="text-sm text-text-light font-body">
                Receive an email reminder every day with your daily reading assignments
              </div>
            </div>
          </label>

          <label className="flex items-start space-x-3 p-4 rounded-lg border border-gray-200 hover:bg-background-dark cursor-pointer transition">
            <input
              type="radio"
              name="emailReminders"
              value="weekly"
              checked={localPrefs.emailReminders === 'weekly'}
              onChange={(e) =>
                setLocalPrefs({ ...localPrefs, emailReminders: e.target.value as EmailReminderFrequency })
              }
              className="w-4 h-4 mt-1 text-primary focus:ring-primary"
            />
            <div className="flex-1">
              <div className="font-body text-text font-semibold mb-1">
                Weekly
              </div>
              <div className="text-sm text-text-light font-body">
                Receive a weekly email at the start of each week with an overview of the week's readings
              </div>
            </div>
          </label>

          <label className="flex items-start space-x-3 p-4 rounded-lg border border-gray-200 hover:bg-background-dark cursor-pointer transition">
            <input
              type="radio"
              name="emailReminders"
              value="when-behind"
              checked={localPrefs.emailReminders === 'when-behind'}
              onChange={(e) =>
                setLocalPrefs({ ...localPrefs, emailReminders: e.target.value as EmailReminderFrequency })
              }
              className="w-4 h-4 mt-1 text-primary focus:ring-primary"
            />
            <div className="flex-1">
              <div className="font-body text-text font-semibold mb-1">
                When Behind
              </div>
              <div className="text-sm text-text-light font-body">
                Only receive emails when you're falling behind on your reading schedule
              </div>
            </div>
          </label>

          <label className="flex items-start space-x-3 p-4 rounded-lg border border-gray-200 hover:bg-background-dark cursor-pointer transition">
            <input
              type="radio"
              name="emailReminders"
              value="never"
              checked={localPrefs.emailReminders === 'never'}
              onChange={(e) =>
                setLocalPrefs({ ...localPrefs, emailReminders: e.target.value as EmailReminderFrequency })
              }
              className="w-4 h-4 mt-1 text-primary focus:ring-primary"
            />
            <div className="flex-1">
              <div className="font-body text-text font-semibold mb-1">
                Never
              </div>
              <div className="text-sm text-text-light font-body">
                Don't send me any email reminders
              </div>
            </div>
          </label>
        </div>

        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-900 font-body">
            <strong>📧 Note:</strong> Email reminders help you stay consistent with your spiritual disciplines. You can change this setting at any time.
          </p>
        </div>
      </div>

      {/* Push Notifications */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="text-primary" size={24} />
          <h2 className="text-xl font-heading text-primary">
            Push Notifications
          </h2>
        </div>
        <p className="text-sm text-text-light font-body mb-4">
          Get push notifications on your device to stay on track with your reading schedule
        </p>

        {/* Master Toggle */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <label className="flex items-center justify-between cursor-pointer">
            <div className="flex-1">
              <div className="font-body text-text font-semibold mb-1">
                Enable Push Notifications
              </div>
              <div className="text-sm text-text-light font-body">
                Turn on to receive push notifications on this device
              </div>
            </div>
            <div className="ml-4">
              <input
                type="checkbox"
                checked={localPrefs.pushNotificationsEnabled}
                onChange={(e) =>
                  setLocalPrefs({ ...localPrefs, pushNotificationsEnabled: e.target.checked })
                }
                className="w-5 h-5 text-primary focus:ring-primary rounded"
              />
            </div>
          </label>
        </div>

        {/* Frequency Options (only shown when enabled) */}
        {localPrefs.pushNotificationsEnabled && (
          <div className="space-y-3">
            <p className="text-sm font-body text-text-light mb-3">
              Choose notification frequency:
            </p>

            <label className="flex items-start space-x-3 p-4 rounded-lg border border-gray-200 hover:bg-background-dark cursor-pointer transition">
              <input
                type="radio"
                name="pushNotifications"
                value="daily"
                checked={localPrefs.pushNotifications === 'daily'}
                onChange={(e) =>
                  setLocalPrefs({ ...localPrefs, pushNotifications: e.target.value as PushNotificationFrequency })
                }
                className="w-4 h-4 mt-1 text-primary focus:ring-primary"
              />
              <div className="flex-1">
                <div className="font-body text-text font-semibold mb-1">
                  Daily
                </div>
                <div className="text-sm text-text-light font-body">
                  Receive a push notification every day with your daily reading assignments
                </div>
              </div>
            </label>

            <label className="flex items-start space-x-3 p-4 rounded-lg border border-gray-200 hover:bg-background-dark cursor-pointer transition">
              <input
                type="radio"
                name="pushNotifications"
                value="weekly"
                checked={localPrefs.pushNotifications === 'weekly'}
                onChange={(e) =>
                  setLocalPrefs({ ...localPrefs, pushNotifications: e.target.value as PushNotificationFrequency })
                }
                className="w-4 h-4 mt-1 text-primary focus:ring-primary"
              />
              <div className="flex-1">
                <div className="font-body text-text font-semibold mb-1">
                  Weekly
                </div>
                <div className="text-sm text-text-light font-body">
                  Receive a push notification at the start of each week with an overview of the week's readings
                </div>
              </div>
            </label>

            <label className="flex items-start space-x-3 p-4 rounded-lg border border-gray-200 hover:bg-background-dark cursor-pointer transition">
              <input
                type="radio"
                name="pushNotifications"
                value="when-behind"
                checked={localPrefs.pushNotifications === 'when-behind'}
                onChange={(e) =>
                  setLocalPrefs({ ...localPrefs, pushNotifications: e.target.value as PushNotificationFrequency })
                }
                className="w-4 h-4 mt-1 text-primary focus:ring-primary"
              />
              <div className="flex-1">
                <div className="font-body text-text font-semibold mb-1">
                  When Behind
                </div>
                <div className="text-sm text-text-light font-body">
                  Only receive push notifications when you're falling behind on your reading schedule
                </div>
              </div>
            </label>

            <label className="flex items-start space-x-3 p-4 rounded-lg border border-gray-200 hover:bg-background-dark cursor-pointer transition">
              <input
                type="radio"
                name="pushNotifications"
                value="never"
                checked={localPrefs.pushNotifications === 'never'}
                onChange={(e) =>
                  setLocalPrefs({ ...localPrefs, pushNotifications: e.target.value as PushNotificationFrequency })
                }
                className="w-4 h-4 mt-1 text-primary focus:ring-primary"
              />
              <div className="flex-1">
                <div className="font-body text-text font-semibold mb-1">
                  Never
                </div>
                <div className="text-sm text-text-light font-body">
                  Don't send me any push notifications (same as disabling above)
                </div>
              </div>
            </label>
          </div>
        )}

        <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
          <p className="text-xs text-purple-900 font-body">
            <strong>🔔 Note:</strong> Push notifications work on most modern browsers including Chrome, Firefox, Edge, and Safari (iOS 16.4+). You can manage email and push notifications independently.
          </p>
        </div>
      </div>

      {/* Reset Schedule */}
      <div className="card bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <AlertTriangle className="w-10 h-10 text-red-600" />
          </div>
          
          <div className="flex-1">
            <h2 className="text-xl font-heading text-red-900 mb-2 flex items-center gap-2">
              Reset Schedule
            </h2>
            <p className="text-sm text-red-800 font-body mb-3">
              Start your reading schedule over from the beginning. This will:
            </p>
            <ul className="text-sm text-red-800 font-body space-y-1 list-disc list-inside mb-4">
              <li>Reset you to <strong>Week 1, Day 1</strong></li>
              <li>Uncheck all completed readings</li>
              <li>This action cannot be undone</li>
            </ul>
            
            {!showResetConfirm ? (
              <button
                onClick={() => setShowResetConfirm(true)}
                disabled={resetting || !currentUser}
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm font-body font-semibold disabled:opacity-50"
              >
                <RotateCcw size={18} />
                Reset My Schedule
              </button>
            ) : (
              <div className="space-y-3">
                <div className="p-4 bg-red-100 border-2 border-red-300 rounded-lg">
                  <p className="text-sm font-body text-red-900 font-bold mb-2">
                    ⚠️ ARE YOU SURE?
                  </p>
                  <p className="text-xs font-body text-red-800 mb-3">
                    This will reset your entire schedule and uncheck all readings. This cannot be undone. Click "Confirm Reset" to proceed, or "Cancel" to go back.
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={handleResetSchedule}
                      disabled={resetting}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800 transition text-sm font-body font-semibold disabled:opacity-50"
                    >
                      {resetting ? 'Resetting...' : 'Confirm Reset'}
                    </button>
                    <button
                      onClick={() => setShowResetConfirm(false)}
                      disabled={resetting}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition text-sm font-body disabled:opacity-50"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <Lock className="text-primary" size={24} />
          <h2 className="text-xl font-heading text-primary">
            Change Password
          </h2>
        </div>
        <p className="text-sm text-text-light font-body mb-4">
          Update your account password for security
        </p>

        <div className="space-y-4 max-w-md">
          {/* Current Password */}
          <div>
            <label className="block text-sm font-body text-text mb-2">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                className="input-field pr-10"
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-body text-text mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? 'text' : 'password'}
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                className="input-field pr-10"
                placeholder="Enter new password (min 6 characters)"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Confirm New Password */}
          <div>
            <label className="block text-sm font-body text-text mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                className="input-field pr-10"
                placeholder="Confirm new password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            onClick={handleChangePassword}
            disabled={changingPassword || !currentUser}
            className="btn-primary disabled:opacity-50"
          >
            {changingPassword ? 'Changing Password...' : 'Change Password'}
          </button>
        </div>

        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-xs text-yellow-900 font-body">
            <strong>🔒 Security:</strong> Choose a strong password with at least 6 characters. You'll need to enter your current password to verify it's you.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="card bg-background-dark">
        <div className="flex items-center justify-between">
          <button
            onClick={handleReset}
            disabled={saving}
            className="btn-secondary disabled:opacity-50"
          >
            Reset Changes
          </button>

          <button
            onClick={handleSave}
            disabled={saving || !currentUser}
            className="btn-primary disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Preferences'}
          </button>
        </div>

        {!currentUser && (
          <p className="text-sm text-text-light font-body mt-3 text-center">
            You must be logged in to save preferences
          </p>
        )}
      </div>

      {/* Info Card */}
      <div className="card bg-blue-50 border border-blue-200">
        <h3 className="font-heading text-primary mb-2">📌 About Preferences</h3>
        <ul className="text-sm text-text-light font-body space-y-1 list-disc list-inside">
          <li>Your Bible translation choice affects all Scripture displays throughout the app</li>
          <li>The reading plan determines which daily readings you see</li>
          <li>Schedule pace mode controls whether you follow a date-based schedule or advance manually</li>
          <li>Your start date helps calculate the current week and day (only in automatic mode)</li>
          <li>All preferences are saved to your account and sync across devices</li>
        </ul>
      </div>
    </div>
  );
};

export default PreferencesTab;
