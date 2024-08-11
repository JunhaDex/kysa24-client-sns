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
  '--icon-url': props.prefixIcon ? `url(${props.prefixIcon})` : 'none'
}))

const suffixIconStyle = computed(() => ({
  '--icon-url': props.suffixIcon ? `url(${props.suffixIcon})` : 'none'
}))
</script>
<style scoped>

.icon {
  width: 1.6em;
  height: 1.6em;
  mask-image: var(--icon-url);
  -webkit-mask-image: var(--icon-url);
  mask-size: contain;
  mask-repeat: no-repeat;
  mask-position: center;
  background-color: currentColor;
}
</style>
