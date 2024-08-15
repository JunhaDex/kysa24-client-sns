import { getMessaging } from 'firebase/messaging/sw'
import { onBackgroundMessage } from 'firebase/messaging/sw'
import { initializeApp } from 'firebase/app'
import firebaseConfig from '../secret/firebase-config.json'

declare const clients: any

console.log('messaging-sw loaded!')
console.log(navigator.serviceWorker)
const app = initializeApp(firebaseConfig)
const messaging = getMessaging(app)
onBackgroundMessage(messaging, (payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload)
  const res = payload.data?.raw
  if (res) {
    const parsed: any = JSON.parse(res)
    // Customize notification here
    const notificationTitle = parsed.title
    const notificationOptions = {
      body: parsed.message,
      icon: './favicon.ico',
      data: {
        url: new URL(parsed.clickUrl, self.location.origin).href
      }
    }
    self.addEventListener('notificationclick', (event: any) => {
      console.log('On notification click: ', event.notification.data.url)
      const urlToOpen = event.notification.data.url
      event.notification.close()
      event.waitUntil(
        clients
          .matchAll({ type: 'window', includeUncontrolled: true })
          .then((clientList: any) => {
            // Check if there's already a window/tab open with the target URL
            for (let i = 0; i < clientList.length; i++) {
              const client = clientList[i]
              if (client.url === urlToOpen && 'focus' in client) {
                return client.focus()
              }
            }
            // If no existing window/tab is found, open a new one
            return clients.openWindow(urlToOpen)
          })
          .catch(function (error: any) {
            console.error('Error in notificationclick event handler:', error)
          })
      )
    })

    self.registration.showNotification(notificationTitle, notificationOptions)
  }
})
