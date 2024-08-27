import { defineStore } from 'pinia'
import { ref } from 'vue'

type ToastLevel = 'success' | 'error' | 'info' | 'up' | 'msg'
export const useToastStore = defineStore('toast', () => {
  const isShow = ref(false)
  const message = ref('')
  const msgLevel = ref<ToastLevel>('info')
  // global help desk
  const isHelp = ref(false)

  function showToast(msg: string, type: ToastLevel) {
    message.value = msg
    isShow.value = true
    msgLevel.value = type
    setTimeout(() => {
      isShow.value = false
    }, 2300)
  }

  return {
    isShow,
    message,
    msgLevel,
    isHelp,
    showToast
  }
})
