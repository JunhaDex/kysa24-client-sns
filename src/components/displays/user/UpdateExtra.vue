<template>
  <div class="dp-box my-4 shadow">
    <div class="form-wrap">
      <div class="form-box-header mb-4">
        <span class="text-xs">항목추가를 눌러 내 정보를 추가하세요!</span>
        <IconButton class="btn-xs btn-primary" :prefix-icon="PlusIcon" @click="addInfoItem">항목추가</IconButton>
      </div>
      <div class="form-box-content">
        <div v-for="(info, idx) in infoList" class="form-row" :key="idx">
          <select v-model="info.key" class="select select-bordered select-sm">
            <option value="" disabled selected>선택</option>
            <option v-for="item in extraList" :value="item.key" :key="item.key">{{ item.alias }}</option>
          </select>
          <input v-model="info.value" class="input input-bordered input-sm" type="text" placeholder="내용을 입력하세요" />
          <span class="icon icon-x" @click="() => removeInfoItem(idx)"></span>
        </div>
      </div>
      <ProcessButton
        class="btn btn-sm btn-primary btn-block mt-4"
        :is-loading="false"
        :is-disabled="false"
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
import { onMounted, ref } from 'vue'

const extraList = Object.values(USER_EXTRA_LIST)
const props = defineProps<{
  extraInfo: any
}>()
const infoList = ref<any[]>(parseInfo())

onMounted(() => {
  if (infoList.value.length === 0) {
    infoList.value.push({ key: '', value: '' })
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

function removeInfoItem(idx: number) {
  if (infoList.value.length > 1) {
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

function saveInfo() {
  const inst = cleanInfo()
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
