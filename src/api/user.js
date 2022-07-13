// 封装登录相关请求接口
import request from '@/utils/request'
/**
 * 登录验证
 * @param {string} username 账号
 * @param {string} password  密码
 * @returns  promise
 */
export const login = (data) => {
  return request({
    url: '/user/login',
    method: 'POST',
    data
  })
}
