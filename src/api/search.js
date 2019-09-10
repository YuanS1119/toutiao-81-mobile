import request from '@/utils/request'

export const getSuggestSearch = ({ q }) => {
  return request.get('/app/v1_0/suggestion', {
    params: {
      q
    }
  })
}
