<template>
  <div class="full-cover">
    <Container>
      <Box class="box text-center">
        <span>정보를 가져오는 중...</span><br />
        <progress class="progress progress-primary w-56"></progress>
      </Box>
    </Container>
  </div>
</template>
<script setup lang="ts">
import Container from '@/components/layouts/Container.vue'
import Box from '@/components/layouts/Box.vue'
</script>
<style scoped>
.full-cover {
  position: absolute;
  display: flex;
  background-color: theme('colors.beige');
  background-image: url('@/assets/images/loading_bg.png');
  background-size: cover;
  background-position: center;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
