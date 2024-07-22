<template>
  <Dropdown class="dropdown-end" ref="drp">
    <template #handle>
      <slot />
    </template>
    <template #menus>
      <li><span>형제만 보기</span></li>
      <li><span>자매만 보기</span></li>
      <li>
        <span class="text-error">메세지 수신거부</span>
      </li>
    </template>
  </Dropdown>
</template>
<script setup lang="ts">
import Dropdown from '@/components/inputs/Dropdown.vue'
</script>
