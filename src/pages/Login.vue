<template>
  <PageView headless>
    <template #main>
      <div class="container h-full flex flex-col justify-center align-middle">
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
  await authSvc.login(payload) // TODO: add fcm
  loginBox.value.releaseLogin()
}
</script>
<style scoped></style>
