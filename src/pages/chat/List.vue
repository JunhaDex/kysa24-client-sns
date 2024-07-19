<template>
  <PageView>
    <template #header>
      <Header />
    </template>
    <template #main>
      <Container>
        <ChatSearchInput />
      </Container>
      <Container>
        <ChatRoomCard />
        <SearchEmpty />
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
import { ChatService } from '@/services/chat.service'
import { onMounted, ref } from 'vue'
import Header from '@/components/layouts/Header.vue'
import Footer from '@/components/layouts/Footer.vue'
import ChatSearchInput from '@/components/displays/chat/ChatSearchInput.vue'
import SearchEmpty from '@/components/displays/SearchEmpty.vue'
import ChatRoomCard from '@/components/displays/chat/ChatRoomCard.vue'

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
