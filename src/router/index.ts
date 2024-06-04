import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/pages/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/404',
      name: '404',
      component: () => import('@/pages/404.vue')
    },
    {
      path: '/error',
      name: 'error',
      component: () => import('@/pages/500.vue')
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
