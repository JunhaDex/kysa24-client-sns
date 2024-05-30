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
.container {
  max-width: 327px; /* margin 24px gutter 20px 1col */
  margin: 0 auto 2rem auto;
}

@media (min-width: 768px) {
  .container {
    max-width: 542px; /* margin 72px gutter 20px 2cols sidebar 130px */
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 1096px; /* margin 72px gutter 20px 2cols sidebar 272px */
  }
}

.container-full {
  max-width: 100% !important;
}
</style>
