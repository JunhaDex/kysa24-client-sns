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
          @open-profile="() => selectRoom(room)"
          @deny-user-chat="() => registerDenyUserChat(room.party[0])"
        />
        <PageLoader :has-more="hasMore" @load-more="fetchPage(nextPage)" />
      </Container>
    </template>
    <template #footer>
      <Footer />
    </template>
  </PageView>
  <UserProfileModal
    v-if="roomSelected"
    :user="roomSelected.party[0]"
    :is-show="isProfileModal"
    @modal-close="() => (isProfileModal = false)"
    @move-chat="moveUserChatRoom"
  />
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
import type { ChatRoom, User } from '@/types/general.type'
import InitialLoad from '@/components/layouts/InitialLoad.vue'
import Breadcrumb from '@/components/navigations/Breadcrumb.vue'
import PageLoader from '@/components/layouts/PageLoader.vue'
import SearchEmpty from '@/components/layouts/SearchEmpty.vue'
import UserProfileModal from '@/components/modals/UserProfileModal.vue'
import { useToastStore } from '@/stores/ui/toast.store'
import { useRouter } from 'vue-router'

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
const toastStore = useToastStore()
const router = useRouter()
const { pageMeta, isFetching, onRender, hasMore, nextPage } = setupListPage()
const chatRoomList = ref<ChatRoom[]>([])
const chatRoomCards = ref<(typeof ChatRoomCard)[]>([])
const isProfileModal = ref(false)
const roomSelected = ref<ChatRoom>()

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
  if (chatRoomList.value.length > 0) {
    roomSelected.value = chatRoomList.value[0]
  }
  onRender.value = false
})

function moveUserChatRoom() {
  router.push({ name: 'chat_room', params: { ref: roomSelected.value!.ref } })
}

async function selectRoom(room: ChatRoom) {
  roomSelected.value = room
  isProfileModal.value = true
}

async function registerDenyUserChat(user: User) {
  await chatService.denyUserChat(user.ref, { status: true })
  chatRoomList.value = chatRoomList.value.filter((room) => room.party[0].ref !== user.ref)
  toastStore.showToast('수신차단이 완료되었습니다.', 'success')
}
</script>
<style scoped></style>
