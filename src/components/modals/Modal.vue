<template>
  <ModalBase :is-show="isShow">
    <div class="box-wrap">
      <div class="modal-header">
        <h2 class="font-bold">{{ title }}</h2>
        <IconButton
          class="btn-ghost btn-square"
          :prefix-icon="CloseIcon"
          @click="() => emit('modalClose')"
        ></IconButton>
      </div>
      <div class="modal-content">
        <slot />
      </div>
    </div>
  </ModalBase>
</template>
<script setup lang="ts">
import ModalBase from '@/components/feedbacks/ModalBase.vue'
import CloseIcon from '@/assets/icons/Close.svg'
import IconButton from '@/components/inputs/IconButton.vue'

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
.box-wrap {
  padding: 1.5rem;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
