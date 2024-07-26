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
        <UserProfile v-if="user" :user="user" />
      </Container>
      <Container>
        <Box v-if="extra">
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
import { UserService } from '@/services/user.service'
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import type { UserExtra, User } from '@/types/general.type'

const route = useRoute()
const userService = new UserService()
const uRef = route.params.ref as string
const user = ref<User>()
const extra = ref<UserExtra>()

async function fetchPage() {
  const res = await userService.getUserByRef(uRef)
  console.log(res)
  user.value = res.user
  extra.value = res.extra
}

onMounted(async () => {
  await fetchPage()
})
</script>
