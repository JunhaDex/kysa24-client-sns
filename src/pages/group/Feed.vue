<template>
  <PageView>
    <template #header>
      <Header />
    </template>
    <template #main>
      <Container>
        <Breadcrumb />
      </Container>
      <Container stretch>
        <GroupProfile />
      </Container>
      <Container>
        <CreatePostBox class="mb-4" />
        <PostCard class="mb-4" />
        <SearchEmpty />
      </Container>
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

const { currentPage, isFetching, onRender, hasMore, handleScroll } = setupListPage()
const scrollView = ref<HTMLDivElement>()
const groupService = new GroupService()
const postService = new PostService()
const route = useRoute()

async function fetchGroup() {
  const groupRef = route.params.ref as string
  const res = await groupService.getGroupByRef(groupRef)
  console.log(res)
}

async function fetchPage(pageNo = 1) {
  const groupRef = route.params.ref as string
  const res = await postService.listPostsByGroup(groupRef, { page: { page: pageNo } })
  console.log(res)
}

onMounted(async () => {
  await fetchGroup()
  await fetchPage()
})
</script>
<style scoped></style>
