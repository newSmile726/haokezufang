import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vant/lib/index.css'
import 'amfe-flexible'
import './assets/fonts/iconfont.css'
import '@/utils/RouteGuard'
import BaiduMap from 'vue-baidu-map'
import Vant, { Lazyload } from 'vant'

Vue.use(Lazyload)
Vue.use(BaiduMap, {
  ak: 'vcBbiKAWKDS9ZnPPvAldtpkkafUZLrpM'
})
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
