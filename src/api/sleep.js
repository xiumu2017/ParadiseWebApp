import request from '@/utils/request'

export function fetch(params) {
    return request({
        url: '/sleep-record/s',
        method: 'get',
        params
    })
}

export function sign(data) {
    return request({
        url: '/sleep-record/sign' + '?type=' + data,
        method: 'post'
    })
}

export function update(id, data) {
    return request({
        url: '/sleep-record/' + id,
        method: 'put',
        data
    })
}

export function create(data) {
    return request({
        url: '/sleep-record',
        method: 'post',
        data
    })
}
