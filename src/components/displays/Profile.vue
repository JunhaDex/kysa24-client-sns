<template>
  <img src="../../assets/images/group-cover.png" alt="group-cover" class="cover-image" />
  <div class="profile-container">
    <div class="profile">
      <img src="../../assets/images/profile-image.png" alt="Profile" class="profile-pic">
      <div class="group-details">
        <slot />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
</script>
<style scoped>
.cover-image {
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
}

.profile-container {
  position: relative;
}

.profile {
  display: flex;
  padding: 0.75rem 1.5rem;
  position: relative;
}

.profile-pic {
  width: 86px;
  height: 86px;
  border-radius: 50%;
  box-sizing: border-box;
  position: absolute;
  top: -40px;
  left: 24px;
  border: 6px solid theme('colors.gray.50');
}

.group-details {
  margin-left: 90px;
}

.group-details h2 {
  margin: 0;
}
</style>
