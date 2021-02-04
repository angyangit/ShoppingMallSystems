import request from '@/utils/request'
import * as URL from '../common/constant'

export function getUserList(params) {
    return request({
        url: URL.URL_USER_LIST,
        method: 'get',
        params: params
    })
}
export function setUserStatus(id, params) {
    return request({
        url: `/admin/updateStatus/${id}`,
        method: 'post',
        params: params
    })
}
