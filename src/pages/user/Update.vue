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
        <UpdateProfile :user="userInfo!" />
        <h2>내 정보 수정</h2>
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
const isPwdModal = ref(false)
const onRender = ref(true)
const userInfo = ref<User>()
const extraInfo = ref<UserExtra>()
const route = useRoute()
onMounted(async () => {
  const userRef = route.params.ref as string
  const res = await userService.getUserByRef(userRef)
  console.log(res)
  userInfo.value = res.user
  extraInfo.value = res.extra
  onRender.value = false
})

function reloadPage() {
  isPwdModal.value = false
  authStore.setJwt('')
  window.location.href = '/login'
}
</script>
<style scoped></style>
