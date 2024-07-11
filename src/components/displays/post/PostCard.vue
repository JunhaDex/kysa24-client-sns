<template>
  <Box>
    <div class="post">
      <div class="post-profile">
        <div class="profile-pic"></div>
      </div>
      <div class="post-header">
        <div class="user-info">
          <strong>김적재</strong>
          <span class="post-time">13조 • 1분 전</span>
        </div>
      </div>
      <div class="post-action">
        <button class="action-button">⋮</button>
      </div>
      <div class="post-content">
        <p>어디야 지금 뭐해? 나랑 별 보러 가지 않을래? 너희 집 앞으로 잠깐 나올래? 가볍게 걷 좀 하나 걸치고서 나오면 돼 ⭐</p>
      </div>
      <div class="post-stats">
        <span>Like 13</span>
        <span>Reply 7</span>
      </div>
    </div>
  </Box>
</template>
<script setup lang="ts">
import Box from '@/components/layouts/Box.vue'
</script>
<style>
.post {
  background-color: white;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-areas:
        "profile header action"
        "content content content"
        "stats stats stats";
  gap: 10px;
  align-items: start;
}

.post-profile {
  grid-area: profile;
}

.profile-pic {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ddd;
}

.post-header {
  grid-area: header;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.post-time {
  font-size: 0.8em;
  color: #777;
}

.post-action {
  grid-area: action;
  justify-self: end;
}

.action-button {
  background: none;
  border: none;
  font-size: 1.2em;
  cursor: pointer;
  padding: 0 5px;
}

.post-content {
  grid-area: content;
  line-height: 1.4;
}

.post-stats {
  grid-area: stats;
  display: flex;
  gap: 15px;
  font-size: 0.9em;
  color: #555;
}
</style>
