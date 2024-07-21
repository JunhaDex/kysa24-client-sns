<template>
  <PageView>
    <template #header>
      <Header />
    </template>
    <template #main>
      <Container>
        <Breadcrumb />
      </Container>
      <template v-if="postItem">
        <Container>
          <PostCard :post="postItem" />
        </Container>
        <Container>
          <ReplyBox :replyList="replyList" />
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
import { PostService } from '@/services/post.service'
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import Header from '@/components/layouts/Header.vue'
import Footer from '@/components/layouts/Footer.vue'
import Breadcrumb from '@/components/navigations/Breadcrumb.vue'
import PostCard from '@/components/displays/post/PostCard.vue'
import ReplyBox from '@/components/displays/post/ReplyBox.vue'
import type { Post, Reply } from '@/types/general.type'
import { setupListPage } from '@/stores/setups/list.composition'
import { post } from 'axios'

const { pageMeta, isFetching } = setupListPage()
const route = useRoute()
const postService = new PostService()
const postItem = ref<Post>()
const replyList = ref<Reply[]>([])

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
    console.log(res)
    pageMeta.value = res.meta
    replyList.value.push(...res.list)
    isFetching.value = false
  }
}

onMounted(async () => {
  await getPost()
  await fetchPage()
})
</script>
<style scoped></style>
