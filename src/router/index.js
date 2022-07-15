import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () => import('@/views/Login')
  },
  {
    path: '/',
    redirect: '/home',
    component: () => import('@/views/Layout'),
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/Home')
      },
      {
        path: '/home/list',
        name: 'list',
        component: () => import('@/views/List')
      },
      {
        path: '/home/news',
        name: 'news',
        component: () => import('@/views/News')
      },
      {
        path: '/home/profile',
        name: 'profile',
        component: () => import('@/views/Profile')
      }
    ]
  },
  {
    path: '*',
    component: () => import('@/views/NotFound')
  }
]

const router = new VueRouter({
  routes
})

export default router
