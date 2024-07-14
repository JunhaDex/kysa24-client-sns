<template>
  <slot name="header" />
  <main :class="{headless, footless, 'bg-white': white}">
    <slot name="main" />
  </main>
  <slot name="footer" />
</template>
<script setup lang="ts">
const props = withDefaults(defineProps<{
  headless?: boolean
  footless?: boolean
  white?: boolean
}>(), {
  headless: false,
  footless: false,
  white: false
})
</script>
<style scoped>
main {
  padding-top: var(--header-height);
  min-height: calc(100vh - var(--footer-height));
}

.headless {
  padding-top: 0;
}

.footless {
  height: 100vh;
}
</style>
