<template>
  <PageView>
    <template #header>
      <Header />
    </template>
    <template #main>
      <Container class="mb-4">
        <Breadcrumb />
      </Container>
      <Container class="relative mb-4">
        <h2>프로필 수정</h2>
        <UpdateProfile v-if="userStore.myInfo" :user="userStore.myInfo" />
        <h2>비밀번호 수정</h2>
        <UpdatePwd />
        <h2>내 정보 수정</h2>
        <UpdateExtra />
      </Container>
      <div class="fixed-wrap">
        <IconButton class="btn-primary btn-block btn-fixed container btn-sm">정보 변경하기</IconButton>
      </div>
    </template>
    <template #footer>
      <Footer />
    </template>
  </PageView>
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
import IconButton from '@/components/inputs/IconButton.vue'
import { ref } from 'vue'

const userStore = useUserStore()
const coverImgUpdated = ref(false)
const profileImgUpdated = ref(false)
const profileUpdated = ref(false)
const pwdUpdated = ref(false)
const extraUpdated = ref(false)

const updateProfile = () => {
  if (coverImgUpdated.value) {
    console.log('coverImgUpdated')
  }
  if (profileImgUpdated.value) {
    console.log('profileImgUpdated')
  }
  if (profileUpdated.value) {
    console.log('profileUpdated')
  }
  if (pwdUpdated.value) {
    console.log('pwdUpdated')
  }
  if (extraUpdated.value) {
    console.log('extraUpdated')
  }
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
