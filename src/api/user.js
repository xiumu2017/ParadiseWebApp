import request from '@/utils/request'

export function login(params) {
  return request({
    url: '/sso/doLogin',
    method: 'post',
    params
  })
}

export function getInfo(token) {
  return request({
    url: '/sso/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/admin/logout',
    method: 'post'
  })
}
