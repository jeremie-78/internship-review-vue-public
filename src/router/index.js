import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '../layouts/AppLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AppLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('../pages/HomePage.vue'),
        },
        {
          path: 'offers',
          name: 'offers',
          component: () => import('../pages/HomePage.vue'),
        },
      ],
    },
  ],
})

export default router
