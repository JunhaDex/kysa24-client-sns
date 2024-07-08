import { ApiService } from '@/services/api.service'
import type { PageRequest, PageResponse, User, UserNoti } from '@/types/general.type'

export class UserService extends ApiService {
  constructor() {
    super('user')
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
    return this.unpackRes(res) as PageResponse<User>
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
    return this.unpackRes(res) as PageResponse<UserNoti>
  }

  async deleteNotification(params: { ids: number[] }): Promise<void> {
    await this.client.delete('my/noti/delete-batch', {
      data: params
    })
  }
}
