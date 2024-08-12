<template>
  <div class="container mx-auto noti-box">
    <div class="noti-input pt-1">
      <input
        v-model="checkValue"
        type="checkbox"
        class="checkbox"
        @change="() => emit('checkItem', checkValue)"
      />
    </div>
    <div class="noti-content">{{ noti.message }}</div>
    <div class="noti-mark">
      <span v-if="!noti.readAt" class="blue-dot"></span>
    </div>
    <div class="noti-timestamp">
      <span class="text-xs font-bold">{{ tts(noti.createdAt) }}</span>
    </div>
  </div>
  <hr class="my-4" />
</template>
<script setup lang="ts">
import type { UserNoti } from '@/types/general.type'
import { tts } from '@/utils/index.util'
import { ref } from 'vue'

const emit = defineEmits(['checkItem'])
const props = defineProps<{
  noti: UserNoti
}>()
const checkValue = ref(false)
</script>
<style scoped>
.noti-box {
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    'input content mark'
    'input timestamp timestamp';
  gap: 8px;
  align-items: start;
}

.blue-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #3b82f6;
}

.noti-input {
  grid-area: input;
}

.noti-content {
  grid-area: content;
}

.noti-mark {
  grid-area: mark;
}

.noti-timestamp {
  grid-area: timestamp;
}
</style>
