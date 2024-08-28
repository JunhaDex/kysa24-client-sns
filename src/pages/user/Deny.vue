<template>
  <PageView>
    <template #header>
      <Header />
    </template>
    <template #main>
      <Container>
        <Breadcrumb :router-stack="routerStack" />
      </Container>
      <InitialLoad v-if="onRender" />
      <SearchEmpty v-else-if="chatRoomList.length === 0">
        <span>표시할 내용이 없습니다.</span>
        <div class="btn-group mt-6">
          <RouterLink class="btn btn-md btn-primary" to="/">홈으로</RouterLink>
        </div>
      </SearchEmpty>
      <Container v-else>
        <h2 class="font-bole font-sm mb-2 mt-4">수신 거부 목록</h2>
        <DenyCard v-for="room in chatRoomList" class="mb-2" :user="room.party[0]" :key="room.id"
                  @select-user="() => selectUser(room.party[0])"
                  @undo-deny="() => undoDeny(room.party[0])" />
        <PageLoader :has-more="hasMore" @load-more="fetchPage(nextPage)" />
      </Container>
    </template>
    <template #footer>
      <Footer />
    </template>
  </PageView>
  <UserProfileModal
    v-if="userSelected"
    :user="userSelected"
    :is-show="isProfileModal"
    :no-chat="true"
    @modal-close="() => (isProfileModal = false)"
  />
</template>
<script setup lang="ts">
import PageView from '@/components/layouts/PageView.vue'
import Header from '@/components/layouts/Header.vue'
import Breadcrumb from '@/components/navigations/Breadcrumb.vue'
import Container from '@/components/layouts/Container.vue'
import Footer from '@/components/layouts/Footer.vue'
import { ChatService } from '@/services/chat.service'
import { setupListPage } from '@/stores/setups/list.composition'
import { onMounted, ref } from 'vue'
import DenyCard from '@/components/displays/user/DenyCard.vue'
import InitialLoad from '@/components/layouts/InitialLoad.vue'
import type { ChatRoom, User } from '@/types/general.type'
import UserProfileModal from '@/components/modals/UserProfileModal.vue'
import { useToastStore } from '@/stores/ui/toast.store'
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
    alias: '전체 사용자',
    path: {
      name: 'user_all'
    }
  },
  {
    alias: '수신차단',
    path: {
      name: 'user_deny'
    }
  }
])
const chatService = new ChatService()
const toastStore = useToastStore()
const { pageMeta, isFetching, onRender, hasMore, nextPage } = setupListPage()
const chatRoomList = ref<ChatRoom[]>([])
const isProfileModal = ref(false)
const userSelected = ref<User>()

async function fetchPage(pageNo = 1) {
  if (!isFetching.value) {
    isFetching.value = true
    await chatService.getDeniedUsers({ page: { page: pageNo } })
    pageMeta.value = res.meta
    chatRoomList.value.push(...res.list)
    isFetching.value = false
  }
}

onMounted(async () => {
  await fetchPage()
  if (chatRoomList.value.length > 0) {
    userSelected.value = chatRoomList.value[0].party[0]
  }
  onRender.value = false
})

async function selectUser(user: User) {
  userSelected.value = user
  isProfileModal.value = true
}

async function undoDeny(user: User) {
  await chatService.denyUserChat(user.ref, { status: false })
  chatRoomList.value = chatRoomList.value.filter((room) => room.party[0].ref !== user.ref)
  toastStore.showToast('수신차단이 해제되었습니다.', 'success')
}
</script>
