<template>
  <PageView footless>
    <template #header>
      <ChatHeader />
    </template>
    <template #main>
      <section class="container chat-container mx-auto">
        <div class="chat-messages" ref="pageScroll">
          <ChatBubble v-for="chat in chatList" :message="chat" :key="chat.id" />
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
import { nextTick, onBeforeMount, onBeforeUnmount, onMounted, onUpdated, ref } from 'vue'
import { ChatService } from '@/services/chat.service'
import { setupListPage } from '@/stores/setups/list.composition'
import type { ChatMessage } from '@/types/general.type'
import { reverse } from 'lodash-es'
import ChatMessageInput from '@/components/displays/chat/ChatMessageInput.vue'
import ChatBubble from '@/components/displays/chat/ChatBubble.vue'
import { useToastStore } from '@/stores/ui/toast.store'
import axios from 'axios'

const route = useRoute()
const chatService = new ChatService()
const toastStore = useToastStore()
const { pageMeta, isFetching, onRender } = setupListPage()
const pageScroll = ref<HTMLDivElement>()

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

function scrollToBottom() {
  if (pageScroll.value) {
    pageScroll.value.scrollTop = pageScroll.value.scrollHeight
  }
}

onBeforeMount(async () => {
  const test = await axios.post(`${import.meta.env.VITE_API_WS_URL}/healthz`)
  console.log(test.data)
  // TODO: load chat user (/room/:ref/users)
})
onMounted(async () => {
  const roomRef = route.params.ref as string
  await fetchPage()

  try {
    chatSocket = chatService.getSocket(roomRef)
    console.log('socket connected')
  } catch (err) {
    console.error(err)
    toastStore.showToast('채팅 서버에 연결할 수 없습니다.', 'error')
  }
  chatSocket.onmessage = (event) => {
    try {
      const newChat = chatService.checkChatType(JSON.parse(event.data))
      chatList.value.push(newChat)
    } catch (e) {
      console.error(e)
      console.log(event.data)
    }
  }
  chatSocket.onclose = () => {
    console.log('socket closed')
    toastStore.showToast('채팅서버 수신불가 새로고침 하세요.', 'error')
  }
  scrollToBottom()
  // TODO: mark as read
})

onUpdated(() => {
  nextTick(() => {
    scrollToBottom()
  })
})

onBeforeUnmount(() => {
  chatSocket.close()
})

function sendMessage(payload: string) {
  console.log(payload)
  chatSocket.send(JSON.stringify({ message: payload, encoded: false }))
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
