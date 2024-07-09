<template>
  <div class="dp-box rounded shadow">
    <slot />
  </div>
</template>
<script setup lang="ts"></script>
<style scoped>
.dp-box {
  background-color: theme('colors.white');
  padding: 1.5rem;
  width: 100%;
  max-width: 400px;
}
</style>
