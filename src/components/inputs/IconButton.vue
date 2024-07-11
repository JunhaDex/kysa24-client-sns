<template>
  <button class="btn btn-square">
    <span class="icon-area" :style="{
      maskImage: `url(${svgAsset})`,
      WebkitMaskImage: `url(${svgAsset})`,
      backgroundColor: color
    }"></span>
  </button>
</template>
<script setup lang="ts">
import Notification from '@/assets/icons/Notification.svg'
import Menu from '@/assets/icons/Menu.svg'
import Back from '@/assets/icons/Back.svg'
import Search from '@/assets/icons/Search.svg'
import Plus from '@/assets/icons/Plus.svg'
import { computed } from 'vue'

const props = defineProps<{
  image: 'Notification' | 'Menu' | 'Back' | 'Search' | 'Plus'
  color?: string
}>()

const svgAsset = computed(() => {
  switch (props.image) {
    case 'Notification':
      return Notification
    case 'Menu':
      return Menu
    case 'Back':
      return Back
    case 'Plus':
      return Plus
    case 'Search':
      return Search
  }
})
</script>
<style scoped>
.btn span {
  width: 24px;
  height: 24px;
}

.i-16 span {
  width: 16px;
  height: 16px;
}

.icon-area {
  mask-size: 100%;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  mask-position: center;
  background-color: #000;
}
</style>
