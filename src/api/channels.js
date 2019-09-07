import request from '@/utils/request'

/**
 * 获取文章频道
 */
export const getdefaultOrUserChannel = () => {
  return request.get('/app/v1_0/user/channels')
}
