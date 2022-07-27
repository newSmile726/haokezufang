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
    headers: { Authorization: user }
  })
}
/**
 * 查看用户收藏列表
 * @param {string} user  收藏列表
 * @returns  promise
 */
export const Favoritelist = (user) => {
  return request({
    url: '/user/favorites',
    method: 'GET',
    headers: { Authorization: user }
  })
}
/**
 *  查看我的出租
 * @param {string} user 我的出租
 * @returns promise
 */
export const Myhouseslist = (user) => {
  return request({
    url: '/user/houses',
    method: 'GET',
    headers: { Authorization: user }
  })
}
/**
 *  发布房源
 * @param {Object} data 发布的房源数据
 * @returns  promise
 */
export const PublishListings = (user, body) => {
  return request({
    url: '/user/houses',
    method: 'POST',
    headers: { Authorization: user },
    data: body
  })
}
/**
 *  上传房屋图像
 * @param {object} fm 图像的fiel
 * @returns  promise
 */
export const HouseImageUpload = (fm) => {
  return request({
    url: '/houses/image',
    method: 'POST',
    data: fm
  })
}
