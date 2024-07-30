<template>
  <Box>
    <div class="create-post">
      <div class="profile-pic profile-xl"></div>
      <form class="post-form">
        <div class="post-content">
          <textarea
            v-model="userInput.postText"
            class="textarea text-input"
            name="post-text"
            placeholder="무슨 생각을 하고 있나요?"
            ref="postInput"
          ></textarea>
          <!--TODO: Image Preview-->
          <div class="post-actions mt-2">
            <input type="file" id="cover-input" class="hidden" accept="image/*" ref="mediaInput" />
            <IconButton
              class="btn-square btn-sm mr-4"
              @click="clickMediaInput"
              :prefix-icon="ImageIcon"
            />
            <IconButton class="btn-primary btn-sm" @click="clickSubmit">포스트 올리기</IconButton>
          </div>
        </div>
      </form>
    </div>
  </Box>
</template>
<script setup lang="ts">
import Box from '@/components/layouts/Box.vue'
import { onMounted, ref } from 'vue'
import { MAX_POST_INPUT_SIZE } from '@/constants/index.constant'
import IconButton from '@/components/inputs/IconButton.vue'
import ImageIcon from '@/assets/icons/Image.svg'
import { throttle } from 'lodash-es'

const emit = defineEmits(['submitPost'])
const postInput = ref<HTMLTextAreaElement>()
const mediaInput = ref<HTMLInputElement>()
const userInput = ref<{
  postImage: any
  postImageFile: any
  postText: string
}>({
  postImage: null,
  postImageFile: null,
  postText: ''
})

onMounted(async () => {
  if (postInput.value) {
    postInput.value.addEventListener('input', () => {
      // Auto resize
      postInput.value!.style.height = 'auto'
      postInput.value!.style.height = postInput.value!.scrollHeight + 'px'
      // Prevent overflow
      ignoreInput()
    })
  }
})

function clickMediaInput() {
  if (mediaInput.value) {
    mediaInput.value.click()
  }
}

function ignoreInput() {
  if (userInput.value.postText.length > MAX_POST_INPUT_SIZE) {
    userInput.value.postText = userInput.value.postText.slice(0, MAX_POST_INPUT_SIZE)
  }
}

function resetInput() {
  userInput.value = {
    postImage: null,
    postImageFile: null,
    postText: ''
  }
}

function clickSubmit() {
  if (userInput.value.postText) {
    const caller = throttle(() => {
      emit('submitPost', userInput.value)
    }, 1000)
    caller()
  }
  resetInput()
}
</script>
<style>
.create-post {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.profile-pic {
  border-radius: 50%;
  background-color: #ddd;
  flex-shrink: 0;
}

.post-form {
  flex-grow: 1;
}

.post-content {
  width: 100%;
}

.text-input {
  width: 100%;
  padding: 0.6rem;
  border: 1px solid #ccc;
  resize: none;
  overflow: hidden;
  min-height: 20px;
  line-height: 20px;
}

.post-actions {
  display: flex;
  justify-content: end;
  align-items: center;
}
</style>
