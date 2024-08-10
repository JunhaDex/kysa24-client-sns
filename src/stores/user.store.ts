import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Team, User } from '@/types/general.type'

export const useUserStore = defineStore('user', () => {
  const myInfo = ref<User | undefined>()
  const teams = ref<Team[]>([])
  const unreadCount = ref<number>(0)
  const ticketCount = ref<number>(0)

  return {
    myInfo,
    teams,
    unreadCount,
    ticketCount
  }
})
