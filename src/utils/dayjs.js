// 引入dayjs
import dayjs from 'dayjs'
// 配置相对时间
const relatveTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relatveTime)
// 配置中文包
require('dayjs/locale/zh-cn')
dayjs.locale('zh-cn')
// 封装==>new Date()
console.log(dayjs('1991-1-1').fromNow())
export default dayjs
