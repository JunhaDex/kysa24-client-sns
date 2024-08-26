<template>
  <PageView headless>
    <template #main>
      <Container>
        <div class="text-3xl font-bold underline">서버에러</div>
        <button class="btn btn-primary" @click="resetApp">앱 초기화</button>
        <RouterLink class="btn btn-secondary" to="/">홈으로</RouterLink>
      </Container>
    </template>
    <template #footer>
      <Footer />
    </template>
  </PageView>
</template>
<script setup lang="ts">
import PageView from '@/components/layouts/PageView.vue'
import Container from '@/components/layouts/Container.vue'
import Footer from '@/components/layouts/Footer.vue'
import { useAuthStore } from '@/stores/auth.store'
import { onMounted } from 'vue'

const authStore = useAuthStore()

onMounted(() => {
  authStore.circuitBreak = false
})

function resetApp() {
  authStore.setJwt('')
  localStorage.clear()
  window.location.href = '/login'
}
</script>
<style scoped></style>
