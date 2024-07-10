<template>
  <PageView>
    <template #main>
      <Container> Post Detail</Container>
    </template>
  </PageView>
</template>
<script setup lang="ts">
import PageView from '@/components/layouts/PageView.vue'
import Container from '@/components/layouts/Container.vue'
import { PostService } from '@/services/post.service'
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'

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
<style scoped></style>
