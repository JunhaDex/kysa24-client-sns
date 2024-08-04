<template>
  <Profile :cover-img="group.coverImg" :profile-img="group.profileImg">
    <div class="group-profile-wrap">
      <div class="name-area mr-4">
        <h2 class="text-xl font-bold">{{ group.groupName }}</h2>
        <ul>
          <li>
            <span class="mr-2 text-xs font-bold">그룹장</span>
            <RouterLink :to="{ name: 'user_profile', params: { ref: group.creator.ref } }">
              <UserBadge>
                {{ group.creator.nickname }}
              </UserBadge>
            </RouterLink>
          </li>
          <li>
            <span class="mr-2 text-xs font-bold">팔로우</span>
            <span class="text-sm">{{ group.followers }}명</span>
          </li>
        </ul>
      </div>
      <div class="action-area">
        <IconButton v-if="!followState" class="btn-primary btn-sm btn-block"> 팔로우</IconButton>
        <UnfollowDropdown
          v-else
          class="dropdown-end block"
          :group-ref="group.ref"
          :disabled="false"
        >
          <IconButton class="btn-sm btn-white btn-block text-xs" :suffix-icon="CaretDown">
            팔로잉
          </IconButton>
        </UnfollowDropdown>
      </div>
    </div>
  </Profile>
  <Container>
    <Box>
      <h2 class="font-bold text-sm mb-2">그룹 공지</h2>
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
import { unfollowMenu } from '@/constants/menu.constant'
import UserBadge from '@/components/layouts/UserBadge.vue'
import IconButton from '@/components/inputs/IconButton.vue'
import CaretDown from '@/assets/icons/CaretDown.svg'
import UnfollowDropdown from '@/components/inputs/dropdowns/UnfollowDropdown.vue'

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

.name-area ul li {
  white-space: nowrap;
  display: flex;
  align-items: center;
}

.action-area {
  width: 96px;
}
</style>
