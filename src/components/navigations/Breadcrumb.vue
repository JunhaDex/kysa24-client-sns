<template>
  <nav class="app-bread text-xs mt-4" aria-label="breadcrumb">
    <IconButton
      class="btn-white btn-square btn-custom shadow mr-2"
      :prefix-icon="BackIcon"
      @click="goBack"
    />
    <ol class="app-bread-location shadow">
      <li v-for="(item, idx) in routerStack" class="bc-item" :key="item.path.name">
        <img
          v-if="item.path.name === 'home'"
          class="bread-icon mr-1"
          src="@/assets/icons/Home.svg"
          alt="bread-icon"
        />
        <span v-if="item.path.profile !== undefined" class="profile-sm crumb-profile mr-1">
          <img v-if="item.path.profile.length > 0" :src="item.path.profile" alt="Group Profile" />
        </span>
        <span v-if="item.alias.length === 0" class="crumb-alias-load"></span>
        <Component
          :is="idx === routerStack.length - 1 ? 'span' : 'RouterLink'"
          v-else
          :to="item.path"
          >{{ item.alias }}
        </Component>
      </li>
    </ol>
  </nav>
</template>
<script setup lang="ts">
import IconButton from '@/components/inputs/IconButton.vue'
import BackIcon from '@/assets/icons/Back.svg'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps<{
  routerStack: {
    alias: string
    path: {
      name: string
      params?: any
      profile?: string
    }
  }[]
}>()

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

.bc-item {
  cursor: pointer;
  display: flex;
  align-items: center;
}

.bc-item a:hover,
a:active {
  font-weight: bold;
  text-decoration: underline;
}

.bread-icon {
  display: inline-block;
  width: 14px;
  height: 14px;
}

.crumb-profile {
  display: inline-block;
  border-radius: 50%;
  overflow: hidden;
  background-color: theme('colors.gray.50');
}

.crumb-alias-load {
  display: inline-block;
  width: 50px; /* Adjust as needed */
  height: 20px; /* Adjust as needed */
  background-color: theme('colors.gray.50');
  border-radius: 0.5rem;
  overflow: hidden;
  position: relative;
}

.crumb-alias-load::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(50, 50, 50, 0) 0%,
    rgba(50, 50, 50, 0.3) 50%,
    rgba(50, 50, 50, 0) 100%
  );
  transform: skewX(-20deg);
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%) skewX(-20deg);
  }
  100% {
    transform: translateX(200%) skewX(-20deg);
  }
}
</style>
