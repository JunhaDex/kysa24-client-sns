<template>
  <Box>
    <div class="chat-list-item">
      <div class="chat-card-profile">
        <div class="profile-pic"></div>
      </div>
      <RouterLink :to="{ name: 'chat_room', params: { ref: chatRoom.ref } }">
        <div class="chat-card-header text-lg">
          <strong>{{ chatRoom.title }}</strong>
          <span class="text-xs ml-2">{{ tts(chatRoom.lastChat.createdAt) }}</span>
        </div>
      </RouterLink>
      <div class="chat-card-action">
        <ChatListDropdown class="dropdown-end" user-ref="1">
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
          <p>{{ chatRoom.lastChat.message }}</p>
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

const props = defineProps<{
  chatRoom: ChatRoom
}>()
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
</style>
