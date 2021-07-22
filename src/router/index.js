import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/layout',
    // 如果有默认子路由，就不要给父路由起名字
    // name: 'Layout',
    component: () => import('@/views/layout'),
    children: [
      {
        path: '/', // path为空，会作为默认子路由渲染
        name: 'Home',
        component: () => import('@/views/home')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
