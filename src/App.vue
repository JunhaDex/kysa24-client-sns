<template>
  <Header />
  <main>
    <RouterView />
  </main>
  <Footer />
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router'
import Footer from '@/components/layouts/Footer.vue'
import Header from '@/components/layouts/Header.vue'
</script>

<style scoped>
/* height: calc(100vh - var(--footer-height)); */
main {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
