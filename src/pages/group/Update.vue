<template>
  <PageView beige>
    <template #header>
      <Header />
    </template>
    <template #main>
      <Container>
        <Breadcrumb :router-stack="routerStack" />
      </Container>
      <InitialLoad v-if="onRender" />
      <Container v-else>
        <GroupForm @submit-group-form="updateGroup" ref="groupForm" :group="groupItem" />
      </Container>
    </template>
    <template #footer>
      <Footer />
    </template>
  </PageView>
</template>
<script setup lang="ts">
import Header from '@/components/layouts/Header.vue'
import Footer from '@/components/layouts/Footer.vue'
import PageView from '@/components/layouts/PageView.vue'
import Container from '@/components/layouts/Container.vue'
import Breadcrumb from '@/components/navigations/Breadcrumb.vue'
import GroupForm from '@/components/displays/group/GroupForm.vue'
import InitialLoad from '@/components/layouts/InitialLoad.vue'
import { onMounted, ref } from 'vue'
import type { Group } from '@/types/general.type'
import { useRoute } from 'vue-router'
import { GroupService } from '@/services/group.service'
import { useToastStore } from '@/stores/ui/toast.store'

const groupService = new GroupService()
const toastStore = useToastStore()
const groupItem = ref<Group>()
const onRender = ref(true)
const route = useRoute()
const groupForm = ref<typeof GroupForm>()
const routerStack = ref([
  {
    alias: '홈',
    path: {
      name: 'home'
    }
  },
  {
    alias: '',
    path: {
      name: 'group_feed',
      params: { ref: route.params.ref },
      profile: ''
    }
  },
  {
    alias: '그룹 수정',
    path: {
      name: 'group_update',
      params: { ref: route.params.ref }
    }
  }
])

onMounted(async () => {
  const groupRef = route.params.ref as string
  groupItem.value = await groupService.getGroupByRef(groupRef)
  onRender.value = false
  routerStack.value[1].alias = groupItem.value!.groupName
  routerStack.value[1].path.profile = groupItem.value!.profileImg
})

async function updateGroup(payload: any) {
  try {
    await groupService.updateGroup(groupItem.value!.ref, {
      profileImg: payload.profileImg,
      coverImg: payload.coverImg,
      introduce: payload.introduce
    })
    toastStore.showToast('그룹 정보가 수정되었습니다.', 'success')
  } catch (e) {
    console.error(e)
    toastStore.showToast('그룹 정보를 수정할 수 없습니다. 잠시 후 다시 시도해주세요.', 'error')
  }
  groupForm.value!.resetInput()
}
</script>
