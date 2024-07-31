<template>
  <PageView footless>
    <template #header>
      <ChatHeader />
    </template>
    <template #main>
      <section class="container chat-container mx-auto">
        <div class="chat-messages">
          <ChatBubble v-for="(chat, i) in chatList" :message="chat" :key="i" />
        </div>
        <ChatMessageInput @send-message="sendMessage" />
      </section>
    </template>
  </PageView>
</template>
<script setup lang="ts">
import PageView from '@/components/layouts/PageView.vue'
import ChatHeader from '@/components/layouts/headers/ChatHeader.vue'
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import { ChatService } from '@/services/chat.service'
import { setupListPage } from '@/stores/setups/list.composition'
import type { ChatMessage } from '@/types/general.type'
import { reverse } from 'lodash-es'
import ChatMessageInput from '@/components/displays/chat/ChatMessageInput.vue'
import ChatBubble from '@/components/displays/chat/ChatBubble.vue'

const route = useRoute()
const chatService = new ChatService()
const { pageMeta, isFetching, onRender } = setupListPage()

const chatList = ref<ChatMessage[]>([])
let chatSocket: WebSocket

async function fetchPage(pageNo = 1) {
  if (!isFetching.value) {
    isFetching.value = true
    const roomRef = route.params.ref as string
    const res = await chatService.getChatsByRoom(roomRef, { page: { page: pageNo } })
    console.log(res)
    pageMeta.value = res.meta
    chatList.value.push(...reverse(res.list))
    isFetching.value = false
  }
}

onMounted(async () => {
  const roomRef = route.params.ref as string
  await fetchPage()
  chatSocket = chatService.getSocket('tester')
  chatSocket.onmessage = (event) => {
    console.log('message received')
    console.log(event.data)
  }
})

function sendMessage(payload) {
  console.log(payload)
}
</script>
<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 1096px;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 2rem 1rem;
}
</style>
