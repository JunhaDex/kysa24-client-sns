<template>
  <RouterView :key="jwt" />
  <div class="teleport">
    <!--SideBar, Alert, Toast, No Modal-->
    <!--Component here controlled by ui store (not main logic)-->
    <SideNav :key="jwt" />
    <SendTicketModal
      :step="stage"
      :target="target"
      @close-ticket-prompt="() => ticketStore.closeTicketModal()"
    />
  </div>
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router'
import SideNav from '@/components/navigations/SideNav.vue'
import { onMounted } from 'vue'
import { FirebaseProvider } from '@/providers/firebase.provider'
import { useAuthStore } from '@/stores/auth.store'
import { useUserStore } from '@/stores/user.store'
import { UserService } from '@/services/user.service'
import { AuthService } from '@/services/auth.service'
import { storeToRefs } from 'pinia'
import SendTicketModal from '@/components/modals/SendTicketModal.vue'
import { useTicketStore } from '@/stores/ui/ticket.store'
import { useToastStore } from '@/stores/ui/toast.store'

const authStore = useAuthStore()
const userStore = useUserStore()
const ticketStore = useTicketStore()
const authService = new AuthService()
const userService = new UserService()
const toastStore = useToastStore()
const firebase = new FirebaseProvider()
const favicon = document.querySelector('favicon-badge') as any
const { jwt } = storeToRefs(authStore)
const { stage, target } = storeToRefs(ticketStore)
onMounted(async () => {
  console.log('App.vue mounted')
  await initUserInfo()
  try {
    const fcm = await firebase.getUserToken()
    console.log('fcm', fcm)
    authStore.setFcm(fcm!)
    firebase.setupMessageListener(() => {
      console.log('message received')
      toastStore.showToast('새로운 메시지가 도착했습니다.', 'msg')
    })
  } catch (e) {
    console.error(e)
  }

  // app badge
  const supportAppBadge = 'setAppBadge' in navigator
  console.log('supportAppBadge', supportAppBadge)
  // if (matchMedia('(display-mode: standalone)').matches && supportAppBadge) {
  //   console.log('native badge')
  //   setAppBadgeNative(1)
  // } else {
  //   console.log('favicon badge')
  //   setAppBadgeFavicon(1)
  // }
})

function setAppBadgeFavicon(value: number) {
  favicon.badge = value
}

function setAppBadgeNative(value: number) {
  navigator.setAppBadge(value)
}

async function initUserInfo() {
  if (userStore.teams.length === 0) {
    userStore.teams = await userService.listTeams()
    console.log('teams', userStore.teams)
  }
  if (authStore.jwt && userStore.myInfo === undefined) {
    userStore.myInfo = await authService.getMy()
  }
}
</script>
<style scoped></style>
