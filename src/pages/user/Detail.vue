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
          <UserProfile v-if="user" :user="user" :is-me="isMe" @send-ticket="openTicketModal" />
        </Container>
        <Container>
          <Box v-if="extra">
            <h2 class="font-bold text-sm mb-2">내 정보</h2>
            <ul>
              <li>좋아하는 영화</li>
              <li>가보고 싶은 여행지</li>
              <li>감명깊게 읽은 책</li>
              <li>좋아하는 음악</li>
              <li>...</li>
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
import { useRoute } from 'vue-router'
import { computed, onMounted, ref } from 'vue'
import type { UserExtra, User } from '@/types/general.type'
import InitialLoad from '@/components/layouts/InitialLoad.vue'
import { useUserStore } from '@/stores/user.store'
import { useTicketStore } from '@/stores/ui/ticket.store'

const route = useRoute()
const userService = new UserService()
const userStore = useUserStore()
const ticketStore = useTicketStore()
const uRef = route.params.ref as string
const user = ref<User>()
const extra = ref<UserExtra>()
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
</script>
