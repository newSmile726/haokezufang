import Vue from 'vue'
import Vuex from 'vuex'
import { setToken, getToken, getCity, setCity } from '@/utils/auth'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 一个对象，存储当前登录用户信息（token等数据）
    user: getToken() || null,
    City: getCity()
    // user: null
    // user: JSON.parse(window.localStorage.getItem(TOKEN_KEY)),
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload

      // 为了防止数据刷新丢失，把数据备份到本地存储
      setToken(payload)
      // window.localStorage.setItem(TOKEN_KEY, JSON.stringify(state.user))
    },
    setCity (state, payload) {
      state.City = payload
      setCity(payload)
    }
  }
})
