<template>
  <button type="button" :disabled="isDisabled">
    <span v-if="isLoading" class="loading loading-spinner"></span>
    <slot />
  </button>
</template>
<script setup lang="ts">
const props = defineProps<{
  isDisabled: boolean
  isLoading: boolean
}>()
</script>
<style scoped></style>
