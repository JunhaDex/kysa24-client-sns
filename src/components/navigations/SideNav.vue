<template>
  <nav class="side-nav" :class="{ open: isOpen }">
    <ul>
      <li class="nav-item">
        <i class="w-3 md:w-7">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M20 3 L11 22 L8 13 L2 9 Z"></path>
          </svg>
        </i>
        <router-link to="/">Home</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/about">About</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/contact">Contact</router-link>
      </li>
    </ul>
  </nav>
  <Backdrop :is-open="isOpen" />
</template>
<script setup lang="ts">
import { useSidebarStore } from '@/stores/ui/sidebar.store'
import { computed } from 'vue'
import Backdrop from '@/components/feedbacks/Backdrop.vue'

const sidebar = useSidebarStore()
const isOpen = computed(() => sidebar.isOpen)
</script>
<style scoped>
.side-nav {
  position: fixed;
  top: var(--header-height);
  right: -100%;
  width: 200px;
  height: 100vh;
  background-color: #333;
  color: #fff;
  padding: 1rem;
  transition: right 0.3s ease-in-out;
  z-index: 9;
}

.open {
  right: 0;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

@media (min-width: 768px) {
  .side-nav {
    left: 0;
    width: 100px;
  }

  .open {
    left: 0;
  }
}


</style>
