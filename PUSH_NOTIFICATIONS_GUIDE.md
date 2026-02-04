# Push Notifications Implementation Guide

This guide explains how push notifications are implemented in the Tune My Heart app, including setup instructions, architecture overview, and usage guidelines.

## Overview

Push notifications have been integrated into the PWA to provide users with timely reminders about their daily reading schedules. Users receive both **email reminders** and **push notifications** by default (both set to "daily"), with full control over frequency and enabling/disabling each independently.

## Features

✅ **Default Configuration**: Daily email + daily push notifications enabled for all new users
✅ **Independent Controls**: Users can manage email and push notifications separately
✅ **Frequency Options**: Daily, Weekly, When Behind, or Never
✅ **Cross-Platform Support**: Works on Chrome, Firefox, Edge, and Safari (iOS 16.4+)
✅ **PWA Integration**: Leverages Firebase Cloud Messaging (FCM)
✅ **Background Notifications**: Service worker handles notifications when app is closed
✅ **Foreground Notifications**: Custom handler for when app is open
✅ **Token Management**: Automatic FCM token storage and refresh

## Architecture

### Frontend Components

1. **Firebase Configuration** (`src/config/firebase.ts`)
   - Initializes Firebase Cloud Messaging
   - Provides `getMessagingInstance()` helper for browser compatibility

2. **Notification Service** (`src/services/notificationService.ts`)
   - Manages permissions and FCM tokens
   - Handles foreground message reception
   - Provides enable/disable functions
   - Stores tokens in Firestore

3. **Service Worker** (`public/firebase-messaging-sw.js`)
   - Handles background push notifications
   - Manages notification clicks
   - Routes users to relevant pages

4. **UI Components** (`src/pages/Preferences.tsx`)
   - Push notification preferences section
   - Master enable/disable toggle
   - Frequency selection (daily, weekly, when-behind, never)
   - Browser permission request flow

5. **Type Definitions** (`src/types/user.ts`)
   - `PushNotificationFrequency` type
   - User preferences interface with push settings
   - FCM token storage fields

### Backend Components

1. **Cloud Functions** (To be implemented)
   - Send push notifications based on user preferences
   - Parallel to email reminder system
   - Handle daily, weekly, and behind-schedule notifications

## Setup Instructions

### 1. Firebase Console Configuration

#### Generate VAPID Key
1. Go to Firebase Console > Your Project
2. Navigate to **Project Settings** > **Cloud Messaging** tab
3. Under **Web Push certificates**, click **Generate key pair**
4. Copy the generated VAPID key (public key)

#### Update Environment Variables
Add to your `.env` file:
```bash
# Firebase Cloud Messaging
VITE_FIREBASE_VAPID_KEY=your_vapid_key_here
```

Add to `.env.example`:
```bash
# Firebase Cloud Messaging
VITE_FIREBASE_VAPID_KEY=your_vapid_key_here
```

### 2. Update Service Worker Configuration

Edit `public/firebase-messaging-sw.js` and replace the placeholder Firebase config with your actual credentials:

```javascript
firebase.initializeApp({
  apiKey: "YOUR_ACTUAL_API_KEY",
  authDomain: "YOUR_ACTUAL_AUTH_DOMAIN",
  projectId: "YOUR_ACTUAL_PROJECT_ID",
  storageBucket: "YOUR_ACTUAL_STORAGE_BUCKET",
  messagingSenderId: "YOUR_ACTUAL_MESSAGING_SENDER_ID",
  appId: "YOUR_ACTUAL_APP_ID"
});
```

**Note**: These values should match your main Firebase config in `src/config/firebase.ts`.

### 3. Deploy Firestore Rules

The existing Firestore rules already allow users to update their FCM tokens:
```
allow write: if request.auth != null && (
  request.auth.uid == userId ||
  isAdmin()
);
```

No changes needed to `firestore.rules`.

### 4. Build and Deploy

