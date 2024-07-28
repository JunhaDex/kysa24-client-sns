<template>
  <div class="input-group my-4">
    <input
      class="input input-bordered input-md input-height w-full"
      type="text"
      name="groupSearch"
      placeholder="그룹 이름으로 검색하기"
    />
    <IconButton class="ml-2 btn-primary btn-custom i-16" image="Search" color="#fff" />
    <RouterLink to="/group/new">
      <IconButton class="ml-2 btn-primary btn-custom i-16" image="Plus" />
    </RouterLink>
  </div>
</template>
<script setup lang="ts">
import IconButton from '@/components/inputs/IconButtonDep.vue'
</script>
<style scoped>
.input {
  flex: 1;
}
</style>
