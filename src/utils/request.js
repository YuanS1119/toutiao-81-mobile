import axios from 'axios'
import JSONbig from 'json-bigint'
import store from '@/store.js'
const instance = axios.create({
  // timeout: 8000,
  baseURL: 'http://ttapi.research.itcast.cn'
})
// 请求拦截器
// Add a request interceptor
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  // console.log(config, 'request+请求')
  if (store.state.user) {
    config.headers.Authorization = `Bearer ${store.state.user.token}`
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
// 响应拦截器
// Add a response interceptor
instance.interceptors.response.use(function (response) {
  // Do something with response data
  return response.data.data || response.data
  // console.log(response, 'request')
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})
// 大数据处理
instance.defaults.transformResponse = [function (data) {
  try {
    // data 数据可能不是标准的 JSON 格式字符串，否则会导致 JSONbig.parse(data) 转换失败报错
    return JSONbig.parse(data)
  } catch (err) {
    // 无法转换的数据直接原样返回
    return data
  }
}]

export default instance
