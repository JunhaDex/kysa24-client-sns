<template>
  <div class="member-item shadow">
    <div class="profile-image" @click="clickUser">
      <img :src="profileImg" alt="User" />
    </div>
    <div class="member-info" @click="clickUser">
      <span class="font-bold mr-1">{{ user.nickname }}</span>
      <span class="text-xs">{{ subfix }}</span>
    </div>
    <UserDenyDropdown class="dropdown-end" @undo-deny="undoDeny">
      <IconButton
        class="btn-sm btn-ghost btn-square"
        role="button"
        tabindex="0"
        :prefix-icon="VMoreIcon"
      />
    </UserDenyDropdown>
  </div>
</template>
<script setup lang="ts">
import type { User } from '@/types/general.type'
import { computed } from 'vue'
import ProfileEmpty from '@/assets/images/profile_empty.png'
import { sfx } from '@/utils/index.util'
import UserDenyDropdown from '@/components/inputs/dropdowns/UserDenyDropdown.vue'
import VMoreIcon from '@/assets/icons/VMore.svg'
import IconButton from '@/components/inputs/IconButton.vue'

const emit = defineEmits(['selectUser', 'undoDeny'])
const props = defineProps<{
  user: User
}>()
const profileImg = computed(() => (props.user.profileImg ? props.user.profileImg : ProfileEmpty))
const subfix = computed(() => {
  return sfx(props.user.sex)
})

function clickUser() {
  emit('selectUser', props.user)
}

function undoDeny() {
  emit('undoDeny', props.user)
}
</script>
<style scoped>
.member-item {
  display: grid;
  grid-template-columns: 24px auto 24px;
  gap: 8px;
  align-items: center;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid theme('colors.gray.300');
  background-color: theme('colors.white');
  border-radius: 0.5rem;
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
  align-items: flex-end;
}
</style>
