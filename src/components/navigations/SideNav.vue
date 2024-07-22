<template>
  <nav class="side-nav" :class="{ open: isOpen }">
    <!--if not logged in-->
    <!--      <div class="nav-profile mx-4 py-4">-->
    <!--        <a class="btn btn-sm btn-primary btn-block" href="/login" target="_blank">로그인</a>-->
    <!--      </div>-->
    <!--if logged in-->
    <div class="nav-profile">
      <img class="mr-2" src="" alt="profile image" />
      <div class="flex-1">
        <h4>백예린 님</h4>
        <div class="flex justify-between w-full">
          <span class="inline-block">6개 남음</span>
          <a class="btn btn-primary btn-xs">내 프로필</a>
        </div>
      </div>
    </div>
    <ul class="menu text-xl">
      <li class="menu-item mb-2">
        <RouterLink to="/">
          <img src="@/assets/icons/Home.svg" alt="Home Icon">
          <span class="flex-1">그룹 목록</span>
        </RouterLink>
      </li>
      <li class="menu-item mb-2">
        <RouterLink to="/user-all">
          <span class="flex-1">전체 참가자</span>
        </RouterLink>
      </li>
      <li class="menu-item mb-2">
        <RouterLink to="/chat/list">
          <img src="@/assets/icons/Chat.svg" alt="Chat Icon">
          <span class="flex-1">메세지</span>
          <span class="msg-count text-sm">3</span>
        </RouterLink>
      </li>
      <li class="menu-item mb-2">

        <a href="https://daisyui.com/" target="_blank">
          <img src="@/assets/icons/InfoExt.svg" alt="Chat Icon">
          <span class="flex-1">대회정보</span>
        </a>
      </li>
      <li class="menu-item">
        <RouterLink to="/guide">
          <span class="flex-1">개인설정</span>
        </RouterLink>
      </li>
    </ul>
    <hr />
    <div class="nav-group-recent flex-1">
      <div class="group-item">
        <span class="group-icon"></span>
        <span>대회 공지사항</span>
      </div>
      <div class="group-item">
        <span class="group-icon"></span>
        <span>대전 선교부 14'-16'</span>
      </div>
      <div class="group-item">
        <span class="group-icon"></span>
        <span>최대몇글글자까지가능한거예요</span>
      </div>
      <div class="group-item">
        <span class="group-icon"></span>
        <span>축구 좋아하는 사람들 모임</span>
      </div>
    </div>
    <div class="nav-bottom">
      <div class="nav-support">
        <a href="#" class="support-item">
          <img src="@/assets/icons/InfoExt.svg" alt="Support Icon">
          <span>대회 지원센터</span>
        </a>
        <a href="#" class="logout-link">
          <img src="@/assets/icons/InfoExt.svg" alt="Logout Icon">
          <span>로그아웃</span>
        </a>
      </div>

      <div class="nav-footer">
        <ul class="social-links">
          <li>
            <a href="#" class="app-footer-link">
              <img src="@/assets/icons/brands/insta-icon.svg" alt="Instagram" />
            </a>
          </li>
          <li>
            <a href="#" class="app-footer-link">
              <img src="@/assets/icons/brands/notion-icon.svg" alt="Notion" />
            </a>
          </li>
          <li>
            <a href="#" class="app-footer-link">
              <img src="@/assets/icons/brands/github-icon.svg" alt="Github" />
            </a>
          </li>
        </ul>
        <p class="copyright">© 2024 KYSA designed with ❤️</p>
      </div>
    </div>
  </nav>
  <Backdrop :is-open="isOpen" />
</template>
<script setup lang="ts">
import { useSidebarStore } from '@/stores/ui/sidebar.store'
import { computed } from 'vue'
import Backdrop from '@/components/feedbacks/Backdrop.vue'

const sidebar = useSidebarStore()
const isOpen = computed(() => sidebar.isOpen)
</script>
<style scoped>
.side-nav {
  position: fixed;
  display: flex;
  flex-direction: column;
  top: var(--header-height);
  right: -100%;
  width: 280px;
  height: calc(100vh - var(--header-height));
  background-color: theme('colors.white');
  border-left: 1px solid theme('colors.gray.300');
  padding: 1rem;
  transition: right 0.3s ease-in-out;
  z-index: 9;
}

.menu-item a {
  padding: 0.6rem 1rem;
  display: flex;
}

.nav-profile {
  display: flex;
  margin-bottom: 1rem;
}

.nav-profile > img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.msg-count {
  display: inline-block;
  background-color: theme('colors.error');
  color: theme('colors.white');
  border-radius: 8px;
  padding: 0.3rem 0.5rem;
}

.open {
  right: 0;
}

@media (min-width: 768px) {
  .side-nav {
    left: 0;
    width: 300px;
    border-left: none;
  }

  .open {
    left: 0;
  }
}

.nav-support {
  margin-bottom: 20px;
}

.social-links {
  display: flex;
  justify-content: center;
  list-style-type: none;
  padding: 0;
  margin-bottom: 10px;
}

.social-links li {
  margin: 0 5px;
}

.social-links img {
  width: 24px;
  height: 24px;
}

.copyright {
  text-align: center;
  font-size: 12px;
  color: #666;
}
</style>
