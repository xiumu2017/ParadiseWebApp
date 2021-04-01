import request from '@/utils/request'

export function fetch(params) {
    return request({
        url: '/sleep-record/s',
        method: 'get',
        params
    })
}

export function create(data) {
    return request({
        url: '/sleep-record/create',
        method: 'post',
        data
    })
}

