<template>
  <Box>
    <div class="reply-input">
      <div class="input-top">
        <img :src="profileImg" alt="User Profile" class="profile-img" />
        <textarea
          v-model="userInput"
          placeholder="댓글을 입력해 주세요"
          class="text-input"
          rows="1"
          ref="replyInput"
        ></textarea>
      </div>
      <div class="input-bottom">
        <div class="text-xs">{{ inputCounter }}/{{ MAX_POST_INPUT_SIZE }} B</div>
        <div class="button-group">
          <button class="btn btn-sm btn-primary" @click="submitReply">등록하기</button>
        </div>
      </div>
    </div>
    <div v-if="replyList.length === 0" class="no-replies">
      <p>아직 댓글이 없습니다</p>
    </div>
    <ul v-else>
      <li v-for="reply in replyList" class="reply-item" :key="reply.id">
        <div class="profile-lg profile-rnd" @click="() => openAuthorProfile(reply.author)">
          <img :src="replyProfile(reply.author.profileImg)" alt="Profile" />
        </div>
        <div class="reply-content">
          <div class="reply-header">
            <span class="author-name">{{ reply.author.nickname }}</span>
            <span class="meta-info">{{ getTeamNameById(reply.author.teamId) }}</span>
            <span class="meta-info">{{ tts(reply.createdAt) }}</span>
          </div>
          <p class="reply-text">{{ reply.message }}</p>
        </div>
        <PostHandleDropdown
          class="dropdown-end"
          :is-author="reply.author.ref === userStore.myInfo?.ref"
          @open-profile="() => openAuthorProfile(reply.author)"
          @delete-instance="() => emit('removeReply', reply)"
        >
          <IconButton
            class="btn-ghost btn-square btn-sm"
            role="button"
            tabindex="0"
            :prefix-icon="VMoreIcon"
          />
        </PostHandleDropdown>
      </li>
    </ul>
  </Box>
</template>
<script setup lang="ts">
import Box from '@/components/layouts/Box.vue'
import { computed, onMounted, ref } from 'vue'
import type { Reply, User } from '@/types/general.type'
import { setupTeamInfo } from '@/stores/setups/team.composition'
import { tts } from '@/utils/index.util'
import { MAX_POST_INPUT_SIZE } from '@/constants/index.constant'
import IconButton from '@/components/inputs/IconButton.vue'
import VMoreIcon from '@/assets/icons/VMore.svg'
import { throttle } from 'lodash-es'
import PostHandleDropdown from '@/components/inputs/dropdowns/PostHandleDropdown.vue'
import { useUserStore } from '@/stores/user.store'
import ProfileEmpty from '@/assets/images/profile_empty.png'

const props = defineProps<{
  replyList: Reply[]
}>()
const emit = defineEmits(['submitReply', 'openProfile', 'removeReply'])
const replyInput = ref<HTMLTextAreaElement>()
const userInput = ref('')
const userStore = useUserStore()
const { getTeamNameById } = setupTeamInfo()
const inputCounter = computed<number>(() => {
  return new Blob([userInput.value]).size
})
const profileImg = computed(() =>
  userStore.myInfo?.profileImg ? userStore.myInfo.profileImg : ProfileEmpty
)
const maxInputLength = MAX_POST_INPUT_SIZE

onMounted(async () => {
  if (replyInput.value) {
    replyInput.value.addEventListener('input', () => {
      // auto resize
      replyInput.value!.style.height = 'auto'
      replyInput.value!.style.height = replyInput.value!.scrollHeight + 'px'
      // prevent overflow
      ignoreInput()
    })
  }
})

function resetInput() {
  userInput.value = ''
}

function replyProfile(img: string) {
  return img ? img : ProfileEmpty
}

const throttleSubmit = throttle(() => {
  emit('submitReply', userInput.value)
  resetInput()
}, 1000)

function submitReply() {
  if (userInput.value.length > 0) {
    throttleSubmit()
  }
}

function ignoreInput() {
  if (userInput.value.length > maxInputLength) {
    userInput.value = userInput.value.slice(0, maxInputLength)
  }
}

function openAuthorProfile(author: any) {
  emit('openProfile', author)
}
</script>
<style scoped>
.reply-input,
.reply-item {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 15px;
  border-radius: 6px;
  padding: 10px;
}

.input-top,
.reply-item {
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
  align-items: flex-start;
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
