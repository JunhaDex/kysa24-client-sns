<template>
  <button class="btn btn-square px-2">
    <img :src="svgAsset" alt="icon" />
  </button>
</template>
<script setup lang="ts">
import Notification from '@/assets/icons/Notification.svg'
import Menu from '@/assets/icons/Menu.svg'
import { computed } from 'vue'

const props = defineProps<{
  image: 'Notification' | 'Menu'
}>()

const svgAsset = computed(() => {
  switch (props.image) {
    case 'Notification':
      return Notification
    case 'Menu':
      return Menu
  }
})
</script>
<style scoped></style>
