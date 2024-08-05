<template>
  <div class="dp-box my-4">
    <form class="form-wrap">
      <div class="form-control">
        <div class="label">
          <label class="label-text text-xs font-bold" for="username">현재 비밀번호</label>
        </div>
        <input
          v-model="userInput.currentPwd"
          class="input input-bordered input-sm w-full"
          type="password"
          name="current-pwd"
          placeholder="******"
        />
      </div>
      <div class="form-control">
        <div class="label">
          <label class="label-text text-xs font-bold" for="username">비밀번호 변경</label>
        </div>
        <input
          v-model="userInput.newPwd"
          class="input input-bordered input-sm w-full"
          type="password"
          name="new-pwd"
          placeholder="******"
          :disabled="!enableChangePwd"
        />
      </div>
      <div class="form-control">
        <div class="label">
          <label class="label-text text-xs font-bold" for="username">비밀번호 확인</label>
        </div>
        <input
          v-model="userInput.pwdConfirm"
          class="input input-bordered input-sm w-full"
          type="password"
          name="pwd-confirm"
          placeholder="******"
          :disabled="!enableChangePwd"
        />
      </div>
      <ProcessButton
        class="btn btn-sm btn-primary btn-block mt-4"
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
import { useToastStore } from '@/stores/ui/toast.store'

const emit = defineEmits(['updateDone'])
const props = defineProps<{
  user: User
}>()
const userService = new UserService()
const toastStore = useToastStore()
const userInput = ref({
  currentPwd: '',
  newPwd: '',
  pwdConfirm: ''
})
const isProgress = ref(false)

const validated = computed(() => {
  return userInput.value.newPwd.length > 4 && userInput.value.newPwd === userInput.value.pwdConfirm && isProgress.value === false
})

const enableChangePwd = computed(() => {
  return userInput.value.currentPwd.length > 4
})

function resetInput() {
  userInput.value = {
    currentPwd: '',
    newPwd: '',
    pwdConfirm: ''
  }
}

async function updateMyPwd() {
  if (!isProgress.value) {
    isProgress.value = true
    try {
      await userService.updateMyPwd(props.user.ref, {
        oldPwd: userInput.value.currentPwd,
        newPwd: userInput.value.newPwd
      })
      emit('updateDone')
      // show modal, reload page
    } catch (e: any) {
      console.error(e.message)
      toastStore.showToast('비밀번호 변경 실패', 'error')
    }
  }
  isProgress.value = false
  resetInput()
}
</script>
<style scoped>
.form-wrap {
  padding: 1.2rem;
}
</style>
