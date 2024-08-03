<template>
  <h2 class="group-label font-sm mb-2">{{ teamName }}</h2>
  <div class="member-list shadow">
    <UserListCard v-for="user in users" :user="user" :key="user.ref" />
  </div>
<!--  <UserProfileModal :user="userSelected" :is-show="openProfileModal"/>-->
</template>
<script setup lang="ts">
import UserListCard from '@/components/displays/user/UserListCard.vue'
import type { User } from '@/types/general.type'
import UserProfileModal from '@/components/modals/UserProfileModal.vue'
import { ref } from 'vue'

const props = defineProps<{
  teamName: string
  users: User[]
}>()

const userSelected = ref<User>()
const openProfileModal = ref(false)

</script>
<style scoped>
.group-label {
  font-weight: bold;
}

.member-list {
  background-color: theme('colors.gray.300');
  border-radius: 0.5rem;
  overflow: hidden;
}
</style>
