import axios from 'axios'
import { Dialog } from 'vant';


// create an axios instance
const service = axios.create({
  baseURL: 'https://restapi.amap.com/v3', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/json;charset=UTF-8'
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
    // 返回值为 0 或 1，0 表示请求失败；1 表示请求成功。
    if (res.status === '0') {
      Dialog.alert({
        title: '提示',
        message: '地理信息获取失败~' + res.info,
        theme: 'round-button',
      }).then(() => {
        // on close
      });
      return Promise.reject('error')
    }
    return res
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
