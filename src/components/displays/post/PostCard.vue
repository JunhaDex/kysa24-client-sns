<template>
  <Box>
    <div class="post">
      <div class="post-profile">
        <div class="profile-pic"></div>
      </div>
      <div class="post-header">
        <strong>김적재</strong><br />
        <span class="text-xs">13조 • 1분 전</span>
      </div>
      <div class="post-action">
        <IconButton class="btn-xs btn-ghost" image="vmore" />
      </div>
      <div class="post-content">
        <p>어디야 지금 뭐해? 나랑 별 보러 가지 않을래? 너희 집 앞으로 잠깐 나올래? 가볍게 걷 좀 하나 걸치고서 나오면 돼 ⭐</p>
      </div>
      <div class="post-media">
        <img src="@/assets/images/group-cover.png" alt="media" />
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
import IconButton from '@/components/inputs/IconButton.vue'
import '@/assets/card.css'
</script>
<style>
.post {
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-areas:
        "profile header action"
        "content content content"
        "media media media"
        "stats stats stats";
  gap: 8px;
  align-items: start;
}

.post-profile {
  grid-area: profile;
}

.post-header {
  grid-area: header;
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

.post-media {
  grid-area: media;
  overflow: hidden;
}

.post-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  aspect-ratio: 1 / 1;
  border-radius: 8px;
}

.post-stats {
  grid-area: stats;
  display: flex;
  gap: 15px;
  font-size: 0.9em;
  color: #555;
}
</style>
