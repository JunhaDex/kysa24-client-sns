import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import NotFound from '@/pages/404.vue'
import Error from '@/pages/500.vue'
import { useUserStore } from '@/stores/user.store'
import { useAuthStore } from '@/stores/auth.store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/Login.vue')
    },
    {
      path: '/chat',
      children: [
        {
          path: 'list',
          name: 'chat_list',
          component: () => import('@/pages/chat/List.vue')
        },
        {
          path: ':ref',
          name: 'chat_room',
          component: () => import('@/pages/chat/Detail.vue')
        }
      ]
    },
    {
      path: '/group',
      children: [
        {
          path: ':ref',
          name: 'group_feed',
          component: () => import('@/pages/group/Feed.vue')
        },
        {
          path: 'new',
          name: 'group_new',
          component: () => import('@/pages/group/New.vue')
        },
        {
          path: ':ref/edit',
          name: 'group_update',
          component: () => import('@/pages/group/Update.vue')
        }
      ]
    },
    {
      path: '/alert',
      name: 'notification',
      component: () => import('@/pages/noti/List.vue')
    },
    {
      path: '/group/:ref/post/:id',
      name: 'post_detail',
      component: () => import('@/pages/post/Detail.vue')
    },
    {
      path: '/user-all',
      name: 'user_all',
      component: () => import('@/pages/user/List.vue')
    },
    {
      path: '/user/deny',
      name: 'user_deny',
      component: () => import('@/pages/user/Deny.vue')
    },
    {
      path: '/user/:ref',
      name: 'user_profile',
      component: () => import('@/pages/user/Detail.vue')
    },
    {
      path: '/setting/:ref',
      name: 'user_update',
      component: () => import('@/pages/user/Update.vue')
    },
    {
      path: '/404',
      name: '404',
      component: NotFound
    },

    {
      path: '/error',
      name: 'error',
      component: Error
    }
  ]
})
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const userStore = useUserStore()
  if (to.matched.length < 1) {
    next(false)
    router.push({ name: '404' })
  } else {
    document.body.classList.remove('prevent-scroll')
    const BYPASS = ['home', 'guide', 'login', '404', 'error']
    if (BYPASS.includes(to.name as string)) {
      if (authStore.jwt) {
        userStore.updateNumbers()
      }
      next()
    } else {
      if (authStore.jwt) {
        userStore.updateNumbers()
        next()
      } else {
        window.alert('로그인이 필요한 서비스입니다.')
        next({ name: 'login' })
      }
    }
  }
})

export default router
