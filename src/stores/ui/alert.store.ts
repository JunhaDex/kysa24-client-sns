import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useToastStore = defineStore('toast', () => {
  const isShow = ref(false)
  const message = ref('')

  function showAlert(msg: string) {
    message.value = msg
    isShow.value = true
    setTimeout(() => {
      isShow.value = false
    }, 3000)
  }

  return {
    isShow,
    message,
    showAlert
  }
})
