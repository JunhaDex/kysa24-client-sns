import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '@/types/general.type'

export const useTicketStore = defineStore('ticket', () => {
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
