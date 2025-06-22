<template>
  <div class="dp-box my-4 shadow">
    <div class="box-header" id="header-container" @click="openCoverInput">
      <img v-if="userInput.coverImage" id="cover-preview" :src="userInput.coverImage" alt="" />
      <div v-else class="box-header-text text-xs">클릭해서 커버 이미지를 등록하세요</div>
    </div>
    <div class="profile-picture" id="profile-container" @click="openProfileInput">
      <img
        v-if="userInput.profileImage"
        id="profile-preview"
        :src="userInput.profileImage"
        alt=""
      />
      <span v-else class="text-xs">
        프로필<br />
        이미지
      </span>
    </div>
    <div class="user-name">
      <h2 class="text-lg font-bold">{{ props.user.nickname }}</h2>
    </div>
    <div class="form-wrap">
      <input
        type="file"
        id="cover-input"
        class="hidden"
        accept="image/*"
        ref="coverInput"
        @change="changeCoverImg"
      />
      <input
        type="file"
        id="profile-input"
        class="hidden"
        accept="image/*"
        ref="profileInput"
        @change="changeProfileImg"
      />
      <div class="form-control">
        <div class="label">
          <label class="label-text text-xs font-bold" for="username">상태 메세지</label>
        </div>
        <textarea
          v-model="userInput.userIntroduce"
          class="textarea text-input"
          type="text"
          name="username"
          placeholder="2025 청년대회에 참석하는 나의 소감은?"
          @input="() => (diffCheck.introduce = true)"
        />
      </div>
      <ProcessButton
        class="btn btn-sm btn-primary btn-block mt-4"
        :is-disabled="!validated"
        :is-loading="isProgress"
        @click="updateMyProfile"
      >
        프로필 업데이트
      </ProcessButton>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { User } from '@/types/general.type'
import { computed, ref } from 'vue'
import ProcessButton from '@/components/inputs/ProcessButton.vue'
import { UserService } from '@/services/user.service'
import { FileService } from '@/services/file.service'
import { genRandStr } from '@/utils/index.util'

const props = defineProps<{
  user: User
}>()
const emit = defineEmits(['updateDone'])
const userService = new UserService()
const fileService = new FileService()
const userInput = ref<{
  coverImage: any
  coverFile: File | null
  profileImage: any
  profileFile: File | null
  userIntroduce: string
}>({
  coverImage: props.user.coverImg,
  coverFile: null,
  profileImage: props.user.profileImg,
  profileFile: null,
  userIntroduce: props.user.introduce
})
const diffCheck = ref({
  cover: false,
  profile: false,
  introduce: false
})
const validated = computed(() => {
  return (
    (diffCheck.value.cover || diffCheck.value.profile || diffCheck.value.introduce) &&
    isProgress.value === false
  )
})
const isProgress = ref(false)

const coverInput = ref<HTMLInputElement>()
const profileInput = ref<HTMLInputElement>()

function openCoverInput() {
  coverInput.value!.click()
}

function openProfileInput() {
  profileInput.value!.click()
}

function changeCoverImg(e: any) {
  const file = e.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      userInput.value.coverFile = file
      userInput.value.coverImage = e.target!.result
    }
    reader.readAsDataURL(file)
    diffCheck.value.cover = true
  }
}

function changeProfileImg(e: any) {
  const file = e.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      userInput.value.profileFile = file
      userInput.value.profileImage = e.target!.result
    }
    reader.readAsDataURL(file)
    diffCheck.value.profile = true
  }
}

async function updateMyProfile() {
  if (!isProgress.value) {
    isProgress.value = true
    let coverImg = props.user.coverImg
    let profileImg = props.user.profileImg
    const salt = genRandStr(7)
    if (diffCheck.value.cover) {
      const cfd = new FormData()
      cfd.append('file', userInput.value.coverFile!)
      const url = await fileService.uploadUserCover(salt, cfd)
      coverImg = url.location
    }
    if (diffCheck.value.profile) {
      const pfd = new FormData()
      pfd.append('file', userInput.value.profileFile!)
      const url = await fileService.uploadUserProfile(salt, pfd)
      profileImg = url.location
    }
    await userService.updateMyInfo(props.user.ref, {
      coverImg,
      profileImg,
      introduce: userInput.value.userIntroduce
    })
    emit('updateDone')
    // reload when done, show modal
  }
  isProgress.value = false
}
</script>
<style scoped>
.dp-box {
  position: relative;
}

.box-header {
  background-color: theme('colors.gray.600');
  border-radius: 0.5rem 0.5rem 0 0;
  aspect-ratio: 16 / 9;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.box-header img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
}

.box-header-text {
  display: flex;
  color: theme('colors.white');
  height: 100%;
  justify-content: center;
  align-items: center;
}

.profile-picture {
  width: 86px;
  height: 86px;
  border-radius: 50%;
  background-color: theme('colors.gray.600');
  color: theme('colors.white');
  border: 6px solid theme('colors.white');
  overflow: hidden;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -43px;
  left: 24px;
  cursor: pointer;
}

.profile-picture img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-name {
  margin-top: 0.7rem;
  margin-left: 118px;
}

.form-wrap {
  padding: 0.5rem 1.2rem 1.2rem 1.2rem;
}
</style>
