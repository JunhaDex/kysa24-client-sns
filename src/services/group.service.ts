import { ApiService } from '@/services/api.service'
import type { Group, PageRequest, PageResponse, Post } from '@/types/general.type'
import { cleanObject, getMention, getProfile } from '@/utils/index.util'
import { GroupClass, PostClass } from '@/constants/class.constant'
import { GROUP_PAGE_SIZE } from '@/constants/index.constant'

export class GroupService extends ApiService {
  constructor() {
    super('group')
  }

  private cleanGroup(group: any): Group {
    const clean = cleanObject<Group>(group, GroupClass)
    clean.creator = getMention({ ref: group.creatorRef, nickname: group.creatorNickname })
    if (group.posts !== undefined) {
      clean.posts = group.posts.map((post: any) => this.cleanPost(post))
    }
    return clean
  }

  private cleanPost(post: any): Post {
    const clean = cleanObject<Post>(post, PostClass)
    clean.author = getProfile({
      ref: post.authorRef,
      nickname: post.authorNickname,
      profileImg: post.authorProfileImg,
      coverImg: '',
      introduce: '',
      teamId: post.authorTeamId
    })
    return clean
  }

  async listGroups(options?: { page?: PageRequest; name?: string }): Promise<PageResponse<Group>> {
    const res = await this.authOpt().client.get('', {
      params: {
        page: options?.page?.page,
        size: GROUP_PAGE_SIZE,
        name: options?.name
      }
    })
    const { meta, list } = this.unpackRes(res) as PageResponse<Group>
    return {
      meta,
      list: list.map((group) => this.cleanGroup(group))
    }
  }

  async getMyGroups(): Promise<Group[]> {
    const res = await this.auth().client.get('/mylist')
    const groups = this.unpackRes(res) as Group[]
    return groups.map((group) => this.cleanGroup(group))
  }

  async getGroupByRef(ref: string): Promise<Group> {
    const res = await this.authOpt().client.get(`/${ref}`)
    const group = this.unpackRes(res) as Group
    return this.cleanGroup(group)
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
