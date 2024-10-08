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
    <form class="form-wrap">
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
          <label class="label-text" for="username">그룹 이름</label>
        </div>
        <input
          v-model="userInput.groupName"
          class="input input-bordered text-sm w-full"
          type="text"
          name="group-name"
          placeholder="그룹 이름을 입력해주세요."
          :disabled="!!group"
        />
      </div>
      <div class="form-control mb-4">
        <div class="label">
          <label class="label-text" for="username">그룹 공지</label>
        </div>
        <textarea
          v-model="userInput.groupNotice"
          class="textarea text-input"
          type="text"
          name="group-notice"
          placeholder="그룹공지 첫번째는 그룹에 대한 간단한 소개를 적어주세요."
        />
      </div>
      <div class="checkbox-group mb-4">
        <input
          v-model="userInput.isAgree"
          class="checkbox checkbox-sm mr-2"
          type="checkbox"
          id="terms"
        />
        <label class="text-sm" for="terms">표준을 준수하고
          <a class="underline"
             href="https://abundant-laser-136.notion.site/mate-0e1176e6004d42618eea77f8d656bf08"
             target="_blank">이용약관</a>
          에 동의합니다.</label>
      </div>
      <ProcessButton
        class="btn btn-sm btn-primary btn-block"
        :is-disabled="!validateSubmit"
        :is-loading="isProgress"
        @click="submitCreateGroup"
      >
        {{ submitText }}
      </ProcessButton>
    </form>
  </div>
</template>
<script setup lang="ts">
import ProcessButton from '@/components/inputs/ProcessButton.vue'
import { computed, onMounted, ref } from 'vue'
import type { Group } from '@/types/general.type'
import { genRandStr } from '@/utils/index.util'
import { FileService } from '@/services/file.service'
import { useToastStore } from '@/stores/ui/toast.store'

const props = defineProps<{
  group?: Group
}>()
const emit = defineEmits(['submitGroupForm'])
defineExpose({ resetInput })

const fileService = new FileService()
const toastStore = useToastStore()
const coverInput = ref<HTMLInputElement>()
const profileInput = ref<HTMLInputElement>()
const userInput = ref<{
  coverImage: any
  profileImage: any
  coverFile: any
  profileFile: any
  groupName: string
  groupNotice: string
  isAgree: boolean
}>({
  coverImage: null,
  profileImage: null,
  coverFile: null,
  profileFile: null,
  groupName: '',
  groupNotice: '',
  isAgree: false
})
const isProgress = ref(false)
const validateSubmit = computed(() => {
  return (
    userInput.value.groupName &&
    userInput.value.groupNotice &&
    userInput.value.isAgree &&
    !isProgress.value
  )
})
const submitText = computed(() => (props.group ? '그룹 수정' : '그룹 만들기'))

onMounted(() => {
  if (props.group) {
    userInput.value.coverImage = props.group.coverImg
    userInput.value.profileImage = props.group.profileImg
    userInput.value.groupName = props.group.groupName
    userInput.value.groupNotice = props.group.introduce
  }
})

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

function resetInput() {
  isProgress.value = false
  if (props.group) {
    userInput.value.isAgree = false
  } else {
    userInput.value = {
      coverImage: null,
      profileImage: null,
      coverFile: null,
      profileFile: null,
      groupName: '',
      groupNotice: '',
      isAgree: false
    }
  }
}

async function submitCreateGroup() {
  if (validateSubmit.value && isProgress.value === false) {
    isProgress.value = true
    let urls: any = {}
    const salt = genRandStr(7)
    try {
      // upload images
      if (userInput.value.coverFile) {
        const cfd = new FormData()
        cfd.append('file', userInput.value.coverFile)
        urls.coverUrl = await fileService.uploadGroupCover(salt, cfd)
      }
      if (userInput.value.profileFile) {
        const pfd = new FormData()
        pfd.append('file', userInput.value.profileFile)
        urls.profileUrl = await fileService.uploadGroupProfile(salt, pfd)
      }
      // create group payload
      const payload = {
        groupName: userInput.value.groupName,
        introduce: userInput.value.groupNotice,
        profileImg: urls.profileUrl?.location,
        coverImg: urls.coverUrl?.location
      }
      emit('submitGroupForm', payload)
    } catch (e) {
      console.error(e)
      toastStore.showToast('이미지 업로드 실패', 'error')
    } finally {
      isProgress.value = false
    }
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
  padding: calc(22px + 1rem) 1.6rem 1.6rem 1.6rem;
}

.checkbox-group {
  display: flex;
  align-items: center;
}
</style>
