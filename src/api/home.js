import request from '@/utils/request'
// 首页请求模块封装
/**
 * 轮播图模块数据请求
 */
export const swiper = () => {
  return request({
    url: '/home/swiper',
    method: 'GET'
  })
}

export const homeRent = (area) => {
  return request({
    url: '/home/groups',
    method: 'GET',
    area
  })
}
