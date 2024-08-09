<template>
  <Modal :is-show="step === 'before'" title="호감 표현하기">
    <p>호감을 표현하면 000 님에게</p>
    <div class="chat-sample my-4">
      <div class="chat chat-start">
        <div class="chat-image chat-profile profile-md">
          <img src="@/assets/images/profile-image.png" alt="User Avatar" />
        </div>
        <div class="ticket-send ticket-send-start shadow">
          <div class="text-center text-xs">
            <span><b>김은지 님</b>이 관심을 표현했습니다.</span><br />
            <span>나도 관심을 표현해볼까요?</span><br />
            <button class="btn btn-primary btn-sm mt-4">관심에 답하기</button>
          </div>
        </div>
      </div>
    </div>
    <p>라는 알림과 메세지가 표시됩니다. 000 님에게 호감 표현을 보낼까요?</p>
    <div class="mt-4">
      오늘 남은 호감 표현 6개
    </div>
    <div class="mt-4 flex justify-end">
      <button class="btn btn-sm btn-secondary mr-2">취소</button>
      <button class="btn btn-sm btn-primary">호감 표현하기</button>
    </div>
  </Modal>
  <Modal :is-show="step === 'after'" title="호감 표현하기 완료!">
    <p>000님에게 호감 표현을 보냈습니다! 좋은 소식이 있을지도?</p>
    <div>
      오늘 남은 호감 표현 6개
    </div>
    <div>
      <button class="btn btn-sm btn-primary">확인</button>
    </div>
  </Modal>
</template>
<script setup lang="ts">
import Modal from '@/components/modals/Modal.vue'

const props = defineProps<{
  step: 'closed' | 'before' | 'after'
}>()
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
