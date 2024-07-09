<template>
  <Box>
    <h1 class="text-xl font-bold text-primary mb-2">2024 KYSA</h1>
    <h2 class="text-md font-bold mb-2">로그인</h2>
    <p class="text-sm mb-2">청년대회에 오신 여러분들을 환영합니다!</p>
    <form>
      <div class="input-group">
        <div class="label">
          <label class="label-text" for="username">아이디</label>
        </div>
        <input
          v-model="userInput.id"
          class="input input-bordered w-full"
          type="text"
          id="username"
          name="username"
          placeholder="john.doe"
        />
      </div>
      <div class="input-group">
        <div class="label">
          <label class="label-text" for="password">비밀번호</label>
        </div>
        <input
          v-model="userInput.pwd"
          class="input input-bordered w-full"
          type="password"
          id="password"
          name="password"
          placeholder="********"
        />
      </div>
      <button class="btn btn-primary btn-block" type="button" @click="pressLogin">로그인</button>
    </form>
    <div class="links mt-2"><a href="#">이용약관</a> | <a href="#">사용 설명서</a></div>
  </Box>
</template>
<script setup lang="ts">
import Box from '@/components/layouts/Box.vue'
import { ref } from 'vue'

const emit = defineEmits(['login'])
defineExpose({ releaseLogin })
const isPress = ref<boolean>(false)
const userInput = ref<{ id: string; pwd: string }>({
  id: '',
  pwd: ''
})

function pressLogin() {
  isPress.value = true
  emit('login', userInput.value)
}

function releaseLogin() {
  isPress.value = false
}
</script>
<style scoped>
.input-group {
  margin-bottom: 1rem;
}

.links {
  text-align: center;
  margin-top: 1rem;
  font-size: 0.9rem;
}

.links {
  color: theme('colors.gray.600');
  text-decoration: none;
}

.links a:hover,
a:active {
  text-decoration: underline;
}
</style>
