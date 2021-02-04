import {login, getUserinfo} from '@/api/auth';
import {setToken} from '@/utils/auth';
import {SET_TOKEN, SET_USERNAME, SET_AVATAR, SET_ROLES} from './mutation-types';
import {routerCommon, asyncRouters} from '../router';
import it from 'element-ui/src/locale/lang/it';

export const loginAction = function ({commit, state}, loginInfo) {
    console.log('loginInfo---', loginInfo)
    return new Promise((resolve, reject) => {
        login(loginInfo).then((res) => {
            console.log('loginAction11', res)
            const tokenStr = res.tokenHead + res.token
            setToken(tokenStr)
            commit(SET_TOKEN, tokenStr)
            resolve()
        }).catch((err) => {
            reject(err)
        })
    })
}
// icon: "http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180607/timg.jpg"
// menus: (24) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
// roles: ["超级管理员"]
// username: "admin"
// menu
// createTime: "2020-02-07T08:29:13.000+00:00"
// hidden: 0
// icon: "ums"
// id: 21
// level: 0
// name: "ums"
// parentId: 0
// sort: 0
// title: "权限"
export const getUserinfoAction = function ({commit, state}) {
    return new Promise((resolve, reject) => {
        getUserinfo().then(res => {
            commit(SET_USERNAME, res.username)
            commit(SET_AVATAR, res.icon)
            commit(SET_ROLES, res.roles)
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}

export const handlerRouters = function ({commit, state}, menus) {
    return new Promise((resolve, reject) => {
        const accessRouters = asyncRouters.filter(asyncRouter => {
            if (hasPermisssion(menus, asyncRouter)) {
                if (asyncRouter.children && asyncRouter.children.length > 0) {
                    asyncRouter.children = asyncRouter.children.filter(child => {
                        if (hasPermisssion(menus, child)) {
                            return true
                        }
                        return false
                    })
                    return true
                } else {
                    return true
                }
            }
            return false
        })
        //对菜单进行排序
        sortRouters(accessRouters);
        commit('SET_ROUTERS', accessRouters);
        resolve();
    })
}

function hasPermisssion(menus, route) {
    if (route.name) {
        const currentMenu = getCurrentMenu(route.name, menus)
        if (currentMenu != null) {
            //设置菜单的标题、图标和可见性
            if (currentMenu.title != null && currentMenu.title !== '') {
                route.meta.title = currentMenu.title;
            }
            if (currentMenu.icon != null && currentMenu.title !== '') {
                route.meta.icon = currentMenu.icon;
            }
            if (currentMenu.hidden != null) {
                route.hidden = currentMenu.hidden !== 0;
            }
            if (currentMenu.sort != null && currentMenu.sort !== '') {
                route.sort = currentMenu.sort;
            }
            return true;
        } else {
            route.sort = 0;
            if (route.hidden !== undefined && route.hidden === true) {
                return true;
            } else {
                return false;
            }
        }
    } else {
        return true
    }
}

function getCurrentMenu(routeName, menus) {
    for (const menu of menus) {
        if (routeName === menu.name) {
            return menu
        }
    }
    return null;
}

//对菜单进行排序
function sortRouters(accessedRouters) {
    for (let i = 0; i < accessedRouters.length; i++) {
        let router = accessedRouters[i];
        if (router.children && router.children.length > 0) {
            router.children.sort(compare("sort"));
        }
    }
    accessedRouters.sort(compare("sort"));
}

//降序比较函数
function compare(p) {
    return function (m, n) {
        let a = m[p];
        let b = n[p];
        return b - a;
    }
}
