<template>
  <div v-show="isShow" class="modal-main">
    <div class="modal-header">
      <h2>{{ title }}</h2>
      <button class="btn btn-ghost" @click="$emit('modalClose')">X</button>
    </div>
    <div class="modal-content">
      <slot />
    </div>
  </div>
  <Backdrop :is-open="isShow" @bg-click="$emit('modalClose')" />
</template>
<script setup lang="ts">
import Backdrop from '@/components/feedbacks/Backdrop.vue'

const props = withDefaults(
  defineProps<{
    isShow: boolean
    title: string
  }>(),
  {
    isShow: false,
    title: ''
  }
)
const emit = defineEmits(['modalClose'])
</script>
<style scoped>
.modal-main {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 75%;
  transform: translate(-50%, -50%);
  z-index: 8;
  background-color: white;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-content {
  margin-top: 1rem;
}
</style>
