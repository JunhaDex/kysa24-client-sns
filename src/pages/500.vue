<template>
  <PageView headless>
    <template #main>
      <Container>
        <SearchEmpty>
          <div class="text-xl mb-2 font-bold">🚨 문제가 발생했습니다.</div>
          <Box>
            <p class="text-left">
              문제가 발생한 경우, 앱 초기화를 눌러 다시 로그인하여 사용해 보세요. 문제가 지속될 경우
              관리자에게 문의하시기 바랍니다.
            </p>
          </Box>
          <div class="btn-group mt-6">
            <button class="btn btn-md btn-primary mr-2" @click="resetApp">앱 초기화</button>
            <RouterLink class="btn btn-md btn-secondary" to="/">홈으로</RouterLink>
          </div>
        </SearchEmpty>
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
import SearchEmpty from '@/components/layouts/SearchEmpty.vue'
import Box from '@/components/layouts/Box.vue'

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
