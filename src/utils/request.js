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

// 响应拦截器

// 导出请求的request实例
export default request
