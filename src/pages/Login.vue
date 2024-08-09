<template>
  <PageView headless splash>
    <template #main>
      <div class="splash"></div>
      <div class="container relative mx-auto">
        <LoginBox @login="processLogin" ref="loginBox" />
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

const loginBox = ref()
const authSvc = new AuthService()

async function processLogin(payload: { id: string; pwd: string }) {
  try {
    await authSvc.login(payload) // TODO: add fcm
    window.location.href = '/'
  } catch (error) {
    console.error(error)
  }
  loginBox.value.releaseLogin()
}
</script>
<style scoped>
.container {
  padding-top: 50%;
  height: calc(100vh - var(--footer-height));
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
}

.splash {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100vh - var(--footer-height) + 16px);
  background-image: url('@/assets/images/app_splash.png');
  background-size: cover;
  background-position: center;
}
</style>
