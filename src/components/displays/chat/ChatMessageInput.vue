<template>
  <div class="input-area">
    <form class="input-wrapper mr-2" onsubmit="return false">
      <textarea
        v-model="userInput"
        class="textarea text-input"
        placeholder="메세지를 입력해주세요"
        ref="msgInput"
        rows="1"
      />
      <button class="send-button" @click="clickSendMessage">
        <span class="send-icon"></span>
      </button>
    </form>
    <IconButton
      class="btn-white btn-square btn-size text-error"
      :prefix-icon="LikeFillIcon"
      @click="clickTicket"
    />
  </div>
</template>
<script setup lang="ts">
import IconButton from '@/components/inputs/IconButton.vue'
import LikeFillIcon from '@/assets/icons/LikeFill.svg'
import { onMounted, ref } from 'vue'
import { throttle } from 'lodash-es'

const emit = defineEmits(['sendMessage', 'openTicket'])
const msgInput = ref<HTMLTextAreaElement>()
const userInput = ref('')

onMounted(() => {
  if (msgInput.value) {
    msgInput.value.addEventListener('input', () => {
      msgInput.value!.style.height = 'auto'
      msgInput.value!.style.height = `${msgInput.value!.scrollHeight}px`
    })
  }
})

function clickSendMessage() {
  if (userInput.value) {
    const caller = throttle(() => {
      emit('sendMessage', userInput.value)
      userInput.value = ''
    }, 1000)
    caller()
  }
  // reset input
  userInput.value = ''
}

function clickTicket() {
  const caller = throttle(() => {
    emit('openTicket')
  }, 1000)
  caller()
}
</script>
<style scoped>
.input-area {
  display: flex;
  padding: 0.6rem;
  border-top: 1px solid theme('colors.gray.300');
  justify-content: center;
}

.input-wrapper {
  position: relative;
  flex: 1;
}

.text-input {
  min-height: 1em;
  resize: none;
  overflow: hidden;
  padding-right: 32px;
  border: 1px solid theme('colors.gray.300');
}

.send-icon {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  mask-image: url('@/assets/icons/Send.svg');
  -webkit-mask-image: url('@/assets/icons/Send.svg');
  background-color: currentColor;
  mask-size: contain;
  mask-repeat: no-repeat;
  mask-position: center;
}

.send-button {
  position: absolute;
  right: 0;
  bottom: -0.5rem;
  width: 32px;
  height: 32px;
  transform: translateY(-50%);
  border: none;
  cursor: pointer;
}

.btn-size {
  height: 2.6rem;
  min-height: 2.6rem;
  border: 1px solid theme('colors.gray.300');
}
</style>
