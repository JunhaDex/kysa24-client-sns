import { getMessaging } from 'firebase/messaging/sw'
import { onBackgroundMessage } from 'firebase/messaging/sw'
import { initializeApp } from 'firebase/app'
import firebaseConfig from '../secret/firebase-config.json'

console.log('messaging-sw loaded!')
console.log(navigator.serviceWorker)
const app = initializeApp(firebaseConfig)
const messaging = getMessaging(app)
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
