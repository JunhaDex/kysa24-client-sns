<template>
  <RouterView :key="route.fullPath" />
  <div class="teleport">
    <!--SideBar, Alert, Toast, No Modal-->
    <!--Component here controlled by ui store (not main logic)-->
    <SideNav :key="jwt" />
    <SendTicketModal
      :step="stage"
      :target="target"
      @close-ticket-prompt="() => ticketStore.closeTicketModal()"
    />
    <Modal :is-show="isHelp" title="대회 지원센터" @modal-close="() => isHelp = false">
      <p>
        대회 지원센터는 카카오톡 플러스친구를 통해 운영되고 있습니다.<br />
        카카오톡 사용이 어려운 경우, 운영위 및 대회 본부로 직접 문의해 주시기 바랍니다.
      </p>
      <div class="flex justify-end mt-6">
        <a href="http://pf.kakao.com/_VxiXAn" target="_blank">
          <IconButton class="btn btn-md btn-primary" :suffix-icon="OutLink" @click="() => isHelp = false">
            오픈 카톡방
          </IconButton>
        </a>
      </div>
    </Modal>
  </div>
</template>
<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
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
import IconButton from '@/components/inputs/IconButton.vue'
import OutLink from '@/assets/icons/Outlink.svg'
import Modal from '@/components/modals/Modal.vue'

const authStore = useAuthStore()
const userStore = useUserStore()
const ticketStore = useTicketStore()
const authService = new AuthService()
const userService = new UserService()
const toastStore = useToastStore()
const firebase = new FirebaseProvider()
const favicon = document.querySelector('favicon-badge') as any
const route = useRoute()
const { jwt } = storeToRefs(authStore)
const { stage, target } = storeToRefs(ticketStore)
const { isHelp } = storeToRefs(toastStore)
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
  if (authStore.circuitBreak) return
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
