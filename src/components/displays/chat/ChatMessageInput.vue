<template>
  <div class="input-area" :class="{ expanded: isExpanded }">
    <form class="input-wrapper mr-2" onsubmit="return false">
      <textarea
        v-model="userInput"
        class="textarea text-input"
        placeholder="메세지를 입력해주세요"
        ref="msgInput"
        rows="1"
        @focus="() => (isFocus = true)"
        @blur="() => (isFocus = false)"
      />
      <button class="send-button" @click="clickSendMessage" :disabled="userInput.length === 0">
        <span class="send-icon"></span>
      </button>
    </form>
    <div class="tooltip tooltip-top tooltip-secondary tooltip-open btn-wrap" data-tip="호감보내기">
      <button class="btn btn-white btn-square btn-size" @click="clickTicket">
        <img class="profile-lg" src="@/assets/icons/TicketHeart-BO.svg" alt="ticket" />
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { throttle } from 'lodash-es'

const emit = defineEmits(['sendMessage', 'openTicket'])
const msgInput = ref<HTMLTextAreaElement>()
const userInput = ref('')
const isFocus = ref(false)
const isExpanded = computed(() => isFocus.value && userInput.value.length > 0)

onMounted(() => {
  if (msgInput.value) {
    msgInput.value.addEventListener('input', () => {
      msgInput.value!.style.height = 'auto'
      msgInput.value!.style.height = `${msgInput.value!.scrollHeight}px`
    })
  }
  setTimeout(() => {
    const tooltip = document.querySelector('.tooltip')
    if (tooltip) {
      tooltip.classList.remove('tooltip-open')
    }
  }, 3000)
})

const sendMsgCaller = throttle(() => {
  emit('sendMessage', userInput.value)
  userInput.value = ''
}, 1000)

function clickSendMessage() {
  if (userInput.value) {
    sendMsgCaller()
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
  background-color: theme('colors.gray.50');
}

.input-wrapper {
  position: relative;
  flex-grow: 1;
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

.send-button:disabled {
  color: theme('colors.gray.600');
}

.btn-size {
  height: 2.6rem;
  min-height: 2.6rem;
  border: 1px solid theme('colors.gray.300');
}

.btn-wrap {
  display: inline-block;
}

.tooltip:before {
  left: 10%;
}

.expanded .input-wrapper {
  width: 100%;
}

.expanded .btn-wrap {
  display: none;
}
</style>
