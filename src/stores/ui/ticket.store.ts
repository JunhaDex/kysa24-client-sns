import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '@/types/general.type'
import { ChatService } from '@/services/chat.service'

export const useTicketStore = defineStore('ticket', () => {
  const chatService = new ChatService()
  const stage = ref<'closed' | 'before' | 'after'>('closed')
  const target = ref<User>()

  function openTicketModal(user: User) {
    target.value = user
    stage.value = 'before'
  }

  function closeTicketModal() {
    stage.value = 'closed'
  }

  return {
    stage,
    target,
    openTicketModal,
    closeTicketModal
  }
})
