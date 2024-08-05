<template>
  <BaseHeader>
    <template #prefix>
      <RouterLink to="/" class="text-lg font-gsans header-brand">
        <img src="@/assets/images/logo_mate.png" alt="logo" class="header-logo" />
        <span>mate</span>
      </RouterLink>
    </template>
  </BaseHeader>
</template>
<script setup lang="ts">
import BaseHeader from '@/components/layouts/headers/BaseHeader.vue'
</script>
<style scoped>
.header-logo {
  display: inline-block;
  width: 26px;
  height: 24px;
}

.header-brand {
  display: flex;
  align-items: center;
  gap: 0.3rem;
}
</style>
