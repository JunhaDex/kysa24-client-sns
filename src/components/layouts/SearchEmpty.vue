<template>
  <div class="full-cover">
    <Container>
      <div class="text-center">
        <slot />
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
