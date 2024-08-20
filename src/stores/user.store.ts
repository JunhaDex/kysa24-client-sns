import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Team, User } from '@/types/general.type'
import { ChatService } from '@/services/chat.service'

export const useUserStore = defineStore('user', () => {
  const myInfo = ref<User | undefined>()
  const teams = ref<Team[]>([])
  const unreadCount = ref<number>(0)
  const ticketCount = ref<number>(0)
  const chatService = new ChatService()

  async function updateNumbers() {
    if (myInfo.value) {
      ticketCount.value = await chatService.countTicketRemain()
      unreadCount.value = await chatService.countUnreadChats()
    }
  }

  return {
    myInfo,
    teams,
    unreadCount,
    ticketCount,
    updateNumbers
  }
})
