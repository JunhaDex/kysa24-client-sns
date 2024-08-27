<template>
  <Box>
    <div class="post">
      <div class="post-profile">
        <div class="profile-pic">
          <img :src="profileImg" alt="author profile" />
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
        <PostHandleDropdown
          class="dropdown-end"
          :post-reply-id="post.id"
          :is-author="post.author.ref === userStore.myInfo?.ref"
          @open-profile="() => emit('openProfile', post.author)"
          @delete-instance="() => emit('deletePost', post)"
        >
          <IconButton
            class="btn-sm btn-ghost btn-square"
            :prefix-icon="VMoreIcon"
            role="button"
            tabindex="0"
          />
        </PostHandleDropdown>
      </div>
      <div class="post-content">
        <p>{{ post.message }}</p>
        <div v-if="!isImageFail" class="post-media">
          <img :src="post.image" alt="media" @error="disableImage" />
        </div>
      </div>
      <div class="post-stats">
        <span class="post-stats-item" @click="clickLike">
          <transition :name="likeState ? 'like-expand' : ''" mode="out-in">
            <span v-if="likeState" class="icon icon-like"></span>
            <span v-else class="icon icon-unlike"></span>
          </transition>
          <span>Like {{ post.likes }}</span>
        </span>
        <RouterLink
          class="post-stats-item"
          :to="{ name: 'post_detail', params: { ref: groupRef, id: post.id } }"
        >
          <img class="profile-md" src="@/assets/icons/Comment.svg" alt="Comment Button" />
          <span>Reply {{ post.comments }}</span>
        </RouterLink>
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
import { computed, onMounted, ref } from 'vue'
import { throttle } from 'lodash-es'
import PostHandleDropdown from '@/components/inputs/dropdowns/PostHandleDropdown.vue'
import VMoreIcon from '@/assets/icons/VMore.svg'
import ProfileEmpty from '@/assets/images/profile_empty.png'
import { useUserStore } from '@/stores/user.store'
import '@/assets/card.css'

const props = defineProps<{
  post: Post
  groupRef: string
}>()
const emit = defineEmits(['likePost', 'openProfile', 'deletePost'])
const userStore = useUserStore()
const likeState = ref(!!props.post.already)
const isImageFail = ref(false)
const profileImg = computed(() =>
  props.post.author.profileImg ? props.post.author.profileImg : ProfileEmpty
)

onMounted(() => {
  isImageFail.value = !props.post.image
})

const throttleLike = throttle(
  () => {
    likeState.value = !likeState.value
    emit('likePost', { post: props.post, isLike: likeState.value })
  },
  1000,
  { trailing: false }
)

function clickLike() {
  throttleLike()
}

function disableImage() {
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

.post-stats-item {
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: center;
}

.icon-unlike {
  width: 24px;
  height: 24px;
  mask-image: url('@/assets/icons/Like.svg');
  -webkit-mask-image: url('@/assets/icons/Like.svg');
  background-color: theme('colors.black');
}

.icon-like {
  width: 24px;
  height: 24px;
  mask-image: url('@/assets/icons/LikeFill.svg');
  -webkit-mask-image: url('@/assets/icons/LikeFill.svg');
  background-color: theme('colors.error');
}

.like-expand-enter-active {
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.like-expand-enter-from {
  transform: scale(0);
  opacity: 0;
}

.like-expand-enter-to {
  transform: scale(1.2);
}
</style>
