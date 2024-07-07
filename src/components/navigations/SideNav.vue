<template>
  <nav class="side-nav" :class="{ open: isOpen }">
    <!--if not logged in-->
    <!--      <div class="nav-profile mx-4 py-4">-->
    <!--        <a class="btn btn-sm btn-primary btn-block" href="/login" target="_blank">로그인</a>-->
    <!--      </div>-->
    <!--if logged in-->
    <div class="nav-profile">
      <img class="mr-2" src="" alt="profile image" />
      <div class="flex-1">
        <h4>백예린 님</h4>
        <div class="flex justify-between w-full">
          <span class="inline-block">6개 남음</span>
          <a class="btn btn-primary btn-xs">내 프로필</a>
        </div>
      </div>
    </div>
    <ul>
      <li class="nav-item">
        <router-link class="btn btn-ghost btn-xl btn-block" to="/">Home</router-link>
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
  padding: 1rem;
  transition: right 0.3s ease-in-out;
  z-index: 9;
}

.nav-profile {
  display: flex;
  margin-bottom: 1rem;
}

.nav-profile > img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.open {
  right: 0;
}

.nav-item {
  display: flex;
  align-items: center;
}

.nav-item > a {
  justify-content: start;
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
