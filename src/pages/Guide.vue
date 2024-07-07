<template>
  <PageView>
    <template #header>
      <Header />
    </template>
    <template #main>
      <Container> Guide </Container>
    </template>
  </PageView>
</template>
<script setup lang="ts">
import PageView from '@/components/layouts/PageView.vue'
import Container from '@/components/layouts/Container.vue'
import Header from '@/components/layouts/Header.vue'
</script>
<style scoped></style>
