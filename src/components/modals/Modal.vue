<template>
  <ModalBase :is-show="isShow">
    <div class="modal-header">
      <h2>{{ title }}</h2>
      <button class="btn btn-ghost" @click="$emit('modalClose')">X</button>
    </div>
    <div class="modal-content">
      <slot />
    </div>
  </ModalBase>
</template>
<script setup lang="ts">
import ModalBase from '@/components/feedbacks/ModalBase.vue'

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
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-content {
  margin-top: 1rem;
}
</style>
