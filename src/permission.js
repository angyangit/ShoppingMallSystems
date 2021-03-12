import router from './router'
import Nprogress from 'nprogress'
import {getToken} from './utils/auth';
import store from './store'
import '@/styles/nprogress.scss'// Progress 进度条样式
import {asyncRouters} from './router';

const whiteList = ['/login'] // 不重定向白名单

router.beforeEach((to, from, next) => {
    console.log('beforeEach', to, from, next)
    Nprogress.start()
    if (getToken()) {
        if (to.path === '/login') {
            next({path: '/'})
        } else {
            console.log('roles', store.getters.token, store.getters.roles)
            if (store.getters.roles.length === 0) {
                store.dispatch('getUserinfoAction').then(res => {
                    const {menus} = res
                    store.dispatch('handlerRouters', menus).then(res => {
                        console.log('router11==>', router)
                        console.log('router dynamicRouters 11==>', store.getters.dynamicRouters)
                        router.addRoutes(asyncRouters); // 动态添加可访问路由表
                        console.log('router22==>', router)
                        next({...to, replace: true})
                    })
                }).catch(error => {
                    // this.$message.error(err.message);
                    next('/login')
                })
            } else {
                console.log('router21232==>', router)
                next()
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next('/login')
        }
    }
})

router.afterEach(() => {
    Nprogress.done() // 结束Progress
})
