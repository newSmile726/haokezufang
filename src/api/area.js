// 获取城市数据
import request from '@/utils/request'
/**
 * 城市列表数据
 * @returns  promise
 */
export const getCityList = () => {
  return request({
    url: '/area/city',
    params: { level: 1 }
  })
}
/**
 *  热门城市
 * @returns  promise
 */
export const hotCityList = () =>
  request({
    url: '/area/hot'
  })
/**
 *  关键词查询小区
 * @param {string} name 小区名字
 * @param {string||Number} id 城市id
 * @returns  promise
 */
export const KeywordQuery = (name, id) =>
  request({
    url: '/area/community',
    params: {
      name,
      id
    }
  })