```bash
# Build the project
npm run build

# Deploy to Firebase Hosting
firebase deploy --only hosting

# Deploy service worker
# (The firebase-messaging-sw.js file in public/ is automatically deployed)
```

## User Flow

### First-Time Permission Request

1. User visits Preferences page
2. Push notifications are **enabled by default** (set to "daily")
3. When user saves preferences, browser prompts for notification permission
4. If granted:
   - FCM token is generated
   - Token is saved to Firestore (`users/{userId}.fcmToken`)
   - User starts receiving push notifications
5. If denied:
   - Error message shown
   - User can re-enable in browser settings

### Changing Preferences

1. User can toggle push notifications on/off with master switch
2. User can change frequency (daily, weekly, when-behind, never)
3. Push and email settings work independently
4. Changes take effect immediately

### Token Refresh

- FCM tokens are automatically refreshed every 7 days
- Tokens are also refreshed if they become invalid
- `shouldRefreshToken()` helper checks if refresh is needed

## Browser Support

| Browser | Desktop | Mobile | Notes |
|---------|---------|--------|-------|
| Chrome  | ✅ | ✅ | Full support |
| Firefox | ✅ | ✅ | Full support |
| Edge    | ✅ | ✅ | Full support |
| Safari  | ✅ (macOS 13+) | ✅ (iOS 16.4+) | Requires recent versions |
| Opera   | ✅ | ✅ | Chromium-based |

## Cloud Functions (Backend)

### Push Notification Functions Structure

Create the following Cloud Functions to send push notifications (similar to email functions):

#### 1. `sendPushNotification` (Helper Function)
```typescript
// functions/src/push/push-notification-helper.ts
import * as admin from 'firebase-admin';

interface PushNotificationData {
  title: string;
  body: string;
  icon?: string;
  url?: string;
}

export async function sendPushToUser(
  userId: string,
  data: PushNotificationData
): Promise<void> {
  // Get user's FCM token
  const userDoc = await admin.firestore().collection('users').doc(userId).get();
  const fcmToken = userDoc.data()?.fcmToken;

  if (!fcmToken) {
    console.log(`No FCM token for user ${userId}`);
    return;
  }

  // Send push notification
  const message = {
    notification: {
      title: data.title,
      body: data.body,
      icon: data.icon || '/android-chrome-192x192.png',
    },
    data: {
      url: data.url || '/',
    },
    token: fcmToken,
  };

  try {
    await admin.messaging().send(message);
    console.log(`Push notification sent to user ${userId}`);
  } catch (error) {
    console.error(`Error sending push to ${userId}:`, error);
    // If token is invalid, remove it
    if (error.code === 'messaging/invalid-registration-token') {
      await admin.firestore().collection('users').doc(userId).update({
        fcmToken: null,
      });
    }
  }
}
```

#### 2. Scheduled Functions
Integrate with existing email reminder system:

```typescript
// functions/src/push/push-reminders.ts
import { sendPushToUser } from './push-notification-helper';

// Called alongside daily email sending
export async function sendDailyPushReminders() {
  const usersSnapshot = await admin.firestore()
    .collection('users')
    .where('preferences.pushNotificationsEnabled', '==', true)
    .where('preferences.pushNotifications', '==', 'daily')
    .get();

  for (const userDoc of usersSnapshot.docs) {
    const user = userDoc.data();
    
    await sendPushToUser(userDoc.id, {
      title: '📖 Daily Reading Reminder',
      body: 'Your daily devotional readings are ready!',
      url: '/reading-plan',
    });
  }
}
```

## Testing

### Local Testing

1. **Test Permission Request**:
   ```
   - Open app in browser
   - Navigate to Preferences
   - Enable push notifications
   - Check browser console for token
   ```

2. **Test Foreground Notifications**:
   - Use Firebase Console > Cloud Messaging > Send test message
   - Enter FCM token from console
   - Keep app open and in focus
   - Should see notification in app

