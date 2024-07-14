<template>
  <PageView>
    <template #header>
      <Header />
    </template>
    <template #main>
      <Container>
        <Breadcrumb />
      </Container>
      <Container stretch>
        <UserProfile />
      </Container>
      <Container>
        <Box>
          <h2>내 정보</h2>
          <ul>
            <li>...</li>
          </ul>
        </Box>
      </Container>
    </template>
    <template #footer>
      <Footer />
    </template>
  </PageView>
</template>
<script lang="ts" setup>
import PageView from '@/components/layouts/PageView.vue'
import Header from '@/components/layouts/Header.vue'
import Footer from '@/components/layouts/Footer.vue'
import Container from '@/components/layouts/Container.vue'
import Breadcrumb from '@/components/navigations/Breadcrumb.vue'
import UserProfile from '@/components/displays/user/UserProfile.vue'
import Box from '@/components/layouts/Box.vue'
</script>
