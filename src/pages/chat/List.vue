<template>
  <PageView>
    <template #main>
      <Container> Chat List</Container>
    </template>
  </PageView>
</template>
<script setup lang="ts">
import PageView from '@/components/layouts/PageView.vue'
import Container from '@/components/layouts/Container.vue'
import { ChatService } from '@/services/chat.service'
import { onMounted, ref } from 'vue'

const chatService = new ChatService()
const listType = ref<'recent' | 'blocked'>('recent')

async function fetchPage(pageNo = 1) {
  const res = await chatService.listRecentChatRooms({ page: { page: pageNo } })
  console.log(res)
}

onMounted(async () => {
  await fetchPage()
})
</script>
<style scoped></style>
