import request from '@/utils/request'

export function fetch(params) {
    return request({
        url: '/timeline/s',
        method: 'get',
        params
    })
}

export function create(data) {
    return request({
        url: '/timeline',
        method: 'post',
        data
    })
}

