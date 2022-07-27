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
/**
 * 获取房屋查询条件
 * @param {string} id  城市id
 * @returns  promise
 */
export const ObtainHousingQueryConditions = (id) => {
  return request({
    url: '/houses/condition',
    params: { id }
  })
}
/**
 *  根据条件查询房屋
 * @param {string} id 地区的id
 * @returns  promise
 */
export const ConditionQueryHouse = (params) => {
  return request({
    url: '/houses',
    params
  })
}
