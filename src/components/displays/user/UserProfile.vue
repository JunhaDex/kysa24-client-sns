<template>
  <Profile
    :cover-img="user.coverImg"
    :profile-img="user.profileImg"
    @click-profile="() => emit('clickProfile')"
  >
    <div class="user-profile-wrap">
      <div class="name-area mr-4">
        <h2 class="text-xl font-bold">
          {{ user.nickname }} <span class="text-sm">{{ subfix }}</span>
        </h2>
        <ul>
          <li class="align-center">
            <span class="icon-mask team-icon mr-1"></span>
            <span class="text-sm whitespace-nowrap">
              소속: <b>{{ team }}</b>
            </span>
          </li>
          <li class="align-center">
            <span class="icon-mask geo-icon mr-1"></span>
            <span class="text-sm whitespace-nowrap">
              지역: <b>{{ user.geo }}</b>
            </span>
          </li>
        </ul>
      </div>
      <div v-if="!isMe" class="action-area">
        <button class="btn btn-md btn-primary btn-block mb-2" @click="() => emit('sendTicket')">
          호감보내기
        </button>
        <button class="btn btn-md btn-secondary btn-block" @click="() => emit('goChat')">
          메세지
        </button>
      </div>
      <div v-else class="action-area">
        <button class="btn btn-sm btn-primary btn-block mb-2" @click="gotoProfile">개인설정</button>
      </div>
    </div>
  </Profile>
  <Container>
    <Box>
      <h2 class="font-bold text-sm mb-2">상태 메세지</h2>
      <p>
        {{ user.introduce }}
      </p>
    </Box>
  </Container>
</template>
<script setup lang="ts">
import Profile from '@/components/displays/Profile.vue'
import Container from '@/components/layouts/Container.vue'
import Box from '@/components/layouts/Box.vue'
import type { User } from '@/types/general.type'
import { computed } from 'vue'
import { sfx } from '@/utils/index.util'
import { useUserStore } from '@/stores/user.store'
import { useRouter } from 'vue-router'

const props = defineProps<{
  user: User
  isMe: boolean
}>()
const emit = defineEmits(['sendTicket', 'goChat', 'clickProfile'])
const userStore = useUserStore()
const router = useRouter()
const subfix = computed(() => {
  return sfx(props.user.sex)
})
const team = computed(() => {
  const match = userStore.teams.find((team) => team.id === props.user.teamId)
  if (match) {
    return match.teamName
  }
  return ''
})

function gotoProfile() {
  router.push({ name: 'user_update', params: { ref: userStore.myInfo?.ref } })
}
</script>
<style scoped>
.user-profile-wrap {
  display: flex;
}

.name-area {
  flex: 1;
}

.action-area {
  width: 108px;
}

.align-center {
  display: flex;
  align-items: center;
}

.icon-mask {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  mask-size: contain;
  mask-repeat: no-repeat;
  mask-position: center;
  background-color: theme('colors.gray.600');
}

.geo-icon {
  mask-image: url('@/assets/icons/Location.svg');
  -webkit-mask-image: url('@/assets/icons/Location.svg');
}

.team-icon {
  mask-image: url('@/assets/icons/Users.svg');
  -webkit-mask-image: url('@/assets/icons/Users.svg');
}
</style>
