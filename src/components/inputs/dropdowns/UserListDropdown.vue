<template>
  <Dropdown class="dropdown-end" ref="drp">
    <template #handle>
      <slot />
    </template>
    <template #menus>
      <li v-if="isFiltered !== 0" @click="() => handleClick('filterUser', 0)">
        <span>전체 보기</span>
      </li>
      <li v-if="isFiltered !== 1" @click="() => handleClick('filterUser', 1)">
        <span>형제만 보기</span>
      </li>
      <li v-if="isFiltered !== 2" @click="() => handleClick('filterUser', 2)">
        <span>자매만 보기</span>
      </li>
      <li>
        <span class="text-error">수신거부 목록</span>
      </li>
    </template>
  </Dropdown>
</template>
<script setup lang="ts">
import Dropdown from '@/components/inputs/Dropdown.vue'
import { ref } from 'vue'

const props = defineProps<{
  isFiltered: number
}>()

const emit = defineEmits(['filterUser'])
const drp = ref<typeof Dropdown>()

function handleClick(emitOpt: any, arg: any) {
  emit(emitOpt, arg)
  drp.value!.close()
}
</script>
