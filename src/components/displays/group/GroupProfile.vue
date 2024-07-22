<template>
  <Profile>
    <div class="group-profile-wrap">
      <div class="name-area mr-4">
        <h2 class="text-xl font-bold">{{ group.groupName }}</h2>
        <ul>
          <li>그룹장 {{ group.creator.nickname }}</li>
          <li>팔로우 {{ group.followers }}명</li>
        </ul>
      </div>
      <div class="action-area">
        <button v-if="!followState" class="btn btn-primary btn-sm btn-block">팔로우</button>
        <Dropdown v-else class="dropdown-end block" :menu-list="unfollowMenu">
          <button class="btn btn-sm btn-block">팔로잉</button>
        </Dropdown>
      </div>
    </div>
  </Profile>
  <Container>
    <Box>
      <h2>그룹 공지</h2>
      <p>{{ group.introduce }}</p>
    </Box>
  </Container>
</template>
<script setup lang="ts">
import Profile from '@/components/displays/Profile.vue'
import Container from '@/components/layouts/Container.vue'
import Box from '@/components/layouts/Box.vue'
import type { Group } from '@/types/general.type'
import { onMounted, ref } from 'vue'
import Dropdown from '@/components/inputs/Dropdown.vue'
import { unfollowMenu } from '@/constants/menu.constant'

const props = defineProps<{
  group: Group
}>()
const followState = ref(false)

onMounted(() => {
  followState.value = !!props.group.already
})
</script>
<style scoped>
.group-profile-wrap {
  display: flex;
}

.name-area {
  flex: 1;
}

.action-area {
  width: 108px;
}
</style>
