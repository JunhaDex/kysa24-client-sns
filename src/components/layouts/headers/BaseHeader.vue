<template>
  <header class="header" :class="{ 'header--scrolling-up': isScrollingUp }">
    <div class="container flex justify-between items-center py-2">
      <slot name="prefix" />
      <nav>
        <ul class="flex space-x-2">
          <li>
            <RouterLink to="/alert">
              <IconButton class="btn-ghost" :prefix-icon="NotiIcon" />
            </RouterLink>
          </li>
          <li>
            <IconButton
              v-if="sideBar.isOpen"
              class="btn-ghost btn-square"
              :prefix-icon="ArrowRightIcon"
              @click="openSideNav"
            />
            <IconButton
              v-else
              class="btn-ghost btn-square"
              :prefix-icon="MenuIcon"
              @click="openSideNav"
            />
          </li>
        </ul>
      </nav>
      <slot name="postfix" />
    </div>
  </header>
  <div class="top-fixed toast-area" :class="{ 'toast-area--show': toastStore.isShow }">
    <Toast
      v-if="toastStore.msgLevel === 'success'"
      :toast-msg="toastStore.message"
      :prefix-icon="Check"
      icon-color="success"
    />
    <Toast
      v-else-if="toastStore.msgLevel === 'error'"
      :toast-msg="toastStore.message"
      :prefix-icon="Close"
      icon-color="error"
    />
    <Toast
      v-else-if="toastStore.msgLevel === 'up'"
      :toast-msg="toastStore.message"
      :prefix-icon="Upload"
      icon-color="success"
    />
    <Toast
      v-else-if="toastStore.msgLevel === 'msg'"
      :toast-msg="toastStore.message"
      :prefix-icon="Chat"
      icon-color="accent"
    />
    <Toast v-else :toast-msg="toastStore.message" :prefix-icon="Info" icon-color="none" />
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { useSidebarStore } from '@/stores/ui/sidebar.store'

import { useToastStore } from '@/stores/ui/toast.store'
import Toast from '@/components/feedbacks/Toast.vue'
import Check from '@/assets/icons/Check.svg'
import Close from '@/assets/icons/Close.svg'
import Chat from '@/assets/icons/Chat.svg'
import Info from '@/assets/icons/InfoCircle.svg'
import Upload from '@/assets/icons/Upload.svg'
import IconButton from '@/components/inputs/IconButton.vue'
import NotiIcon from '@/assets/icons/Notification.svg'
import MenuIcon from '@/assets/icons/Menu.svg'
import ArrowRightIcon from '@/assets/icons/ArrowRight.svg'
import { useUserStore } from '@/stores/user.store'

const H_HI = 66 - 4 // 4px is the border width
const isScrollingUp = ref(true)
const sideBar = useSidebarStore()
let lastScrollPosition = 0
let isFixed = false
const userStore = useUserStore()
const toastStore = useToastStore()
watch(
  () => toastStore.msgLevel,
  () => {
    userStore.updateNumbers()
  }
)
const handleScroll = () => {
  const currentScrollPosition = window.scrollY || document.documentElement.scrollTop
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
  const headerElement = document.querySelector<HTMLElement>('.header')!
  sideBar.isOpen = !sideBar.isOpen
  if (sideBar.isOpen) {
    headerElement.style.position = 'fixed'
    isFixed = true
    isScrollingUp.value = true
  } else {
    headerElement.style.position = 'absolute'
    isFixed = false
  }
}
</script>
<style scoped>
.container {
  margin: auto;
}

.top-fixed {
  position: fixed;
  top: calc(var(--header-height) * -1);
  width: 100%;
}

.header {
  position: absolute;
  top: calc(var(--header-height) * -1);
  width: 100%;
  background-color: theme('colors.white');
  border-bottom: 1px solid theme('colors.gray.300');
  transition: top 0.3s ease-in-out;
  z-index: 10;
}

.toast-area {
  display: flex;
  justify-content: center;
  align-items: center;
  transition:
    top 0.3s ease-in-out 0s,
    top 0.2s ease-in-out 0s;
  z-index: 9;
}

.header--scrolling-up {
  top: 0;
}

.toast-area--show {
  top: calc(var(--header-height) + 0.7rem);
}
</style>
