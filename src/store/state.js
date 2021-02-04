import {getToken} from '@/utils/auth';
import {defaultRouters, asyncRouters} from '../router';

const state = {
    isSidebarOpen: false,
    token: getToken,
    userName: '',
    avatar: '',
    roles: [],
    dynamicRouters: [],
    routers: defaultRouters.concat(asyncRouters)
}

export default state
