import { ApiService } from '@/services/api.service'
import type { ChatMessage, ChatRoom, PageRequest, PageResponse, User } from '@/types/general.type'
import { cleanObject } from '@/utils/index.util'
import { ChatMessageClass, ChatRoomClass } from '@/constants/class.constant'
import dayjs from 'dayjs'

export class ChatService extends ApiService {
  constructor() {
    super('chat')
  }

  private cleanChatRoom(room: any): ChatRoom {
    const clean = cleanObject(room, ChatRoomClass)
    clean.lastChat = this.cleanChatMessage(room.lastChat)
    return clean
  }

  private cleanChatMessage(message: any): ChatMessage {
    const clean = cleanObject(message, ChatMessageClass)
    clean.createdAt = dayjs(message.createdAt).tz().format('YYYY-MM-DD HH:mm:ss')
    return clean
  }

  async openChatRoom(userRef: string): Promise<string> {
    const res = await this.auth().client.get(`/user/${userRef}`)
    const upk = this.unpackRes(res) as any
    return upk.ref
  }

  checkChatType(obj: any): ChatMessage {
    const reqKeys = ['id', 'sender', 'message', 'encoded', 'createdAt']
    if (reqKeys.every((key) => Object.keys(obj).includes(key))) {
      return this.cleanChatMessage(obj)
    }
    throw new Error('Invalid chat object')
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
    const { meta, list } = this.unpackRes(res) as PageResponse<ChatRoom>
    return {
      meta,
      list: list.map((room) => this.cleanChatRoom(room))
    }
  }

  async getChatRoomDetail(ref: string): Promise<{
    chatRoom: ChatRoom,
    users: User[]
  }> {
    const res = await this.auth().client.get(`/room/${ref}/detail`)
    return this.unpackRes(res) as any
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
    const { meta, list } = this.unpackRes(res) as PageResponse<ChatMessage>
    return {
      meta,
      list: list.map(this.cleanChatMessage)
    }
  }

  async markAsRead(ref: string): Promise<void> {
    await this.auth().client.put(`/read/${ref}`)
  }

  async countTicketRemain(): Promise<number> {
    const res = await this.auth().client.get('/ticket/count')
    const upk = this.unpackRes(res) as any
    return upk.count
  }

  async sendTicket(recipient: string, originId?: number): Promise<void> {
    const params = originId ? { originId } : {}
    await this.auth().client.post(`/ticket/${recipient}`, {}, { params })
  }

  async denyUserChat(user: string, params: { status: boolean }): Promise<void> {
    await this.auth().client.post(`/deny/${user}`, params)
  }

  getSocket(roomRef: string) {
    const jwt = this.authStore.jwt
    return new WebSocket(`${import.meta.env.VITE_API_WS_URL}/chat/${roomRef}`, [jwt])
  }
}
