<template>
  <Box class="login-box">
    <h1 class="login-title text-xl font-bold mb-2">
      <a href="/">
        <img src="@/assets/images/logo_mate.png" alt="logo" class="login-logo" />
      </a>
      <b class="mt-1">로그인</b>
    </h1>
    <form>
      <div class="form-control">
        <div class="label">
          <label class="label-text text-xs font-bold" for="username">아이디</label>
        </div>
        <input
          v-model="userInput.id"
          class="input input-bordered w-full"
          type="text"
          name="username"
          placeholder="아이디를 입력해주세요"
        />
      </div>
      <div class="form-control mb-4">
        <div class="label">
          <label class="label-text text-xs font-bold" for="password">비밀번호</label>
        </div>
        <input
          v-model="userInput.pwd"
          class="input input-bordered w-full"
          type="password"
          name="password"
          placeholder="********"
        />
      </div>
      <ProcessButton
        class="btn btn-primary btn-block mb-2"
        :is-disabled="isPress"
        :is-loading="isPress"
        @click="pressLogin"
      >
        로그인
      </ProcessButton>
      <RouterLink to="/" class="btn btn-ghost btn-block btn-sm text-xs"> 뒤로가기</RouterLink>
    </form>
    <div class="links mt-2">
      <a href="https://abundant-laser-136.notion.site/mate-0e1176e6004d42618eea77f8d656bf08" target="_blank">이용약관</a> |
      <a href="https://docs.kysa.page/" target="_blank">사용 설명서</a>
    </div>
  </Box>
</template>
<script setup lang="ts">
import Box from '@/components/layouts/Box.vue'
import { ref } from 'vue'
import ProcessButton from '@/components/inputs/ProcessButton.vue'

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
  userInput.value.id = ''
  userInput.value.pwd = ''
  isPress.value = false
}
</script>
<style scoped>
.login-box {
  background: rgba(255, 255, 255, 0.45);
  box-shadow: 0 8px 32px 0 rgba(251, 86, 7, 0.2);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border: 1px solid theme('colors.gray.50');
}

.login-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.login-logo {
  display: inline-block;
  width: 30px;
  height: 30px;
}

.links {
  text-align: center;
  margin-top: 1rem;
  font-size: 0.9rem;
}

.links {
  color: theme('colors.gray.900');
  text-decoration: none;
}

.links a:hover,
a:active {
  text-decoration: underline;
}
</style>
