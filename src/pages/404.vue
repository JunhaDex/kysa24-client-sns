<template>
  <PageView>
    <template #header>
      <Header />
    </template>
    <template #main>
      <Container>
        <div class="text-3xl font-bold underline">404</div>
      </Container>
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
</script>
<style scoped></style>
