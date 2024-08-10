<template>
  <section class="container mx-auto" :class="{ 'container-full': stretch }">
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
  max-width: 1096px !important;
}
</style>
