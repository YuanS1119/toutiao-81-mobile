import request from '@/utils/request'

/**
 *
 * @param {channels_id,timestamp,with_top} 频道id，时间戳，是否包含文章置顶：0不包含，1包含
 */
export const getArticlesTitle = ({
  channelId,
  timestamp,
  withTop
}) => {
  return request.get('/app/v1_0/articles', {
    channel_id: channelId,
    timestamp,
    with_top: withTop
  })
}
