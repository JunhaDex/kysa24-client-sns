import axios, { type AxiosResponse } from 'axios'
import { useAuthStore } from '@/stores/auth.store'

export abstract class ApiService {
  protected client
  protected authStore: any

  protected constructor(resource: string) {
    this.authStore = useAuthStore()
    this.client = axios.create({
      baseURL: `${import.meta.env.VITE_API_BASE_URL}/${resource}`,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  auth(): this {
    const token = this.authStore.jwt
    if (token) {
      this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`
      return this
    }
    window.alert('로그인이 필요한 서비스 입니다.')
    window.location.href = '/login'
    throw new Error('token not found')
  }

  unpackRes(res: AxiosResponse): unknown {
    return res.data.result
  }
}
