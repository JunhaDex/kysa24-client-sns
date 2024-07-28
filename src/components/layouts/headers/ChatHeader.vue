<template>
  <BaseHeader>
    <template #prefix>
      <ul class="flex space-x-2">
        <li>
          <IconButton class="btn-ghost btn-square" :prefix-icon="BackIcon" />
        </li>
        <li class="chat-title">
          <span class="text-lg font-bold">김민지</span>
        </li>
      </ul>
    </template>
  </BaseHeader>
</template>
<script lang="ts" setup>
import BaseHeader from '@/components/layouts/headers/BaseHeader.vue'
import IconButton from '@/components/inputs/IconButton.vue'
import BackIcon from '@/assets/icons/Back.svg'
</script>
<style scoped>
.chat-title {
  display: flex;
  align-items: center;
}
</style>
