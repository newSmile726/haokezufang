// 首页请求模块封装
/**
 * 轮播图模块数据请求
 */
import request from '@/utils/request'
export const swiper = () => {
  return request({
    url: '/home/swiper',
    method: 'GET'
  })
}
