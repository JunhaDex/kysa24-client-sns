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
</script>
<style scoped></style>