3. **Test Background Notifications**:
   - Send test message as above
   - Close or minimize the app
   - Should see system notification

### Using Firebase Console

1. Go to Firebase Console > Cloud Messaging
2. Click **Send your first message**
3. Enter notification title and text
4. Click **Send test message**
5. Enter FCM token from user document
6. Click **Test**

### Testing with Cloud Functions

```bash
# Test sending push notification
firebase functions:shell

# In shell:
> sendDailyPushReminders()
```

## Troubleshooting

### Permission Denied

**Problem**: Browser blocks notification permission
**Solution**: 
- User must manually enable in browser settings
- Chrome: Settings > Site Settings > Notifications
- Safari: Safari > Settings > Websites > Notifications

### No FCM Token Generated

**Problem**: `fcmToken` field is null in Firestore
**Solutions**:
1. Check VAPID key is correctly set in `.env`
2. Verify service worker is registered (`console.log` in browser)
3. Check browser compatibility
4. Ensure HTTPS (required for service workers)

### Notifications Not Received

**Problem**: Push notifications not showing up
**Solutions**:
1. Check FCM token is valid in Firestore
2. Verify `pushNotificationsEnabled` is `true`
3. Check browser notification settings
4. Test with Firebase Console test message
5. Review Cloud Function logs for errors

### Service Worker Not Loading

**Problem**: `firebase-messaging-sw.js` not found
**Solutions**:
1. File must be in `public/` directory
2. File must be named exactly `firebase-messaging-sw.js`
3. Clear browser cache and hard reload
4. Check Firebase config in service worker matches main app

## Security Considerations

1. **FCM Tokens**
   - Stored securely in Firestore
   - Only accessible by user and admin
   - Automatically removed if invalid

2. **Firestore Rules**
   - Users can only update their own tokens
   - Read access limited to own data
   - Admin override for management

3. **VAPID Key**
   - Public key - safe to expose in client
   - Prevents unauthorized push sending
   - Rotate if compromised

4. **Data Privacy**
   - Push notifications don't include sensitive data
   - Links to app pages only
   - Respect user preferences

## Best Practices

1. **User Experience**
   - Don't request permission on first visit
   - Wait until user navigates to Preferences
   - Provide clear value proposition
   - Respect user's choice to decline

2. **Notification Content**
   - Keep titles short and clear
   - Provide actionable body text
   - Include relevant icons
   - Link to specific pages when clicked

3. **Frequency Management**
   - Default to daily (matches email)
   - Provide multiple frequency options
   - Allow easy disabling
   - Respect "never" choice

4. **Token Management**
   - Refresh tokens periodically
   - Handle invalid tokens gracefully
   - Remove tokens when user disables
   - Store update timestamp

## Integration with Existing Systems

### Email Reminders
- Push notifications complement email reminders
- Both enabled by default
- Users can choose one, both, or neither
- Same frequency options for both
- Cloud Functions should send both in parallel

### User Preferences
- Stored in `users/{userId}.preferences`
- `pushNotifications`: 'daily' | 'weekly' | 'when-behind' | 'never'
- `pushNotificationsEnabled`: boolean
- Synced across devices via Firestore

### PWA Integration
- Works seamlessly with existing PWA setup
- Service worker handles both caching and notifications
- Offline support maintained
- Installation prompt unaffected

## Future Enhancements

- [ ] Rich notifications with images
- [ ] Action buttons in notifications (e.g., "Mark as Complete")
- [ ] Notification history/log
- [ ] Custom notification sounds
- [ ] Time-of-day preferences
- [ ] Achievement/completion notifications
- [ ] Weekly summary notifications

## Resources

- [Firebase Cloud Messaging Docs](https://firebase.google.com/docs/cloud-messaging)
- [Web Push Notifications](https://developers.google.com/web/fundamentals/push-notifications)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Notification API](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API)

---

**Last Updated**: December 28, 2024
**Version**: 1.0.0
