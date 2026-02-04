// This service worker handles background push notifications
// It must be in the public directory and named firebase-messaging-sw.js

importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

// Initialize Firebase in the service worker
firebase.initializeApp({
  apiKey: "AIzaSyBZpR0Z85EUax--8ZtcL_lRKYyVk6Rm5CQ",
  authDomain: "tune-my-heart.firebaseapp.com",
  projectId: "tune-my-heart",
  storageBucket: "tune-my-heart.firebasestorage.app",
  messagingSenderId: "324234773170",
  appId: "1:324234773170:web:551969200751c9441fbfab"
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message:', payload);

  const notificationTitle = payload.notification?.title || 'Tune My Heart';
  const notificationOptions = {
    body: payload.notification?.body || 'You have a new notification',
    icon: payload.notification?.icon || '/android-chrome-192x192.png',
    badge: '/android-chrome-192x192.png',
    tag: 'tune-my-heart-notification',
    data: payload.data || {},
    requireInteraction: false,
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
  console.log('[firebase-messaging-sw.js] Notification click received:', event);

  event.notification.close();

  // Determine where to navigate
  let urlToOpen = '/';
  if (event.notification.data?.url) {
    urlToOpen = event.notification.data.url;
  }

  // This looks to see if the current window is already open and focuses it, otherwise opens new one
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      // Check if there is already a window/tab open with the target URL
      for (let i = 0; i < windowClients.length; i++) {
        const client = windowClients[i];
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus();
        }
      }
      // If not, then open a new window/tab with the URL
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});
