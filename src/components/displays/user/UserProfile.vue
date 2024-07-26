<template>
  <Profile>
    <div class="user-profile-wrap">
      <div class="name-area mr-4">
        <h2>
          {{ user.nickname }} <span>{{ subfix }}</span>
        </h2>
        <ul>
          <li>{{ team }}</li>
          <li>{{ user.geo }}</li>
        </ul>
      </div>
      <div class="action-area">
        <button class="btn btn-sm btn-primary btn-block mb-2">관심 보내기</button>
        <button class="btn btn-sm btn-block">메세지</button>
      </div>
    </div>
  </Profile>
  <Container>
    <Box>
      <h2>한줄 소개</h2>
      <p>
        {{ user.introduce }}
      </p>
    </Box>
  </Container>
</template>
<script setup lang="ts">
import Profile from '@/components/displays/Profile.vue'
import Container from '@/components/layouts/Container.vue'
import Box from '@/components/layouts/Box.vue'
import type { User } from '@/types/general.type'
import { computed } from 'vue'
import { sfx } from '@/utils/index.util'
import { useUserStore } from '@/stores/user.store'

const props = defineProps<{
  user: User
}>()
const userStore = useUserStore()
const subfix = computed(() => {
  return sfx(props.user.sex)
})
const team = computed(() => {
  const match = userStore.teams.find((team) => team.id === props.user.teamId)
  if (match) {
    return match.teamName
  }
  return ''
})
</script>
<style scoped>
.user-profile-wrap {
  display: flex;
}

.name-area {
  flex: 1;
}

.action-area {
  width: 108px;
}
</style>
