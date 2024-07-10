<template>
  <PageView>
    <template #main>
      <Container> Chat Detail</Container>
    </template>
  </PageView>
</template>
<script setup lang="ts">
import PageView from '@/components/layouts/PageView.vue'
import Container from '@/components/layouts/Container.vue'
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'
import { ChatService } from '@/services/chat.service'

const route = useRoute()
const chatService = new ChatService()

async function fetchPage(pageNo = 1) {
  const roomRef = route.params.ref as string
  const res = await chatService.getChatsByRoom(roomRef, { page: { page: pageNo } })
  console.log(res)
}

onMounted(async () => {
  await fetchPage()
})
</script>
<style scoped></style>
