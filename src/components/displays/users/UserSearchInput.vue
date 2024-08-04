<template>
  <div class="input-group mt-4">
    <input
      class="input input-bordered input-md input-height w-full"
      type="text"
      name="userSearch"
      placeholder="그룹 이름으로 검색하기"
    />
    <IconButton class="ml-2 btn-sm btn-primary btn-square" :prefix-icon="SearchIcon" />
    <UserListDropdown>
      <IconButton class="ml-2 btn-sm btn-white btn-square" :prefix-icon="CaretDownIcon" />
    </UserListDropdown>
  </div>
</template>
<script setup lang="ts">
import UserListDropdown from '@/components/inputs/dropdowns/UserListDropdown.vue'
import IconButton from '@/components/inputs/IconButton.vue'
import SearchIcon from '@/assets/icons/Search.svg'
import CaretDownIcon from '@/assets/icons/CaretDown.svg'
</script>
<style scoped>
.input {
  flex: 1;
}
</style>
