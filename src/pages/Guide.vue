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
    </template>
  </PageView>
</template>
<script setup lang="ts">
import PageView from '@/components/layouts/PageView.vue'
import Container from '@/components/layouts/Container.vue'
import Header from '@/components/layouts/Header.vue'
import Dropdown from '@/components/inputs/Dropdown.vue'
import IconButton from '@/components/inputs/IconButtonDep.vue'
import CustomButton from '@/components/inputs/IconButton.vue'
import HMore from '@/assets/icons/HMore.svg'
import Toast from '@/components/feedbacks/Toast.vue'
import Check from '@/assets/icons/Check.svg'
import { useToastStore } from '@/stores/ui/toast.store'

const toastStore = useToastStore()

function showToast() {
  toastStore.showToast('문제발생!', 'error')
}
</script>
<style scoped></style>
