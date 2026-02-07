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
          path: 'results',
          name: 'results',
          component: () => import('../pages/ResultsPage.vue'),
        },
      ],
    },
  ],
})

export default router
