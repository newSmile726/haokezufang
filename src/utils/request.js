// 封装跟路径
import axios from 'axios'
// import store from '@/store'
const request = axios.create({
  baseURL: 'http://liufusong.top:8080'
})
// request.interceptors.request.use(
//   (config) => {
//     const token = store.state.user
//     if (token) {
//       config.headers.Authorization = token
//     }
//     // console.log(config)
//     return config
//   },
//   (err) => {
//     return Promise.reject(err)
//   }
// )
export default request
