import request from '@/utils/request'

export const getSuggestSearch = ({ q }) => {
  return request.get('/app/v1_0/suggestion', {
    params: {
      q
    }
  })
}
export const getSearch = ({
  page,
  perPage,
  q
}) => {
  return request.get('/app/v1_0/search', {
    params: {
      page,
      per_page: perPage,
      q
    }
  })
}
