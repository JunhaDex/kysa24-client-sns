<template>
  <slot name="header" />
  <main :class="{ headless, footless, 'bg-beige': beige }">
    <slot name="main" />
  </main>
  <slot name="footer" />
</template>
<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    headless?: boolean
    footless?: boolean
    beige?: boolean
  }>(),
  {
    headless: false,
    footless: false,
    beige: false
  }
)
</script>
<style scoped>
main {
  padding-top: var(--header-height);
  min-height: calc(100vh - var(--footer-height));
  position: relative;
  background-color: theme('colors.gray.50');
}

.headless {
  padding-top: 0;
}

.footless {
  height: 100vh;
}

.bg-beige {
  background-color: theme('colors.beige');
}
</style>
