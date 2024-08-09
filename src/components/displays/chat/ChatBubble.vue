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
  <div class="chat chat-end">
    <div class="ticket-send ticket-send-end shadow">
      <span><b>가나다 님</b>에게 관심을 표현했습니다.</span><br />
      <span>좋은 소식이 있을지도?</span>
    </div>
    <div class="chat-footer">{{ timeOnly(message.createdAt) }}</div>
  </div>
  <div class="chat chat-start">
    <div class="ticket-send ticket-send-start shadow">
      <span><b>가나다 님</b>이 관심에 답장했습니다!</span><br />
      <span>좋은 대화가 계속 되기를 바래요 🎉</span>
    </div>
    <div class="chat-footer">{{ timeOnly(message.createdAt) }}</div>
  </div>
  <div class="chat chat-start">
    <div class="ticket-send ticket-send-start shadow">
      <div class="text-center">
        <span><b>김은지 님</b>이 관심을 표현했습니다.</span><br />
        <span>나도 관심을 표현해볼까요?</span><br />
        <button class="btn btn-primary mt-4">관심에 답하기</button>
      </div>
    </div>
    <div class="chat-footer">{{ timeOnly(message.createdAt) }}</div>
  </div>
  <div class="chat chat-end">
    <div class="ticket-send ticket-send-end shadow">
      <span><b>김은지 님</b>의 관심에 답장했습니다.</span><br />
      <span>좋은 대화가 계속 되기를 바래요 🎉</span>
    </div>
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

.chat-start .chat-footer {
  grid-column-start: 1;
}

.ticket-send {
  position: relative;
  display: block;
  width: 100%;
  padding: 1rem 1.5rem 1rem 1.5rem;
  border: 2px solid theme('colors.gray.300');
  background-color: theme('colors.white');
}

.ticket-send-start {
  border-radius: 1rem 1rem 1rem 0;
}

.ticket-send-end {
  max-width: 75%;
  border-radius: 1rem 1rem 0 1rem;
}

.ticket-reply {
}
</style>
