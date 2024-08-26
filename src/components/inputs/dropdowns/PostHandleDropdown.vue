<template>
  <Dropdown class="dropdown-end" ref="drp">
    <template #handle>
      <slot />
    </template>
    <template #menus>
      <li @click="openUserProfile"><span>작성자 프로필</span></li>
      <li @click="copyShareLink"><span>공유하기</span></li>
      <li v-if="isAuthor" @click="deletePost">
        <span class="text-error">삭제하기</span>
      </li>
    </template>
  </Dropdown>
</template>
<script setup lang="ts">
import Dropdown from '@/components/inputs/Dropdown.vue'
import { ref } from 'vue'
import { useToastStore } from '@/stores/ui/toast.store'

const toastStore = useToastStore()
const props = withDefaults(
  defineProps<{
    isAuthor: boolean
  }>(),
  {
    isAuthor: false
  }
)
const emit = defineEmits(['openProfile', 'deleteInstance'])
const drp = ref<typeof Dropdown>()

function openUserProfile() {
  emit('openProfile')
  drp.value!.close()
}

function copyShareLink() {
  const url = window.location.href
  navigator.clipboard.writeText(url)
  toastStore.showToast('링크가 복사되었습니다.', 'success')
  drp.value!.close()
}

function deletePost() {
  emit('deleteInstance')
  drp.value!.close()
}
</script>
