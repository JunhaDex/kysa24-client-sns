<template>
  <div class="full-cover">
    <div class="full-skeleton">
      <Container class="progress-box">
        <Box class="box text-center">
          <span>정보를 가져오는 중...</span><br />
          <progress class="progress progress-primary w-56"></progress>
        </Box>
      </Container>
    </div>
    <Backdrop :is-open="true" />
  </div>
</template>
<script setup lang="ts">
import Container from '@/components/layouts/Container.vue'
import Box from '@/components/layouts/Box.vue'
import Backdrop from '@/components/feedbacks/Backdrop.vue'
</script>
<style scoped>
.full-cover {
  position: fixed;
  display: flex;
  background-color: theme('colors.gray.50');
  background-size: cover;
  background-position: center;
  justify-content: center;
  align-items: center;
  top: var(--header-height);
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 6;
}

.full-skeleton {
  position: relative;
  width: 100%;
  height: 100%;
}

.progress-box {
  position: absolute;
  top: 45%;
  left: 50%;
  width: 327px;
  transform: translate(-50%, -50%);
  z-index: 8;
}
</style>
