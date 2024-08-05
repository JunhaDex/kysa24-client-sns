<template>
  <PageView>
    <template #header>
      <Header />
    </template>
    <template #main>
      <Container class="mb-4">
        <Breadcrumb />
      </Container>
      <Container v-if="userStore.myInfo" class="relative mb-4">
        <h2>프로필 수정</h2>
        <UpdateProfile :user="userStore.myInfo" />
        <h2>내 정보 수정</h2>
        <UpdateExtra />
        <h2>비밀번호 수정</h2>
        <UpdatePwd :user="userStore.myInfo" @update-done="() => isPwdModal = true" />
      </Container>
    </template>
    <template #footer>
      <Footer />
    </template>
  </PageView>
  <Modal :is-show="isPwdModal" title="비밀번호 변경 완료" @modal-close="reloadPage">
    <p>비밀번호 변경이 완료되었습니다! <br /> 다시 로그인해 주세요.</p>
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
import { ref } from 'vue'
import Modal from '@/components/modals/Modal.vue'
import { useAuthStore } from '@/stores/auth.store'

const userStore = useUserStore()
const authStore = useAuthStore()
const isPwdModal = ref(false)

function reloadPage() {
  isPwdModal.value = false
  authStore.setJwt('')
  window.location.href = '/login'
}
</script>
<style scoped>
.fixed-wrap {
  position: fixed;
  display: flex;
  justify-content: center;
  bottom: 1rem;
  width: 100%;
  z-index: 5;
}
</style>
