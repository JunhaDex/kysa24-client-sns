<template>
  <div class="group-info">
    <div class="cover-image">
      <img src="@/assets/images/group-cover.png" alt="Cover" class="cover-pic">
    </div>
    <div class="profile">
      <img src="@/assets/images/profile-image.png" alt="Profile" class="profile-pic">
      <div class="group-details">
        <h2 class="text-lg font-bold">축구 좋아하는 사람들 모임</h2>
        <div class="group-meta">
          <span class="group-type">그룹장</span>
          <span class="join-status">안유진</span>
          <span class="member-count">팔로우 132명</span>
        </div>
      </div>
    </div>
    <div class="post mb-2">
      <img src="@/assets/images/profile-image.png" alt="User" class="user-avatar">
      <div class="post-content">
        <h3 class="mr-2">임솜아</h3>
        <span class="post-time">13조 • 1분전</span>
        <p class="post-text">포스트 미리보기 한줄만 표시 몇 자까지....</p>
      </div>
    </div>
    <button class="btn btn-sm btn-primary btn-block">팔로우</button>
    <hr class="mt-2 mb-4" />
  </div>
</template>
<script setup lang="ts">
</script>
<style scoped>
.group-info {
  width: 100%;
  position: relative;
}

.cover-image {
  width: 100%;
  aspect-ratio: 16 / 9;
  background-color: #dddddd;
  border-radius: 12px;
  overflow: hidden;
}

.profile {
  display: flex;
  padding: 16px;
  position: relative;
}

.profile-pic {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  box-sizing: border-box;
  position: absolute;
  top: -30px;
  left: 16px;
  border: 6px solid #ffffff;
}

.cover-pic {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.group-details {
  margin-left: 72px;
}

.group-details h2 {
  margin: 0;
}

.group-meta {
  font-size: 14px;
  color: #666;
}

.post {
  display: flex;
  padding: 16px;
  box-sizing: border-box;
  background-color: #fff;
  border: #666 1px solid;
  border-radius: 0.5rem;
}

.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-right: 8px;
}

.post-content h3 {
  display: inline-block;
  font-size: 16px;
}

.post-time {
  font-size: 12px;
  color: #666;
}

.post-text {
  margin: 5px 0 0;
  font-size: 14px;
}
</style>
