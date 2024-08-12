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
      <template v-else>
        <Container stretch class="mb-4">
          <UserProfile
            v-if="user"
            :user="user"
            :is-me="isMe"
            @send-ticket="openTicketModal"
            @go-chat="moveUserChatRoom"
          />
        </Container>
        <Container class="pb-6">
          <Box class="extra-min">
            <h2 class="font-bold text-sm mb-2">내 정보</h2>
            <div v-if="extraEmpty" class="no-extra">
              <p>등록된 정보가 없습니다.</p>
            </div>
            <ul v-else>
              <li v-for="key in Object.keys(extra!)" :key="key">
                <span class="text-sm font-bold">{{ USER_EXTRA_LIST[key].alias }}: </span>
                <span>{{ extra![key] }}</span>
              </li>
            </ul>
          </Box>
        </Container>
      </template>
    </template>
    <template #footer>
      <Footer />
    </template>
  </PageView>
</template>
<script lang="ts" setup>
import PageView from '@/components/layouts/PageView.vue'
import Header from '@/components/layouts/Header.vue'
import Footer from '@/components/layouts/Footer.vue'
import Container from '@/components/layouts/Container.vue'
import Breadcrumb from '@/components/navigations/Breadcrumb.vue'
import UserProfile from '@/components/displays/user/UserProfile.vue'
import Box from '@/components/layouts/Box.vue'
import { UserService } from '@/services/user.service'
import { useRoute, useRouter } from 'vue-router'
import { computed, onMounted, ref } from 'vue'
import type { User } from '@/types/general.type'
import InitialLoad from '@/components/layouts/InitialLoad.vue'
import { useUserStore } from '@/stores/user.store'
import { useTicketStore } from '@/stores/ui/ticket.store'
import { USER_EXTRA_LIST } from '@/constants/extra.constant'
import { ChatService } from '@/services/chat.service'
import { useToastStore } from '@/stores/ui/toast.store'

const route = useRoute()
const router = useRouter()
const userService = new UserService()
const chatService = new ChatService()
const userStore = useUserStore()
const toastStore = useToastStore()
const ticketStore = useTicketStore()
const uRef = route.params.ref as string
const user = ref<User>()
const extra = ref()
const onRender = ref(true)
const isMe = computed(() => userStore.myInfo?.ref === uRef)

const routerStack = ref([
  {
    alias: '홈',
    path: {
      name: 'home'
    }
  },
  {
    alias: '',
    path: {
      name: 'user_profile',
      params: { ref: uRef },
      profile: ''
    }
  }
])

const extraEmpty = computed(() => {
  if (extra.value) {
    return Object.keys(extra.value).length === 0
  }
  return true
})

async function fetchPage() {
  const res = await userService.getUserByRef(uRef)
  user.value = res.user
  extra.value = res.extra
  routerStack.value[1].alias = res.user.nickname
  routerStack.value[1].path.profile = res.user.profileImg
}

onMounted(async () => {
  await fetchPage()
  onRender.value = false
})

function openTicketModal() {
  ticketStore.openTicketModal(user.value!)
}

async function moveUserChatRoom(userRef: string) {
  try {
    const roomRef = await chatService.openChatRoom(userRef)
    router.push({ name: 'chat_room', params: { ref: roomRef } })
  } catch (e) {
    toastStore.showToast('채팅방으로 이동할 수 없습니다.', 'error')
  }
}
</script>
<style>
.no-extra {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.extra-min {
  min-height: 320px;
}
</style>
