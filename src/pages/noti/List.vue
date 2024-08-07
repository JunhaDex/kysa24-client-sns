<template>
  <PageView white>
    <template #header>
      <Header />
    </template>
    <template #main>
      <Container class="noti-header mt-4 mb-6">
        <h1 class="text-xl font-bold">알림센터</h1>
        <button class="btn btn-error btn-sm">선택삭제</button>
      </Container>
      <SearchEmpty v-if="notiList.length === 0">
        <span>새로운 알림이 없습니다.</span>
      </SearchEmpty>
      <Container v-else stretch>
        <NotiCard v-for="noti in notiList" :noti="noti" :key="noti.id" />
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

const userService = new UserService()
const { pageMeta, isFetching } = setupListPage()
const notiList = ref<UserNoti[]>([])

async function fetchPage(pageNo = 1) {
  if (!isFetching.value) {
    isFetching.value = true
    const res = await userService.listNotifications({ page: { page: pageNo } })
    console.log(res)
    pageMeta.value = res.meta
    notiList.value.push(...res.list)
    isFetching.value = false
  }
}

onMounted(async () => {
  await fetchPage()
})

async function markAsRead(noti: UserNoti) {}
</script>
<style scoped>
.noti-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
