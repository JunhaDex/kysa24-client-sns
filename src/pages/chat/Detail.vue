<template>
  <PageView footless>
    <template #header>
      <ChatHeader />
    </template>
    <template #main>
      <section class="container chat-container mx-auto">
        <div class="chat-messages">
          <div class="chat chat-start">
            <div class="chat-image avatar">
              <img src="@/assets/images/profile-image.png" alt="User Avatar" class="user-avatar">
            </div>
            <div class="chat-bubble">
              Hello! <br />
              Multi-line message <br />
              Multi-line message <br />
              Multi-line message <br />
            </div>
            <div class="chat-footer">오전 11:59</div>
          </div>
          <div class="chat chat-end">
            <div class="chat-bubble chat-bubble-secondary">Hi there!</div>
            <div class="chat-footer">오전 11:59</div>
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
import ChatHeader from '@/components/layouts/headers/ChatHeader.vue'
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'
import { ChatService } from '@/services/chat.service'

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
  max-width: 1096px
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 2rem 1rem;
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
