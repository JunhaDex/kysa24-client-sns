import { initializeApp } from 'firebase/app'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'
import firebaseConfig from '@/../secret/firebase-config.json'

export class FirebaseProvider {
  private readonly app
  private readonly messaging

  constructor() {
    this.app = initializeApp(firebaseConfig)
    this.messaging = getMessaging(this.app)
  }

  async getUserToken() {
    try {
      const userToken = await getToken(this.messaging, { vapidKey: firebaseConfig.vapidKey })
      if (userToken) {
        console.log('userToken:', userToken)
        return userToken
      } else {
        console.log('no permission!')
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            return this.getUserToken()
          }
        })
      }
    } catch (e: any) {
      console.error('getUserTokenErr', e)
      throw e
    }
  }

  setupMessageListener(): void {
    onMessage(this.messaging, (payload) => {
      console.log('Message received foreground: ', payload)
    })
  }
}
