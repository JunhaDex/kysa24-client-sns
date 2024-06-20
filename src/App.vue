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

const firebase = new FirebaseProvider()
onMounted(async () => {
  console.log('App.vue mounted')
  const fcm = await firebase.getUserToken()
  console.log('fcm', fcm)
  firebase.setupMessageListener()
})
</script>
<style scoped></style>
