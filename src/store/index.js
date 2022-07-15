import Vue from 'vue'
import Vuex from 'vuex'
import { getToken, setToken } from '@/utils/auth'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 声明token
    user: getToken() || {}
  },
  // 修改数据的地方
  mutations: {
    // 修改token
    setUser(state, payload) {
      console.log(payload)
      state.user = payload
      // token放在本地存储
      setToken(payload)
    }
  }
})
