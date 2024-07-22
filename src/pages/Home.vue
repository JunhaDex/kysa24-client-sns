<template>
  <PageView @scroll="handleScroll($event, fetchPage)" ref="scrollView" white>
    <template #header>
      <Header />
    </template>
    <template #main>
      <Container>
        <GroupSearchInput />
      </Container>
      <Container>
        <GroupCard
          v-for="(grp, i) in groupList"
          :group="grp"
          :key="i"
          class="mb-6"
          ref="groupCards"
          @followGroup="(payload) => followGroup(payload, i)"
          @unfollowGroup="(payload) => unfollowGroup(payload, i)"
        />
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
import type { Group } from '@/types/general.type'

const showWelcomeModal = ref(false)
const authStore = useAuthStore()
const groupService = new GroupService()
const { pageMeta, isFetching, onRender, hasMore, handleScroll } = setupListPage()
const groupList = ref<Group[]>([])
const scrollView = ref<HTMLDivElement>()
const groupCards = ref<(typeof GroupCard)[]>([])

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
  if (!isFetching.value) {
    isFetching.value = true
    const res = await groupService.listGroups({ page: { page: pageNo } })
    console.log(res)
    pageMeta.value = res.meta
    groupList.value.push(...res.list)
    isFetching.value = false
  }
}

async function followGroup(group: Group, index: number) {
  console.log('followGroup', group)
  await groupService.followGroup(group.ref)
  groupCards.value[index].updateFollowState(true)
}

async function unfollowGroup(group: Group, index: number) {
  console.log('unfollowGroup', group)
  await groupService.followGroup(group.ref, { undo: 'true' })
  groupCards.value[index].updateFollowState(false)
}

onMounted(async () => {
  await fetchPage()
  onRender.value = false
})

onUnmounted(() => {
  if (scrollView.value) {
    scrollView.value.removeEventListener('scroll', (e) => handleScroll(e, fetchPage))
  }
})
</script>
<style scoped></style>
