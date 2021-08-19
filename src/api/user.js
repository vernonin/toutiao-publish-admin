/**
 * 用户相关请求模块
 */

import request from '@/utils/request'

// 登录请求
export const login = data => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/authorizations',
    data
  })
}

// 获取用户信息
export const getUserProfile = () => {
  // const user = JSON.parse(window.localStorage.getItem('user'))
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/profile'
    // 后端要求把需要授权的用户身份放到请求头中
    // axios可以通过headers选项设置请求头
    // headers: {
    //   // 请求头携带 token
    //   Authorization: `Bearer ${user.token}`
    // }
  })
}

// 修改用户头像
export const updataUserPhoto = data => {
  return request({
    method: 'PATCH',
    url: '/mp/v1_0/user/photo',
    data
  })
}
// 修改用户资料(信息)
export const updataUser = data => {
  return request({
    method: 'PATCH',
    url: '/mp/v1_0/user/profile',
    data
  })
}
