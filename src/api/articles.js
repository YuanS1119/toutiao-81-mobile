import request from '@/utils/request'

/**
 *
 * @param {channels_id,timestamp,with_top} 频道id，时间戳，是否包含文章置顶：0不包含，1包含
 */
export const getArticles = ({
  channelId,
  timestamp,
  withTop
}) => {
  return request.get('/app/v1_1/articles', {
    params: {
      channel_id: channelId,
      timestamp: timestamp,
      with_top: withTop
    }
  })
}
// 不喜欢文章
export const dislike = (id) => {
  return request.post('/app/v1_0/article/dislikes', {
    target: id
  })
}
