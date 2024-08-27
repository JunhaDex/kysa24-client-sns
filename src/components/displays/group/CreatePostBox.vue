<template>
  <Box>
    <div class="create-post">
      <div class="profile-pic profile-xl">
        <img :src="profileImg" alt="profile image" />
      </div>
      <form class="post-form" onsubmit="return false;">
        <div class="post-content">
          <div class="form-control">
            <textarea
              v-model="userInput.postText"
              class="textarea text-input"
              name="post-text"
              :placeholder="
                isWritable ? '무슨 생각을 하고 있나요?' : '팔로우하고 게시물을 공유해보세요!'
              "
              ref="postInput"
              :disabled="!isWritable"
            ></textarea>
            <div class="label">
              <transition name="slide-down">
                <label v-if="inputCounter > 0" class="label-text-alt">
                  {{ inputCounter }}/{{ MAX_POST_INPUT_SIZE }} B
                </label>
              </transition>
            </div>
          </div>
          <div v-if="userInput.postImage" class="media-preview-wrap">
            <div class="text-xs text-gray-600 font-bold ml-2 mb-2">미리보기</div>
            <div class="media-preview">
              <button class="btn-preview-close" @click="resetMediaInput">
                <span class="icon-close">
                  <span class="icon-close"></span>
                </span>
              </button>
              <img :src="userInput.postImage" alt="media preview" />
            </div>
          </div>
          <div class="post-actions mt-2">
            <input
              type="file"
              id="cover-input"
              class="hidden"
              accept="image/*"
              ref="mediaInput"
              @change="changeMediaInput"
            />
            <IconButton
              class="btn-secondary btn-square btn-md mr-2"
              @click="clickMediaInput"
              :prefix-icon="ImageIcon"
              :disabled="!isWritable || userInput.postImage"
            />
            <ProcessButton
              class="btn btn-primary btn-md"
              @click="clickSubmit"
              :is-disabled="isPosting || !isWritable"
              :is-loading="isPosting"
            >
              올리기
            </ProcessButton>
          </div>
        </div>
      </form>
    </div>
  </Box>
</template>
<script setup lang="ts">
import Box from '@/components/layouts/Box.vue'
import { computed, onMounted, ref } from 'vue'
import { MAX_POST_INPUT_SIZE } from '@/constants/index.constant'
import IconButton from '@/components/inputs/IconButton.vue'
import ImageIcon from '@/assets/icons/Image.svg'
import { throttle } from 'lodash-es'
import { useUserStore } from '@/stores/user.store'
import ProfileEmpty from '@/assets/images/profile_empty.png'
import ProcessButton from '@/components/inputs/ProcessButton.vue'
import { useToastStore } from '@/stores/ui/toast.store'

const emit = defineEmits(['submitPost'])
const props = defineProps<{
  isWritable: boolean
}>()
defineExpose({ resetUploadState })
const postInput = ref<HTMLTextAreaElement>()
const mediaInput = ref<HTMLInputElement>()
const toastStore = useToastStore()
const isPosting = ref(false)
const userInput = ref<{
  postImage: any
  postImageFile: any
  postText: string
}>({
  postImage: null,
  postImageFile: null,
  postText: ''
})

const inputCounter = computed<number>(() => {
  return new Blob([userInput.value.postText]).size
})

const userStore = useUserStore()
const profileImg = computed(() =>
  userStore.myInfo?.profileImg ? userStore.myInfo.profileImg : ProfileEmpty
)

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

function changeMediaInput(e: any) {
  const file = e.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      userInput.value.postImageFile = file
      userInput.value.postImage = e.target!.result
    }
    reader.readAsDataURL(file)
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
  mediaInput.value!.value = ''
}

function resetUploadState() {
  isPosting.value = false
}

function resetMediaInput() {
  userInput.value.postImage = null
  userInput.value.postImageFile = null
  mediaInput.value!.value = ''
}

const postSubmitCaller = throttle(() => {
  isPosting.value = true
  emit('submitPost', userInput.value)
}, 1000)

function clickSubmit() {
  if (userInput.value.postText) {
    postSubmitCaller()
  } else {
    toastStore.showToast('게시물 본문 입력은 필수입니다.', 'error')
    return
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
  overflow: hidden;
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

.text-input:disabled::placeholder {
  color: theme('colors.gray.900');
}

.post-actions {
  display: flex;
  justify-content: end;
  align-items: center;
}

.media-preview {
  position: relative;
  width: 100%;
  border-radius: 0.5rem;
  overflow: hidden;
}

.media-preview img {
  aspect-ratio: 1/1;
}

.btn-preview-close {
  width: 24px;
  height: 24px;
  background-color: theme('colors.white');
  color: theme('colors.black');
  padding: 0.1rem;
  position: absolute;
  top: 1rem;
  right: 1rem;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.1s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.icon-close {
  width: 18px;
  height: 18px;
  mask-size: contain;
  mask-repeat: no-repeat;
  mask-image: url('@/assets/icons/Close.svg');
  -webkit-mask-image: url('@/assets/icons/Close.svg');
  background-color: currentColor;
}

.btn-preview-close:hover {
  background-color: theme('colors.gray.50');
}

.btn-preview-close:active {
  transform: scale(0.95); /* Shrink effect when clicked */
}

.slide-down-enter-active {
  transition: transform 0.5s ease-out;
}

.slide-down-enter-from {
  transform: translateY(-100%);
}

.slide-down-enter-to,
.slide-down-leave-from {
  transform: translateY(0);
}

.label,
.media-preview-wrap {
  overflow: hidden;
}
</style>
