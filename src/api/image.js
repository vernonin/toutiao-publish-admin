/**
 * 素材请求相关模块
 */
import request from '@/utils/request'

// 上传图片素材
export const uploadImg = data => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/user/images',
    data
  })
}
