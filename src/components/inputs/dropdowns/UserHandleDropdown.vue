<template>
  <Dropdown>
    <template #handle>
      <slot />
    </template>
    <template #menus>
      <li @click="() => emit('selectUserProfile')"><span>프로필 보기</span></li>
      <li @click="() => emit('selectMessage')"><span>메세지 보내기</span></li>
      <li @click="() => emit('denyUserChat')"><span class="text-error">수신차단</span></li>
    </template>
  </Dropdown>
</template>
<script setup lang="ts">
import Dropdown from '@/components/inputs/Dropdown.vue'

const props = defineProps<{
  targetRef: string // userRef
}>()
const emit = defineEmits(['selectUserProfile', 'selectMessage', 'denyUserChat'])
</script>
