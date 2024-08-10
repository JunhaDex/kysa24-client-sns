<template>
  <div class="container mx-auto noti-box">
    <div class="noti-input pt-1">
      <input type="checkbox" class="checkbox" />
    </div>
    <div class="noti-content">그룹에 새로운 알림이 있습니다.</div>
    <div class="noti-mark">
      <span class="blue-dot"></span>
    </div>
    <div class="noti-timestamp">
      <span class="text-xs font-bold">7월 22일 오후 8:13</span>
    </div>
  </div>
  <hr class="my-4" />
</template>
<script setup lang="ts">
import type { UserNoti } from '@/types/general.type'

const props = defineProps<{
  noti: UserNoti
}>()
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
