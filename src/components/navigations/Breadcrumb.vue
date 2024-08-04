<template>
  <nav class="app-bread text-xs mt-4" aria-label="breadcrumb">
    <IconButton class="btn-white btn-square btn-custom shadow mr-2" :prefix-icon="BackIcon" @click="goBack" />
    <ol class="app-bread-location shadow">
      <li class="bc-item flex align-middle">
        <img class="bread-icon mr-1" src="@/assets/icons/Home.svg" alt="bread-icon" />
        <span>홈</span>
      </li>
      <li class="bc-item">
        <span>group name</span>
      </li>
      <li class="bc-item">
        <span>post</span>
      </li>
    </ol>
  </nav>
</template>
<script setup lang="ts">
import IconButton from '@/components/inputs/IconButton.vue'
import BackIcon from '@/assets/icons/Back.svg'
import { useRouter } from 'vue-router'

const router = useRouter()

function goBack() {
  router.go(-1)
}
</script>
<style scoped>
.app-bread {
  display: flex;
}

.app-bread-location {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: theme('colors.white');
  border-radius: 0.5rem;
}

.app-bread-location li:not(:last-child)::after {
  content: '>';
  margin: 0 8px;
}

.bc-item span {
  cursor: pointer;
}

.bc-item span:hover,
span:active {
  font-weight: bold;
  text-decoration: underline;
}

.bread-icon {
  display: inline-block;
  width: 14px;
  height: 14px;
}
</style>
