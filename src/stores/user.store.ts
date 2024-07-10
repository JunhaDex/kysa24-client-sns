import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Team, User } from '@/types/general.type'

export const useUserStore = defineStore('user', () => {
  const myInfo = ref<User | undefined>()
  const teams = ref<Team[] | undefined>()

  return {
    myInfo,
    teams
  }
})
