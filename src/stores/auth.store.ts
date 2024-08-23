import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const jwt = ref('')
    const fcm = ref('')
    const isGuide = ref(true)
    const circuitBreak = ref(false)

    function setJwt(token: string) {
      jwt.value = token
    }

    function setFcm(token: string) {
      fcm.value = token
    }

    return {
      jwt,
      fcm,
      isGuide,
      circuitBreak,
      setJwt,
      setFcm
    }
  },
  {
    persist: true
  }
)
