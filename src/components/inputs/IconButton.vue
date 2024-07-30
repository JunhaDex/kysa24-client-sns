<template>
  <button class="btn">
    <span v-if="prefixIcon" class="icon prefix-icon" :style="prefixIconStyle"></span>
    <slot></slot>
    <span v-if="suffixIcon" class="icon suffix-icon" :style="suffixIconStyle"></span>
  </button>
</template>
<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
  prefixIcon?: string
  suffixIcon?: string
}>()
const prefixIconStyle = computed(() => ({
  maskImage: props.prefixIcon ? `url(${props.prefixIcon})` : 'none',
  WebkitMaskImage: props.prefixIcon ? `url(${props.prefixIcon})` : 'none',
  backgroundColor: 'currentColor'
}))

const suffixIconStyle = computed(() => ({
  maskImage: props.suffixIcon ? `url(${props.suffixIcon})` : 'none',
  WebkitMaskImage: props.suffixIcon ? `url(${props.suffixIcon})` : 'none',
  backgroundColor: 'currentColor'
}))
</script>
<style scoped>
.icon {
  width: 1.6em;
  height: 1.6em;
  mask-size: contain;
  mask-repeat: no-repeat;
  mask-position: center;
}
</style>
