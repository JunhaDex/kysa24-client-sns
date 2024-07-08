<template>
  <section class="container mb-6" :class="{ 'container-full': stretch }">
    <slot />
  </section>
</template>
<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    stretch?: boolean
  }>(),
  {
    stretch: false
  }
)
</script>
<style scoped>

.container-full {
  max-width: 100% !important;
}
</style>
