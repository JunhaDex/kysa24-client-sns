<template>
  <PageView>
    <template #header>
      <Header />
    </template>
    <template #main>
      <Container class="mb-4">
        <Breadcrumb :router-stack="routerStack" />
      </Container>
      <InitialLoad v-if="onRender" />
      <Container v-else class="relative mb-4">
        <h2>프로필 수정</h2>
        <UpdateProfile :user="userInfo!" @update-done="reloadMyInfo" />
        <h2>Push 알림</h2>
        <Box class="my-4">
          <IconButton
            class="btn-primary btn-sm btn-block"
            :prefix-icon="BellOn"
            :disabled="isPermission.push || !isPermission.support"
            @click="allowPush"
          >
            {{ isPermission.push ? '알림 사용중' : '알림 받기' }}
          </IconButton>
          <label v-if="!isPermission.support" class="text-xs font-bold text-error">
            Push 알림을 지원하지 않는 환경입니다.
          </label>
        </Box>
        <h2>자기소개 정보 수정</h2>
        <UpdateExtra :user="userInfo!" :extra-info="extraInfo!" />
        <h2>비밀번호 수정</h2>
        <UpdatePwd :user="userInfo!" @update-done="() => (isPwdModal = true)" />
      </Container>
    </template>
    <template #footer>
      <Footer />
    </template>
  </PageView>
  <Modal :is-show="isPwdModal" title="비밀번호 변경 완료" @modal-close="reloadPage">
    <p>
      비밀번호 변경이 완료되었습니다! <br />
      다시 로그인해 주세요.
    </p>
    <div class="flex justify-end mt-6">
      <button class="btn btn-primary btn-sm btn-block" @click="reloadPage">재로그인</button>
    </div>
  </Modal>
</template>
<script setup lang="ts">
import PageView from '@/components/layouts/PageView.vue'
import Header from '@/components/layouts/Header.vue'
import Container from '@/components/layouts/Container.vue'
import Footer from '@/components/layouts/Footer.vue'
import Breadcrumb from '@/components/navigations/Breadcrumb.vue'
import UpdateProfile from '@/components/displays/user/UpdateProfile.vue'
import { useUserStore } from '@/stores/user.store'
import UpdatePwd from '@/components/displays/user/UpdatePwd.vue'
import UpdateExtra from '@/components/displays/user/UpdateExtra.vue'
import { onMounted, ref } from 'vue'
import Modal from '@/components/modals/Modal.vue'
import { useAuthStore } from '@/stores/auth.store'
import InitialLoad from '@/components/layouts/InitialLoad.vue'
import { useRoute } from 'vue-router'
import { UserService } from '@/services/user.service'
import type { User, UserExtra } from '@/types/general.type'
import { useToastStore } from '@/stores/ui/toast.store'
import { AuthService } from '@/services/auth.service'
import Box from '@/components/layouts/Box.vue'
import IconButton from '@/components/inputs/IconButton.vue'
import BellOn from '@/assets/icons/BellOn.svg'
import { FirebaseProvider } from '@/providers/firebase.provider'

const routerStack = [
  {
    alias: '홈',
    path: {
      name: 'home'
    }
  },
  {
    alias: '프로필 수정하기',
    path: {
      name: 'group_new'
    }
  }
]

const authStore = useAuthStore()
const userService = new UserService()
const authService = new AuthService()
const userStore = useUserStore()
const toastStore = useToastStore()
const firebase = new FirebaseProvider()
const isPwdModal = ref(false)
const onRender = ref(true)
const isPermission = ref({
  push: false,
  support: true
})
const userInfo = ref<User>()
const extraInfo = ref<UserExtra>()
const route = useRoute()
onMounted(async () => {
  const userRef = route.params.ref as string
  const res = await userService.getUserByRef(userRef)
  userInfo.value = res.user
  extraInfo.value = res.extra
  onRender.value = false
  await checkPermission()
})

function reloadPage() {
  isPwdModal.value = false
  authStore.setJwt('')
  window.location.href = '/login'
}

async function reloadMyInfo() {
  toastStore.showToast('프로필 수정 완료!', 'success')
  userStore.myInfo = await authService.getMy()
}

async function checkPermission() {
  if ('Notification' in window) {
    isPermission.value.push = Notification.permission === 'granted'
  } else {
    isPermission.value = {
      push: false,
      support: false
    }
  }
}

async function allowPush() {
  if (!isPermission.value.push) {
    isPermission.value.push = true
    try {
      const fcm = await firebase.getUserToken()
      authStore.setFcm(fcm!)
      await userService.updateMyDevice(userInfo.value!.ref, {
        token: fcm!,
        device: navigator.userAgent
      })
      firebase.setupMessageListener(() => {
        toastStore.showToast('새로운 메시지가 도착했습니다.', 'msg')
      })
      toastStore.showToast('푸시 알림을 설정했습니다.', 'success')
    } catch (e) {
      isPermission.value.push = false
      console.error(e)
      toastStore.showToast('푸시 알림을 설정할 수 없습니다.', 'error')
    }
  }
}
</script>
<style scoped></style>
