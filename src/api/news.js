import request from '@/utils/request'
// 获取新闻列表
/**
 *
 * @param {*} channelId 获取频道的id
 * @param {*} timestamp 获取第一页的文章
 * @returns
 */
export const getArticleList = (channelId, timestamp) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id: channelId,
      timestamp
    }
  })
}
