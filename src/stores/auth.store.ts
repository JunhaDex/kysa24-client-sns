import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const jwt = ref('')
    const fcm = ref('')

    function setJwt(token: string) {
      jwt.value = token
    }

    function setFcm(token: string) {
      fcm.value = token
    }

    return {
      jwt,
      fcm,
      setJwt,
      setFcm
    }
  },
  {
    persist: true
  }
)
