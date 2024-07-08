import { ApiService } from '@/services/api.service'
import type { Group, PageRequest, PageResponse } from '@/types/general.type'

export class GroupService extends ApiService {
  constructor() {
    super('group')
  }

  async listGroups(options?: { page?: PageRequest; name?: string }): Promise<PageResponse<Group>> {
    const res = await this.client.get('', {
      params: {
        page: options?.page?.page,
        size: options?.page?.size,
        name: options?.name
      }
    })
    return this.unpackRes(res) as PageResponse<Group>
  }

  async getGroupByRef(ref: string): Promise<Group> {
    const res = await this.client.get(`/${ref}`)
    return this.unpackRes(res) as Group
  }

  async createGroup(params: {
    groupName: string
    introduce: string
    profileImg?: string
    coverImg?: string
  }): Promise<void> {
    await this.auth().client.post('/new', params)
  }

  async updateGroup(
    ref: string,
    params: {
      profileImg?: string
      coverImg?: string
      introduce?: string
    }
  ): Promise<void> {
    this.auth().client.patch(`/${ref}`, params)
  }

  async followGroup(ref: string, options?: { undo?: 'true' }): Promise<void> {
    await this.auth().client.put(
      `/follow/${ref}`,
      {},
      {
        params: {
          undo: options?.undo
        }
      }
    )
  }

  async deleteGroup(ref: string): Promise<void> {
    await this.auth().client.delete(`/${ref}`)
  }
}
