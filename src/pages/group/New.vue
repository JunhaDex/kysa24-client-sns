<template>
  <PageView>
    <template #header>
      <Header />
    </template>
    <template #main>
      <Container>
        <div class="dp-box mt-4">
          <div class="box-header" id="header-container">
            <img id="cover-preview" src="" alt="">
            <div class="box-header-text">클릭해서 커버 이미지를 등록하세요</div>
          </div>
          <div class="profile-picture" id="profile-container">
            <!--            <img id="profile-preview" src="@/assets/images/profile-image.png" alt="">-->
            <span>
              프로필<br />
              이미지
            </span>
          </div>
          <form class="form-wrap">
            <input type="file" id="cover-input" class="hidden" accept="image/*">
            <input type="file" id="profile-input" class="hidden" accept="image/*">
            <div class="input-group">
              <div class="label">
                <label class="label-text" for="username">그룹 이름</label>
              </div>
              <input
                class="input input-bordered w-full"
                type="text"
                name="username"
                placeholder="그룹 이름을 입력해주세요."
              />
            </div>
            <div class="input-group">
              <div class="label">
                <label class="label-text" for="username">그룹 공지</label>
              </div>
              <textarea
                class="input input-bordered w-full"
                type="text"
                name="username"
                placeholder="그룹 이름을 입력해주세요."
              />
            </div>
            <div class="checkbox-group">
              <input type="checkbox" id="terms">
              <label for="terms">표준을 준수하고 이용약관에 동의합니다.</label>
            </div>
            <ProcessButton class="btn btn-primary btn-block" :is-disabled="false">
              그룹 만들기
            </ProcessButton>
          </form>
        </div>
      </Container>
    </template>
    <template #footer>
      <Footer />
    </template>
  </PageView>
</template>
<script setup lang="ts">
import PageView from '@/components/layouts/PageView.vue'
import Header from '@/components/layouts/Header.vue'
import Footer from '@/components/layouts/Footer.vue'
import Container from '@/components/layouts/Container.vue'
import ProcessButton from '@/components/inputs/ProcessButton.vue'
</script>
<style scoped>
.dp-box {
  position: relative;
}

.input-group {
  margin-bottom: 1rem;
}

.box-header {
  background-color: #ccc;
  border-radius: 0.5rem 0.5rem 0 0;
  aspect-ratio: 16 / 9;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.box-header img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
}

.box-header-text {
  display: flex;
  color: theme('colors.white');
  height: 100%;
  justify-content: center;
  align-items: center;
}

.profile-picture {
  width: 86px;
  height: 86px;
  border-radius: 50%;
  background-color: #ccc;
  border: 6px solid theme('colors.white');
  overflow: hidden;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -43px;
  left: 24px;
  cursor: pointer;
}

.profile-picture img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.form-wrap {
  padding: calc(43px + 1.5rem) 1.5rem 1.5rem 1.5rem;
}

.checkbox-group {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.checkbox-group input {
  margin-right: 10px;
}
</style>
