<template>
  <PageView>
    <template #header>
      <Header />
    </template>
    <template #main>
      <Container class="mb-4">
        <Breadcrumb />
      </Container>
      <InitialLoad v-if="onRender" />
      <template v-else>
        <Container class="mb-4">
          <PostCard :post="postItem!" :group-ref="groupRef" ref="postCard" @like-post="likePost" />
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
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import Header from '@/components/layouts/Header.vue'
import Footer from '@/components/layouts/Footer.vue'
import Breadcrumb from '@/components/navigations/Breadcrumb.vue'
import PostCard from '@/components/displays/post/PostCard.vue'
import ReplyBox from '@/components/displays/post/ReplyBox.vue'
import type { Post, Reply, User } from '@/types/general.type'
import { setupListPage } from '@/stores/setups/list.composition'
import { useToastStore } from '@/stores/ui/toast.store'
import UserProfileModal from '@/components/modals/UserProfileModal.vue'
import Modal from '@/components/modals/Modal.vue'
import InitialLoad from '@/components/layouts/InitialLoad.vue'
import PageLoader from '@/components/layouts/PageLoader.vue'

const { pageMeta, isFetching, onRender, hasMore, nextPage, fetchConfig } = setupListPage()
const route = useRoute()
const postService = new PostService()
const toastStore = useToastStore()
const postItem = ref<Post>()
const replyList = ref<Reply[]>([])
const groupRef = route.params.ref as string
const isProfile = ref(false)
const isRemoveReply = ref(false)
const profileTarget = ref<User>()

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
  onRender.value = false
})

async function openProfileModal(user: User) {
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
    toastStore.showToast('오류! 잠시 뒤 다시 시도하시기 바랍니다.', 'error')
  }
}

async function reloadPage() {
  isProfile.value = false
  isRemoveReply.value = false
  window.location.reload()
}
</script>
<style scoped></style>
