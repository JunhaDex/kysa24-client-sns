import { ApiService } from '@/services/api.service'
import type { PageRequest, PageResponse, Post, Reply } from '@/types/general.type'
import { cleanObject, getProfile } from '@/utils/index.util'
import { PostClass, ReplyClass } from '@/constants/class.constant'
import dayjs from 'dayjs'

export class PostService extends ApiService {
  constructor() {
    super('post')
  }

  private cleanPost(post: any): Post {
    const clean = cleanObject<Post>(post, PostClass)
    clean.createdAt = dayjs(post.createdAt).tz().format('YYYY-MM-DD HH:mm:ss')
    clean.author = getProfile({
      ref: post.authorRef,
      nickname: post.authorNickname,
      profileImg: post.authorProfileImg,
      coverImg: post.authorCoverImg,
      introduce: post.authorIntroduce,
      teamId: post.authorTeamId
    })
    return clean
  }

  private cleanReply(reply: any): Reply {
    const clean = cleanObject<Reply>(reply, ReplyClass)
    clean.createdAt = dayjs(reply.createdAt).tz().format('YYYY-MM-DD HH:mm:ss')
    clean.author = getProfile({
      ref: reply.authorRef,
      nickname: reply.authorNickname,
      profileImg: reply.authorProfileImg,
      coverImg: reply.authorCoverImg,
      introduce: reply.authorIntroduce,
      teamId: reply.authorTeamId
    })
    return clean
  }

  async listPostsByGroup(
    ref: string,
    options?: { page?: PageRequest }
  ): Promise<PageResponse<Post>> {
    const res = await this.authOpt().client.get(`/feed/${ref}`, {
      params: {
        page: options?.page?.page,
        size: options?.page?.size
      }
    })
    const { meta, list } = this.unpackRes(res) as PageResponse<Post>
    return {
      meta,
      list: list.map(this.cleanPost)
    }
  }

  async getPostById(postId: number): Promise<{ post: Post; reply: PageResponse<Reply> }> {
    const res = await this.client.get(`/detail/${postId}`)
    const { post, comments } = this.unpackRes(res) as { post: Post; comments: PageResponse<Reply> }
    return {
      post: this.cleanPost(post),
      reply: {
        meta: comments.meta,
        list: comments.list.map(this.cleanReply)
      }
    }
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
    const { meta, list } = this.unpackRes(res) as PageResponse<Reply>
    return {
      meta,
      list: list.map(this.cleanReply)
    }
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
      `like/${postId}`,
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
