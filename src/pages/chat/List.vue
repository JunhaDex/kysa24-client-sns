<template>
  <PageView>
    <template #header>
      <Header />
    </template>
    <template #main>
      <Container class="mb-4">
        <Breadcrumb />
      </Container>
      <InitialLoad v-if="onRender" />
      <Container class="pb-6" v-else>
        <ChatRoomCard
          v-for="(room, i) in chatRoomList"
          :chat-room="room"
          :key="i"
          ref="chatRoomCards"
        />
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
import ChatRoomCard from '@/components/displays/chat/ChatRoomCard.vue'
import { setupListPage } from '@/stores/setups/list.composition'
import type { ChatRoom } from '@/types/general.type'
import InitialLoad from '@/components/layouts/InitialLoad.vue'
import Breadcrumb from '@/components/navigations/Breadcrumb.vue'

const chatService = new ChatService()
const { pageMeta, isFetching, onRender } = setupListPage()
const chatRoomList = ref<ChatRoom[]>([])
const chatRoomCards = ref<(typeof ChatRoomCard)[]>([])
// TODO: Blocked List should be with User List
// const listType = ref<'recent' | 'blocked'>('recent')

async function fetchPage(pageNo = 1) {
  if (!isFetching.value) {
    isFetching.value = true
    const res = await chatService.listRecentChatRooms({ page: { page: pageNo } })
    pageMeta.value = res.meta
    chatRoomList.value.push(...res.list)
    isFetching.value = false
  }
}

onMounted(async () => {
  await fetchPage()
  onRender.value = false
})
</script>
<style scoped></style>
