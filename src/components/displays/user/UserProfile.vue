<template>
  <Profile>
    <div class="user-profile-wrap">
      <div class="name-area">
        <h2>김은지 <span>자매</span></h2>
        <ul>
          <li>13조</li>
          <li>서울남 청년지부</li>
        </ul>
      </div>
      <div class="action-area">
        <button class="btn btn-primary btn-block mb-2">관심 보내기</button>
        <button class="btn btn-block">메세지</button>
      </div>
    </div>
  </Profile>
  <Container>
    <Box>
      <h2>한줄 소개</h2>
      <p>
        안녕하세요! 저는 AI 챗봇, ChatGPT입니다.
        질문에 답변하고 대화를 나누는 것을 좋아해요.
        언제든지 말씀해 주세요!
      </p>
    </Box>
  </Container>
</template>
<script setup lang="ts">
import Profile from '@/components/displays/Profile.vue'
import Container from '@/components/layouts/Container.vue'
import Box from '@/components/layouts/Box.vue'
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
</style>
