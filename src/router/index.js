import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
Vue.use(VueRouter)

export const routes = [
  // {
  //   path: '/',
  //   redirect: '/login'
  // },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    // 如果有默认子路由，就不要给父路由起名字
    // name: 'Layout',
    component: () => import('@/views/layout'),
    children: [
      {
        path: '/', // path为空，会作为默认子路由渲染
        name: 'Home',
        component: () => import('@/views/home'),
        meta: { title: '首页', icon: 'el-icon-s-home' }
      },
      {
        path: '/article',
        name: 'Article',
        component: () => import('@/views/article/'),
        meta: { title: '内容管理', icon: 'el-icon-document' }
      },
      {
        path: '/image',
        name: 'Image',
        component: () => import('@/views/image/'),
        meta: { title: '素材管理', icon: 'el-icon-picture-outline' }
      },
      {
        path: '/publish',
        name: 'Publish',
        component: () => import('@/views/publish/'),
        meta: { title: '发布文章', icon: 'el-icon-s-promotion' }
      },
      {
        path: '/comment',
        name: 'Comment',
        component: () => import('@/views/comment/'),
        meta: { title: '评论管理', icon: 'el-icon-chat-dot-square' }
      },
      {
        path: '/fans',
        name: 'Fans',
        component: () => import('@/views/fans/'),
        meta: { title: '粉丝管理', icon: 'el-icon-s-data' }
      },
      {
        path: '/settings',
        name: 'Settings',
        component: () => import('@/views/settings/'),
        meta: { title: '个人设置', icon: 'el-icon-setting' }
      },
      {
        path: '/table',
        name: 'table',
        component: () => import('@/views/table/'),
        meta: { title: '表格', icon: 'el-icon-date' }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 导航守卫
router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user'))
  // 校验非登录页面的登录状态
  if (to.path !== '/login') {
    if (user) {
      // 已登录 放行
      next()
    } else {
      // 没有登录，跳转登录页面
      next('/login')
    }
  } else {
    // 登录页面，这次通过
    next()
  }
})

export default router
