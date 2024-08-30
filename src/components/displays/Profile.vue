<template>
  <div class="cover-image">
    <img v-if="coverImg" :src="coverImg" alt="group-cover" />
    <p v-else class="cover-image-default">
      '주의 영이... 우리마음 가운데 <br />
      큰 변화를 이루셨으므로'
    </p>
  </div>
  <div class="profile-container">
    <div class="profile">
      <img :src="profileImgDef" alt="Profile" class="profile-pic" @click="clickProfile" />
      <div class="group-details">
        <slot />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import ProfileEmpty from '@/assets/images/profile_empty.png'

const props = defineProps<{
  coverImg?: string
  profileImg?: string
}>()
const emit = defineEmits(['clickProfile'])

const profileImgDef = computed(() => (props.profileImg ? props.profileImg : ProfileEmpty))

function clickProfile() {
  if (props.profileImg) {
    emit('clickProfile')
  }
}
</script>
<style scoped>
.cover-image {
  width: 100%;
  aspect-ratio: 16/9;
  background-color: theme('colors.gray.300');
}

.cover-image-default {
  color: theme('colors.gray.50');
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
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
