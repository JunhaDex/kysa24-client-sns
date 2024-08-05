<template>
  <div class="dp-box my-4">
    <form class="form-wrap">
      <div class="form-control">
        <div class="label">
          <label class="label-text" for="username">현재 비밀번호</label>
        </div>
        <input
          class="input input-bordered text-sm w-full"
          type="password"
          name="current-pwd"
          placeholder="******"
        />
      </div>
      <div class="form-control">
        <div class="label">
          <label class="label-text" for="username">비밀번호 변경</label>
        </div>
        <input
          class="input input-bordered text-sm w-full"
          type="password"
          name="new-pwd"
          placeholder="******"
          :disabled="!enableChangePwd"
        />
      </div>
      <div class="form-control">
        <div class="label">
          <label class="label-text" for="username">비밀번호 확인</label>
        </div>
        <input
          class="input input-bordered text-sm w-full"
          type="password"
          name="pwd-confirm"
          placeholder="******"
          :disabled="!enableChangePwd"
        />
      </div>
      <ProcessButton
        class="btn btn-sm btn-primary btn-block"
        :is-disabled="!validated"
        :is-loading="isProgress"
        @click="updateMyPwd"
      >
        비밀번호 변경하기
      </ProcessButton>
    </form>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import ProcessButton from '@/components/inputs/ProcessButton.vue'
import { UserService } from '@/services/user.service'
import type { User } from '@/types/general.type'

const emit = defineEmits(['updateDone'])
const props = defineProps<{
  user: User
}>()
const userService = new UserService()
const userInput = ref({
  currentPwd: '',
  newPwd: '',
  pwdConfirm: ''
})
const validated = computed(() => {
  return userInput.value.newPwd.length >= 6 && userInput.value.newPwd === userInput.value.pwdConfirm
})

const isProgress = ref(false)

const enableChangePwd = computed(() => {
  return userInput.value.currentPwd.length >= 6
})

async function updateMyPwd() {
  if (!isProgress.value) {
    isProgress.value = true
    await userService.updateMyPwd(props.user.ref, {
      oldPwd: userInput.value.currentPwd,
      newPwd: userInput.value.newPwd
    })
    emit('updateDone')
    // show modal, reload page
  }
  isProgress.value = false
}
</script>
<style scoped>
.form-wrap {
  padding: 1.2rem;
}
</style>
