<template>
  <PageView @scroll="handleScroll($event, fetchPage)" ref="scrollView">
    <template #main>
      <Container> User List</Container>
    </template>
  </PageView>
</template>
<script setup lang="ts">
import PageView from '@/components/layouts/PageView.vue'
import Container from '@/components/layouts/Container.vue'
import { setupListPage } from '@/stores/setups/list.composition'
import { onMounted, ref } from 'vue'
import { UserService } from '@/services/user.service'

const { currentPage, isFetching, onRender, hasMore, handleScroll } = setupListPage()
const scrollView = ref<HTMLDivElement>()
const userService = new UserService()

async function fetchPage(pageNo = 1) {
  const res = await userService.listUsers({ page: { page: pageNo } })
  console.log(res)
}

onMounted(async () => {
  await fetchPage()
})
</script>
<style scoped></style>
