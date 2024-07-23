<template>
  <PageView>
    <template #header>
      <Header />
    </template>
    <template #main>
      <Container>
        GUIDE
        <CustomButton class="btn-primary btn-square btn-sm" :prefix-icon="HMore"></CustomButton>
      </Container>
    </template>
  </PageView>
</template>
<script setup lang="ts">
import PageView from '@/components/layouts/PageView.vue'
import Container from '@/components/layouts/Container.vue'
import Header from '@/components/layouts/Header.vue'
import Dropdown from '@/components/inputs/Dropdown.vue'
import IconButton from '@/components/inputs/IconButton.vue'
import CustomButton from '@/components/inputs/CustomButton.vue'
import HMore from '@/assets/icons/HMore.svg'
</script>
<style scoped></style>
