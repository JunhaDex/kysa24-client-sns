import { ApiService } from '@/services/api.service'
import type { PageRequest, PageResponse, Team, User, UserNoti } from '@/types/general.type'
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
  }): Promise<PageResponse<User>> {
    const res = await this.client.get('/secure-list', {
      params: {
        page: options?.page?.page,
        size: options?.page?.size,
        name: options?.name,
        'team-name': options?.team
      }
    })
    const { meta, list } = this.unpackRes(res) as PageResponse<User>
    return { meta, list: list.map(this.cleanUser) }
  }

  async listTeams(): Promise<Team[]> {
    const res = await this.client.get('/team')
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
    await this.auth().client.patch(`/my/${ref}/pwd`, params)
  }

  async listNotifications(options?: { page?: PageRequest }): Promise<PageResponse<UserNoti>> {
    const res = await this.client.get('/notification', {
      params: {
        page: options?.page?.page,
        size: options?.page?.size
      }
    })
    const { meta, list } = this.unpackRes(res) as PageResponse<UserNoti>
    return { meta, list: list.map(this.cleanUserNoti) }
  }

  async deleteNotification(params: { ids: number[] }): Promise<void> {
    await this.client.delete('my/noti/delete-batch', {
      data: params
    })
  }
}
