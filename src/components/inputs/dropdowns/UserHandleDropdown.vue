<template>
  <Dropdown>
    <template #handle>
      <slot />
    </template>
    <template #menus>
      <li><span>프로필 보기</span></li>
      <li><span>메세지 보내기</span></li>
      <li><span class="text-error">수신차단</span></li>
    </template>
  </Dropdown>
</template>
<script setup lang="ts">
import Dropdown from '@/components/inputs/Dropdown.vue'
const props = defineProps<{
  targetRef: string // userRef
}>()
</script>
