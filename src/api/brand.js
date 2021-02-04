import request from '@/utils/request'
import * as URL from '../common/constant'
import Qs from 'qs'

export function brandListApi(params) {
    return request({
        url: URL.URL_BRAND_LIST,
        params: params
    })
}

export function setFactoryStatusApi(data) {
    return request({
        url: URL.URL_BRAND_UPDATE_FACTORY_STATUS,
        method: 'post',
        data: data
    })
}

export function deleteBrand(id) {
    return request({
        url: URL.URL_BRAND_DELETE + id,
        method: 'get',
    })
}

export function setShowStatus(data) {
    return request({
        url: URL.URL_BRAND_UPDATE_SHOW_STATUS,
        method: 'post',
        data: data
    })
}

export function getBrand(id) {
    return request({
        url:'/brand/'+id,
        method:'get',
    })
}

export function updateBrand(id,data) {
    return request({
        url:'/brand/update/'+id,
        method:'post',
        data:data
    })
}

export function addBrand(data) {
    return request({
        url:'/brand/create',
        method:'post',
        data:data
    })
}
