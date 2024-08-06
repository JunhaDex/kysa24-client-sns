<template>
  <slot name="header" />
  <main :class="{ headless, footless, splash, 'bg-white': white }">
    <slot name="main" />
  </main>
  <slot name="footer" />
</template>
<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    headless?: boolean
    footless?: boolean
    white?: boolean
    splash?: boolean
  }>(),
  {
    headless: false,
    footless: false,
    white: false
  }
)
</script>
<style scoped>
main {
  padding-top: var(--header-height);
  min-height: calc(100vh - var(--footer-height));
  position: relative;
}

.headless {
  padding-top: 0;
}

.footless {
  height: 100vh;
}

.splash {
  background-image: url('@/assets/images/app_splash.png');
  background-size: cover;
  background-position: center;
}
</style>
