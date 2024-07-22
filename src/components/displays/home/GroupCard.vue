<template>
  <div class="group-info">
    <RouterLink class="cover-image" :to="{name: 'group_feed', params: {ref: group.ref}}">
      <img :src="group.coverImg" alt="Group Cover" class="cover-pic" />
    </RouterLink>
    <div class="profile">
      <img :src="group.profileImg" alt="Group Profile" class="profile-pic" />
      <div class="group-details">
        <h2 class="text-lg">
          <RouterLink class="font-bold" :to="{name: 'group_feed', params: {ref: group.ref}}">{{ group.groupName }}
          </RouterLink>
        </h2>
        <div class="group-meta">
          <span class="group-type">그룹장</span>
          <!--TODO: add badge with anchor -> onclick group.creator.ref-->
          <span class="join-status">{{ group.creator.nickname }}</span>
          <span class="member-count">팔로우 {{ group.followers }}명</span>
        </div>
      </div>
    </div>
    <PostCarousel :item-count="group.posts.length">
      <div v-for="post in group.posts" class="post mb-2 post-carousel-item" :key="post.id">
        <img src="@/assets/images/profile-image.png" alt="User" class="user-avatar" />
        <div class="post-content">
          <h3 class="mr-2">{{ post.author.nickname }}</h3>
          <span class="post-time"
          >{{ getTeamNameById(post.author.teamId) }} • {{ tts(post.createdAt) }}</span
          >
          <p class="post-text">{{ post.message }}</p>
        </div>
      </div>
    </PostCarousel>
    <!--TODO: button design with icons-->
    <button v-if="!followState" class="btn btn-sm btn-primary btn-block" @click="followGroup">
      팔로우
    </button>
    <UnfollowDropdown v-else class="dropdown-end block" :group-ref="group.ref" @unfollow-group="unfollowGroup">
      <button class="btn btn-sm btn-block" role="button" tabindex="0">팔로잉</button>
    </UnfollowDropdown>
  </div>
</template>
<script setup lang="ts">
import type { Group } from '@/types/general.type'
import { setupTeamInfo } from '@/stores/setups/team.composition'
import { tts } from '@/utils/index.util'
import { onMounted, ref } from 'vue'
import { throttle } from 'lodash-es'
import PostCarousel from '@/components/displays/home/PostCarousel.vue'
import UnfollowDropdown from '@/components/inputs/dropdowns/UnfollowDropdown.vue'

const props = defineProps<{
  group: Group
}>()
const emits = defineEmits(['followGroup', 'unfollowGroup'])
defineExpose({ updateFollowState })

const { getTeamNameById } = setupTeamInfo()
const followState = ref(false)

onMounted(() => {
  followState.value = !!props.group.already
})

async function followGroup() {
  throttle(() => {
    emits('followGroup', props.group)
  }, 1000)
}

async function unfollowGroup() {
  throttle(() => {
    emits('unfollowGroup', props.group)
  }, 1000)
}

function updateFollowState(state: boolean) {
  followState.value = state
}
</script>
<style scoped>
.group-info {
  width: 100%;
  position: relative;
}

.cover-image {
  display: block;
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

.post-carousel-item {
  flex: 0 0 100%;
  margin-right: 16px;
}

.post-carousel-item:last-child {
  margin-right: 0;
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
