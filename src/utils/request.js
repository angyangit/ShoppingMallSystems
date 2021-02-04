import axios from 'axios'
import store from '../store'
import {getToken} from '@/utils/auth'


// 创建axios实例
const service = axios.create({
    // baseURL: 'http://admin-api.macrozheng.com', // api的base_url
    baseURL: process.env.BASE_API, // api的base_url
    timeout: 15000, // 请求超时时间
    method: 'get'
})

// request拦截器
service.interceptors.request.use(config => {
    if (store.getters.token) {
        config.headers['Authorization'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
}, error => {
    console.log(error) // for debug
    Promise.reject(error)
})

service.interceptors.response.use(
    response => {
        /**
         * code为非200是抛错 可结合自己业务进行修改
         */
        console.log('response', response)
        const res = response.data
        if (res.code !== 200) {
            // 401:未登录;
            if (res.code === 401) {
                this.$msgbox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
                    confirmButtonText: '重新登录',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    store.dispatch('FedLogOut').then(() => {
                        location.reload()// 为了重新实例化vue-router对象 避免bug
                    })
                })
            }
            return Promise.reject(res)
        } else {
            return Promise.resolve(res.data)
        }
    },
    error => {
        console.log('err' + error)
        return Promise.reject(error)
    }
)

export default service
