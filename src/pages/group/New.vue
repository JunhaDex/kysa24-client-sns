<template>
  <PageView>
    <template #header>
      <Header />
    </template>
    <template #main>
      <Container>
        <div class="dp-box mt-4">
          <div class="box-header" id="header-container" ref="coverArea">
            <img v-if="userInput.coverImage" id="cover-preview" :src="userInput.coverImage" alt="">
            <div v-else class="box-header-text">클릭해서 커버 이미지를 등록하세요</div>
          </div>
          <div class="profile-picture" id="profile-container" ref="profileArea">
            <img v-if="userInput.profileImage" id="profile-preview" :src="userInput.profileImage" alt="">
            <span v-else>
              프로필<br />
              이미지
            </span>
          </div>
          <form class="form-wrap">
            <input type="file" id="cover-input" class="hidden" accept="image/*" ref="coverInput">
            <input type="file" id="profile-input" class="hidden" accept="image/*" ref="profileInput">
            <div class="input-group">
              <div class="label">
                <label class="label-text" for="username">그룹 이름</label>
              </div>
              <input
                v-model="userInput.groupName"
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
                v-model="userInput.groupNotice"
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
import { onMounted, ref } from 'vue'

const coverArea = ref<HTMLDivElement>()
const profileArea = ref<HTMLDivElement>()
const coverInput = ref<HTMLInputElement>()
const profileInput = ref<HTMLInputElement>()
const userInput = ref<{
  coverImage: any
  profileImage: any
  coverFile: any
  profileFile: any
  groupName: string
  groupNotice: string
}>({
  coverImage: null,
  profileImage: null,
  coverFile: null,
  profileFile: null,
  groupName: '',
  groupNotice: ''
})

onMounted(async () => {
  handleAreaClick(coverArea.value!, coverInput.value!, 'cover')
  handleAreaClick(profileArea.value!, profileInput.value!, 'profile')
})

function handleAreaClick(area: HTMLDivElement, input: HTMLInputElement, target: 'cover' | 'profile') {
  area.addEventListener('click', () => {
    input.click()
  })
  input.addEventListener('change', function() {
    const file = this.files![0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (target === 'cover') {
          userInput.value.coverFile = file
          userInput.value.coverImage = e.target!.result
        } else {
          userInput.value.profileFile = file
          userInput.value.profileImage = e.target!.result
        }
      }
      reader.readAsDataURL(file)
    }
  })
}


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
