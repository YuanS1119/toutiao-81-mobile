import request from '@/utils/request'

/**
 *登录
 * @param {*} param0
 */
export const login = ({
  mobile,
  code
}) => {
  return request.post('/app/v1_0/authorizations', {
    mobile, code
  })
}
// 拉黑用户
export const blackUser = (id) => {
  return request.post('/app/v1_0/user/blacklists', {
    target: id
  })
}
