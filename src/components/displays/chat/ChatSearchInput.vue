<template>
  <div class="input-group mt-4">
    <input
      class="input input-bordered input-md input-height w-full"
      type="text"
      name="groupSearch"
      placeholder="이름으로 검색하기"
    />
    <IconButton class="ml-2 btn-primary btn-custom i-16" image="Search" color="#fff" />
  </div>
</template>
<script setup lang="ts">
import IconButton from '@/components/inputs/IconButton.vue'
</script>
<style scoped>

.input {
  flex: 1;
}
</style>
