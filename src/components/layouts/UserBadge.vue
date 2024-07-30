<template>
  <span class="badge badge-primary badge-custom text-xs">
    <i class="pre-icon mr-1"></i>
    <slot />
  </span>
</template>
<script setup lang="ts"></script>
<style scoped>
.badge-custom {
  cursor: pointer;
  text-decoration: underline;
  font-weight: bold;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.badge-custom:active {
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.6);
  transform: translateY(2px);
}

.pre-icon {
  width: 1rem;
  height: 1rem;
  mask-size: contain;
  mask-repeat: no-repeat;
  mask-position: center;
  mask-image: url('@/assets/icons/At.svg');
  -webkit-mask-image: url('@/assets/icons/At.svg');
  background-color: currentColor;
}
</style>
