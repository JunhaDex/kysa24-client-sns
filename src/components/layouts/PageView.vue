<template>
  <slot name="header" />
  <main :class="{headless, footless}">
    <slot name="main" />
  </main>
  <slot name="footer" />
</template>
<script setup lang="ts">
const props = withDefaults(defineProps<{
  headless: boolean
  footless: boolean
}>(), {
  headless: false,
  footless: false
})
</script>
<style scoped>
main {
  padding-top: var(--header-height);
  height: calc(100vh - var(--footer-height));
}

.headless {
  padding-top: 0;
}

.footless {
  height: 100vh;
}
</style>
