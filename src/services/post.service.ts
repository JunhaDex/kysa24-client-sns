import { ApiService } from '@/services/api.service'
import type { PageRequest, PageResponse, Post, Reply } from '@/types/general.type'

export class PostService extends ApiService {
  constructor() {
    super('post')
  }

  async listPostsByGroup(
    ref: string,
    options?: { page?: PageRequest }
  ): Promise<PageResponse<Post>> {
    const res = await this.client.get(`/feed/${ref}`, {
      params: {
        page: options?.page?.page,
        size: options?.page?.size
      }
    })
    return this.unpackRes(res) as PageResponse<Post>
  }

  async getPostById(postId: number): Promise<{ post: Post; reply: PageResponse<Reply> }> {
    const res = await this.client.get(`/detail/${postId}`)
    return this.unpackRes(res) as { post: Post; reply: PageResponse<Reply> }
  }

  async getPostReply(
    postId: number,
    options?: { page?: PageRequest }
  ): Promise<PageResponse<Reply>> {
    const res = await this.client.get(`/${postId}/reply`, {
      params: {
        page: options?.page?.page,
        size: options?.page?.size
      }
    })
    return this.unpackRes(res) as PageResponse<Reply>
  }

  async createPost(params: { groupRef: string; message: string; image?: string }): Promise<void> {
    await this.auth().client.post('/new', params)
  }

  async updatePost(
    postId: number,
    params: {
      message: string
      image?: string
    }
  ): Promise<void> {
    await this.auth().client.patch(`/${postId}`, params)
  }

  async likePost(postId: number, options?: { undo?: 'true' }): Promise<void> {
    await this.auth().client.put(
      `/${postId}/like`,
      {},
      {
        params: {
          undo: options?.undo
        }
      }
    )
  }

  async createReply(postId: number, params: { message: string }): Promise<void> {
    await this.auth().client.post(`/${postId}/reply/new`, params)
  }

  async deletePost(postId: number): Promise<void> {
    await this.auth().client.delete(`/${postId}/delete`)
  }

  async deleteReply(postId: number, replyId: number): Promise<void> {
    await this.auth().client.delete(`/${postId}/reply/${replyId}/delete`)
  }
}
