import request from '@/utils/request'
import * as URL from '../common/constant'

export function login(loginInfo) {
    return request({
        url: URL.URL_LOGIN,
        method: 'post',
        data: {
            username: loginInfo.uname,
            password: loginInfo.pwd
        }
    })
}

export function getUserinfo() {
    return request({
        url: URL.URL_GET_USERINFO,
        method: 'get',
    })
}
