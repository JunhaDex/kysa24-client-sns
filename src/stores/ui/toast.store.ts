import { defineStore } from 'pinia'
import { ref } from 'vue'

type ToastLevel = 'success' | 'error' | 'info'
export const useToastStore = defineStore('toast', () => {
  const isShow = ref(false)
  const message = ref('')
  const msgLevel = ref<ToastLevel>('info')

  function showToast(msg: string, type: ToastLevel) {
    message.value = msg
    isShow.value = true
    msgLevel.value = type
    console.log('Toast: ', msg)
    setTimeout(() => {
      isShow.value = false
    }, 2300)
  }

  return {
    isShow,
    message,
    msgLevel,
    showToast
  }
})
