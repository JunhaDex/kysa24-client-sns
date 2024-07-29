<template>
  <div class="input-group my-4">
    <input
      class="input input-bordered input-md input-height w-full"
      type="text"
      name="groupSearch"
      placeholder="그룹 이름으로 검색하기"
    />
    <!--    <IconButton class="ml-2 btn-primary btn-custom i-16" image="Search" color="#fff" />-->
    <IconButton
      v-model="userInput"
      class="btn-primary btn-sm btn-square ml-2"
      @click="searchGroup"
      :prefix-icon="SearchIcon"
    />
    <RouterLink to="/group/new">
      <IconButton class="btn-sm btn-square ml-2" :prefix-icon="PlusIcon" />
    </RouterLink>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import IconButton from '@/components/inputs/IconButton.vue'
import SearchIcon from '@/assets/icons/Search.svg'
import PlusIcon from '@/assets/icons/Plus.svg'

const emit = defineEmits(['searchGroup'])
const userInput = ref('')

function searchGroup() {
  emit('searchGroup', userInput.value)
}
</script>
<style scoped>
.input {
  flex: 1;
}
</style>
