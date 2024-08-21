import { ApiService } from '@/services/api.service'
import type {
  PageRequest,
  PageResponse,
  Team,
  User,
  UserExtra,
  UserNoti
} from '@/types/general.type'
import { cleanObject } from '@/utils/index.util'
import { UserClass, UserNotiClass } from '@/constants/class.constant'
import dayjs from 'dayjs'

export class UserService extends ApiService {
  constructor() {
    super('user')
  }

  private cleanUser(user: User): User {
    const clean = cleanObject<User>(user, UserClass)
    clean.dob = dayjs(user.dob).tz().format('YYYY-MM-DD')
    return clean
  }

  private cleanUserNoti(noti: any): UserNoti {
    const clean = cleanObject<UserNoti>(noti, UserNotiClass)
    const [category, sub] = noti.type.split('__')
    clean.type = { category, sub }
    clean.payload = JSON.parse(noti.payload)
    return clean
  }

  async listUsers(options?: {
    page?: PageRequest
    name?: string
    team?: string
    sex?: number
  }): Promise<PageResponse<User>> {
    const res = await this.auth().client.get('/secure-list', {
      params: {
        page: options?.page?.page,
        size: options?.page?.size,
        name: options?.name,
        'team-name': options?.team,
        sex: options?.sex
      }
    })
    const { meta, list } = this.unpackRes(res) as PageResponse<User>
    return { meta, list: list.map(this.cleanUser) }
  }

  async getUserByRef(ref: string): Promise<{ user: User; extra: UserExtra }> {
    const res = await this.auth().client.get(`/${ref}`)
    const { user, extra } = this.unpackRes(res) as { user: User; extra: UserExtra }
    return {
      user: this.cleanUser(user),
      extra
    }
  }

  async updateUserExtra(ref: string, params: UserExtra): Promise<void> {
    await this.auth().client.patch(`/my/extra/${ref}`, params)
  }

  async listTeams(): Promise<Team[]> {
    const teamUrl = import.meta.env.VITE_API_BASE_URL + '/team'
    const res = await this.client.get(teamUrl)
    return this.unpackRes(res) as Team[] // no cleanup
  }

  async updateMyInfo(
    ref: string,
    params: {
      profileImg?: string
      coverImg?: string
      introduce?: string
    }
  ): Promise<void> {
    await this.auth().client.patch(`/my/${ref}`, params)
  }

  async updateMyPwd(
    ref: string,
    params: {
      oldPwd: string
      newPwd: string
    }
  ): Promise<void> {
    await this.auth().client.put(`/my/${ref}/pwd`, params)
  }

  async updateMyDevice(ref: string, fcm: { token: string; device: string }) {
    await this.auth().client.put(`/my/${ref}/device`, fcm)
  }

  async listNotifications(options?: { page?: PageRequest }): Promise<PageResponse<UserNoti>> {
    const res = await this.auth().client.get('/my/noti', {
      params: {
        page: options?.page?.page,
        size: options?.page?.size
      }
    })
    const { meta, list } = this.unpackRes(res) as PageResponse<UserNoti>
    return { meta, list: list.map(this.cleanUserNoti) }
  }

  async markNotificationAsRead(params: { ids: number[] }): Promise<void> {
    await this.auth().client.post('/my/noti', params)
  }

  async deleteNotification(params: { ids: number[] }): Promise<void> {
    await this.auth().client.delete('my/noti/delete-batch', {
      data: params
    })
  }
}
