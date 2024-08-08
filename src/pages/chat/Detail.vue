<template>
  <PageView footless>
    <template #header>
      <ChatHeader />
    </template>
    <template #main>
      <InitialLoad v-if="!isReady" />
      <section v-else class="container chat-container mx-auto">
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
import { computed, nextTick, onBeforeMount, onBeforeUnmount, onMounted, onUpdated, ref } from 'vue'
import { ChatService } from '@/services/chat.service'
import { setupListPage } from '@/stores/setups/list.composition'
import type { ChatMessage, User } from '@/types/general.type'
import { reverse } from 'lodash-es'
import ChatMessageInput from '@/components/displays/chat/ChatMessageInput.vue'
import ChatBubble from '@/components/displays/chat/ChatBubble.vue'
import { useToastStore } from '@/stores/ui/toast.store'
import axios from 'axios'
import { useUserStore } from '@/stores/user.store'
import InitialLoad from '@/components/layouts/InitialLoad.vue'

const route = useRoute()
const chatService = new ChatService()
const toastStore = useToastStore()
const userStore = useUserStore()
const { pageMeta, isFetching, onRender } = setupListPage()
const isReady = computed(() => !onRender.value && userStore.myInfo)
const pageScroll = ref<HTMLDivElement>()

const chatList = ref<ChatMessage[]>([])
const participants = ref<User[]>([])
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

async function scrollToBottom() {
  const roomRef = route.params.ref as string
  if (pageScroll.value) {
    pageScroll.value.scrollTop = pageScroll.value.scrollHeight
  }
  await chatService.markAsRead(roomRef)
}
onMounted(async () => {
  const roomRef = route.params.ref as string
  // const res = await chatService.getChatRoomDetail(roomRef)
  // participants.value.push(...res.filter((u) => u.id !== userStore.myInfo!.id))
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
  onRender.value = false
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
