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
import { useRouter } from 'vue-router'
import { AuthService } from '@/services/auth.service'

const loginBox = ref()
const authSvc = new AuthService()
const router = useRouter()

async function processLogin(payload: { id: string; pwd: string }) {
  try {
    await authSvc.login(payload) // TODO: add fcm
    router.push({ name: 'home' })
  } catch (error) {
    console.error(error)
  }
  loginBox.value.releaseLogin()
}
</script>
<style scoped></style>
