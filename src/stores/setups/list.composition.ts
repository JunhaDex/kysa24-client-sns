import { ref } from 'vue'
import { isNavigationFailure } from 'vue-router'

export const setupListPage = () => {
  const currentPage = ref(1)
  const onRender = ref(false)
  const isFetching = ref(false)
  const hasMore = ref(true)

  // be sure to remove the event listener onUnmount
  // container.removeEventListener('scroll', handleScroll);
  async function handleScroll(event: Event, moreFunc: (page: number) => Promise<void>) {
    const target = event.target as HTMLElement
    if (
      target.scrollHeight - target.scrollTop <= target.clientHeight + 100 &&
      !isFetching.value &&
      hasMore.value
    ) {
      isFetching.value = true
      await moreFunc(currentPage.value + 1)
      isFetching.value = false
    }
  }

  return { currentPage, onRender, isFetching, hasMore, handleScroll }
}
