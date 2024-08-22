<template>
  <div v-show="isShow" class="modal-main" :class="$attrs.class">
    <slot />
  </div>
  <Backdrop :is-open="isShow" @bg-click="$emit('modalClose')" />
</template>
<script setup lang="ts">
import Backdrop from '@/components/feedbacks/Backdrop.vue'

const props = withDefaults(
  defineProps<{
    isShow: boolean
  }>(),
  {
    isShow: false
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
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
}

.img-fill-wrap {
  max-width: 327px;
}
</style>
