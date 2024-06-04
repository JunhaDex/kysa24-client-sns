<template>
  <div
    class="backdrop backdrop-blur-sm prevent-scroll"
    v-show="isOpen"
    @click="$emit('bgClick')"
  ></div>
</template>
<script lang="ts" setup>
import { watchEffect } from 'vue'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits(['bgClick'])

watchEffect(() => {
  if (props.isOpen) {
    document.body.classList.add('prevent-scroll')
  } else {
    document.body.classList.remove('prevent-scroll')
  }
})
</script>
<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 7;
}
</style>
