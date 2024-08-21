<template>
  <nav class="side-nav" :class="{ open: isOpen }">
    <!--if logged in-->
    <div v-if="isAuth" class="nav-profile">
      <RouterLink
        :to="{ name: 'user_profile', params: { ref: userStore.myInfo?.ref } }"
        class="nav-profile-img profile-xl mr-2"
        @click="closeSidebar"
      >
        <img :src="profileImg" alt="profile image" />
      </RouterLink>
      <div class="flex-1">
        <h4 class="text-lg font-bold">{{ userStore.myInfo!.nickname }}</h4>
        <div class="flex justify-start w-full">
          <span class="ticket-icon mr-1"></span>
          <span class="inline-block">{{ ticketCount }}개 남음</span>
        </div>
      </div>
    </div>
    <!--if not logged in-->
    <div v-else class="nav-profile mx-4 py-4">
      <RouterLink class="btn btn-sm btn-primary btn-block" to="/login" @click="closeSidebar"
        >로그인
      </RouterLink>
    </div>
    <ul class="menu text-xl">
      <li class="menu-item mb-2">
        <RouterLink to="/" @click="closeSidebar">
          <img class="profile-md" src="@/assets/icons/Home.svg" alt="Home Icon" />
          <span class="flex-1">그룹 목록</span>
        </RouterLink>
      </li>
      <li class="menu-item mb-2">
        <RouterLink to="/user-all" @click="closeSidebar">
          <img class="profile-md" src="@/assets/icons/Users.svg" alt="Users Icon" />
          <span class="flex-1">전체 참가자</span>
        </RouterLink>
      </li>
      <li class="menu-item mb-2">
        <RouterLink to="/chat/list" @click="closeSidebar">
          <img class="profile-md" src="@/assets/icons/Chat.svg" alt="Chat Icon" />
          <span class="flex-1">메세지</span>
          <span v-if="unreadCount > 0" class="msg-count text-sm">
            {{ unreadCount }}
          </span>
        </RouterLink>
      </li>
      <li class="menu-item mb-2">
        <a href="https://linktr.ee/2024kysa" target="_blank">
          <img class="profile-md" src="@/assets/icons/InfoExt.svg" alt="Info Icon" />
          <span class="flex-1">대회정보</span>
          <img class="profile-md" src="@/assets/icons/Outlink.svg" alt="Outlink Icon" />
        </a>
      </li>
      <li v-if="userStore.myInfo" class="menu-item">
        <RouterLink
          :to="{ name: 'user_update', params: { ref: userStore.myInfo.ref } }"
          @click="closeSidebar"
        >
          <img class="profile-md" src="@/assets/icons/Gear.svg" alt="Gear Icon" />
          <span class="flex-1">개인설정</span>
        </RouterLink>
      </li>
    </ul>
    <hr />
    <div class="nav-group-recent flex-1">
      <RouterLink
        v-for="group in myGroups"
        :to="{ name: 'group_feed', params: { ref: group.ref } }"
        class="group-item block"
        :key="group.id"
        @click="closeSidebar"
      >
        <div class="group-profile-img profile-sm mr-2">
          <img v-if="group.profileImg" :src="group.profileImg" alt="Group Profile" />
        </div>
        <span class="flex-1">{{ group.groupName }}</span>
      </RouterLink>
    </div>
    <div class="nav-bottom">
      <div class="nav-support mb-2">
        <RouterLink
          :to="{ name: 'group_feed', params: { ref: '12f5a04f-9ea5-4e04-b226-0476955750ef' } }"
          href="#"
          class="support-item"
          @click="closeSidebar"
        >
          <img class="profile-sm mr-2" src="@/assets/icons/Support.svg" alt="Support Icon" />
          <span class="flex-1">대회 지원센터</span>
        </RouterLink>
        <span v-if="isAuth" class="support-item" @click="logOut">
          <img class="profile-sm mr-2" src="@/assets/icons/Logout.svg" alt="Logout Icon" />
          <span class="flex-1">로그아웃</span>
        </span>
        <RouterLink v-else to="/login" class="support-item" @click="closeSidebar">
          <img class="profile-sm mr-2" src="@/assets/icons/Login.svg" alt="Login Icon" />
          <span class="flex-1">로그인</span>
        </RouterLink>
      </div>

      <div class="nav-footer">
        <ul class="social-links mb-2">
          <li>
            <a href="https://www.instagram.com/2024_kysa/" target="_blank">
              <span class="icon brand-icon instagram-mask mr-1"></span>
            </a>
          </li>
          <li>
            <a href="https://docs.kysa.page/" target="_blank">
              <span class="icon brand-icon notion-mask mr-1"></span>
            </a>
          </li>
          <li>
            <a href="https://github.com/JunhaDex/kysa24-client-sns" target="_blank">
              <span class="icon brand-icon github-mask mr-1"></span>
            </a>
          </li>
        </ul>
        <p class="copyright text-xs">© 2024 KYSA <i class="font-cursive">designed with</i> ❤️</p>
      </div>
    </div>
  </nav>
  <Backdrop :is-open="isOpen" @bg-click="closeSidebar" />
