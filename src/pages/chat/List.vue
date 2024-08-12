<template>
  <PageView>
    <template #header>
      <Header />
    </template>
    <template #main>
      <Container class="mb-4">
        <Breadcrumb :router-stack="routerStack" />
      </Container>
      <InitialLoad v-if="onRender" />
      <SearchEmpty v-else-if="chatRoomList.length === 0">
        <span>표시할 내용이 없습니다.</span>
      </SearchEmpty>
      <Container class="pb-6" v-else>
        <ChatRoomCard
          class="mb-2"
          v-for="(room, i) in chatRoomList"
          :chat-room="room"
          :key="i"
          ref="chatRoomCards"
        />
        <PageLoader :has-more="hasMore" @load-more="fetchPage(nextPage)" />
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
import PageLoader from '@/components/layouts/PageLoader.vue'
import SearchEmpty from '@/components/layouts/SearchEmpty.vue'

const routerStack = ref([
  {
    alias: '홈',
    path: {
      name: 'home'
    }
  },
  {
    alias: '최근 메세지',
    path: {
      name: 'chat_list'
    }
  }
])
const chatService = new ChatService()
const { pageMeta, isFetching, onRender, hasMore, nextPage } = setupListPage()
const chatRoomList = ref<ChatRoom[]>([])
const chatRoomCards = ref<(typeof ChatRoomCard)[]>([])

async function fetchPage(pageNo = 1) {
  if (!isFetching.value) {
    isFetching.value = true
    const res = await chatService.listRecentChatRooms({ page: { page: pageNo } })
    console.log(res)
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
