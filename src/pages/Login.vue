<template>
  <div class="login-toast-area" :class="{ 'toast-area--show': toastStore.isShow }">
    <Toast :toast-msg="toastStore.message" :prefix-icon="Close" icon-color="error" />
  </div>
  <PageView headless splash>
    <template #main>
      <div class="splash"></div>
      <div class="container relative mx-auto">
        <LoginBox class="login-box" @login="processLogin" ref="loginBox" />
      </div>
    </template>
    <template #footer>
      <Footer />
    </template>
  </PageView>
</template>
<script setup lang="ts">
import PageView from '@/components/layouts/PageView.vue'
import Footer from '@/components/layouts/Footer.vue'
import LoginBox from '@/components/displays/LoginBox.vue'
import { ref } from 'vue'
import { AuthService } from '@/services/auth.service'
import { useToastStore } from '@/stores/ui/toast.store'
import Close from '@/assets/icons/Close.svg'
import Toast from '@/components/feedbacks/Toast.vue'
import { useAuthStore } from '@/stores/auth.store'

const loginBox = ref()
const authSvc = new AuthService()
const authStore = useAuthStore()
const toastStore = useToastStore()

async function processLogin(payload: { id: string; pwd: string }) {
  const fcm = authStore.fcm?.length ? {
    token: authStore.fcm,
    device: navigator.userAgent
  } : undefined
  try {
    await authSvc.login({ ...payload, fcm })
    window.location.href = '/'
  } catch (error) {
    console.error(error)
    toastStore.showToast('아이디 / 비밀번호가 올바르지 않습니다.', 'error')
  }
  loginBox.value.releaseLogin()
}
</script>
<style scoped>
.login-toast-area {
  position: fixed;
  top: -36px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: top 0.3s ease-in-out 0s,
  top 0.2s ease-in-out 0s;
  z-index: 9;
}

.toast-area--show {
  top: 1.2rem;
}

.container {
  height: calc(100vh - var(--footer-height));
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.splash {
  max-width: 686px;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: calc(100vh - var(--footer-height) + 16px);
  background-image: url('@/assets/images/app_splash_25.jpg');
  background-size: cover;
  background-position: center;
}

</style>
