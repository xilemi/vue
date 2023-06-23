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
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/grade',
      name: 'grade',
      component: () => import('../views/GradeView.vue')
    },
    {
      path: '/radar',
      name: 'radar',
      component: () => import('../views/RadarView.vue')
    }
  ]
})

export default router
