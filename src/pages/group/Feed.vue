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
        <Container stretch class="mb-4">
          <GroupProfile
            :group="groupItem!"
            @follow-group="followGroup"
            @unfollow-group="unfollowGroup"
            @delete-group="deleteGroup"
          />
        </Container>
        <Container class="pb-6">
          <CreatePostBox
            :is-writable="isWritable"
            class="mb-4"
            @submit-post="submitCreatePost"
            ref="createPostBox"
          />
          <PostCard
            v-for="p in postList"
            :post="p"
            :group-ref="groupItem!.ref"
            class="mb-4"
            ref="postCards"
            :key="p.id"
            @like-post="(pl) => likePost(p, pl)"
            @open-profile="openProfileModal"
            @delete-post="openDeletePostModal"
          />
          <PageLoader :has-more="hasMore" @load-more="() => fetchPage(nextPage)" />
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
  <Modal :is-show="isRemoveGroup" title="그룹 삭제불가" @modal-close="() => isRemoveGroup">
    <p>그룹에 게시물이 있는 경우 삭제할 수 없습니다. 관리자에게 문의하시기 바랍니다.</p>
    <div class="flex justify-end mt-6">
      <button class="btn btn-primary btn-sm" @click="() => (isRemoveGroup = false)">확인</button>
    </div>
  </Modal>
</template>
<script setup lang="ts">
import PageView from '@/components/layouts/PageView.vue'
import Container from '@/components/layouts/Container.vue'
import { setupListPage } from '@/stores/setups/list.composition'
import { computed, onMounted, ref } from 'vue'
import { GroupService } from '@/services/group.service'
import { PostService } from '@/services/post.service'
import { useRoute, useRouter } from 'vue-router'
import Header from '@/components/layouts/Header.vue'
import Footer from '@/components/layouts/Footer.vue'
import Breadcrumb from '@/components/navigations/Breadcrumb.vue'
import GroupProfile from '@/components/displays/group/GroupProfile.vue'
import CreatePostBox from '@/components/displays/group/CreatePostBox.vue'
import PostCard from '@/components/displays/post/PostCard.vue'
import type { Group, Post, Profile } from '@/types/general.type'
import { genRandStr } from '@/utils/index.util'
import { FileService } from '@/services/file.service'
import { useToastStore } from '@/stores/ui/toast.store'
import InitialLoad from '@/components/layouts/InitialLoad.vue'
import PageLoader from '@/components/layouts/PageLoader.vue'
import UserProfileModal from '@/components/modals/UserProfileModal.vue'
import Modal from '@/components/modals/Modal.vue'

const { pageMeta, isFetching, onRender, hasMore, nextPage, fetchConfig } = setupListPage()
const groupService = new GroupService()
const postService = new PostService()
const fileService = new FileService()
const toastStore = useToastStore()
const route = useRoute()
const router = useRouter()
const groupItem = ref<Group>()
const profileTarget = ref<Profile>()
const isProfile = ref(false)
const postList = ref<Post[]>([])
const createPostBox = ref<typeof CreatePostBox>()
const postCards = ref<(typeof PostCard)[]>([])
const postDeleteItem = ref<Post>()
const isRemovePost = ref(false)
const isRemoveGroup = ref(false)
const isGroupEmpty = computed(() => postList.value.length === 0)
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
  }
])

const isWritable = computed(() => !!groupItem.value?.already)

async function fetchGroup() {
  const groupRef = route.params.ref as string
  groupItem.value = await groupService.getGroupByRef(groupRef)
}

async function fetchPage(pageNo = 1) {
  if (!isFetching.value) {
    isFetching.value = true
    const groupRef = route.params.ref as string
    const res = await postService.listPostsByGroup(groupRef, { page: { page: pageNo } })
    pageMeta.value = res.meta
    if (fetchConfig.mode === 'replace') {
      postList.value = res.list
      fetchConfig.mode = 'append'
    } else if (fetchConfig.mode === 'append') {
      postList.value.push(...res.list)
    }
    isFetching.value = false
  }
}

async function resetPostList() {
  const groupRef = route.params.ref as string
  const res = await postService.listPostsByGroup(groupRef)
  pageMeta.value = res.meta
  postList.value = res.list
}

onMounted(async () => {
  await fetchGroup()
  await fetchPage()
  onRender.value = false
  routerStack.value[1].alias = groupItem.value!.groupName
  routerStack.value[1].path.profile = groupItem.value!.profileImg ?? ''
})

async function likePost(post: Post, payload: any) {
  const isUndo = !payload.isLike ? 'true' : undefined
  await postService.likePost(payload.post.id, { undo: isUndo })
  post.likes += payload.isLike ? 1 : -1
}

async function followGroup() {
  try {
    await groupService.followGroup(groupItem.value!.ref)
    toastStore.showToast('팔로우 성공!', 'success')
    await fetchGroup()
  } catch (e) {
    console.error(e)
    toastStore.showToast('문제가 생겼습니다. 잠시 후 다시 시도해주세요.', 'error')
  }
}

async function unfollowGroup() {
  try {
    await groupService.followGroup(groupItem.value!.ref, { undo: 'true' })
    toastStore.showToast('팔로우를 해제했습니다.', 'info')
    await fetchGroup()
  } catch (e) {
    console.error(e)
    toastStore.showToast('문제가 생겼습니다. 잠시 후 다시 시도해주세요.', 'error')
  }
}

async function openProfileModal(user: Profile) {
  profileTarget.value = user
  isProfile.value = true
}

async function deleteGroup() {
  if (isGroupEmpty.value) {
    try {
      const res = await groupService.deleteGroup(groupItem.value!.ref)
      console.log(res)
      toastStore.showToast('그룹이 삭제되었습니다.', 'success')
      router.replace({ name: 'home' })
    } catch (e) {
      console.error(e)
      toastStore.showToast('문제가 생겼습니다. 잠시 후 다시 시도해주세요.', 'error')
    }
  } else {
    isRemoveGroup.value = true
  }
}

async function openDeletePostModal(post: Post) {
  postDeleteItem.value = post
  isRemovePost.value = true
}

async function deletePost() {
  try {
    const res = await postService.deletePost(postDeleteItem.value!.id)
    console.log(res)
    window.location.reload()
  } catch (e) {
    console.error(e)
    toastStore.showToast('문제가 생겼습니다. 잠시 후 다시 시도해주세요.', 'error')
  }
}

async function submitCreatePost(payload: { postText: string; postImageFile?: any }) {
  if (payload.postText) {
    let urls: any = {}
    try {
      toastStore.showToast('게시물을 업로드 중입니다.', 'up')
      // upload image
      if (payload.postImageFile) {
        const pfd = new FormData()
        const salt = genRandStr(7)
        pfd.append('file', payload.postImageFile)
        urls.postImgUrl = await fileService.uploadPostMedia(salt, pfd)
      }
      // create post payload
      const newPost = {
        groupRef: groupItem.value!.ref,
        message: payload.postText,
        image: urls.postImgUrl?.location
      }
      const res = await postService.createPost(newPost)
      console.log(res)
      toastStore.showToast('게시물이 업로드되었습니다.', 'success')
      await resetPostList()
    } catch (e) {
      console.error(e)
      toastStore.showToast('문제가 생겼습니다. 잠시 후 다시 시도해주세요.', 'error')
    }
    createPostBox.value!.resetUploadState()
  }
}
</script>
<style scoped></style>
