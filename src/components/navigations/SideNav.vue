<template>
  <nav class="side-nav" :class="{ open: isOpen }">
    <ul>
      <li class="nav-item">
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
  width: 230px;
  height: 100vh;
  background-color: theme('colors.white');
  border-left: 1px solid theme('colors.gray.300');
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
    border-left: none;
  }

  .open {
    left: 0;
  }
}
</style>
