import Cookies from 'js-cookie'

const AUTHENTICATION_TOKE = 'SHOPPING_MALL_SYS_AUTHENTICATION_TOKE'

export function getToken() {
    return Cookies.get(AUTHENTICATION_TOKE)
}

export function setToken(token) {
    return Cookies.set(AUTHENTICATION_TOKE, token)
}

export function removeToken() {
    return Cookies.remove(AUTHENTICATION_TOKE)
}
