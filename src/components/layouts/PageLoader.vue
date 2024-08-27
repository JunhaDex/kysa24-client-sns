<template>
  <div class="text-center" ref="pageLoader">
    <span v-if="hasMore" class="loading loading-spinner text-primary loading-md"></span>
    <span v-else class="text-sm">{{ eol ?? '마지막이에요!' }}</span>
  </div>
</template>
<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core'
import { onUnmounted, ref } from 'vue'

const props = defineProps<{
  hasMore: boolean
  eol?: string
}>()
const emit = defineEmits(['loadMore'])
defineExpose({ stopInterval })
const pageLoader = ref<HTMLDivElement>()
let interval: any = null

const { stop } = useIntersectionObserver(
  pageLoader,
  ([{ isIntersecting }]) => {
    if (isIntersecting) {
      if (props.hasMore) {
        startInterval()
      }
    } else {
      stopInterval()
    }
  },
  { threshold: 0.5 }
)

onUnmounted(() => {
  stop()
  stopInterval()
})

function startInterval() {
  if (interval === null) {
    interval = setInterval(() => {
      emit('loadMore')
    }, 1000)
  }
}

function stopInterval() {
  if (interval !== null) {
    clearInterval(interval)
    interval = null
  }
}
</script>
