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
          <SearchEmpty v-if="postList.length === 0" />
          <PostCard
            v-else
            v-for="(p, i) in postList"
            :post="p"
            class="mb-4"
            :key="i"
            ref="postCards"
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
import SearchEmpty from '@/components/displays/SearchEmpty.vue'
import type { Group, Post } from '@/types/general.type'

const { pageMeta, isFetching } = setupListPage()
const scrollView = ref<HTMLDivElement>()
const groupService = new GroupService()
const postService = new PostService()
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

onMounted(async () => {
  await fetchGroup()
  await fetchPage()
})

function likePost(payload: any) {}

function submitCreatePost(payload: {
  postText: string
  postImageFile?: any
}) {
  if(payload.postText) {
    try {

    } catch (e) {

    }
  }
}
</script>
<style scoped></style>
