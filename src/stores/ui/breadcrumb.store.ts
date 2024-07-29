import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { PageBreadcrumb } from '@/types/general.type'

export const useBreadcrumbStore = defineStore('breadcrumb', () => {
  const linkStack = ref<PageBreadcrumb[]>([
    {
      name: 'Home',
      path: '/'
    }
  ])

  function pushStack(items: PageBreadcrumb[]) {
    linkStack.value = [...linkStack.value, ...items]
  }

  return {
    linkStack,
    pushStack
  }
})
