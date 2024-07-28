<template>
  <div class="toast-box">
    <div class="toast-box-icon" :class="`icon-${iconColor}`">
      <span v-if="prefixIcon" class="icon prefix-icon" :style="prefixIconStyle"></span>
    </div>
    <span class="toast-message text-sm">{{ toastMsg }}</span>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  prefixIcon?: string
  iconColor?: 'success' | 'error' | 'info'
  toastMsg: string
}>(), {
  iconColor: 'info'
})
const prefixIconStyle = computed(() => ({
  maskImage: props.prefixIcon ? `url(${props.prefixIcon})` : 'none',
  WebkitMaskImage: props.prefixIcon ? `url(${props.prefixIcon})` : 'none',
  backgroundColor: 'currentColor'
}))
</script>
<style scoped>
.toast-box {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem 0.5rem 0.7rem;
  background-color: theme('colors.gray.900');
  color: theme('colors.white');
  border-radius: 999px;
}

.toast-box-icon {
  width: 16px;
  height: 16px;
  color: theme('colors.white');
  border-radius: 50%;
  overflow: hidden;
  margin-right: 0.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toast-message {
  display: inline-block;
  font-weight: bold;
  flex: 1;
}

.icon {
  width: 1.6rem;
  height: 1.6rem;
}

.icon-success {
  background-color: theme('colors.success');
}

.icon-error {
  background-color: theme('colors.error');
}

.icon-info {
  background-color: theme('colors.info');
}
</style>
