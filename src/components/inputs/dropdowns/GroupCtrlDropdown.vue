<template>
  <Dropdown>
    <template #handle>
      <slot />
    </template>
    <template #menus>
      <li>
        <RouterLink :to="{ name: 'group_update', params: { ref: route.params.ref } }">
          <span>그룹 정보수정</span>
        </RouterLink>
      </li>
      <li>
        <span class="text-error font-bold" @click="() => emit('deleteGroup')">그룹 삭제</span>
      </li>
    </template>
  </Dropdown>
</template>
<script setup lang="ts">
import Dropdown from '@/components/inputs/Dropdown.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const emit = defineEmits(['deleteGroup'])
</script>
