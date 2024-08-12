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
      <Container v-else>
        <h2 class="font-bole font-sm mb-2 mt-4">수신 거부 목록</h2>
        <DenyCard class="mb-2" :user="user" />
      </Container>
    </template>
    <template #footer>
      <Footer />
    </template>
  </PageView>
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
const { pageMeta, isFetching, onRender } = setupListPage()
const user = {
  ref: 'test',
  id: 1,
  name: '테스트',
  nickname: '테스트',
  sex: 1,
  age: 20,
  dob: '2020/01/01',
  geo: '서울 서울',
  actStatus: 1,
  profileImg: 'https://via.placeholder.com/150',
  coverImg: 'https://via.placeholder.com/150',
  introduce: '테스트',
  teamId: 1
}

async function fetchPage(pageNo = 1) {
  if (!isFetching.value) {
    isFetching.value = true
    const res = await chatService.listRecentChatRooms({ page: { page: pageNo }, isBlock: 'true' })
    console.log(res)
    pageMeta.value = res.meta
    // TODO: parse data
    isFetching.value = false
  }
}

onMounted(async () => {
  await fetchPage()
  onRender.value = false
})
</script>
