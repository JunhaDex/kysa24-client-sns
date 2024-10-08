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
      <div v-if="isCreator" class="action-area">
        <GroupCtrlDropdown class="dropdown-end" @delete-group="() => emit('deleteGroup')">
          <IconButton
            class="btn-md btn-white btn-block whitespace-nowrap"
            role="button"
            tabindex="0"
            :prefix-icon="GearIcon"
          >
            설정
          </IconButton>
        </GroupCtrlDropdown>
      </div>
      <div v-else class="action-area">
        <IconButton v-if="!followState" class="btn-primary btn-sm btn-block" @click="followGroup">
          팔로우
        </IconButton>
        <UnfollowDropdown
          v-else
          class="dropdown-end block"
          :group-ref="group.ref"
          :disabled="unfollowBlocked"
          @unfollow-group="unfollowGroup"
        >
          <IconButton
            class="btn-sm btn-white btn-block text-xs"
            role="button"
            tabindex="0"
            :suffix-icon="CaretDown"
          >
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
import { computed } from 'vue'
import UserBadge from '@/components/layouts/UserBadge.vue'
import IconButton from '@/components/inputs/IconButton.vue'
import CaretDown from '@/assets/icons/CaretDown.svg'
import GearIcon from '@/assets/icons/Gear.svg'
import UnfollowDropdown from '@/components/inputs/dropdowns/UnfollowDropdown.vue'
import { throttle } from 'lodash-es'
import { useUserStore } from '@/stores/user.store'
import GroupCtrlDropdown from '@/components/inputs/dropdowns/GroupCtrlDropdown.vue'

const emit = defineEmits(['followGroup', 'unfollowGroup', 'deleteGroup'])
const props = defineProps<{
  group: Group
}>()
const userStore = useUserStore()
const isCreator = computed(() => props.group.creator.ref === userStore.myInfo?.ref)
const followState = computed(() => !!props.group.already)
const unfollowBlocked = computed(() => {
  return props.group.id === 1 || props.group.creator.ref === userStore.myInfo?.ref
})

const followCaller = throttle(() => {
  emit('followGroup', props.group)
}, 1000)

function followGroup() {
  followCaller()
}

const unfollowCaller = throttle(() => {
  emit('unfollowGroup', props.group)
}, 1000)

async function unfollowGroup() {
  unfollowCaller()
}
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
