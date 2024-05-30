<template>
  <header class="header" :class="{ 'header--scrolling-up': isScrollingUp }">
    <div class="flex justify-between items-center py-4">
      <router-link to="/" class="text-2xl font-bold">Vue 3</router-link>
      <nav>
        <ul class="flex space-x-4">
          <li>
            <router-link to="/">Home</router-link>
          </li>
          <li>
            <router-link to="/about">About</router-link>
          </li>
          <li>
            <router-link to="/contact">Contact</router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

let isScrollingUp = ref(false)
let lastScrollPosition = ref(0)
const handleScroll = () => {
  const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
  console.log('current ', currentScrollPosition, 'last: ', lastScrollPosition.value)
  if (currentScrollPosition < lastScrollPosition.value) {
    isScrollingUp.value =
      // currentScrollPosition > document.querySelector<HTMLElement>('.header')!.offsetHeight
      currentScrollPosition > 0
  } else {
    isScrollingUp.value = false
  }
  lastScrollPosition.value = currentScrollPosition
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
<style scoped>
.header {
  position: relative;
  top: -100px;
  transition: top 0.3s ease-in-out;
}

.header--scrolling-up {
  top: 0;
}
</style>
