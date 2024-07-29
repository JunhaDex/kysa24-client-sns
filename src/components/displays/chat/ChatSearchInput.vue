<template>
  <div class="input-group my-4">
    <input
      v-model="userInput"
      class="input input-bordered input-md input-height w-full"
      type="text"
      name="groupSearch"
      placeholder="이름으로 검색하기"
    />
    <IconButton
      class="ml-2 btn-primary btn-sm btn-square"
      :prefix-icon="SearchIcon"
      @click="searchChat"
    />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import IconButton from '@/components/inputs/IconButton.vue'
import SearchIcon from '@/assets/icons/Search.svg'

const emit = defineEmits(['searchChat'])
const userInput = ref('')

function searchChat() {
  emit('searchChat', userInput.value)
}
</script>
<style scoped>
.input {
  flex: 1;
}
</style>
