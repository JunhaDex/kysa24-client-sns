<template>
  <BaseHeader>
    <template #prefix>
      <ul class="flex space-x-2">
        <li>
          <IconButton class="btn-ghost btn-square" :prefix-icon="BackIcon" @click="goBack" />
        </li>
        <li class="chat-title">
          <span class="chat-title-load"></span>
          <span class="text-lg font-bold">김민지</span>
        </li>
      </ul>
    </template>
  </BaseHeader>
</template>
<script lang="ts" setup>
import BaseHeader from '@/components/layouts/headers/BaseHeader.vue'
import IconButton from '@/components/inputs/IconButton.vue'
import BackIcon from '@/assets/icons/Back.svg'
import { useRouter } from 'vue-router'

// TODO: fix api and pass these information
// const props = defineProps<{
//   title: string
//   images: string[]
//   isLoading: boolean
// }>()
const router = useRouter()

function goBack() {
  router.go(-1)
}
</script>
<style scoped>
.chat-title {
  display: flex;
  align-items: center;
}

.chat-title-load {
  display: inline-block;
  width: 50px; /* Adjust as needed */
  height: 28px; /* Adjust as needed */
  background-color: theme('colors.gray.50');
  border-radius: 0.5rem;
  overflow: hidden;
  position: relative;
}

.chat-title-load::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(50, 50, 50, 0) 0%,
    rgba(50, 50, 50, 0.3) 50%,
    rgba(50, 50, 50, 0) 100%
  );
  transform: skewX(-20deg);
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%) skewX(-20deg);
  }
  100% {
    transform: translateX(200%) skewX(-20deg);
  }
}
</style>
