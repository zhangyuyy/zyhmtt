import request from '@/utils/request'
import storage from '@/utils/Storage'
/**
 * 获取我的频道列表
 * @returns promise
 */
export const getMychannels = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}
// 所有频道列表
export const getAllchannels = () => {
  return request({
    url: '/v1_0/channels'
  })
}
/**
 *删除频道
 * @param {String|Number} channeltarget
 * @returns Promise
 */
export const delMychanel = (target) => {
  return request({
    url: '/v1_0/user/channels/' + target,
    method: 'DELETE'
  })
}
/**
 *添加我的频道
 * @param {Number} id 频道的id
 * @param {Number} seq 添加频道的索引下标
 * @returns
 */
export const addMychanel = (id, seq) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [{ id, seq }]
    }
  })
}

// 在本地存储中 存和取我的频道的数据
const HEIMA_TOUTIAO_CHANNELS = 'HEIMA_TOUTIAO_CHANNELS'
export const getMAychannelsBylocal = () => storage.get(HEIMA_TOUTIAO_CHANNELS)
export const setMyChannelToLocal = (channel) =>
  storage.set(HEIMA_TOUTIAO_CHANNELS, channel)
