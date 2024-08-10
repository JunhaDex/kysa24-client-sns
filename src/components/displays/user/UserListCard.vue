<template>
  <div class="member-item">
    <div class="profile-image" @click="clickUser">
      <img :src="profileImg" alt="User" />
    </div>
    <div class="member-info" @click="clickUser">
      <span class="font-bold mr-1">{{ user.nickname }}</span>
      <span class="text-xs">{{ subfix }}</span>
    </div>
    <span class="member-location text-sm">
      <span class="icon-mask geo-icon mr-1"></span>
      {{ user.geo }}
    </span>
    <UserHandleDropdown
      class="dropdown-end"
      :target-ref="user.ref"
      @select-user-profile="clickUser"
      @select-message="() => emit('goChat')"
    >
      <IconButton
        class="btn-sm btn-ghost btn-square"
        role="button"
        tabindex="0"
        :prefix-icon="VMoreIcon"
      />
    </UserHandleDropdown>
  </div>
</template>
<script lang="ts" setup>
import type { User } from '@/types/general.type'
import { computed } from 'vue'
import UserHandleDropdown from '@/components/inputs/dropdowns/UserHandleDropdown.vue'
import { sfx } from '@/utils/index.util'
import IconButton from '@/components/inputs/IconButton.vue'
import VMoreIcon from '@/assets/icons/VMore.svg'
import ProfileEmpty from '@/assets/images/profile_empty.png'

const props = defineProps<{
  user: User
}>()
const emit = defineEmits(['selectUser', 'goChat'])
const profileImg = computed(() => (props.user.profileImg ? props.user.profileImg : ProfileEmpty))
const subfix = computed(() => {
  return sfx(props.user.sex)
})

function clickUser() {
  emit('selectUser', props.user)
}
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
.member-item:active:not(:has(.dropdown-end:active)) {
  background-color: theme('colors.gray.300');
}

.member-item:active:not(:has(.dropdown-end:active)) {
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
  align-items: flex-end;
}

.member-location {
  display: flex;
  align-items: center;
}

.icon-mask {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  mask-size: contain;
  mask-repeat: no-repeat;
  mask-position: center;
  background-color: theme('colors.gray.600');
}

.geo-icon {
  mask-image: url('@/assets/icons/Location.svg');
  -webkit-mask-image: url('@/assets/icons/Location.svg');
}
</style>
