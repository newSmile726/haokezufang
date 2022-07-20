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
    path: '/favorate',
    component: () => import('@/views/Favorate')
  },
  {
    path: '/rent',
    component: () => import('@/views/Rent')
  },
  {
    path: '/detai',
    component: () => import('@/components/Detai')
  },
  {
    path: '/city',
    component: () => import('@/views/city')
  },
  {
    path: '/add',
    component: () => import('@/views/add')
  },
  {
    path: '/search',
    component: () => import('@/views/add/Search')
  },
  {
    path: '*',
    component: () => import('@/views/NotFound')
  }
]

const router = new VueRouter({
  routes
})

// 处理控制台报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalPush.call(this, location, onResolve, onReject)
  }
  return originalPush.call(this, location).catch((err) => err)
}

export default router
