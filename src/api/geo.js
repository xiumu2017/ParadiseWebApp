import request from '@/utils/geoApiRequest'

const key = '386171588d962601e860117d11984d62'

export function regeo(location) {
  return request({
    url: '/geocode/regeo',
    method: 'get',
    params: {
      location: location,
      key: key,
      extensions: 'base',
      radius: 100
    }
  })
}
