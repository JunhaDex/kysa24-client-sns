<template>
  <Modal :is-show="step === 'before'" title="호감 표현하기">
    <p>호감을 표현하면 000 님에게</p>
    <div>
      message
    </div>
    <p>라는 알림과 메세지가 표시됩니다. 000 님에게 호감 표현을 보낼까요?</p>
    <div>
      오늘 남은 호감 표현 6개
    </div>
    <div>
      <button class="btn btn-sm btn-primary">호감 표현하기</button>
      <button class="btn btn-sm btn-secondary">취소</button>
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
  title: string
}>()
</script>
