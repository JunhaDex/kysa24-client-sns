import { getMessaging } from 'firebase/messaging/sw'
import { onBackgroundMessage } from 'firebase/messaging/sw'

const messaging = getMessaging()
onBackgroundMessage(messaging, (payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload)
  // Customize notification here
  const notificationTitle = 'Background Message Title'
  const notificationOptions = {
    body: 'Background Message body.',
    icon: './favicon.ico'
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})
