<template>
  <Modal
    :is-show="step === 'before'"
    title="호감보내기 전송"
    @modal-close="() => emit('closeTicketPrompt')"
  >
    <p>호감을 표현하면 {{ target?.nickname }} 님에게</p>
    <div class="chat-sample my-4">
      <div class="chat chat-start">
        <div class="chat-image chat-profile profile-md">
          <img v-if="myInfo?.profileImg" :src="myInfo?.profileImg" alt="User Avatar" />
        </div>
        <div class="ticket-send ticket-send-start shadow">
          <div class="text-center text-xs">
            <span>
              <b>
                {{ myInfo?.nickname }}
              </b>
              이 호감을 표현했습니다.
            </span>
            <br />
            <span>나도 호감을 표현해볼까요?</span><br />
            <button class="btn btn-primary btn-sm mt-4">호감보내기에 답하기</button>
          </div>
        </div>
      </div>
    </div>
    <p>라는 알림과 메세지가 표시됩니다. {{ target?.nickname }} 님에게 호감을 보낼까요?</p>
    <div class="mt-4">오늘 남은 호감보내기 {{ userStore.ticketCount }}개</div>
    <div class="mt-4 flex justify-end">
      <button class="btn btn-md btn-secondary mr-2" @click="() => emit('closeTicketPrompt')">
        취소
      </button>
      <ProcessButton
        :is-loading="isProgress"
        :is-disabled="isProgress"
        class="btn btn-md btn-primary"
        @click="sendTicket"
      >
        호감보내기
      </ProcessButton>
    </div>
  </Modal>
  <Modal
    :is-show="step === 'after'"
    title="호감보내기 완료!"
    @modal-close="() => emit('closeTicketPrompt')"
  >
    <p>{{ target?.nickname }}님에게 호감을 보냈습니다! 좋은 소식이 있을지도?</p>
    <div>오늘 남은 호감보내기 {{ userStore.ticketCount }}개</div>
    <div class="mt-4 flex justify-end">
      <button class="btn btn-md btn-primary" @click="() => emit('closeTicketPrompt')">확인</button>
    </div>
  </Modal>
</template>
<script setup lang="ts">
import Modal from '@/components/modals/Modal.vue'
import type { User } from '@/types/general.type'
import { useUserStore } from '@/stores/user.store'
import { storeToRefs } from 'pinia'
import { useTicketStore } from '@/stores/ui/ticket.store'
import { ChatService } from '@/services/chat.service'
import ProcessButton from '@/components/inputs/ProcessButton.vue'
import { ref } from 'vue'

const chatService = new ChatService()
const userStore = useUserStore()
const ticketStore = useTicketStore()
const isProgress = ref(false)
const { myInfo } = storeToRefs(userStore)
const emit = defineEmits(['closeTicketPrompt'])
const props = defineProps<{
  step: 'closed' | 'before' | 'after'
  target?: User
}>()

async function sendTicket() {
  if (props.target) {
    if (!isProgress.value) {
      isProgress.value = true
      await chatService.sendTicket(props.target.ref)
      const remain = await chatService.countTicketRemain()
      ticketStore.stage = 'after'
      userStore.ticketCount = remain
      isProgress.value = false
    }
  }
}
</script>
<style scoped>
.chat-sample {
  border-radius: 0.5rem;
  border: 1px solid theme('colors.gray.300');
  padding: 0.8rem;
  pointer-events: none;
}

.chat-sample * {
  pointer-events: none;
}

.chat-profile {
  border-radius: 50%;
  overflow: hidden;
}

.ticket-send {
  position: relative;
  display: block;
  width: 100%;
  padding: 0.5rem 1rem 0.5rem 1rem;
  border: 2px solid theme('colors.gray.300');
  background-color: theme('colors.white');
}

.ticket-send-start {
  border-radius: 1rem 1rem 1rem 0;
}
</style>
