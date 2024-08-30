<template>
  <div
    class="carousel-wrap"
    @pointerdown="touchStart"
    @pointermove="touchMove"
    @pointerup="touchEnd"
    @touchstart="touchStart"
    @touchmove="touchMove"
    @touchend="touchEnd"
    @click="showController"
  >
    <div
      class="post-carousel"
      :style="{ transform: `translateX(calc(-${current * 100}% - ${current * 16}px))` }"
    >
      <slot />
    </div>
    <div v-if="itemCount > 1" class="carousel-control" :class="{ visible: isController }">
      <IconButton class="btn-sm btn-square" :prefix-icon="Back" @click="slidePrev" />
      <IconButton class="btn-sm btn-square" :prefix-icon="Forward" @click="slideNext" />
    </div>
  </div>
  <div v-if="itemCount > 1" class="carousel-dots mb-2">
    <span
      v-for="index in itemCount"
      class="c-dot"
      :class="{ 'is-now': index - 1 === current }"
      :key="`cd-${index}`"
    ></span>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import IconButton from '@/components/inputs/IconButton.vue'
import Back from '@/assets/icons/Back.svg'
import Forward from '@/assets/icons/Forward.svg'

const props = defineProps<{
  itemCount: number
}>()
const current = ref(0)
const isController = ref(false)
const touchStartX = ref(0)
const touchEndX = ref(0)

let controllerTimer: any

function showController() {
  isController.value = true
  if (controllerTimer) {
    clearTimeout(controllerTimer)
  }
  controllerTimer = setTimeout(() => {
    isController.value = false
  }, 3000)
}

function slideNext() {
  current.value = (current.value + 1) % props.itemCount
}

function slidePrev() {
  current.value = (current.value - 1 + props.itemCount) % props.itemCount
}

function touchStart(e: any) {
  if (e instanceof TouchEvent) {
    touchStartX.value = e.touches[0].clientX
  } else {
    touchStartX.value = e.clientX
  }
}

function touchMove(e: any) {
  if (e instanceof TouchEvent) {
    touchEndX.value = e.touches[0].clientX
  } else {
    touchEndX.value = e.clientX
  }
}

function touchEnd() {
  if (touchStartX.value - touchEndX.value > 50) {
    slideNext()
  } else if (touchStartX.value - touchEndX.value < -50) {
    slidePrev()
  }
}
</script>
<style scoped>
.carousel-wrap {
  position: relative;
  overflow: hidden;
}

.post-carousel {
  display: flex;
  transition: transform 0.3s ease;
}

.carousel-control {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.carousel-control.visible {
  opacity: 1;
}

.carousel-dots {
  display: flex;
  justify-content: center;
  align-items: center;
}

.c-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #ccc;
  margin: 0 5px;
  cursor: pointer;
}

.c-dot.is-now {
  background-color: #000;
}
</style>
