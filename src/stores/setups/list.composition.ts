import type { PageMeta } from '@/types/general.type'
import { computed, ref } from 'vue'
import { DEFAULT_PAGE_SIZE } from '@/constants/index.constant'

export const setupListPage = () => {
  const pageMeta = ref<PageMeta>({
    pageNo: 1,
    pageSize: DEFAULT_PAGE_SIZE,
    totalPage: 10,
    totalCount: 0
  })
  const onRender = ref(true)
  const isFetching = ref(false)
  const hasMore = computed(() => pageMeta.value.pageNo < pageMeta.value.totalPage)
  const nextPage = computed(() => Number(pageMeta.value.pageNo) + 1)
  const fetchConfig = {
    keyword: '',
    mode: 'replace' as 'replace' | 'append'
  }

  return { pageMeta, onRender, isFetching, hasMore, nextPage, fetchConfig }
}
