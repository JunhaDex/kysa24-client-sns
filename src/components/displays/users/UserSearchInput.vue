<template>
  <div class="input-group mt-4">
    <input
      v-model="userInput"
      class="input input-bordered input-md input-height w-full"
      type="text"
      name="userSearch"
      placeholder="조 이름 혹은 참가자명으로 검색"
    />
    <IconButton
      class="ml-2 btn-sm btn-primary btn-square"
      :prefix-icon="SearchIcon"
      @click="searchUser"
    />
    <UserListDropdown
      :is-filtered="genFilter"
      :is-reset="userInput.length > 0"
      @filter-user="filterUser"
    >
      <div class="tooltip tooltip-bottom tooltip-secondary" data-tip="목록 초기화">
        <IconButton
          class="ml-2 btn-sm btn-white btn-square"
          role="button"
          tabindex="0"
          :prefix-icon="CaretDownIcon"
        />
      </div>
    </UserListDropdown>
  </div>
</template>
<script setup lang="ts">
import UserListDropdown from '@/components/inputs/dropdowns/UserListDropdown.vue'
import IconButton from '@/components/inputs/IconButton.vue'
import SearchIcon from '@/assets/icons/Search.svg'
import CaretDownIcon from '@/assets/icons/CaretDown.svg'
import { ref, watch } from 'vue'
import { sleep } from '@/utils/index.util'

const emit = defineEmits(['searchUser', 'filterUser', 'resetAll'])
const userInput = ref('')
const genFilter = ref(0)

watch(
  () => userInput.value,
  async () => {
    if (userInput.value.length) {
      await sleep(1000)
      showTooltip()
    }
  }
)

watch(
  () => genFilter.value,
  async () => {
    if (genFilter.value !== 0) {
      await sleep(1000)
      showTooltip()
    }
  }
)

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

function searchUser() {
  emit('searchUser', userInput.value)
}

function filterUser(filter: number) {
  genFilter.value = filter
  if (filter === 0) {
    userInput.value = ''
    emit('resetAll')
  } else {
    emit('filterUser', filter)
  }
}
</script>
<style scoped>
.input {
  flex: 1;
}
</style>
