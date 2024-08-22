<template>
  <ModalBase :is-show="isShow" class="img-fill-wrap" @modal-close="() => emit('modalClose')">
    <div class="img-fill">
      <img v-if="profileImg" :src="profileImg" alt="profile img" />
      <button class="up-close-btn" @click="() => emit('modalClose')">
        <span class="icon-close"></span>
      </button>
    </div>
  </ModalBase>
</template>
<script setup lang="ts">
import ModalBase from '@/components/feedbacks/ModalBase.vue'

const props = defineProps<{
  isShow: boolean
  profileImg: string
}>()
const emit = defineEmits(['modalClose'])
</script>
<style scoped>
.img-fill {
  position: relative;
  background-color: theme('colors.gray.300');
  border-radius: 0.5rem;
  aspect-ratio: 1/1;
  overflow: hidden;
}

.up-close-btn {
  width: 24px;
  height: 24px;
  background-color: theme('colors.white');
  color: theme('colors.black');
  padding: 0.1rem;
  position: absolute;
  top: 1rem;
  right: 1rem;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.1s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.up-close-btn:hover {
  background-color: theme('colors.gray.50');
}

.up-close-btn:active {
  transform: scale(0.95); /* Shrink effect when clicked */
}
</style>
