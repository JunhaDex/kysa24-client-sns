<template>
  <button type="button" :disabled="isDisabled">
    <span v-if="isDisabled" class="loading loading-spinner"></span>
    <slot />
  </button>
</template>
<script setup lang="ts">
const props = defineProps<{
  isDisabled: boolean
}>()
</script>
<style scoped></style>
