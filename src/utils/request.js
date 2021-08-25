/**
 * 基于 axios 封装的请求模块
 */
import axios from 'axios'
import router from '@/router'

// 创建一个 axios 实例
// 我们通过实例去发请求，把需求配置给这个实例
const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net' // 请求的基本路径
})

// 请求拦截器
request.interceptors.request.use(config => {
  // 获取token数据
  const user = JSON.parse(window.localStorage.getItem('user'))
  // 判断是否存在，因为在登录的请求是没有token数据的
  // 登录后，后端才会返回token数据
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, err => {
  return Promise.reject(err)
})

// 响应拦截器
request.interceptors.response.use(function (response) {
  // 所有响应码为 2xx 的响应都会进入这里
  return response
}, function (error) {
  // 任何超出 2xx 的响应码都会进入这里
  const status = error.response.status
  if (error.response && status === 401) {
    // 删除本地存储的错误token
    window.localStorage.removeItem('user')
    // 跳转登录页面
    router.push('/login')
  } else if (status >= 403) {
    alert('没有操作权限')
  } else if (status >= 400) {
    alert('请求参数错误，请检查参数')
  } else if (status >= 500) {
    alert('服务端内部异常，请稍后重试')
  }
  console.dir(error)
  return Promise.reject(error)
})
// 导出请求的request实例
export default request
