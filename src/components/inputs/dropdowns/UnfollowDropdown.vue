<template>
  <Dropdown ref="drp">
    <template #handle>
      <slot />
    </template>
    <template #menus>
      <li @click="unfollowGroup"><span class="text-error">팔로우 취소</span></li>
    </template>
  </Dropdown>
</template>
<script setup lang="ts">
import Dropdown from '@/components/inputs/Dropdown.vue'
import { ref } from 'vue'

const props = defineProps<{
  groupRef: string
}>()
const emit = defineEmits(['unfollowGroup'])
const drp = ref<typeof Dropdown>()

function unfollowGroup() {
  emit('unfollowGroup', props.groupRef)
  drp.value!.close()
}

</script>

