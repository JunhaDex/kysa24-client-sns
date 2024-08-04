<template>
  <img :src="coverImg ?? ''" alt="group-cover" class="cover-image" />
  <div class="profile-container">
    <div class="profile">
      <img :src="profileImg ?? ''" alt="Profile" class="profile-pic">
      <div class="group-details">
        <slot />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  coverImg?: string
  profileImg?: string
}>()
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
  position: absolute;
  top: -40px;
  left: 24px;
  border: 6px solid theme('colors.gray.50');
}

.group-details {
  margin-left: 90px;
  width: 100%;
}
</style>
