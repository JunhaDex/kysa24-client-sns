<template>
  <div class="member-item">
    <div class="profile-image">
      <img :src="user.profileImg" alt="User" />
    </div>
    <div class="member-info">
      <span class="font-bold mr-1">{{ user.nickname }}</span>
      <span class="text-xs">{{ subfix }}</span>
    </div>
    <span class="member-location">{{ user.geo }}</span>
    <UserHandleDropdown class="dropdown-end" :target-ref="user.ref">
      <IconButton class="btn-xs btn-ghost" image="vmore" />
    </UserHandleDropdown>
  </div>
</template>
<script lang="ts" setup>
import type { User } from '@/types/general.type'
import IconButton from '@/components/inputs/IconButton.vue'
import { computed } from 'vue'
import UserHandleDropdown from '@/components/inputs/dropdowns/UserHandleDropdown.vue'
import { sfx } from '@/utils/index.util'

const props = defineProps<{
  user: User
}>()
const subfix = computed(() => {
  return sfx(props.user.sex)
})
</script>
<style scoped>
.member-item {
  display: grid;
  grid-template-columns: 24px auto 1fr 24px;
  gap: 8px;
  align-items: center;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid theme('colors.gray.300');
  background-color: theme('colors.white');
}

.member-item:hover,
.member-item:active:not(:has(.action-button:active)) {
  background-color: theme('colors.gray.300');
}

.member-item:active:not(:has(.action-button:active)) {
  transform: scale(0.98);
}

.member-item:last-child {
  border-bottom: none;
}

.profile-image {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: theme('colors.gray.300');
  overflow: hidden;
}

.member-info {
  display: flex;
  align-items: baseline;
}
</style>
