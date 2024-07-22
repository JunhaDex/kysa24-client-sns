<template>
  <Dropdown ref="drp">
    <template #handle>
      <slot />
    </template>
    <template #menus>
      <li><span>상대방 프로필</span></li>
      <li><span class="text-error">메세지 수신거부</span></li>
    </template>
  </Dropdown>
</template>
<script setup lang="ts">
import Dropdown from '@/components/inputs/Dropdown.vue'
import { ref } from 'vue'

const props = defineProps<{
  userRef: string
}>()
const emit = defineEmits(['denyUserChat'])
const drp = ref<typeof Dropdown>()

function openUserProfile() {
  drp.value!.close()
}

function denyUserChat() {
  emit('denyUserChat', props.userRef)
  drp.value!.close()
}
</script>
