import { ApiService } from '@/services/api.service'
import type { ChatMessage, ChatRoom, PageRequest, PageResponse } from '@/types/general.type'

export class ChatService extends ApiService {
  constructor() {
    super('chat')
  }

  async listRecentChatRooms(options?: {
    page: PageRequest
    isBlock?: 'true'
  }): Promise<PageResponse<ChatRoom>> {
    const res = await this.auth().client.get('/recent', {
      params: {
        page: options?.page?.page,
        size: options?.page?.size,
        'is-block': options?.isBlock
      }
    })
    return this.unpackRes(res) as PageResponse<ChatRoom>
  }

  async countUnreadChats(): Promise<number> {
    const res = await this.auth().client.get('/unread')
    const upk = this.unpackRes(res) as any
    return upk.count
  }

  async getChatsByRoom(
    ref: string,
    options?: { page?: PageRequest }
  ): Promise<PageResponse<ChatMessage>> {
    const res = await this.auth().client.get(`/history/${ref}`, {
      params: {
        page: options?.page?.page,
        size: options?.page?.size
      }
    })
    return this.unpackRes(res) as PageResponse<ChatMessage>
  }

  async markAsRead(ref: string): Promise<void> {
    await this.auth().client.put(`/read/${ref}`)
  }

  async countTicketRemain(): Promise<number> {
    const res = await this.auth().client.get('/ticket/count')
    const upk = this.unpackRes(res) as any
    return upk.count
  }

  async sendTicket(recipient: string): Promise<void> {
    await this.auth().client.post(`/ticket/${recipient}`)
  }

  async denyUserChat(user: string, params: { status: boolean }): Promise<void> {
    await this.auth().client.post(`/deny/${user}`, params)
  }

  async sendChatSocket() {}
}
