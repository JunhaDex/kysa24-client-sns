<template>
  <PageView>
    <template #header>
      <Header />
    </template>
    <template #main>
      <Container>
        GUIDE
        <CustomButton class="btn-primary btn-square btn-sm" :prefix-icon="HMore"></CustomButton>
        <Toast toast-msg="안녕하세요" :prefix-icon="Check" icon-color="success" />
        <button class="btn" @click="showToast">Show Toast</button>
      </Container>
      <Container>
        <UpdateExtra :extra-info="{}" />
      </Container>
      <Container>
        <CreatePostBox class="mb-4" />
      </Container>
      <Container class="mb-8">
        <UserBadge>김민지</UserBadge>
      </Container>
      <Container stretch>
        <ChatMessageInput />
      </Container>
      <Container>
        <UpdatePwd v-if="userStore.myInfo" :user="userStore.myInfo" />
      </Container>
      <Container>
        <div class="text-center">
          <span>정보를 가져오는 중...</span>
          <progress class="progress progress-primary w-56"></progress>
        </div>
        <div class="text-center">
          <span>요청하신 정보를 찾을 수 없습니다.</span>
          <div class="btn-group mt-6">
            <RouterLink to="/" class="btn mr-4">새로고침</RouterLink>
            <RouterLink to="/" class="btn btn-primary">홈으로</RouterLink>
          </div>
        </div>
        <div class="text-center">
          <span class="loading loading-spinner text-primary loading-md"></span>
          <span class="text-sm">마지막 이에요!</span>
        </div>
      </Container>
    </template>
  </PageView>
  <!--<UserProfileModal :is-show="true" />-->
  <SendTicketModal step="before" />
</template>
<script setup lang="ts">
import PageView from '@/components/layouts/PageView.vue'
import Container from '@/components/layouts/Container.vue'
import Header from '@/components/layouts/Header.vue'
import CustomButton from '@/components/inputs/IconButton.vue'
import HMore from '@/assets/icons/HMore.svg'
import Toast from '@/components/feedbacks/Toast.vue'
import Check from '@/assets/icons/Check.svg'
import { useToastStore } from '@/stores/ui/toast.store'
import CreatePostBox from '@/components/displays/group/CreatePostBox.vue'
import UserBadge from '@/components/layouts/UserBadge.vue'
import ChatMessageInput from '@/components/displays/chat/ChatMessageInput.vue'
import UserProfileModal from '@/components/modals/UserProfileModal.vue'
import UpdatePwd from '@/components/displays/user/UpdatePwd.vue'
import { useUserStore } from '@/stores/user.store'
import IconButton from '@/components/inputs/IconButton.vue'
import UpdateExtra from '@/components/displays/user/UpdateExtra.vue'
import SendTicketModal from '@/components/modals/SendTicketModal.vue'

const toastStore = useToastStore()
const userStore = useUserStore()

function showToast() {
  toastStore.showToast('문제발생!', 'error')
}
</script>
<style scoped></style>
