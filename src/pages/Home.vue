<template>
  <PageView beige>
    <template #header>
      <Header />
    </template>
    <template #main>
      <Container>
        <GroupSearchInput @search-group="searchGroup" ref="groupSearch" />
      </Container>
      <InitialLoad v-if="onRender" />
      <SearchEmpty v-else-if="groupList.length === 0" @reset-input="() => searchGroup('')">
        <span>요청하신 결과가 없습니다.</span>
      </SearchEmpty>
      <Container class="pb-6" v-else>
        <GroupCard
          v-for="(grp, i) in groupList"
          :group="grp"
          :key="i"
          class="mb-6"
          ref="groupCards"
          @followGroup="(payload) => followGroup(payload, i)"
          @unfollowGroup="(payload) => unfollowGroup(payload, i)"
        />
        <PageLoader :hasMore="hasMore" @load-more="() => fetchPage(nextPage)" />
      </Container>
    </template>
    <template #footer>
      <Footer />
    </template>
  </PageView>
  <Modal
    :is-show="isWelcomeModal"
    title="환영합니다!"
    @modal-close="() => (isWelcomeModal = false)"
  >
    <p>
      환영합니다! 원활한 앱 이용을 위해서 나를 알릴 수 있는 프로필을 등록해보세요.<br />
      <span class="text-xs text-accent text-bold"
        >사이드메뉴 > 개인설정에서 변경할 수 있습니다.</span
      >
    </p>
    <div class="flex justify-end mt-6">
      <button class="btn btn-ghost btn-sm" @click="snoozeWelcome">다시 보지않기</button>
      <button class="btn btn-sm btn-primary" @click="gotoProfile">프로필 업데이트</button>
    </div>
  </Modal>
</template>
<script setup lang="ts">
import Container from '@/components/layouts/Container.vue'
import PageView from '@/components/layouts/PageView.vue'
import Header from '@/components/layouts/Header.vue'
import Footer from '@/components/layouts/Footer.vue'
import Modal from '@/components/modals/Modal.vue'
import { onMounted, ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth.store'
import { setupListPage } from '@/stores/setups/list.composition'
import { GroupService } from '@/services/group.service'
import { useToastStore } from '@/stores/ui/toast.store'
import GroupSearchInput from '@/components/displays/home/GroupSearchInput.vue'
import GroupCard from '@/components/displays/home/GroupCard.vue'
import type { Group } from '@/types/general.type'
import InitialLoad from '@/components/layouts/InitialLoad.vue'
import SearchEmpty from '@/components/layouts/SearchEmpty.vue'
import PageLoader from '@/components/layouts/PageLoader.vue'
import { useUserStore } from '@/stores/user.store'
import { useRouter } from 'vue-router'

const isWelcomeModal = ref(false)
const authStore = useAuthStore()
const userStore = useUserStore()
const groupService = new GroupService()
const { pageMeta, isFetching, onRender, hasMore, nextPage, fetchConfig } = setupListPage()
const groupList = ref<Group[]>([])
const groupCards = ref<(typeof GroupCard)[]>([])
const groupSearch = ref<typeof GroupSearchInput>()
const toastStore = useToastStore()
const router = useRouter()

watch(
  () => userStore.myInfo?.profileImg,
  async () => {
    if (authStore.jwt && authStore.isGuide && !userStore.myInfo?.profileImg) {
      isWelcomeModal.value = true
    }
  },
  { immediate: true }
)

function copyFcm() {
  const fcm = authStore.fcm
  navigator.clipboard.writeText(fcm)
  window.alert('FCM copied')
}

async function fetchPage(pageNo = 1) {
  if (!isFetching.value) {
    isFetching.value = true
    const opt = {
      page: { page: pageNo },
      name: fetchConfig.keyword ? fetchConfig.keyword : undefined
    }
    const res = await groupService.listGroups(opt)
    pageMeta.value = res.meta
    if (fetchConfig.mode === 'replace') {
      groupList.value = res.list
      fetchConfig.mode = 'append'
    } else if (fetchConfig.mode === 'append') {
      groupList.value.push(...res.list)
    }
    isFetching.value = false
  }
}

async function followGroup(group: Group, index: number) {
  try {
    await groupService.followGroup(group.ref)
    groupCards.value[index].updateFollowState(true)
    toastStore.showToast('팔로우 성공!', 'success')
  } catch (e) {
    console.error(e)
    toastStore.showToast('문제가 생겼습니다. 잠시 후 다시 시도해주세요.', 'error')
  }
}

async function unfollowGroup(group: Group, index: number) {
  try {
    await groupService.followGroup(group.ref, { undo: 'true' })
    groupCards.value[index].updateFollowState(false)
    toastStore.showToast('팔로우를 해제했습니다.', 'info')
  } catch (e) {
    console.error(e)
    toastStore.showToast('문제가 생겼습니다. 잠시 후 다시 시도해주세요.', 'error')
  }
}

function snoozeWelcome() {
  isWelcomeModal.value = false
  authStore.isGuide = false
}

function gotoProfile() {
  isWelcomeModal.value = false
  router.push({ name: 'user_update', params: { ref: userStore.myInfo?.ref } })
}

onMounted(async () => {
  await fetchPage()
  onRender.value = false
  groupSearch.value!.showTooltip()
})

async function searchGroup(keyword: string) {
  console.log('user input:', keyword)
  fetchConfig.keyword = keyword
  fetchConfig.mode = 'replace'
  await fetchPage()
}
</script>
<style scoped>
main {
  background-color: theme('colors.beige');
}
</style>
