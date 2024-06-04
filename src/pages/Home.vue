<template>
  <PageView>
    <template #header>
      <Header />
    </template>
    <template #main>
      <Container>
        <div class="text-3xl font-bold underline">foo</div>
        <button class="btn btn-primary" @click="openWelcomeModal">Click me</button>
      </Container>
      <Container stretch>
        <div class="text-3xl font-bold underline">bar</div>
      </Container>
    </template>
    <template #footer>
      <Footer />
    </template>
  </PageView>
  <Modal :isShow="showWelcomeModal" title="Modal" @modal-close="closeWelcomeModal">
    <p>Modal content</p>
    <div class="flex justify-end">
      <button class="btn btn-ghost" @click="closeWelcomeModal">Close</button>
      <button class="btn btn-primary" @click="closeWelcomeModal">Save</button>
    </div>
  </Modal>
</template>
<script setup lang="ts">
import Container from '@/components/layouts/Container.vue'
import PageView from '@/components/layouts/PageView.vue'
import Header from '@/components/layouts/Header.vue'
import Footer from '@/components/layouts/Footer.vue'
import Modal from '@/components/feedbacks/Modal.vue'
import { ref } from 'vue'

const showWelcomeModal = ref(false)

function openWelcomeModal() {
  showWelcomeModal.value = true
}

function closeWelcomeModal() {
  showWelcomeModal.value = false
}
</script>
<style scoped></style>
