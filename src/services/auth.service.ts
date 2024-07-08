import { ApiService } from '@/services/api.service'
import type { User, UserAuth } from '@/types/general.type'

export class AuthService extends ApiService {
  constructor() {
    super('auth')
  }

  async login(params: { id: string; pwd: string; fcm?: string }): Promise<void> {
    const res = await this.client.post('/login', { ...params })
    const auth = this.unpackRes(res) as UserAuth
    this.authStore.setJwt(auth.accessToken)
  }

  logout(): void {
    this.authStore.setJwt('')
  }

  async getMy(): Promise<User> {
    const res = await this.auth().client.get('/me')
    return this.unpackRes(res) as User
  }
}
