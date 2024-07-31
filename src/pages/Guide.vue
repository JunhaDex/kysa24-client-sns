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
        <CreatePostBox class="mb-4" />
      </Container>
      <Container class="mb-8">
        <UserBadge>김민지</UserBadge>
      </Container>
      <Container stretch>
        <ChatMessageInput />
      </Container>
    </template>
  </PageView>
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

const toastStore = useToastStore()

function showToast() {
  toastStore.showToast('문제발생!', 'error')
}
</script>
<style scoped></style>
