import request from '@/utils/request'

/**
 * 获取文章频道
 */
export const getChannels = () => {
  return request.get('/app/v1_0/user/channels', {})
}
