<template>
  <Dropdown class="dropdown-end" ref="drp">
    <template #handle>
      <slot />
    </template>
    <template #menus>
      <li v-if="isFiltered !== 0 || isReset" @click="() => handleClick('filterUser', 0)">
        <span>목록 초기화</span>
      </li>
      <li v-if="isFiltered !== 1" @click="() => handleClick('filterUser', 1)">
        <span>형제만 보기</span>
      </li>
      <li v-if="isFiltered !== 2" @click="() => handleClick('filterUser', 2)">
        <span>자매만 보기</span>
      </li>
      <li>
        <RouterLink
          :to="{ name: 'user_deny' }"
          class="text-error"
          @click="
            () => {
              drp!.close()
            }
          "
        >
          수신거부 목록
        </RouterLink>
      </li>
    </template>
  </Dropdown>
</template>
<script setup lang="ts">
import Dropdown from '@/components/inputs/Dropdown.vue'
import { ref } from 'vue'

const props = defineProps<{
  isFiltered: number
  isReset?: boolean
}>()

const emit = defineEmits(['filterUser'])
const drp = ref<typeof Dropdown>()

function handleClick(emitOpt: any, arg: any) {
  emit(emitOpt, arg)
  drp.value!.close()
}
</script>
