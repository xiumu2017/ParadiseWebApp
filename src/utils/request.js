import axios from 'axios'
import store from '@/store'
import { getToken } from '@/utils/auth'
import Vue from 'vue'
import { Dialog } from 'cube-ui'

Vue.use(Dialog)

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      // config.headers['X-Token'] = getToken()
      config.headers['Authorization'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    // 文件下载处理，请在请求时使用 responseType：'blob' 参数

    const res = response.data
    // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
    if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
      Dialog.$create({
        type: "alert",
        title: "Alert",
        content: "dialog content",
      }).show();
      return Promise.reject('error')
    }
    if (res.code !== 200) {
      Dialog.$create({
        type: "alert",
        title: "错误信息：",
        content: res.message,
      }).show();
    }
    return response.data
  },
  error => {
    console.log('err' + error) // for debug
    Dialog.$create({
      type: "alert",
      title: "Alert",
      content: error,
    }).show();
    return Promise.reject(error)
  }
)

export default service
