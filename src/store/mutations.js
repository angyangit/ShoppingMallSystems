import * as types from './mutation-types'
import {defaultRouters} from '../router';

const matutaions = {
    [types.IS_SIDEBAR_OPEN](state, sidebarOpne) {
        state.isSidebarOpen = sidebarOpne
    },
    [types.SET_TOKEN](state, token) {
        state.token = token
    },
    [types.SET_USERNAME](state, userName) {
        state.userName = userName
    },
    [types.SET_AVATAR](state, avatar) {
        state.avatar = avatar
    },
    [types.SET_ROLES](state, roles) {
        state.roles = roles
    },
    [types.SET_ROUTERS](state, routers) {
        state.dynamicRouters = routers
        state.routers = defaultRouters.concat(routers)
    }

}
export default matutaions
