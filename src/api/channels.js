import request from '@/utils/request'

/**
 * 获取文章频道(所有)
 */
export const getdefaultOrUserChannel = () => {
  return request.get('/app/v1_0/user/channels')
}
// 删除指定用户频道
export const delUserChannel = (id) => {
  return request.delete(`/app/v1_0/user/channels/${id}`)
}
//
export const addChannels = ({ id, seq }) => {
  return request.patch('/app/v1_0/user/channels', {
    channels: [
      {
        id,
        seq
      }
    ]
  })
}
