/**
 * 基于 axios 封装的请求模块
 */
import axios from 'axios'

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

// 导出请求的request实例
export default request
