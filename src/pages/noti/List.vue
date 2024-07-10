<template>
  <PageView>
    <template #main>
      <Container> Noti List </Container>
    </template>
  </PageView>
</template>
<script setup lang="ts">
import PageView from '@/components/layouts/PageView.vue'
import Container from '@/components/layouts/Container.vue'
import { UserService } from '@/services/user.service'
import { onMounted } from 'vue'

const userService = new UserService()

async function fetchPage(pageNo = 1) {
  const res = await userService.listNotifications({ page: { page: pageNo } })
  console.log(res)
}

onMounted(async () => {
  await fetchPage()
})
</script>
<style scoped></style>
