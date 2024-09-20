import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
// import { useGlobalStore } from "@/stores/global";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/layouts/full/FullLayout.vue'),
    children: [
      {
        path: '/typography',
        name: 'Typography',
        component: () => import("@/pages/typography/index.vue"),
      },
      {
        path: '/error',
        name: 'Error',
        component: () => import('@/layouts/error/Error404Page.vue'),
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
