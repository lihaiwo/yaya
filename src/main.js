import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ikpay from 'ikpay'
import config from '@/config'
import 'ikpay/dist/styles/ikpay.css'
import './less/index.less'
import '@/assets/icons/iconfont.css'

Vue.use(ikpay)
Vue.config.productionTip = false
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config
Vue.prototype.eventHub = new Vue()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
