// 获取房屋信息
import request from '@/utils/request'
/**
 * 查询房屋具体信息
 * @returns  promise
 */
export const houseMeassage = (id) => {
  return request({
    url: `/houses/${id}`
  })
}
/**
 * 发布房屋所需条件
 * @param {string} user  token
 * @returns promise
 */
export const sethouseMeassage = (user) => {
  return request({
    url: '/houses/params',
    headers: { Authorization: user }
  })
}
