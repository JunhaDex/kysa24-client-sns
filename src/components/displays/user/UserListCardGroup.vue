<template>
  <h2 class="group-label font-sm mb-2">{{ teamName }}</h2>
  <div class="member-list shadow">
    <RouterLink
      v-for="user in users"
      :to="{ name: 'user_profile', params: { ref: user.ref } }"
      :key="user.ref"
    >
      <UserListCard :user="user" />
    </RouterLink>
  </div>
</template>
<script setup lang="ts">
import UserListCard from '@/components/displays/user/UserListCard.vue'
import type { User } from '@/types/general.type'

const props = defineProps<{
  teamName: string
  users: User[]
}>()
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
