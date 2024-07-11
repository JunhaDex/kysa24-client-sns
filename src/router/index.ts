import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import Guide from '@/pages/Guide.vue'
import NotFound from '@/pages/404.vue'
import Error from '@/pages/500.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/guide',
      name: 'guide',
      component: Guide
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
          path: ':ref/post/:id',
          name: 'post_detail',
          component: () => import('@/pages/post/Detail.vue')
        },
        {
          path: 'new',
          name: 'group_new',
          component: () => import('@/pages/group/New.vue')
        }
      ]
    },
    {
      path: '/alert',
      name: 'notification',
      component: () => import('@/pages/noti/List.vue')
    },
    {
      path: '/post/:id',
      name: 'post_detail',
      component: () => import('@/pages/post/Detail.vue')
    },
    {
      path: '/user-all',
      name: 'user_all',
      component: () => import('@/pages/user/List.vue')
    },
    {
      path: '/user/:ref',
      name: 'user_profile',
      component: () => import('@/components/displays/Profile.vue')
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
  if (to.matched.length < 1) {
    next(false)
    router.push({ name: '404' })
  } else {
    next()
  }
})

export default router
