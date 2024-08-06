import type { PageMeta } from '@/types/general.type'
import { computed, ref } from 'vue'
import { DEFAULT_PAGE_SIZE } from '@/constants/index.constant'

export const setupListPage = () => {
  const pageMeta = ref<PageMeta>({
    pageNo: 1,
    pageSize: DEFAULT_PAGE_SIZE,
    totalPage: 1,
    totalCount: 0
  })
  const onRender = ref(true)
  const isFetching = ref(false)
  const hasMore = computed(() => pageMeta.value.pageNo < pageMeta.value.totalPage)
  const fetchConfig = {
    keyword: '',
    mode: 'replace' as 'replace' | 'append'
  }

  // be sure to remove the event listener onUnmount
  // container.removeEventListener('scroll', handleScroll);
  async function handleScroll(event: Event, moreFunc: (page: number) => Promise<void>) {
    const target = event.target as HTMLElement
    if (
      target.scrollHeight - target.scrollTop <= target.clientHeight + 100 &&
      !isFetching.value &&
      hasMore.value
    ) {
      await moreFunc(pageMeta.value.pageNo + 1)
    }
  }

  return { pageMeta, onRender, isFetching, hasMore, fetchConfig, handleScroll }
}
