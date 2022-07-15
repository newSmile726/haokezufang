// 封装登录相关请求接口
import request from '@/utils/request'
/**
 * 登录验证
 * @param {string} username 账号
 * @param {string} password  密码
 * @returns  promise
 */
export const login = (username, password) => {
  return request({
    url: '/user/login',
    method: 'POST',
    data: { username, password }
  })
}

/**
 *  获取用户信息
 * @param {string} user  用户的token
 * @returns promise
 */
export const profile = (user) => {
  return request({
    url: '/user',
    method: 'GET',
    header: { Authorization: `Bearer ${user}` }
  })
}

export const Favoritelist = (user) => {
  return request({
    url: '/user/favorites',
    method: 'GET',
    header: { Authorization: `Bearer  ${user}` }
  })
}
