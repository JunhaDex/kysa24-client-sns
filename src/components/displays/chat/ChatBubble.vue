<template>
  <div v-if="!isMine" class="chat chat-start">
    <div class="chat-image chat-profile profile-lg">
      <img :src="senderProfile?.profileImg" alt="User Avatar" />
    </div>
    <template v-if="message.encoded">
      <div v-if="encodedMsg.type === 'ticket'" class="ticket-send ticket-send-start shadow">
        <div class="text-center">
          <span><b>{{ encodedMsg.from.nickname }} 님</b>이 관심을 표현했습니다.</span><br />
          <span>나도 관심을 표현해볼까요?</span><br />
          <button class="btn btn-primary mt-4" :disabled="encodedMsg.replied" @click="() => replyTicket()">관심에 답하기
          </button>
        </div>
      </div>
    </template>
    <div v-else class="chat-bubble chat-bubble-primary" v-html="markupMsg"></div>
    <div class="chat-footer">{{ timeOnly(message.createdAt) }}</div>
  </div>
  <div v-else class="chat chat-end">
    <template v-if="message.encoded">
      <div v-if="encodedMsg.type === 'ticket'" class="ticket-send ticket-send-end shadow">
        <span><b>{{ encodedMsg.to.nickname }} 님</b>에게 관심을 표현했습니다.</span><br />
        <span>좋은 소식이 있을지도?</span>
      </div>
      <div v-else-if="encodedMsg.type === 'reply'" class="ticket-send ticket-send-end shadow">
        <span><b>김은지 님</b>의 관심에 답장했습니다.</span><br />
        <span>좋은 대화가 계속 되기를 바래요 🎉</span>
      </div>
    </template>
    <div v-else class="chat-bubble" v-html="markupMsg"></div>
    <div class="chat-footer">{{ timeOnly(message.createdAt) }}</div>
  </div>
</template>
<script setup lang="ts">
import type { ChatMessage, User } from '@/types/general.type'
import { useUserStore } from '@/stores/user.store'
import { computed, ref } from 'vue'
import { timeOnly } from '@/utils/index.util'

const userStore = useUserStore()
const props = defineProps<{
  message: ChatMessage
  userList: User[]
}>()
const senderProfile = computed(() => {
  return props.userList.find((user) => user.id === props.message.sender)
})
const encodedMsg = ref(encodeMessage(props.message))
const markupMsg = computed(() => {
  return props.message.message.replace(/(\r\n|\n|\r)/g, '<br>')
})
const isMine = computed(() => props.message.sender === userStore.myInfo!.id)

function encodeMessage(message: ChatMessage): any {
  if (message.encoded) {
    return JSON.parse(message.message.replace(/^:::type__express_ticket:::/, ''))
  }
}

function replyTicket() {
  console.log('reply ticket')
}
</script>
<style>
.chat-profile {
  border-radius: 50%;
  overflow: hidden;
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
</style>
