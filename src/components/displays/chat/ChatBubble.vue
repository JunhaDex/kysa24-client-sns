<template>
  <div v-if="!isMine" class="chat chat-start">
    <div class="chat-image chat-profile profile-lg">
      <img src="@/assets/images/profile-image.png" alt="User Avatar" />
    </div>
    <div class="chat-bubble chat-bubble-primary" v-html="markupMsg"></div>
    <div class="chat-footer">{{ timeOnly(message.createdAt) }}</div>
  </div>
  <div v-else class="chat chat-end">
    <div class="chat-bubble" v-html="markupMsg"></div>
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
const markupMsg = computed(() => {
  return props.message.message.replace(/(\r\n|\n|\r)/g, '<br>')
})
const isMine = computed(() => props.message.sender === userStore.myInfo!.id)
</script>
<style>
.chat-profile {
  border-radius: 50%;
  overflow: hidden;
}
</style>
