<template>
  <RouterView />
  <div class="teleport">
    <!--SideBar, Alert, Toast, No Modal-->
    <!--Component here controlled by ui store (not main logic)-->
    <SideNav />
  </div>
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router'
import SideNav from '@/components/navigations/SideNav.vue'
import { onMounted } from 'vue'
import { FirebaseProvider } from '@/providers/firebase.provider'
import { useAuthStore } from '@/stores/auth.store'

const authStore = useAuthStore()
const firebase = new FirebaseProvider()
const favicon = document.querySelector('favicon-badge') as any
onMounted(async () => {
  console.log('App.vue mounted')
  try {
    const fcm = await firebase.getUserToken()
    console.log('fcm', fcm)
    authStore.setFcm(fcm!)
    firebase.setupMessageListener()
  } catch (e) {
    console.error(e)
  }

  // app badge
  const supportAppBadge = 'setAppBadge' in navigator
  console.log('supportAppBadge', supportAppBadge)
  if (matchMedia('(display-mode: standalone)').matches && supportAppBadge) {
    console.log('native badge')
    setAppBadgeNative(1)
  } else {
    console.log('favicon badge')
    setAppBadgeFavicon(1)
  }
})

function setAppBadgeFavicon(value: number) {
  favicon.badge = value
}

function setAppBadgeNative(value: number) {
  navigator.setAppBadge(value)
}
</script>
<style scoped></style>
