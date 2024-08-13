<template>
  <PageView>
    <template #header>
      <Header />
    </template>
    <template #main>
      <Container>
        <Breadcrumb :router-stack="routerStack" />
      </Container>
      <Container>
        <GroupForm @submit-group-form="createGroup" ref="groupForm" />
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
import Breadcrumb from '@/components/navigations/Breadcrumb.vue'
import { GroupService } from '@/services/group.service'
import { useToastStore } from '@/stores/ui/toast.store'
import GroupForm from '@/components/displays/group/GroupForm.vue'
import { ref } from 'vue'

const routerStack = [
  {
    alias: '홈',
    path: {
      name: 'home'
    }
  },
  {
    alias: '그룹 만들기',
    path: {
      name: 'group_new'
    }
  }
]
const groupService = new GroupService()
const toastStore = useToastStore()
const groupForm = ref<typeof GroupForm>()

async function createGroup(payload: any) {
  try {
    // send request
    const res = await groupService.createGroup(payload)
    console.log(res)
    toastStore.showToast('그룹이 생성되었습니다.', 'success')
  } catch (e) {
    console.error(e)
    toastStore.showToast('그룹을 생성할 수 없습니다. 잠시 후 다시 시도해주세요.', 'error')
  }
  groupForm.value!.resetInput()
}
</script>
<style scoped></style>
