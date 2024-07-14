<template>
  <PageView>
    <template #header>
      <Header />
    </template>
    <template #main>
      <Container>
        <Breadcrumb />
      </Container>
      <Container>
        <PostCard />
      </Container>
      <Container>
        <ReplyBox />
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
import { PostService } from '@/services/post.service'
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'
import Header from '@/components/layouts/Header.vue'
import Footer from '@/components/layouts/Footer.vue'
import Breadcrumb from '@/components/navigations/Breadcrumb.vue'
import PostCard from '@/components/displays/post/PostCard.vue'
import Box from '@/components/layouts/Box.vue'
import ReplyBox from '@/components/displays/post/ReplyBox.vue'

const route = useRoute()
const postService = new PostService()

async function getPost() {
  const rpm = route.params.id as string
  if (isNaN(Number(rpm))) {
    window.location.href = '/404'
    return
  }
  const res = await postService.getPostById(Number(rpm))
  console.log(res)
}

async function fetchPage(pageNo = 1) {
  const rpm = route.params.id as string
  if (isNaN(Number(rpm))) {
    window.location.href = '/404'
    return
  }
  const postId = Number(rpm)
  const res = await postService.getPostReply(Number(postId), { page: { page: pageNo } })
  console.log(res)
}

onMounted(async () => {
  await getPost()
  await fetchPage()
})
</script>
<style scoped>

</style>
