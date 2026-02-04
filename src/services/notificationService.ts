import { getMessagingInstance } from '../config/firebase';
import { getToken, onMessage } from 'firebase/messaging';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

// VAPID key will be generated in Firebase Console under Project Settings > Cloud Messaging
// For now, you'll need to add this to your .env file as VITE_FIREBASE_VAPID_KEY
const VAPID_KEY = import.meta.env.VITE_FIREBASE_VAPID_KEY;

export interface NotificationPayload {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  data?: Record<string, any>;
}

/**
 * Check if push notifications are supported in the current browser
 */
export const isNotificationSupported = async (): Promise<boolean> => {
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications');
    return false;
  }

  const messaging = await getMessagingInstance();
  return messaging !== null;
};

/**
 * Request notification permission from the user
 */
export const requestNotificationPermission = async (): Promise<NotificationPermission> => {
  if (!('Notification' in window)) {
    return 'denied';
  }

  const permission = await Notification.requestPermission();
  console.log('Notification permission:', permission);
  return permission;
};

/**
 * Get the current notification permission status
 */
export const getNotificationPermission = (): NotificationPermission => {
  if (!('Notification' in window)) {
    return 'denied';
  }
  return Notification.permission;
};

/**
 * Get FCM token for push notifications
 * This token is used by the backend to send push notifications to this device
 */
export const getFCMToken = async (): Promise<string | null> => {
  try {
    const messaging = await getMessagingInstance();
    if (!messaging) {
      console.log('Firebase Messaging not supported');
      return null;
    }

    // Check if we have permission
    const permission = getNotificationPermission();
    if (permission !== 'granted') {
      console.log('Notification permission not granted');
      return null;
    }

    if (!VAPID_KEY) {
      console.error('VAPID key not configured. Add VITE_FIREBASE_VAPID_KEY to your .env file');
      return null;
    }

    // Get registration token
    const currentToken = await getToken(messaging, { 
      vapidKey: VAPID_KEY 
    });

    if (currentToken) {
      console.log('FCM token obtained:', currentToken.substring(0, 20) + '...');
      return currentToken;
    } else {
      console.log('No registration token available');
      return null;
    }
  } catch (error) {
    console.error('Error getting FCM token:', error);
    return null;
  }
};

/**
 * Save FCM token to Firestore user document
 */
export const saveFCMToken = async (userId: string, token: string): Promise<void> => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      fcmToken: token,
      fcmTokenUpdatedAt: new Date(),
    });
    console.log('FCM token saved to Firestore');
  } catch (error) {
    console.error('Error saving FCM token:', error);
    throw error;
  }
};

/**
 * Request permission and get FCM token, then save to Firestore
 */
export const enablePushNotifications = async (userId: string): Promise<{
  success: boolean;
  token?: string;
  error?: string;
}> => {
  try {
    // Check if notifications are supported
    const supported = await isNotificationSupported();
    if (!supported) {
      return {
        success: false,
        error: 'Push notifications are not supported in this browser',
      };
    }

    // Request permission
    const permission = await requestNotificationPermission();
    if (permission !== 'granted') {
      return {
        success: false,
        error: 'Notification permission denied',
      };
    }

    // Get FCM token
    const token = await getFCMToken();
    if (!token) {
      return {
        success: false,
        error: 'Failed to get notification token',
      };
    }

    // Save token to Firestore
    await saveFCMToken(userId, token);

    return {
      success: true,
      token,
    };
  } catch (error) {
    console.error('Error enabling push notifications:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

/**
 * Remove FCM token from Firestore (when user disables notifications)
 */
export const disablePushNotifications = async (userId: string): Promise<void> => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      fcmToken: null,
      fcmTokenUpdatedAt: new Date(),
    });
    console.log('FCM token removed from Firestore');
  } catch (error) {
    console.error('Error removing FCM token:', error);
    throw error;
  }
};

/**
 * Set up foreground message handler
 * This handles notifications when the app is open and in focus
 */
export const setupForegroundMessageHandler = (
  callback: (payload: NotificationPayload) => void
): (() => void) => {
  let unsubscribe: (() => void) | null = null;

  getMessagingInstance().then(messaging => {
    if (!messaging) {
      console.log('Messaging not supported, skipping foreground handler');
      return;
    }

    unsubscribe = onMessage(messaging, (payload) => {
      console.log('Foreground message received:', payload);
      
      const notificationPayload: NotificationPayload = {
        title: payload.notification?.title || 'Notification',
        body: payload.notification?.body || '',
        icon: payload.notification?.icon,
        data: payload.data,
      };

      // Call the provided callback
      callback(notificationPayload);

      // Also show a browser notification if the tab doesn't have focus
      if (document.hidden && getNotificationPermission() === 'granted') {
        showNotification(notificationPayload);
      }
    });
  });

  // Return cleanup function
  return () => {
    if (unsubscribe) {
      unsubscribe();
    }
  };
};

/**
 * Show a browser notification
 */
export const showNotification = (payload: NotificationPayload): void => {
  if (getNotificationPermission() !== 'granted') {
    console.log('Cannot show notification: permission not granted');
    return;
  }

  const options: NotificationOptions = {
    body: payload.body,
    icon: payload.icon || '/android-chrome-192x192.png',
    badge: payload.badge || '/android-chrome-192x192.png',
    data: payload.data,
    tag: 'tune-my-heart-notification',
    requireInteraction: false,
  };

  const notification = new Notification(payload.title, options);

  // Handle notification click
  notification.onclick = (event) => {
    event.preventDefault();
    window.focus();
    notification.close();
    
    // Navigate to relevant page if data is provided
    if (payload.data?.url) {
      window.location.href = payload.data.url;
    }
  };
};

/**
 * Check if we need to refresh the FCM token
 * Tokens should be refreshed periodically (e.g., every 7 days)
 */
export const shouldRefreshToken = (lastUpdated: Date | undefined): boolean => {
  if (!lastUpdated) return true;
  
  const daysSinceUpdate = (Date.now() - new Date(lastUpdated).getTime()) / (1000 * 60 * 60 * 24);
  return daysSinceUpdate > 7;
};
