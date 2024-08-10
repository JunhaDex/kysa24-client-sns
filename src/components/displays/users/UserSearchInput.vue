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
    <UserListDropdown :is-filtered="genFilter" @filter-user="filterUser">
      <IconButton class="ml-2 btn-sm btn-white btn-square" :prefix-icon="CaretDownIcon" />
    </UserListDropdown>
  </div>
</template>
<script setup lang="ts">
import UserListDropdown from '@/components/inputs/dropdowns/UserListDropdown.vue'
import IconButton from '@/components/inputs/IconButton.vue'
import SearchIcon from '@/assets/icons/Search.svg'
import CaretDownIcon from '@/assets/icons/CaretDown.svg'
import { ref } from 'vue'

const emit = defineEmits(['searchUser', 'filterUser'])
const userInput = ref('')
const genFilter = ref(0)

function searchUser() {
  emit('searchUser', userInput.value)
}

function filterUser(filter: number) {
  genFilter.value = filter
  emit('filterUser', filter)
}
</script>
<style scoped>
.input {
  flex: 1;
}
</style>
