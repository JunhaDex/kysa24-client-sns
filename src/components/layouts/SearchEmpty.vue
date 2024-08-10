<template>
  <div class="full-cover">
    <Container>
      <div class="text-center">
        <slot />
        <div class="btn-group mt-6">
          <RouterLink to="/" class="btn mr-4">새로고침</RouterLink>
          <button class="btn btn-primary" @click="() => emit('resetInput')">입력 초기화</button>
        </div>
      </div>
    </Container>
  </div>
</template>
<script setup lang="ts">
import Container from '@/components/layouts/Container.vue'

const emit = defineEmits(['resetInput'])
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
