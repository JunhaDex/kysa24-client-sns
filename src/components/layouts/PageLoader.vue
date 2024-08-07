<template>
  <div class="text-center" ref="pageLoader">
    <span v-if="hasMore" class="loading loading-spinner text-primary loading-md"></span>
    <span v-else class="text-sm">마지막 이에요!</span>
  </div>
</template>
<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core'
import { onUnmounted, ref } from 'vue'

const props = defineProps<{
  hasMore: boolean
}>()
const emit = defineEmits(['loadMore'])
const pageLoader = ref<HTMLDivElement>()
let interval: any = null

const { stop } = useIntersectionObserver(
  pageLoader,
  ([{ isIntersecting }]) => {
    if (isIntersecting) {
      console.log('load more')
      if (props.hasMore) {
        startInterval()
      }
    } else {
      console.log('out of sight')
      stopInterval()
    }
  },
  { threshold: 0.5 }
)

onUnmounted(() => {
  stop()
})

function startInterval() {
  if (interval === null) {
    interval = setInterval(() => {
      console.log('pageLoad!')
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
