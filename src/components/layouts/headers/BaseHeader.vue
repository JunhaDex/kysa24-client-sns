<template>
  <header class="header" :class="{ 'header--scrolling-up': isScrollingUp }">
    <div class="container flex justify-between items-center py-2">
      <slot name="prefix" />
      <nav>
        <ul class="flex space-x-2">
          <li>
            <IconButton class="btn-ghost" image="Notification" />
          </li>
          <li>
            <!--<button class="btn btn-ghost" @click="openSideNav">Menu</button>-->
            <IconButton class="btn-ghost" image="Menu" @click="openSideNav" />
          </li>
        </ul>
      </nav>
      <slot name="postfix" />
    </div>
  </header>
</template>
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useSidebarStore } from '@/stores/ui/sidebar.store'
import IconButton from '@/components/inputs/IconButton.vue'

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
.container {
  margin: auto;
}

.header {
  position: absolute;
  background-color: theme('colors.white');
  border-bottom: 1px solid theme('colors.gray.300');
  top: calc(var(--header-height) * -1);
  width: 100%;
  transition: top 0.3s ease-in-out;
  z-index: 10;
}

.header--scrolling-up {
  top: 0;
}
</style>
