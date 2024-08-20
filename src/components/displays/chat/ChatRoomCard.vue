<template>
  <Box>
    <div class="chat-list-item">
      <div class="chat-card-profile">
        <div class="profile-pic" @click="() => emit('openProfile')">
          <img :src="profileImg" alt="User Profile" />
        </div>
      </div>
      <RouterLink :to="{ name: 'chat_room', params: { ref: chatRoom.ref } }">
        <div class="chat-card-header text-lg">
          <strong>{{ chatRoom.title }}</strong>
          <span class="text-xs ml-2">{{ tts(chatRoom.lastChat.createdAt) }}</span>
          <span v-if="hasUnread" class="blue-dot ml-2 mb-1"></span>
        </div>
      </RouterLink>
      <div class="chat-card-action">
        <ChatListDropdown
          class="dropdown-end"
          @open-profile="() => emit('openProfile')"
          @deny-user-chat="() => emit('denyUserChat')"
        >
          <IconButton
            class="btn-sm btn-ghost btn-square"
            role="button"
            tabindex="0"
            :prefix-icon="VMoreIcon"
          />
        </ChatListDropdown>
      </div>
      <RouterLink :to="{ name: 'chat_room', params: { ref: chatRoom.ref } }">
        <div class="chat-card-contents">
          <p>{{ preview }}</p>
        </div>
      </RouterLink>
    </div>
  </Box>
</template>
<script setup lang="ts">
import Box from '@/components/layouts/Box.vue'
import '@/assets/card.css'
import ChatListDropdown from '@/components/inputs/dropdowns/ChatListDropdown.vue'
import IconButton from '@/components/inputs/IconButton.vue'
import VMoreIcon from '@/assets/icons/VMore.svg'
import type { ChatRoom } from '@/types/general.type'
import { tts } from '@/utils/index.util'
import { computed, onMounted } from 'vue'
import ProfileEmpty from '@/assets/images/profile_empty.png'
import { useUserStore } from '@/stores/user.store'

const emit = defineEmits(['openProfile', 'denyUserChat'])
const props = defineProps<{
  chatRoom: ChatRoom
}>()
const userStore = useUserStore()
const profileImg = computed(() =>
  props.chatRoom.party[0].profileImg ? props.chatRoom.party[0].profileImg : ProfileEmpty
)

const preview = computed(() => {
  const enc = props.chatRoom.lastChat.encoded
    ? '메세지가 도착했습니다.'
    : props.chatRoom.lastChat.message
  if (enc.length > 12) {
    return enc.slice(0, 12) + '...'
  }
  return enc
})
const hasUnread = computed(
  () =>
    props.chatRoom.lastChat.sender !== userStore.myInfo?.id &&
    props.chatRoom.lastChat.id > props.chatRoom.lastRead
)
onMounted(() => {
  console.log(props.chatRoom.lastChat)
})
</script>
<style scoped>
.chat-list-item {
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    'profile header action'
    'profile content content';
  gap: 8px;
  align-items: start;
}

.chat-card-profile {
  grid-area: profile;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: stretch;
}

.chat-card-header {
  grid-area: header;
}

.chat-card-action {
  grid-area: action;
  justify-self: end;
}

.chat-card-contents {
  grid-area: content;
}

.blue-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #3b82f6;
}
</style>
