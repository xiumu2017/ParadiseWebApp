import request from '@/utils/request'

export function getUrl(param) {
    return request({
      url: '/bingImage/s',
      method: 'get',
      param
    })
  }

export function query(param) {
    return request({
      url: '/bingImage/ss',
      method: 'get',
      param
    })
  }

