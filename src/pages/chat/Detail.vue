<template>
  <PageView footless>
    <template #header>
      <ChatHeader :title="chatRoomTitle" :images="userProfiles" :route="userProfileRoute" />
    </template>
    <template #main>
      <InitialLoad v-if="!isReady" />
      <section v-else class="container chat-container mx-auto">
        <div class="chat-messages px-4 pb-6" ref="pageScroll">
          <PageLoader
            v-if="setPgnator"
            class="mb-6"
            :has-more="hasMore"
            @load-more="fetchPage(nextPage)"
            eol="대화의 시작 입니다."
          />
          <ChatBubble
            v-for="chat in chatList"
            :user-list="participants"
            :message="chat"
            :key="chat.id"
          />
        </div>
        <ChatMessageInput
          class="chat-msg-input-btm"
          @send-message="sendMessage"
          @open-ticket="openTicketSend"
        />
      </section>
    </template>
  </PageView>
</template>
<script setup lang="ts">
import PageView from '@/components/layouts/PageView.vue'
import ChatHeader from '@/components/layouts/headers/ChatHeader.vue'
import { useRoute } from 'vue-router'
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { ChatService } from '@/services/chat.service'
import { setupListPage } from '@/stores/setups/list.composition'
import type { ChatMessage, User } from '@/types/general.type'
import { reverse } from 'lodash-es'
import ChatMessageInput from '@/components/displays/chat/ChatMessageInput.vue'
import ChatBubble from '@/components/displays/chat/ChatBubble.vue'
import { useToastStore } from '@/stores/ui/toast.store'
import { useUserStore } from '@/stores/user.store'
import InitialLoad from '@/components/layouts/InitialLoad.vue'
import { useTicketStore } from '@/stores/ui/ticket.store'
import PageLoader from '@/components/layouts/PageLoader.vue'

const route = useRoute()
const chatService = new ChatService()
const toastStore = useToastStore()
const ticketStore = useTicketStore()
const userStore = useUserStore()
const { pageMeta, isFetching, onRender, hasMore, nextPage } = setupListPage()
const isReady = computed(() => !onRender.value && userStore.myInfo)
const pageScroll = ref<HTMLDivElement>()
const setPgnator = ref(false)

const chatList = ref<ChatMessage[]>([])
const chatRoomDetail = ref()
const participants = ref<User[]>([])
const userProfiles = computed(() =>
  participants.value.filter((p) => p.ref !== userStore.myInfo?.ref).map((user) => user.profileImg)
)
const userProfileRoute = computed(() => {
  const lst = participants.value
    .filter((p) => p.ref !== userStore.myInfo?.ref)
    .map((user) => `/user/${user.ref}`)
  return lst.length ? lst[0] : undefined
})
const chatRoomTitle = computed(() => chatRoomDetail.value?.title ?? '')
let chatSocket: WebSocket

async function fetchPage(pageNo = 1) {
  if (!isFetching.value) {
    isFetching.value = true
    const roomRef = route.params.ref as string
    const res = await chatService.getChatsByRoom(roomRef, { page: { page: pageNo } })
    pageMeta.value = res.meta
    chatList.value.unshift(...reverse(res.list))
    isFetching.value = false
  }
}

async function scrollToBottom() {
  const roomRef = route.params.ref as string
  pageScroll.value!.scrollTop = pageScroll.value!.scrollHeight
  await chatService.markAsRead(roomRef)
}

onMounted(async () => {
  const roomRef = route.params.ref as string
  const res = await chatService.getChatRoomDetail(roomRef)
  chatRoomDetail.value = res.chatRoom
  participants.value.push(...res.users)
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
    }
  }
  chatSocket.onclose = () => {
    console.log('socket closed')
    toastStore.showToast('채팅서버 수신불가 새로고침 하세요.', 'error')
  }
  onRender.value = false
  await nextTick(() => {
    scrollToBottom()
    setPgnator.value = true
  })
})

onBeforeUnmount(async () => {
  const roomRef = route.params.ref as string
  await chatService.markAsRead(roomRef)
  chatSocket.onclose = () => {}
  chatSocket.close()
})

function sendMessage(payload: string) {
  chatSocket.send(JSON.stringify({ message: payload, encoded: false }))
}

function openTicketSend() {
  const target = participants.value.filter((p) => p.ref !== userStore.myInfo?.ref)[0]
  if (target) {
    ticketStore.openTicketModal(target)
  }
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
}

.chat-msg-input-btm {
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
