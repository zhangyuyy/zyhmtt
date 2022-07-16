// 引入axios
import axios from 'axios'
import store from '@/store'
// 配置axios的默认配置
// 创建一个全新的axios的对象
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 3000
})

request.interceptors.request.use(
  (config) => {
    const token = store.state.user.token

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    console.log(config)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
export default request
