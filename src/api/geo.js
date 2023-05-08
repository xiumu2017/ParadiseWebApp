import request from '@/utils/geoApiRequest'

const key = '386171588d962601e860117d11984d62'

export function regeo(location) {
  return request({
    url: '/geocode/regeo',
    method: 'get',
    params: {
      location: location,
      key: key,
      extensions: 'all',
      radius: 1000
    }
  })
}

// 坐标系转换
export function convert(location) {
  return request({
    url: '/assistant/coordinate/convert',
    method: 'get',
    params: {
      locations: location,
      key: key,
      coordsys: 'gps'
    }
  })
}
