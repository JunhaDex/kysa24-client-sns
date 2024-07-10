<template>
  <PageView>
    <template #main>
      <Container> Group Feed</Container>
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
