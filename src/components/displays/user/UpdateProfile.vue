<template>
  <div class="dp-box my-4">
    <div class="box-header" id="header-container" @click="openCoverInput">
      <img
        v-if="userInput.coverImage"
        id="cover-preview"
        :src="userInput.coverImage"
        alt=""
      />
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
          <label class="label-text" for="username">상태 메세지</label>
        </div>
        <textarea
          v-model="userInput.userIntroduce"
          class="textarea text-input"
          type="text"
          name="username"
          placeholder="2024 청년대회에 참석하는 나의 소감은?"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { User } from '@/types/general.type'
import { ref } from 'vue'

const props = defineProps<{
  user: User
}>()
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
  }
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

.form-wrap {
  padding: calc(22px + 1rem) 1.2rem 1.2rem 1.2rem;
}
</style>
