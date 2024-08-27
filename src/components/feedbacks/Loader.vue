<template>
  <div class="loader-container" ref="loader">
    <span class="loading loading-spinner loading-sm"></span>
  </div>
</template>
<script setup lang="ts">
import { onUnmounted, ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const loader = ref<HTMLDivElement>()
const emit = defineEmits(['loadMore'])
const { stop } = useIntersectionObserver(
  loader,
  ([entry]) => {
    if (entry.isIntersecting) {
      emit('loadMore')
    }
  },
  { threshold: 0.5 }
)

onUnmounted(() => {
  stop()
})
</script>
<style scoped>
.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}
</style>
