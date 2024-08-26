<template>
  <div class="input-group my-4">
    <input
      v-model="userInput"
      class="input input-bordered input-md input-height w-full"
      type="text"
      name="groupSearch"
      placeholder="그룹 이름으로 검색하기"
    />
    <IconButton
      class="btn-primary btn-sm btn-square ml-2"
      @click="searchGroup"
      :prefix-icon="SearchIcon"
    />
    <RouterLink to="/group/new">
      <IconButton class="btn-secondary btn-sm btn-square ml-2" :prefix-icon="PlusIcon" />
    </RouterLink>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import IconButton from '@/components/inputs/IconButton.vue'
import SearchIcon from '@/assets/icons/Search.svg'
import PlusIcon from '@/assets/icons/Plus.svg'

const emit = defineEmits(['searchGroup'])
defineExpose({ showTooltip })
const userInput = ref('')

function searchGroup() {
  emit('searchGroup', userInput.value)
}

function showTooltip() {
  const tooltip = document.querySelector('.tooltip')
  if (tooltip) {
    tooltip.classList.add('tooltip-open')
    setTimeout(() => {
      const tooltip = document.querySelector('.tooltip')
      if (tooltip) {
        tooltip.classList.remove('tooltip-open')
      }
    }, 3000)
  }
}
</script>
<style scoped>
.input {
  flex: 1;
}
</style>
