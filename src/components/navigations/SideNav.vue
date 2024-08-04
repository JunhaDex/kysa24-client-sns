<template>
  <nav class="side-nav" :class="{ open: isOpen }">
    <!--if logged in-->
    <div v-if="isAuth" class="nav-profile">
      <div class="nav-profile-img profile-xl mr-2">
        <img :src="userStore.myInfo?.profileImg" alt="profile image" />
      </div>
      <div class="flex-1">
        <h4 class="text-lg font-bold">{{ userStore.myInfo!.nickname }}</h4>
        <div class="flex justify-start w-full">
          <span class="ticket-icon mr-1"></span>
          <span class="inline-block">6개 남음</span>
        </div>
      </div>
    </div>
    <!--if not logged in-->
    <div v-else class="nav-profile mx-4 py-4">
      <RouterLink class="btn btn-sm btn-primary btn-block" to="/login" @click="closeSidebar">로그인</RouterLink>
    </div>
    <ul class="menu text-xl">
      <li class="menu-item mb-2">
        <RouterLink to="/" @click="closeSidebar">
          <img class="profile-md" src="@/assets/icons/Home.svg" alt="Home Icon">
          <span class="flex-1">그룹 목록</span>
        </RouterLink>
      </li>
      <li class="menu-item mb-2">
        <RouterLink to="/user-all" @click="closeSidebar">
          <img class="profile-md" src="@/assets/icons/Users.svg" alt="Users Icon">
          <span class="flex-1">전체 참가자</span>
        </RouterLink>
      </li>
      <li class="menu-item mb-2">
        <RouterLink to="/chat/list" @click="closeSidebar">
          <img class="profile-md" src="@/assets/icons/Chat.svg" alt="Chat Icon">
          <span class="flex-1">메세지</span>
          <span class="msg-count text-sm">3</span>
        </RouterLink>
      </li>
      <li class="menu-item mb-2">

        <a href="https://daisyui.com/" target="_blank">
          <img class="profile-md" src="@/assets/icons/InfoExt.svg" alt="Info Icon">
          <span class="flex-1">대회정보</span>
          <img class="profile-md" src="@/assets/icons/Outlink.svg" alt="Outlink Icon">
        </a>
      </li>
      <li class="menu-item">
        <RouterLink to="/guide">
          <img class="profile-md" src="@/assets/icons/Gear.svg" alt="Gear Icon">
          <span class="flex-1">개인설정</span>
        </RouterLink>
      </li>
    </ul>
    <hr />
    <div class="nav-group-recent flex-1">
      <div class="group-item">
        <div class="group-profile-img profile-sm mr-2"></div>
        <span class="flex-1">대회 공지사항</span>
      </div>
      <div class="group-item">
        <div class="group-profile-img profile-sm mr-2"></div>
        <span class="flex-1">대전 선교부 14'-16'</span>
      </div>
    </div>
    <div class="nav-bottom">
      <div class="nav-support mb-2">
        <a href="#" class="support-item">
          <img class="profile-sm mr-2" src="@/assets/icons/Support.svg" alt="Support Icon">
          <span class="flex-1">대회 지원센터</span>
        </a>
        <span v-if="isAuth" class="support-item">
          <img class="profile-sm mr-2" src="@/assets/icons/Logout.svg" alt="Logout Icon">
          <span class="flex-1">로그아웃</span>
        </span>
        <span v-else class="support-item">
          <img class="profile-sm mr-2" src="@/assets/icons/Login.svg" alt="Login Icon">
          <span class="flex-1">로그인</span>
        </span>
      </div>

      <div class="nav-footer">
        <ul class="social-links mb-2">
          <li>
            <a href="#" target="_blank">
              <img class="profile-sm" src="@/assets/icons/brands/insta-icon.svg" alt="Instagram" />
            </a>
          </li>
          <li>
            <a href="#" target="_blank">
              <img class="profile-sm" src="@/assets/icons/brands/notion-icon.svg" alt="Notion" />
            </a>
          </li>
          <li>
            <a href="#" target="_blank">
              <img class="profile-sm" src="@/assets/icons/brands/github-icon.svg" alt="Github" />
            </a>
          </li>
        </ul>
        <p class="copyright text-xs">© 2024 KYSA designed with ❤️</p>
      </div>
    </div>
  </nav>
  <Backdrop :is-open="isOpen" />
</template>
<script setup lang="ts">
import { useSidebarStore } from '@/stores/ui/sidebar.store'
import { computed } from 'vue'
import Backdrop from '@/components/feedbacks/Backdrop.vue'
import { useUserStore } from '@/stores/user.store'

const sidebar = useSidebarStore()
const isOpen = computed(() => sidebar.isOpen)
const userStore = useUserStore()

const isAuth = computed(() => userStore.myInfo !== undefined)

const closeSidebar = () => {
  sidebar.isOpen = false
}
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

.ticket-icon {
  display: inline-block;
  width: 1.4rem;
  height: 1.4rem;
  mask-size: contain;
  mask-repeat: no-repeat;
  mask-position: center;
  mask-image: url('@/assets/icons/LikeFill.svg');
  -webkit-mask-image: url('@/assets/icons/LikeFill.svg');
  background-color: theme('colors.error');
}

.side-nav hr {
  margin: 1rem auto;
  border: none;
  border-top: 2px solid theme('colors.gray.300');
  width: 42%;
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

.support-item, .group-item, .menu-item a {
  padding: 0.6rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.support-item:hover, .support-item:active, .group-item:hover, .group-item:active {
  font-weight: bold;
  text-decoration: underline;
}

.nav-profile {
  display: flex;
}

.nav-profile-img, .group-profile-img {
  border-radius: 50%;
  overflow: hidden;
  background-color: theme('colors.gray.300');
}

.msg-count {
  display: inline-block;
  background-color: theme('colors.error');
  color: theme('colors.white');
  border-radius: 8px;
  padding: 0.3rem 0.5rem;
}

.social-links {
  display: flex;
  justify-content: center;
  align-items: center;
  list-style-type: none;
  padding: 0;
  width: 100%;
}

.social-links li a img {
  display: inline-block;
}

.nav-footer ul li:not(:last-child)::after {
  content: '|';
  margin: 0 10px;
}

.copyright {
  text-align: center;
  color: theme('colors.gray.600');
}
</style>
