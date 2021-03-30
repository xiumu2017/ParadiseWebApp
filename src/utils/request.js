import axios from 'axios'
import store from '@/store'
import { router } from '../router';
import { getToken } from '@/utils/auth'
import { Dialog } from 'vant';


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
    if (res.code === 50008 || res.code === 50012 || res.code === 50014 || res.code === 401) {
      // Dialog.$create({
      //   type: "alert",
      //   title: "提示",
      //   content: "登录过期，请重新登录~",
      // }).show();
      Dialog.alert({
        title: '提示',
        message: '登录过期，请重新登录~',
        theme: 'round-button',
      }).then(() => {
        // on close
        store.dispatch('user/logout').then(() => {
          router.push('/login')
          // 为了重新实例化vue-router对象 避免bug
          location.reload()
        })
      });
      return Promise.reject('error')
    }
    if (res.code !== 200) {
      Dialog.alert({
        title: '提示',
        message: res.message,
        theme: 'round-button',
      })
    }
    return response.data
  },
  error => {
    console.error('err' + error) // for debug
    Dialog.alert({
      title: '提示',
      message: error.message,
      theme: 'round-button',
    })
    return Promise.reject(error)
  }
)

export default service
