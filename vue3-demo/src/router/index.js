import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/notFound',
      name: 'notFound',
      component: () => import("@/views/notFound.vue")
    },
    {
      // 接受错误路径的参数  pathMatch
      path: '/:pathMatch(.*)*',
      redirect: '/notFound'
    },
    {
      path: '/pinia',
      name: 'pinia',
      component: () => import("@/views/pinia.vue")
    }
  ]
})
// 导航守卫
import { useMdaStore } from '../stores/counter'
router.beforeEach((to, from) => {
  to
  from
  // 可以不使用next 直接使用return 
  let mda = useMdaStore()
  if (mda.a > 20) {
    return { path: '/', query: { returnUrl: from.fullPath } }
  } else {
    return true
  }
})

export default router
