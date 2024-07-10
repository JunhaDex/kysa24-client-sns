<template>
  <div class="input-group mt-4">
    <input
      class="input input-bordered w-full"
      type="text"
      name="groupSearch"
      placeholder="그룹 이름으로 검색하기"
    />
    <IconButton class="ml-2 btn-primary" image="Notification" />
    <IconButton class="ml-2 btn-primary" image="Notification" />
  </div>
</template>
<script setup lang="ts">
import IconButton from '@/components/inputs/IconButton.vue'
</script>
<style scoped>
.input-group {
  display: flex;
  align-items: center;
}

.input {
  flex: 1;
}
</style>
