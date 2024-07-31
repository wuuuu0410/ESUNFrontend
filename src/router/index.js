import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'BackStage',
      component: () => import('../views/後台/BackStage.vue')
    },
    
  ]
})

export default router
