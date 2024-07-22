<template>
  <PageView @scroll="handleScroll($event, fetchPage)" ref="scrollView">
    <template #header>
      <Header />
    </template>
    <template #main>
      <Container>
        <UserSearchInput />
      </Container>
      <Container>
        <h2 class="group-label">1조</h2>
        <div class="member-list">
          <div class="member-item">
            <div class="profile-image"></div>
            <div class="member-info">
              <span class="font-bold mr-1">임술아</span>
              <span class="text-xs">형제</span>
            </div>
            <span class="member-location">서울남 청년지부</span>
            <IconButton class="btn-xs btn-ghost" image="hmore" />
          </div>
          <div class="member-item">
            <div class="profile-image"></div>
            <div class="member-info">
              <span class="font-bold mr-1">임술아</span>
              <span class="text-xs">형제</span>
            </div>
            <span class="member-location">서울남 청년지부</span>
            <IconButton class="btn-xs btn-ghost" image="hmore" />
          </div>
          <!-- Add more member items as needed -->
        </div>
      </Container>
    </template>
    <template #footer>
      <Footer />
    </template>
  </PageView>
</template>
<script setup lang="ts">
import PageView from '@/components/layouts/PageView.vue'
import Container from '@/components/layouts/Container.vue'
import { setupListPage } from '@/stores/setups/list.composition'
import { onMounted, ref } from 'vue'
import { UserService } from '@/services/user.service'
import Header from '@/components/layouts/Header.vue'
import Footer from '@/components/layouts/Footer.vue'
import UserSearchInput from '@/components/displays/users/UserSearchInput.vue'
import IconButton from '@/components/inputs/IconButton.vue'

const { handleScroll } = setupListPage()
const scrollView = ref<HTMLDivElement>()
const userService = new UserService()

async function fetchPage(pageNo = 1) {
  const res = await userService.listUsers({ page: { page: pageNo } })
  console.log(res)
}

onMounted(async () => {
  await fetchPage()
})
</script>
<style scoped>
.group-label {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.member-list {
  background-color: theme('colors.gray.300');
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.member-item {
  display: grid;
  grid-template-columns: 24px auto 1fr 24px;
  gap: 10px;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #e0e0e0;
  background-color: theme('colors.white');
}

.member-item:hover, .member-item:active:not(:has(.action-button:active)) {
  background-color: theme('colors.gray.300');
}

.member-item:active:not(:has(.action-button:active)) {
  transform: scale(0.98);
}

.member-item:last-child {
  border-bottom: none;
}

.profile-image {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #ddd;
}

.member-name {
  font-weight: bold;
}

.member-info {
  display: flex;
  align-items: baseline;
}

.action-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
}
</style>
