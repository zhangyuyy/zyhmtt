import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 字体图标
import '@/assets/font/iconfont.css'
// 引入rem适配文件
import 'amfe-flexible/index.min.js'

import Vant from 'vant'
import 'vant/lib/index.css'

Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
