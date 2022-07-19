// 获取城市数据
import request from '@/utils/request'
export const getCityList = () => {
  return request({
    url: '/area/city',
    params: { level: 1 }
  })
}

export const hotCityList = () =>
  request({
    url: '/area/hot'
  })
