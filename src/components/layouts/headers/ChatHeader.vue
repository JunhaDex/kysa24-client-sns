<template>
  <BaseHeader :is-fixed="true">
    <template #prefix>
      <ul class="flex space-x-1">
        <li @click="reroute">
          <IconButton class="btn-ghost btn-square" :prefix-icon="BackIcon" @click="goBack" />
        </li>
        <li class="chat-title" @click="reroute">
          <div class="profile-img profile-md mr-2">
            <img :src="profileImg" alt="profile image" />
          </div>
          <span v-if="!title" class="chat-title-load"></span>
          <span v-else class="text-lg font-bold">{{ title }}</span>
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
import { computed } from 'vue'
import ProfileEmpty from '@/assets/images/profile_empty.png'

const props = defineProps<{
  title: string
  images: string[]
  route?: string
}>()
const router = useRouter()
const profileImg = computed(() => (props.images[0] ? props.images[0] : ProfileEmpty))

function goBack() {
  router.go(-1)
}

function reroute() {
  if (props.route) {
    router.replace(props.route)
  }
}
</script>
<style scoped>
.profile-img {
  border-radius: 50%;
  background-color: #ddd;
  flex-shrink: 0;
  overflow: hidden;
}

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
