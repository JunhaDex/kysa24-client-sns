<template>
  <PageView>
    <template #header>
      <Header />
    </template>
    <template #main>
      <Container class="mb-4">
        <Breadcrumb :router-stack="routerStack" />
      </Container>
      <InitialLoad v-if="onRender" />
      <template v-else>
        <Container class="mb-4">
          <PostCard
            :post="postItem!"
            :group-ref="groupRef"
            ref="postCard"
            @like-post="likePost"
            @open-profile="openProfileModal"
            @delete-post="openDeletePostModal"
          />
        </Container>
        <Container class="pb-6">
          <ReplyBox
            :replyList="replyList"
            @submit-reply="submitReply"
            @open-profile="openProfileModal"
            @remove-reply="removeReply"
          />
          <PageLoader class="mt-2" :has-more="hasMore" @load-more="() => fetchPage(nextPage)" />
        </Container>
      </template>
    </template>
    <template #footer>
      <Footer />
    </template>
  </PageView>
  <UserProfileModal
    v-if="profileTarget"
    :user="profileTarget"
    :is-show="isProfile"
    @modal-close="() => (isProfile = false)"
  />
  <Modal :is-show="isRemovePost" title="게시물 삭제" @modal-close="() => (isRemovePost = false)">
    <p>게시물을 삭제하시겠습니까? 한번 삭제하면 복구할 수 없습니다.</p>
    <div class="flex justify-end mt-6">
      <button class="btn btn-secondary btn-sm mr-2" @click="() => (isRemovePost = false)">
        취소
      </button>
      <button class="btn btn-error btn-sm" @click="deletePost">삭제</button>
    </div>
  </Modal>
  <Modal :is-show="isRemoveReply" title="댓글 삭제됨" @modal-close="reloadPage">
    <p>댓글이 삭제되었습니다.</p>
    <div class="flex justify-end mt-6">
      <button class="btn btn-primary btn-sm btn-block" @click="reloadPage">확인</button>
    </div>
  </Modal>
</template>
<script setup lang="ts">
import PageView from '@/components/layouts/PageView.vue'
import Container from '@/components/layouts/Container.vue'
import { PostService } from '@/services/post.service'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import Header from '@/components/layouts/Header.vue'
import Footer from '@/components/layouts/Footer.vue'
import Breadcrumb from '@/components/navigations/Breadcrumb.vue'
import PostCard from '@/components/displays/post/PostCard.vue'
import ReplyBox from '@/components/displays/post/ReplyBox.vue'
import type { Group, Post, Profile, Reply } from '@/types/general.type'
import { setupListPage } from '@/stores/setups/list.composition'
import { useToastStore } from '@/stores/ui/toast.store'
import UserProfileModal from '@/components/modals/UserProfileModal.vue'
import Modal from '@/components/modals/Modal.vue'
import InitialLoad from '@/components/layouts/InitialLoad.vue'
import PageLoader from '@/components/layouts/PageLoader.vue'
import { GroupService } from '@/services/group.service'

const { pageMeta, isFetching, onRender, hasMore, nextPage, fetchConfig } = setupListPage()
const route = useRoute()
const router = useRouter()
const postService = new PostService()
const groupService = new GroupService()
const toastStore = useToastStore()
const groupItem = ref<Group>()
const postItem = ref<Post>()
const replyList = ref<Reply[]>([])
const groupRef = route.params.ref as string
const isProfile = ref(false)
const isRemoveReply = ref(false)
const isRemovePost = ref(false)
const profileTarget = ref<Profile>()
const routerStack = ref([
  {
    alias: '홈',
    path: {
      name: 'home'
    }
  },
  {
    alias: '',
    path: {
      name: 'group_feed',
      params: { ref: route.params.ref },
      profile: ''
    }
  },
  {
    alias: '게시글 상세',
    path: {
      name: 'post_detail',
      params: { id: route.params.id }
    }
  }
])

async function getPost() {
  const rpm = route.params.id as string
  if (isNaN(Number(rpm))) {
    window.location.href = '/404'
    return
  }
  const res = await postService.getPostById(Number(rpm))
  console.log(res)
  postItem.value = res.post
  pageMeta.value = res.reply.meta
  replyList.value.push(...res.reply.list)
}

async function fetchPage(pageNo = 1) {
  const rpm = route.params.id as string
  if (isNaN(Number(rpm))) {
    window.location.href = '/404'
    return
  }
  const postId = Number(rpm)
  if (!isFetching.value) {
    isFetching.value = true
    const res = await postService.getPostReply(postId, { page: { page: pageNo } })
    pageMeta.value = res.meta
    if (fetchConfig.mode === 'replace') {
      replyList.value = res.list
      fetchConfig.mode = 'append'
    } else if (fetchConfig.mode === 'append') {
      replyList.value.push(...res.list)
    }
    isFetching.value = false
  }
}

onMounted(async () => {
  await getPost()
  groupItem.value = await groupService.getGroupByRef(groupRef)
  onRender.value = false
  routerStack.value[1].alias = groupItem.value!.groupName
  routerStack.value[1].path.profile = groupItem.value!.profileImg ?? ''
})

async function openProfileModal(user: Profile) {
  profileTarget.value = user
  isProfile.value = true
}

async function likePost(payload: any) {
  const isUndo = !payload.isLike ? 'true' : undefined
  await postService.likePost(payload.post.id, { undo: isUndo })
  postItem.value!.likes += payload.isLike ? 1 : -1
}

async function submitReply(message: string) {
  if (message.length > 0) {
    try {
      const res = await postService.createReply(postItem.value!.id, { message })
      console.log(res)
      window.location.reload()
    } catch (e) {
      console.error(e)
      toastStore.showToast('댓글을 작성하는 중 오류가 발생했습니다.', 'error')
    }
  }
}

async function removeReply(reply: Reply) {
  try {
    const res = await postService.deleteReply(postItem.value!.id, reply.id)
    console.log(res)
    isRemoveReply.value = true
  } catch (e) {
    console.error(e)
    toastStore.showToast('문제가 생겼습니다. 잠시 후 다시 시도해주세요.', 'error')
  }
}

async function openDeletePostModal() {
  isRemovePost.value = true
}

async function deletePost() {
  try {
    const res = await postService.deletePost(postItem.value!.id)
    console.log(res)
    toastStore.showToast('게시물이 삭제되었습니다.', 'success')
    router.replace({ name: 'group_feed', params: { ref: groupRef } })
  } catch (e) {
    console.error(e)
    toastStore.showToast('문제가 생겼습니다. 잠시 후 다시 시도해주세요.', 'error')
  }
}

async function reloadPage() {
  isProfile.value = false
  isRemoveReply.value = false
  window.location.reload()
}
</script>
<style scoped></style>
