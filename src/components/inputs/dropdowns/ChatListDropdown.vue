<template>
  <Dropdown ref="drp">
    <template #handle>
      <slot />
    </template>
    <template #menus>
      <li @click="openUserProfile"><span>상대방 프로필</span></li>
      <li @click="denyUserChat"><span class="text-error">메세지 수신거부</span></li>
    </template>
  </Dropdown>
</template>
<script setup lang="ts">
import Dropdown from '@/components/inputs/Dropdown.vue'
import { ref } from 'vue'

const emit = defineEmits(['openProfile', 'denyUserChat'])
const drp = ref<typeof Dropdown>()

function openUserProfile() {
  emit('openProfile')
  drp.value!.close()
}

function denyUserChat() {
  emit('denyUserChat')
  drp.value!.close()
}
</script>
