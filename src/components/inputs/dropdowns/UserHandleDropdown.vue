<template>
  <Dropdown ref="drp">
    <template #handle>
      <slot />
    </template>
    <template #menus>
      <li @click="() => handleClick('selectUserProfile')"><span>프로필 보기</span></li>
      <li @click="() => handleClick('selectMessage')"><span>메세지 보내기</span></li>
      <li @click="() => handleClick('denyUserChat')"><span class="text-error">수신차단</span></li>
    </template>
  </Dropdown>
</template>
<script setup lang="ts">
import Dropdown from '@/components/inputs/Dropdown.vue'
import { ref } from 'vue'

const props = defineProps<{
  targetRef: string // userRef
}>()
const emit = defineEmits(['selectUserProfile', 'selectMessage', 'denyUserChat'])
const drp = ref<typeof Dropdown>()

function handleClick(emitOpt: any) {
  emit(emitOpt)
  drp.value!.close()
}
</script>
