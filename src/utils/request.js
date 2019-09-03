import axios from 'axios'
const instance = axios.create({
  timeout: 3000,
  baseURL: 'http://ttapi.research.itcast.cn'
})
// 请求拦截器
// Add a request interceptor
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  console.log(config)
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
// 响应拦截器
// Add a response interceptor
instance.interceptors.response.use(function (response) {
  // Do something with response data
  return response
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})

export default instance
