<template>
  <PageView white>
    <template #header>
      <Header />
    </template>
    <template #main>
      <Container class="noti-header mt-4">
        <h1 class="text-xl font-bold">알림센터</h1>
        <button class="btn btn-error">선택삭제</button>
      </Container>
      <Container stretch>
        <NotiCard />
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
import { onMounted } from 'vue'
import Header from '@/components/layouts/Header.vue'
import Footer from '@/components/layouts/Footer.vue'
import NotiCard from '@/components/displays/noti/NotiCard.vue'

const userService = new UserService()

async function fetchPage(pageNo = 1) {
  const res = await userService.listNotifications({ page: { page: pageNo } })
  console.log(res)
}

onMounted(async () => {
  await fetchPage()
})
</script>
<style scoped>
.noti-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
