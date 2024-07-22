<template>
  <Box>
    <div class="chat-list-item">
      <div class="chat-card-profile">
        <div class="profile-pic"></div>
      </div>
      <div class="chat-card-header text-lg">
        <strong>김적재</strong>
        <span class="text-xs ml-2">11:45</span>
      </div>
      <div class="chat-card-action">
        <ChatListDropdown class="dropdown-end" user-ref="1">
          <IconButton class="btn-xs btn-ghost" image="vmore" role="button" tabindex="0" />
        </ChatListDropdown>
      </div>
      <div class="chat-card-contents">
        <p>어디야 지금 뭐해?</p>
      </div>
    </div>
  </Box>
</template>
<script setup lang="ts">
import Box from '@/components/layouts/Box.vue'
import '@/assets/card.css'
import IconButton from '@/components/inputs/IconButton.vue'
import ChatListDropdown from '@/components/inputs/dropdowns/ChatListDropdown.vue'
</script>
<style scoped>
.chat-list-item {
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-rows: auto 1fr;
  grid-template-areas:
        "profile header action"
        "profile content content";
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
