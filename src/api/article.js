/**
 * 文章相关请求模块
 */
import request from '@/utils/request'

// 获取文章列表
export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/articles',
    // body 参数使用 data 设置
    // query 参数使用 params 设置
    // headers 参数使用 headers 设置
    params
  })
}

// 获取文章频道
export const getArticleChannels = () => {
  return request({
    url: '/mp/v1_0/channels',
    method: 'GET'
  })
}

// 删除文章
export const deleteArticle = articleId => {
  return request({
    url: `/mp/v1_0/articles/${articleId}`,
    method: 'DELETE'
  })
}

// 新建(发表)文章
export const addArticle = (data, draft = false) => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/articles',
    data,
    params: {
      draft
    }
  })
}

// 获取指定文章
export const getArticle = articleId => {
  return request({
    method: 'GET',
    url: `/mp/v1_0/articles/${articleId}`
  })
}

// 编辑(修改)文章
export const updateArticle = (articleId, data, draft = false) => {
  return request({
    method: 'PUT',
    url: `/mp/v1_0/articles/${articleId}`,
    data,
    params: {
      draft
    }
  })
}
