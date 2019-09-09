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
export const dislikeArticle = (id) => {
  return request.post('/app/v1_0/article/dislikes', {
    target: id
  })
}
// 举报文章
export const reportArticle = ({
  target,
  type
}) => {
  return request.post('/app/v1_0/article/reports', {
    target,
    // 举报类型： 0-其他问题，1-标题夸张，2-低俗色情，3-错别字多，4-旧闻重复，5-广告软文，6-内容不实，7-涉嫌违法犯罪，8-侵权'
    type
  })
}
