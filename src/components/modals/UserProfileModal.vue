<template>
  <ModalBase :is-show="isShow">
    <div class="up-modal">
      <div class="up-header">
        <img v-if="user.coverImg" :src="user.coverImg" alt="Group Cover" />
        <p v-else class="up-header-default p-4">
          '주의 영이... 우리마음 가운데 <br />
          큰 변화를 이루셨음으로'
        </p>
        <button class="up-close-btn" @click="() => emit('modalClose')">
          <span class="icon-close"></span>
        </button>
        <div class="flow-sign font-mono tracking-wider pb-1">
          <span class="sign-content">
            KYSA2024 MATE APP KYSA2024 MATE APP KYSA2024 MATE APP KYSA2024 MATE APP KYSA2024 MATE
            APP KYSA2024 MATE APP KYSA2024 MATE APP KYSA2024 MATE APP
          </span>
          <span class="sign-content">
            KYSA2024 MATE APP KYSA2024 MATE APP KYSA2024 MATE APP KYSA2024 MATE APP KYSA2024 MATE
            APP KYSA2024 MATE APP KYSA2024 MATE APP KYSA2024 MATE APP
          </span>
        </div>
      </div>
      <div class="up-profile">
        <img :src="profileImg" alt="User Profile" />
      </div>
    </div>
    <div class="up-content">
      <div class="up-content-intro mb-2">
        <h3 class="font-bold text-lg mb-1">{{ user.nickname }}</h3>
        <p>{{ user.introduce }}</p>
      </div>
      <div class="up-content-button-group">
        <RouterLink :to="{ name: 'user_profile', params: { ref: user.ref } }" @click="() => emit('modalClose')">
          <IconButton class="btn-md btn-secondary">프로필 보기</IconButton>
        </RouterLink>
        <IconButton class="btn-md btn-primary" @click="moveToChat" :disabled="noChat">메세지</IconButton>
      </div>
    </div>
  </ModalBase>
</template>
<script setup lang="ts">
import ModalBase from '@/components/feedbacks/ModalBase.vue'
import IconButton from '@/components/inputs/IconButton.vue'
import type { Profile } from '@/types/general.type'
import { computed } from 'vue'
import ProfileEmpty from '@/assets/images/profile_empty.png'

const props = defineProps<{
  isShow: boolean
  user: Profile
  noChat?: boolean
}>()
const emit = defineEmits(['modalClose', 'moveChat'])
const profileImg = computed(() => (props.user.profileImg ? props.user.profileImg : ProfileEmpty))

async function moveToChat() {
  emit('moveChat', props.user.ref)
}
</script>
<style scoped>
.up-modal {
  position: relative;
}

.up-header {
  background-color: theme('colors.gray.300');
  border-radius: 0.5rem 0.5rem 0 0;
  aspect-ratio: 16/9;
  overflow: hidden;
}

.up-header-default {
  color: theme('colors.gray.50');
  display: flex;
  height: calc(100% - 28px);
  justify-content: center;
  align-items: center;
  text-align: center;
}

.up-close-btn {
  width: 24px;
  height: 24px;
  background-color: theme('colors.white');
  color: theme('colors.black');
  padding: 0.1rem;
  position: absolute;
  top: 1rem;
  right: 1rem;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.1s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.up-close-btn:hover {
  background-color: theme('colors.gray.50');
}

.up-close-btn:active {
  transform: scale(0.95); /* Shrink effect when clicked */
}

.icon-close {
  width: 18px;
  height: 18px;
  mask-size: contain;
  mask-repeat: no-repeat;
  mask-image: url('@/assets/icons/Close.svg');
  -webkit-mask-image: url('@/assets/icons/Close.svg');
  background-color: currentColor;
}

.flow-sign {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: theme('colors.black');
  color: theme('colors.white');
  overflow: hidden;
  white-space: nowrap;
}

.sign-content {
  display: inline-block;
  padding-right: 100%;
  animation: ticker 16s linear infinite;
  font-size: 0.6rem;
  line-height: 1rem;
}

@keyframes ticker {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.up-profile {
  width: 86px;
  height: 86px;
  border-radius: 50%;
  border: 4px solid theme('colors.white');
  background-color: theme('colors.gray.300');
  overflow: hidden;
  position: absolute;
  bottom: -35px; /* half of profile - half of flow-sign = 35 */
  left: 50%;
  transform: translate(-50%);
}

.up-content {
  display: flex;
  min-height: 160px;
  flex-direction: column;
}

.up-content-intro {
  flex: 1;
  padding: calc(35px + 0.5rem) 1rem 0 1rem;
  text-align: center;
}

.up-content-button-group {
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-content: center;
  margin: 1rem;
}
</style>
