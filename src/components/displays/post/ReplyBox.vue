<template>
  <Box>
    <div class="reply-input">
      <div class="input-top">
        <img src="@/assets/images/profile-image.png" alt="User Profile" class="profile-img">
        <textarea v-model="userInput" placeholder="댓글을 입력해 주세요" class="text-input" rows="1" ref="replyInput"></textarea>
      </div>
      <div class="input-bottom">
        <div class="text-xs">{{ inputCounter }}/500 B</div>
        <div class="button-group">
          <button class="btn btn-sm">삭제하기</button>
          <button class="btn btn-sm btn-primary">등록하기</button>
        </div>
      </div>
    </div>
    <ul>
      <li class="reply-item">
        <img src="@/assets/images/profile-image.png" alt="Profile" class="profile-img">
        <div class="reply-content">
          <div class="reply-header">
            <span class="author-name">팜하니</span>
            <span class="meta-info">팀명</span>
            <span class="meta-info">13초 전</span>
          </div>
          <p class="reply-text">댓글 내용이 여기에 표시됩니다.</p>
        </div>
        <IconButton class="btn-xs btn-ghost" image="vmore" />
      </li>
      <!-- More reply items can be added here -->
    </ul>
    <div class="no-replies">
      <p>아직 댓글이 없습니다</p>
    </div>
  </Box>
</template>
<script setup lang="ts">
import Box from '@/components/layouts/Box.vue'
import IconButton from '@/components/inputs/IconButton.vue'
import { computed, onMounted, ref } from 'vue'

const replyInput = ref<HTMLTextAreaElement>()
const userInput = ref('')
const inputCounter = computed<number>(() => {
  return new Blob([userInput.value]).size
})
const maxInputLength = 500

onMounted(async () => {
  if (replyInput.value) {
    replyInput.value.addEventListener('input', () => {
      replyInput.value!.style.height = 'auto'
      replyInput.value!.style.height = replyInput.value!.scrollHeight + 'px'
      ignoreInput()
    })
  }
})

function ignoreInput() {
  if (userInput.value.length > maxInputLength) {
    userInput.value = userInput.value.slice(0, maxInputLength)
  }
}
</script>
<style scoped>
.reply-input, .reply-item {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 15px;
  border-radius: 6px;
  padding: 10px;
}

.input-top, .reply-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.profile-img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.text-input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
  overflow: hidden;
  min-height: 20px;
  line-height: 20px;
  font-family: inherit;
  font-size: inherit;
}

.input-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 42px;
}

.button-group {
  display: flex;
  gap: 10px;
}

.reply-item {
  flex-direction: row;
}

.reply-content {
  flex: 1;
}

.reply-header {
  display: flex;
  align-items: center;
  font-size: 0.8em;
  color: #666;
  margin-bottom: 5px;
}

.author-name {
  font-weight: bold;
  margin-right: 5px;
}

.meta-info {
  margin-right: 5px;
}

.reply-text {
  margin: 0;
  font-size: 0.9em;
}

.no-replies {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 320px;
  margin-top: 10px;
}
</style>
