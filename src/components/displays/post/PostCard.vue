<template>
  <Box>
    <div class="post">
      <div class="post-profile">
        <div class="profile-pic">
          <img :src="post.author.profileImg" alt="author profile" />
        </div>
      </div>
      <div class="post-header">
        <strong>
          {{ post.author.nickname }}
        </strong>
        <br />
        <span class="text-xs">
          {{ getTeamNameById(post.author.teamId) }} • {{ tts(post.createdAt) }}
        </span>
      </div>
      <div class="post-action">
        <UserHandleDropdown class="dropdown-end" :post-reply-id="post.id" is-author>
          <IconButton class="btn-sm btn-ghost btn-square" :prefix-icon="VMoreIcon" role="button" tabindex="0" />
        </UserHandleDropdown>
      </div>
      <div class="post-content">
        <p>{{ post.message }}</p>
        <div v-if="!isImageFail" class="post-media">
          <!--TODO: debug on @error hook-->
          <img :src="post.image" alt="media" @error="disableImage" />
        </div>
      </div>
      <div class="post-stats">
        <span @click="clickLike">
          <img class="profile-md" src="@/assets/icons/Like.svg" alt="Like Button" />
          <span>Like {{ post.likes }}</span>
        </span>
        <span>
          <img class="profile-md" src="@/assets/icons/Comment.svg" alt="Comment Button" />
          <span>Reply {{ post.comments }}</span>
        </span>
      </div>
    </div>
  </Box>
</template>
<script setup lang="ts">
import Box from '@/components/layouts/Box.vue'
import IconButton from '@/components/inputs/IconButton.vue'
import type { Post } from '@/types/general.type'
import { tts } from '@/utils/index.util'
import { setupTeamInfo } from '@/stores/setups/team.composition'
import { onMounted, ref } from 'vue'
import { throttle } from 'lodash-es'
import UserHandleDropdown from '@/components/inputs/dropdowns/PostHandleDropdown.vue'
import VMoreIcon from '@/assets/icons/VMore.svg'
import '@/assets/card.css'

const props = defineProps<{
  post: Post
}>()
const emits = defineEmits(['likePost'])
const likeState = ref(false)
const isImageFail = ref(false)

onMounted(() => {
  likeState.value = !!props.post.iLikes
  isImageFail.value = !props.post.image
})

function clickLike() {
  throttle(() => {
    likeState.value = !likeState.value
    emits('likePost', { post: props.post, isLike: likeState })
  }, 1000)
}

function disableImage(e) {
  console.log('err hook')
  isImageFail.value = true
}

const { getTeamNameById } = setupTeamInfo()
</script>
<style>
.post {
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-areas:
    'profile header action'
    'content content content'
    'stats stats stats';
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

.post-content {
  grid-area: content;
  line-height: 1.4;
}

.post-media {
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

.post-stats span {
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: center;
}

.post-stats span img {
  display: inline-block;
}
</style>
