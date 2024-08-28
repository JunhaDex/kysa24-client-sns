<template>
  <PageView headless>
    <template #main>
      <container>
        <SearchEmpty>
          <span class="text-xl font-bold">🧐&nbsp;페이지를 찾을 수 없습니다.</span>
          <div class="btn-group mt-6">
            <RouterLink class="btn btn-md btn-primary" to="/">홈으로</RouterLink>
          </div>
        </SearchEmpty>
      </container>
    </template>
    <template #footer>
      <Footer />
    </template>
  </PageView>
</template>
<script setup lang="ts">
import PageView from '@/components/layouts/PageView.vue'
import Footer from '@/components/layouts/Footer.vue'
import SearchEmpty from '@/components/layouts/SearchEmpty.vue'
import Container from '@/components/layouts/Container.vue'
</script>
<style scoped></style>