</template>
<script setup lang="ts">
import { useSidebarStore } from '@/stores/ui/sidebar.store'
import { computed, onMounted, ref, watch } from 'vue'
import Backdrop from '@/components/feedbacks/Backdrop.vue'
import { useUserStore } from '@/stores/user.store'
import { useAuthStore } from '@/stores/auth.store'
import { useToastStore } from '@/stores/ui/toast.store'
import ProfileEmpty from '@/assets/images/profile_empty.png'
import { sleep } from '@/utils/index.util'
import type { Group } from '@/types/general.type'
import { GroupService } from '@/services/group.service'
import { storeToRefs } from 'pinia'

const sidebar = useSidebarStore()
const isOpen = computed(() => sidebar.isOpen)
const groupService = new GroupService()
const userStore = useUserStore()
const authStore = useAuthStore()
const toastStore = useToastStore()
const myGroups = ref<Group[]>([])
const { unreadCount, ticketCount } = storeToRefs(userStore)

const isAuth = computed(() => userStore.myInfo !== undefined)
watch(
  () => isAuth.value,
  (val) => {
    if (val) {
      userStore.updateNumbers()
    }
  }
)
onMounted(async () => {
  myGroups.value = await groupService.getMyGroups()
  console.log(myGroups.value)
})
const profileImg = computed(() =>
  userStore.myInfo?.profileImg ? userStore.myInfo.profileImg : ProfileEmpty
)

function closeSidebar() {
  sidebar.isOpen = false
}

function logOut() {
  authStore.setJwt('')
  userStore.myInfo = undefined
  closeSidebar()
  toastStore.showToast('로그아웃 되었습니다.', 'info')
  sleep(1000)
  window.location.href = '/'
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

.support-item,
.group-item,
.menu-item a {
  padding: 0.6rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.support-item:hover,
.support-item:active,
.group-item:hover,
.group-item:active {
  font-weight: bold;
  text-decoration: underline;
}

.nav-profile {
  display: flex;
}

.nav-profile-img,
.group-profile-img {
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

.brand-icon {
  display: inline-block;
  width: 18px;
  height: 18px;
  vertical-align: middle;
  background-color: theme('colors.gray.600');
}

.instagram-mask {
  mask-image: url(@/assets/icons/brands/insta-icon.svg);
  -webkit-mask-image: url(@/assets/icons/brands/insta-icon.svg);
}

.notion-mask {
  mask-image: url(@/assets/icons/brands/notion-icon.svg);
  -webkit-mask-image: url(@/assets/icons/brands/notion-icon.svg);
}

.github-mask {
  mask-image: url(@/assets/icons/brands/github-icon.svg);
  -webkit-mask-image: url(@/assets/icons/brands/github-icon.svg);
}
</style>
