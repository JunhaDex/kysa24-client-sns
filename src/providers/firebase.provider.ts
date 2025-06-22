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
      const userToken = await getToken(this.messaging, { vapidKey: firebaseConfig.apiKey })
      if (userToken) {
        return userToken
      } else {
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

  setupMessageListener(uiResolver: any): void {
    onMessage(this.messaging, (payload) => {
      uiResolver()
    })
  }
}
