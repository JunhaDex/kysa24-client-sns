<template>
  <div class="full-cover">
    <Container>
      <div class="text-center">
        <span>정보를 가져오는 중...</span>
        <progress class="progress progress-primary w-56"></progress>
      </div>
    </Container>
  </div>
</template>
<script setup lang="ts">
import Container from '@/components/layouts/Container.vue'
</script>
<style scoped>
.full-cover {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
