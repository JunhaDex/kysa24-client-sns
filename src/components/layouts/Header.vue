<template>
  <header class="header bg-amber-200" :class="{ 'header--scrolling-up': isScrollingUp }">
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
            <button class="btn btn-ghost" @click="openSideNav">Menu</button>
          </li>
        </ul>
      </nav>
      <slot />
    </div>
  </header>
</template>
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useSidebarStore } from '@/stores/ui/sidebar.store'

const H_HI = 64
const isScrollingUp = ref(true)
const sideBar = useSidebarStore()
let lastScrollPosition = 0
let isFixed = false
const handleScroll = () => {
  const currentScrollPosition = window.scrollY || document.documentElement.scrollTop
  console.log('current ', currentScrollPosition, 'last: ', lastScrollPosition)
  const headerElement = document.querySelector<HTMLElement>('.header')!
  if (currentScrollPosition === 0) {
    headerElement.style.position = 'absolute'
    isFixed = false
  } else if (currentScrollPosition < H_HI && !isFixed) {
    headerElement.style.position = 'absolute'
    isScrollingUp.value = true
  } else if (currentScrollPosition < lastScrollPosition) {
    headerElement.style.position = 'fixed'
    isFixed = true
    isScrollingUp.value = true
  } else {
    isScrollingUp.value = false
  }
  lastScrollPosition = currentScrollPosition
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})

function openSideNav() {
  sideBar.isOpen = !sideBar.isOpen
  console.log(sideBar.isOpen)
}
</script>
<style scoped>
.header {
  position: absolute;
  top: calc(var(--header-height) * -1);
  width: 100%;
  transition: top 0.3s ease-in-out;
  z-index: 10;
}

.header--scrolling-up {
  top: 0;
}
</style>
