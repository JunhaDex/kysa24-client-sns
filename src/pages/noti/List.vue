<template>
  <PageView beige>
    <template #header>
      <Header />
    </template>
    <template #main>
      <Container class="noti-header mt-4 mb-6">
        <h1 class="text-xl font-bold">알림센터</h1>
        <ProcessButton
          class="btn btn-error btn-md"
          :is-disabled="false"
          :is-loading="false"
          @click="deleteSelected"
        >
          선택삭제
        </ProcessButton>
      </Container>
      <InitialLoad v-if="onRender" />
      <SearchEmpty v-else-if="notiList.length === 0">
        <span>새로운 알림이 없습니다.</span>
      </SearchEmpty>
      <Container v-else stretch>
        <NotiCard
          v-for="noti in notiList"
          :noti="noti"
          :key="noti.id"
          @check-item="(pl) => toggleCheck(pl, noti.id)"
        />
        <PageLoader :has-more="hasMore" @load-more="() => fetchPage(nextPage)" />
      </Container>
    </template>
    <template #footer>
      <Footer />
    </template>
  </PageView>
</template>
<script setup lang="ts">
import PageView from '@/components/layouts/PageView.vue'
import Container from '@/components/layouts/Container.vue'
import { UserService } from '@/services/user.service'
import { onMounted, ref } from 'vue'
import Header from '@/components/layouts/Header.vue'
import Footer from '@/components/layouts/Footer.vue'
import NotiCard from '@/components/displays/noti/NotiCard.vue'
import { setupListPage } from '@/stores/setups/list.composition'
import type { UserNoti } from '@/types/general.type'
import SearchEmpty from '@/components/layouts/SearchEmpty.vue'
import InitialLoad from '@/components/layouts/InitialLoad.vue'
import PageLoader from '@/components/layouts/PageLoader.vue'
import { useToastStore } from '@/stores/ui/toast.store'
import ProcessButton from '@/components/inputs/ProcessButton.vue'

const userService = new UserService()
const toastStore = useToastStore()
const { pageMeta, isFetching, onRender, hasMore, nextPage, fetchConfig } = setupListPage()
const notiList = ref<UserNoti[]>([])
const checked = new Set<number>()

async function fetchPage(pageNo = 1) {
  if (!isFetching.value) {
    isFetching.value = true
    const res = await userService.listNotifications({ page: { page: pageNo } })
    console.log(res)
    pageMeta.value = res.meta
    if (fetchConfig.mode === 'replace') {
      notiList.value = res.list
      fetchConfig.mode = 'append'
    } else if (fetchConfig.mode === 'append') {
      notiList.value.push(...res.list)
    }
    isFetching.value = false
  }
}

onMounted(async () => {
  await fetchPage()
  onRender.value = false
})

function toggleCheck(state: boolean, id: number) {
  if (state) {
    checked.add(id)
  } else {
    checked.delete(id)
  }
}

async function markAsRead() {
  // TODO: apply api
}

async function deleteSelected() {
  try {
    await userService.deleteNotification({ ids: Array.from(checked) })
    toastStore.showToast('선택한 알림을 삭제했습니다.', 'success')
  } catch (e) {
    toastStore.showToast('오류 발생! 잠시 후 다시 시도하세요.', 'error')
  }
  fetchConfig.mode = 'replace'
  await fetchPage()
}
</script>
<style scoped>
.noti-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
