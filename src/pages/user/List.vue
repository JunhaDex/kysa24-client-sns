<template>
  <PageView ref="scrollView">
    <template #header>
      <Header />
    </template>
    <template #main>
      <Container class="relative z-[3]">
        <UserSearchInput
          @search-user="searchUser"
          @filter-user="filterUser"
          @reset-all="resetSearchFilter"
        />
      </Container>
      <InitialLoad v-if="onRender" />
      <SearchEmpty v-else-if="groupMap.size === 0">
        <span>해당 참가자를 찾을 수 없습니다.</span>
        <div class="btn-group mt-6">
          <button class="btn btn-md btn-primary mr-4" @click="resetSearchFilter">
            목록 초기화
          </button>
          <RouterLink to="/" class="btn btn-md btn-secondary">홈으로</RouterLink>
        </div>
      </SearchEmpty>
      <Container v-else>
        <UserListCardGroup
          v-for="(key, dd) in sortedKey"
          :team-name="teamMap.get(key)!.teamName"
          :users="groupMap.get(key)!"
          :key="`${dd}-${key}`"
        />
        <PageLoader :has-more="hasMore" @load-more="() => fetchPage(nextPage)" ref="pageLoader" />
      </Container>
    </template>
    <template #footer>
      <Footer />
    </template>
  </PageView>
</template>
<script setup lang="ts">
import PageView from '@/components/layouts/PageView.vue'
import Container from '@/components/layouts/Container.vue'
import { setupListPage } from '@/stores/setups/list.composition'
import { computed, onMounted, ref } from 'vue'
import { UserService } from '@/services/user.service'
import Header from '@/components/layouts/Header.vue'
import Footer from '@/components/layouts/Footer.vue'
import UserSearchInput from '@/components/displays/users/UserSearchInput.vue'
import type { Team, User } from '@/types/general.type'
import { useUserStore } from '@/stores/user.store'
import UserListCardGroup from '@/components/displays/user/UserListCardGroup.vue'
import InitialLoad from '@/components/layouts/InitialLoad.vue'
import PageLoader from '@/components/layouts/PageLoader.vue'
import SearchEmpty from '@/components/layouts/SearchEmpty.vue'

const scrollView = ref<HTMLDivElement>()
const userService = new UserService()
const { pageMeta, isFetching, onRender, hasMore, nextPage, fetchConfig } = setupListPage()
const userStore = useUserStore()
const teamMap = ref(new Map<number, Team>())
const groupMap = ref(new Map<number, User[]>())
const genFilter = ref(0)
const pageLoader = ref<typeof PageLoader>()

const sortedKey = computed(() => Array.from(groupMap.value.keys()).sort((a, b) => a - b))
let searchType: 'name' | 'team' | '' = ''

async function fetchPage(pageNo = 1) {
  if (!isFetching.value) {
    isFetching.value = true
    const res = await userService.listUsers({
      page: { page: pageNo },
      name: searchType === 'name' ? fetchConfig.keyword : undefined,
      team: searchType === 'team' ? fetchConfig.keyword : undefined,
      sex: [1, 2].includes(genFilter.value) ? genFilter.value : undefined
    })
    pageMeta.value = res.meta
    if (fetchConfig.mode === 'replace') {
      groupMap.value.clear()
      teamMap.value.clear()
      fetchConfig.mode = 'append'
    }
    if (res.list.length > 0) {
      const teamId = res.list[0].teamId
      const team = userStore.teams.find((team) => team.id === teamId)
      if (team) {
        teamMap.value.set(teamId, team)
        groupMap.value.set(teamId, res.list)
      }
    }
    if (!hasMore.value) {
      pageLoader.value!.stopInterval()
    }
    isFetching.value = false
  }
}

async function searchUser(keyword: string) {
  fetchConfig.keyword = keyword
  fetchConfig.mode = 'replace'
  if (keyword.length === 0) {
    searchType = ''
  } else if (
    keyword.includes('팀') ||
    keyword.includes('운영') ||
    keyword.includes('집행') ||
    keyword.includes('준비') ||
    /^\d+조?$/.test(keyword)
  ) {
    searchType = 'team'
  } else {
    searchType = 'name'
  }
  if (keyword.length > 0) {
    await fetchPage()
  }
}

async function filterUser(gen: number) {
  genFilter.value = gen
  fetchConfig.mode = 'replace'
  await fetchPage()
}

async function resetSearchFilter() {
  fetchConfig.keyword = ''
  searchType = ''
  genFilter.value = 0
  fetchConfig.mode = 'replace'
  await fetchPage()
}

onMounted(async () => {
  await fetchPage()
  onRender.value = false
})
</script>
