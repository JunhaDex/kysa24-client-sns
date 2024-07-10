<template>
  <PageView @scroll="handleScroll($event, fetchPage)" ref="scrollView">
    <template #header>
      <Header />
    </template>
    <template #main>
      <Container>
        <GroupSearchInput />
      </Container>
      <Container>
        <GroupCard />
        <SearchEmpty />
      </Container>
    </template>
    <template #footer>
      <Footer />
    </template>
  </PageView>
  <Modal :isShow="showWelcomeModal" title="Modal" @modal-close="closeWelcomeModal">
    <p>Modal content</p>
    <div class="flex justify-end">
      <button class="btn btn-ghost" @click="closeWelcomeModal">Close</button>
      <button class="btn btn-primary" @click="closeWelcomeModal">Save</button>
    </div>
  </Modal>
</template>
<script setup lang="ts">
import Container from '@/components/layouts/Container.vue'
import PageView from '@/components/layouts/PageView.vue'
import Header from '@/components/layouts/Header.vue'
import Footer from '@/components/layouts/Footer.vue'
import Modal from '@/components/feedbacks/Modal.vue'
import { onMounted, onUnmounted, ref } from 'vue'
import { useAuthStore } from '@/stores/auth.store'
import { setupListPage } from '@/stores/setups/list.composition'
import { GroupService } from '@/services/group.service'
import GroupSearchInput from '@/components/displays/home/GroupSearchInput.vue'
import GroupCard from '@/components/displays/home/GroupCard.vue'
import SearchEmpty from '@/components/displays/SearchEmpty.vue'

const showWelcomeModal = ref(false)
const authStore = useAuthStore()
const groupService = new GroupService()
const { currentPage, isFetching, onRender, hasMore, handleScroll } = setupListPage()
const scrollView = ref<HTMLDivElement>()

function openWelcomeModal() {
  showWelcomeModal.value = true
}

function closeWelcomeModal() {
  showWelcomeModal.value = false
}

function copyFcm() {
  const fcm = authStore.fcm
  navigator.clipboard.writeText(fcm)
  window.alert('FCM copied')
}

async function fetchPage(pageNo = 1) {
  const res = await groupService.listGroups({ page: { page: pageNo } })
  console.log(res)
}

onMounted(async () => {
  await fetchPage()
})

onUnmounted(() => {
  if (scrollView.value) {
    scrollView.value.removeEventListener('scroll', (e) => handleScroll(e, fetchPage))
  }
})
</script>
<style scoped></style>
