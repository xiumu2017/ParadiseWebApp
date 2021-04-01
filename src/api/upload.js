import request from '@/utils/request'

// 上传
export function upload(data) {
    return request({
      url: '/oss/qc/upload',
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data
    })
  }

