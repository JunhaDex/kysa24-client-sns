<template>
  <PageView>
    <template #header>
      <Header />
    </template>
    <template #main>
      <Container class="mb-4">
        <Breadcrumb />
      </Container>
      <template v-if="groupItem">
        <Container stretch class="mb-4">
          <GroupProfile :group="groupItem" />
        </Container>
        <Container>
          <CreatePostBox class="mb-4" @submit-post="submitCreatePost" />
          <PostCard
            v-for="p in postList"
            :post="p"
            :group-ref="groupItem.ref"
            class="mb-4"
            ref="postCards"
            :key="p.id"
            @like-post="(pl) => likePost(p, pl)"
          />
        </Container>
      </template>
    </template>
    <template #footer>
      <Footer />
    </template>
  </PageView>
</template>
<script setup lang="ts">
import PageView from '@/components/layouts/PageView.vue'
import Container from '@/components/layouts/Container.vue'
import { setupListPage } from '@/stores/setups/list.composition'
import { onMounted, ref } from 'vue'
import { GroupService } from '@/services/group.service'
import { PostService } from '@/services/post.service'
import { useRoute } from 'vue-router'
import Header from '@/components/layouts/Header.vue'
import Footer from '@/components/layouts/Footer.vue'
import Breadcrumb from '@/components/navigations/Breadcrumb.vue'
import GroupProfile from '@/components/displays/group/GroupProfile.vue'
import CreatePostBox from '@/components/displays/group/CreatePostBox.vue'
import PostCard from '@/components/displays/post/PostCard.vue'
import type { Group, Post } from '@/types/general.type'
import { genRandStr } from '@/utils/index.util'
import { FileService } from '@/services/file.service'
import { useToastStore } from '@/stores/ui/toast.store'

const { pageMeta, isFetching } = setupListPage()
const scrollView = ref<HTMLDivElement>()
const groupService = new GroupService()
const postService = new PostService()
const fileService = new FileService()
const toastStore = useToastStore()
const route = useRoute()
const groupItem = ref<Group>()
const postList = ref<Post[]>([])
const postCards = ref<(typeof PostCard)[]>([])

async function fetchGroup() {
  const groupRef = route.params.ref as string
  groupItem.value = await groupService.getGroupByRef(groupRef)
}

async function fetchPage(pageNo = 1) {
  if (!isFetching.value) {
    isFetching.value = true
    const groupRef = route.params.ref as string
    const res = await postService.listPostsByGroup(groupRef, { page: { page: pageNo } })
    console.log(res)
    pageMeta.value = res.meta
    postList.value.push(...res.list)
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
})

async function likePost(post: Post, payload: any) {
  const isUndo = !payload.isLike ? 'true' : undefined
  await postService.likePost(payload.post.id, { undo: isUndo })
  post.likes += payload.isLike ? 1 : -1
}

async function submitCreatePost(payload: { postText: string; postImageFile?: any }) {
  if (payload.postText) {
    let urls: any = {}
    try {
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
      await resetPostList()
    } catch (e) {
      console.error(e)
      toastStore.showToast('문제가 생겼습니다. 잠시 후 다시 시도해주세요.', 'error')
    }
  }
}
</script>
<style scoped></style>
