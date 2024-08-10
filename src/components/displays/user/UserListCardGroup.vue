<template>
  <h2 class="group-label font-sm mb-2 mt-4">{{ teamName }}</h2>
  <div class="member-list shadow">
    <UserListCard
      v-for="user in users"
      :user="user"
      :key="user.ref"
      @select-user="openProfileModal"
      @go-chat="() => moveUserChatRoom(user.ref)"
    />
  </div>
  <UserProfileModal
    :user="userSelected!"
    :is-show="isProfileModal"
    @modal-close="() => (isProfileModal = false)"
    @move-chat="moveUserChatRoom"
  />
</template>
<script setup lang="ts">
import UserListCard from '@/components/displays/user/UserListCard.vue'
import type { User } from '@/types/general.type'
import UserProfileModal from '@/components/modals/UserProfileModal.vue'
import { ref } from 'vue'
import { ChatService } from '@/services/chat.service'
import { useRouter } from 'vue-router'

const props = defineProps<{
  teamName: string
  users: User[]
}>()
const chatService = new ChatService()
const router = useRouter()
const userSelected = ref<User>(props.users[0])
const isProfileModal = ref(false)

function openProfileModal(user: User) {
  console.log(user)
  userSelected.value = user
  isProfileModal.value = true
}

async function moveUserChatRoom(userRef: string) {
  const roomRef = await chatService.openChatRoom(userRef)
  isProfileModal.value = false
  router.push({ name: 'chat_room', params: { ref: roomRef } })
}
</script>
<style scoped>
.group-label {
  font-weight: bold;
}

.member-list {
  background-color: theme('colors.gray.300');
  border-radius: 0.5rem;
}
</style>
