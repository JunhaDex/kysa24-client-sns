<template>
  <Dropdown ref="drp">
    <template #handle>
      <slot />
    </template>
    <template #menus>
      <li :class="{'disabled': disabled}" @click="unfollowGroup" :aria-disabled="disabled">
        <span :class="{'text-error': !disabled}">팔로우 취소</span>
      </li>
    </template>
  </Dropdown>
</template>
<script setup lang="ts">
import Dropdown from '@/components/inputs/Dropdown.vue'
import { ref } from 'vue'

const props = defineProps<{
  groupRef: string
  disabled?: boolean
}>()
const emit = defineEmits(['unfollowGroup'])
const drp = ref<typeof Dropdown>()

function unfollowGroup() {
  if (!props.disabled) {
    emit('unfollowGroup', props.groupRef)
    drp.value!.close()
  }
}

</script>

