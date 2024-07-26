<template>
  <PageView @scroll="handleScroll($event, fetchPage)" ref="scrollView">
    <template #header>
      <Header />
    </template>
    <template #main>
      <Container>
        <UserSearchInput />
      </Container>
      <Container>
        <UserListCardGroup
          v-for="key in sortedKey"
          :team-name="teamMap.get(key)!.teamName"
          :users="groupMap.get(key)!"
          :key="key"
        />
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

const { handleScroll } = setupListPage()
const scrollView = ref<HTMLDivElement>()
const userService = new UserService()
const { pageMeta, isFetching, onRender } = setupListPage()
const userStore = useUserStore()
const teamMap = ref(new Map<number, Team>())
const groupMap = ref(new Map<number, User[]>())

const sortedKey = computed(() => Array.from(groupMap.value.keys()).sort())

async function fetchPage(pageNo = 1) {
  if (!isFetching.value) {
    isFetching.value = true
    const res = await userService.listUsers({ page: { page: pageNo } })
    console.log(res)
    pageMeta.value = res.meta
    if (res.list.length > 0) {
      const teamId = res.list[0].teamId
      const team = userStore.teams.find((team) => team.id === teamId)
      if (team) {
        teamMap.value.set(teamId, team)
        groupMap.value.set(teamId, res.list)
      }
    }
    isFetching.value = false
  }
}

onMounted(async () => {
  await fetchPage()
})
</script>
