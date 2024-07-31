<template>
  <div v-if="!isMine" class="chat chat-start">
    <div class="chat-image avatar">
      <img src="@/assets/images/profile-image.png" alt="User Avatar" class="user-avatar" />
    </div>
    <div class="chat-bubble">
      {{ message.message }}
    </div>
    <div class="chat-footer">{{ timeOnly(message.createdAt) }}</div>
  </div>
  <div v-else class="chat chat-end">
    <div class="chat-bubble">{{ message.message }}</div>
    <div class="chat-footer">{{ timeOnly(message.createdAt) }}</div>
  </div>
</template>
<script setup lang="ts">
import type { ChatMessage } from '@/types/general.type'
import { useUserStore } from '@/stores/user.store'
import { computed } from 'vue'
import { timeOnly } from '@/utils/index.util'

const userStore = useUserStore()
const props = defineProps<{
  message: ChatMessage
}>()
const isMine = computed(() => props.message.sender === userStore.myInfo!.id)
</script>
<style>
.user-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
}
</style>
