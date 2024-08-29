<template>
  <div class="dp-box my-4 shadow">
    <div class="form-wrap">
      <div class="form-box-header mb-4">
        <span class="text-xs">항목추가를 눌러 내 정보를 추가하세요!</span>
        <IconButton class="btn-xs btn-primary" :prefix-icon="PlusIcon" @click="addInfoItem"
        >항목추가
        </IconButton>
      </div>
      <div class="form-box-content">
        <div v-for="(info, idx) in infoList" class="form-row" :key="idx">
          <select v-model="info.key" class="select select-bordered select-sm">
            <option value="" disabled selected>선택</option>
            <option v-for="item in extraList" :value="item.key" :key="item.key">
              {{ item.alias }}
            </option>
          </select>
          <input
            v-model="info.value"
            class="input input-bordered input-sm"
            type="text"
            placeholder="내용을 입력하세요"
            @input="ignoreInput"
          />
          <span class="icon icon-x" @click="() => removeInfoItem(idx)"></span>
        </div>
      </div>
      <ProcessButton
        class="btn btn-sm btn-primary btn-block mt-4"
        :is-loading="isProgress"
        :is-disabled="!hasInput"
        @click="saveInfo"
      >
        저장하기
      </ProcessButton>
    </div>
  </div>
</template>
<script setup lang="ts">
import IconButton from '@/components/inputs/IconButton.vue'
import PlusIcon from '@/assets/icons/Plus.svg'
import ProcessButton from '@/components/inputs/ProcessButton.vue'
import { USER_EXTRA_LIST } from '@/constants/extra.constant'
import { computed, onMounted, ref } from 'vue'
import { UserService } from '@/services/user.service'
import type { User } from '@/types/general.type'
import { useToastStore } from '@/stores/ui/toast.store'

const DEFAULT_INFO_NUM = 5
const MAX_INPUT_LENGTH = 100
const userService = new UserService()
const toastStore = useToastStore()
const extraList = Object.values(USER_EXTRA_LIST)
const emit = defineEmits(['updateDone'])
const props = defineProps<{
  user: User
  extraInfo: any
}>()
const infoList = ref<any[]>(parseInfo())
const isProgress = ref(false)

const hasInput = computed(
  () => infoList.value.some((info) => info.key && info.value) && !isProgress.value
)

onMounted(() => {
  if (infoList.value.length < DEFAULT_INFO_NUM) {
    const num = DEFAULT_INFO_NUM - infoList.value.length
    const arr = Array.from({ length: num }, () =>
      JSON.parse(JSON.stringify({ key: '', value: '' }))
    )
    infoList.value.push(...arr)
  }
})

function parseInfo() {
  const list = []
  for (const key of Object.keys(props.extraInfo)) {
    list.push({ key, value: props.extraInfo[key] })
  }
  return list
}

function addInfoItem() {
  infoList.value.push({ key: '', value: '' })
}

function ignoreInput(e: any) {
  if (e.target.value.length > MAX_INPUT_LENGTH) {
    e.target.value = e.target.value.slice(0, MAX_INPUT_LENGTH)
  }
}

function removeInfoItem(idx: number) {
  if (infoList.value.length > DEFAULT_INFO_NUM) {
    infoList.value.splice(idx, 1)
  }
}

function cleanInfo() {
  const cleaned = new Map()
  for (const info of infoList.value) {
    if (info.key && info.value) {
      cleaned.set(info.key, info.value)
    }
  }
  return Object.fromEntries(cleaned)
}

async function saveInfo() {
  if (!isProgress.value) {
    isProgress.value = true
    try {
      const inst = cleanInfo()
      await userService.updateUserExtra(props.user.ref, inst)
      emit('updateDone')
      toastStore.showToast('내 정보 수정 완료!', 'success')
    } catch (e) {
      console.error(e)
      toastStore.showToast('변경 실패', 'error')
    }
    isProgress.value = false
  }
}
</script>
<style scoped>
.form-wrap {
  padding: 1.2rem;
}

.form-box-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.form-box-content {
  width: 100%;
}

.form-row {
  display: flex;
  width: 100%;
  gap: 10px;
  margin-bottom: 10px;
  align-items: center;
}

.form-row .input {
  flex: 3;
  min-width: 0;
}

.form-row .select {
  flex: 1;
  min-width: 0;
}

.icon-x {
  width: 24px;
  height: 24px;
  mask-image: url('@/assets/icons/Close.svg');
  -webkit-mask-image: url('@/assets/icons/Close.svg');
  background-color: theme('colors.gray.600');
}
</style>
