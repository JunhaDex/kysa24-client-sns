<template>
  <PageView headless>
    <template #main>
      <div class="container h-full flex flex-col justify-center align-middle">
        <div class="login-box rounded shadow">
          <h1 class="text-xl font-bold text-primary mb-2">2024 KYSA</h1>
          <h2 class="text-md font-bold mb-2">로그인</h2>
          <p class="text-sm mb-2">청년대회에 오신 여러분들을 환영합니다!</p>
          <form>
            <div class="input-group">
              <div class="label">
                <label class="label-text" for="username">아이디</label>
              </div>
              <input class="input input-bordered w-full" type="text" id="username" name="username"
                     placeholder="john.doe">
            </div>
            <div class="input-group">
              <div class="label">
                <label class="label-text" for="password">비밀번호</label>
              </div>
              <input class="input input-bordered w-full" type="password" id="password" name="password"
                     placeholder="********">
            </div>
            <button class="btn btn-primary btn-block" type="button">로그인</button>
          </form>
          <div class="links mt-2">
            <a href="#">이용약관</a> | <a href="#">사용 설명서</a>
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <Footer />
    </template>
  </PageView>
</template>
<script setup lang="ts">
import PageView from '@/components/layouts/PageView.vue'
import Footer from '@/components/layouts/Footer.vue'
</script>
<style scoped>

.login-box {
  background-color: theme('colors.white');
  padding: 1.5rem;
  width: 100%;
  max-width: 400px;
}

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

.links a:hover, a:active {
  text-decoration: underline;
}
</style>
