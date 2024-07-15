<template>
  <PageView footless>
    <template #header>
      <ChatHeader />
    </template>
    <template #main>
      <section class="container chat-container mx-auto">
        <div class="chat-messages">
          <div class="message received">
            <img src="@/assets/images/profile-image.png" alt="User Avatar" class="user-avatar">
            <div class="message-content">
              Hello! <br />
              Multi-line message <br />
              Multi-line message <br />
              Multi-line message <br />
            </div>
          </div>
          <div class="message sent">
            <div class="message-content">Hi there!</div>
          </div>
          <!-- More messages here -->
        </div>
        <div class="input-area">
          <div class="input-wrapper">
            <input type="text" placeholder="메세지 입력">
            <button class="send-button">➤</button>
          </div>
          <button class="heart-button">♡</button>
        </div>
      </section>
    </template>
  </PageView>
</template>
<script setup lang="ts">
import PageView from '@/components/layouts/PageView.vue'
import Container from '@/components/layouts/Container.vue'
import Header from '@/components/layouts/Header.vue'
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'
import { ChatService } from '@/services/chat.service'
import ChatHeader from '@/components/layouts/headers/ChatHeader.vue'

const route = useRoute()
const chatService = new ChatService()

async function fetchPage(pageNo = 1) {
  const roomRef = route.params.ref as string
  const res = await chatService.getChatsByRoom(roomRef, { page: { page: pageNo } })
  console.log(res)
}

onMounted(async () => {
  await fetchPage()
})
</script>
<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
}

.message {
  display: flex;
  margin-bottom: 15px;
  align-items: flex-end;
}

.message.sent {
  justify-content: flex-end;
}

.message-content {
  max-width: 70%;
  padding: 10px 15px;
  border-radius: 18px;
  background-color: #f0f0f0;
  border: 1px solid #000;
  font-size: 14px;
}

.message.sent .message-content {
  background-color: #f0f0f0;
}

.user-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
}

.input-area {
  display: flex;
  padding: 10px;
  border-top: 1px solid #e0e0e0;
  align-items: center;
}

.input-wrapper {
  position: relative;
  flex: 1;
}

.input-area input {
  width: 100%;
  padding: 10px 40px 10px 15px;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  font-size: 14px;
  box-sizing: border-box;
}

.input-area .send-button {
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 5px;
  font-size: 20px;
  color: #999;
  cursor: pointer;
}

.input-area .heart-button {
  background: none;
  border: none;
  padding: 0 10px;
  font-size: 20px;
  color: #999;
  cursor: pointer;
  margin-left: 10px;
}
</style>
