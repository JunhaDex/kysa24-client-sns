<template>
  <Dropdown class="dropdown-end" ref="drp">
    <template #handle>
      <slot />
    </template>
    <template #menus>
      <li class="text-error" @click="() => handleClick('undoDeny')">
        <span>수신거부 해제</span>
      </li>
    </template>
  </Dropdown>
</template>
<script setup lang="ts">
import Dropdown from '@/components/inputs/Dropdown.vue'
import { ref } from 'vue'

const emit = defineEmits(['undoDeny'])
const drp = ref<typeof Dropdown>()

function handleClick(emitOpt: any, arg: any) {
  emit(emitOpt, arg)
  drp.value!.close()
}
</script>
