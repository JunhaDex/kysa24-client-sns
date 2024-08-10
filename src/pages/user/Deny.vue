<template>
  <PageView>
    <template #header>
      <Header />
    </template>
    <template #main>
      <Container>
        <!--        <Breadcrumb />-->
      </Container>
      <Container> foo</Container>
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
import { ChatService } from '@/services/chat.service'
import { setupListPage } from '@/stores/setups/list.composition'
import { onMounted } from 'vue'

const chatService = new ChatService()
const { pageMeta, isFetching, onRender } = setupListPage()

async function fetchPage(pageNo = 1) {
  if (!isFetching.value) {
    isFetching.value = true
    const res = await chatService.listRecentChatRooms({ page: { page: pageNo }, isBlock: 'true' })
    console.log(res)
    pageMeta.value = res.meta
  }
}

onMounted(async () => {
  await fetchPage()
  onRender.value = false
})
</script>
