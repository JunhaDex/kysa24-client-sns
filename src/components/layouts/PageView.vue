<template>
  <slot name="header" />
  <main>
    <slot name="main" />
  </main>
  <slot name="footer" />
</template>
<script setup lang="ts"></script>
<style scoped>
/* height: calc(100vh - var(--footer-height)); */
main {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
