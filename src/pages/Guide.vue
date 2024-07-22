<template>
  <PageView>
    <template #header>
      <Header />
    </template>
    <template #main>
      <Container> Guide</Container>
      <Dropdown>
        <IconButton class="btn-primary" image="Menu" role="button" tabindex="0" />
      </Dropdown>
    </template>
  </PageView>
</template>
<script setup lang="ts">
import PageView from '@/components/layouts/PageView.vue'
import Container from '@/components/layouts/Container.vue'
import Header from '@/components/layouts/Header.vue'
import Dropdown from '@/components/inputs/Dropdown.vue'
import IconButton from '@/components/inputs/IconButton.vue'
</script>
<style scoped></style>
