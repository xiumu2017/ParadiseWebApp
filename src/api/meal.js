import request from '@/utils/request'

export function fetch(params) {
    return request({
        url: '/meal-record/s',
        method: 'get',
        params
    })
}

export function getTypes() {
    return request({
        url: '/meal-record/types',
        method: 'get'
    })
}

export function getPayTypes(params) {
    return request({
        url: '/meal-record/payTypes',
        method: 'get',
        params
    })
}

export function create(data) {
    return request({
        url: '/meal-record/create',
        method: 'post',
        data
    })
}

