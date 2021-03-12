import VueRouter from 'vue-router';
import Vue from 'vue'
import Layout from '@/pages/layout'

Vue.use(VueRouter)

export const defaultRouters = [
    {
        path: '/login',
        component: () => import('@/pages/auth/login'),
        hidden: true
    },
    {
        path: '/404',
        component: () => import('@/pages/404'),
        hidden: true
    },

    {
        path: '',
        component: Layout,
        redirect: '/dashboard',
        children: [{
            path: 'dashboard',
            name: 'dashboard',
            component: () => import('@/pages/dashboard'),
            meta: {title: '首页', icon: 'home'}
        }]
    },
]
export const asyncRouters = [
    {
        path: '/pms',
        component: Layout,
        redirect: '/pms/product',
        name: 'pms',
        meta: {title: '商品', icon: 'product'},
        children: [
            {
                path: 'product',
                name: 'product',
                component: () => import('@/pages/pms/product'),
                meta: {title: '商品列表', icon: 'product-list'}
            },
            {
                path: 'addProduct',
                name: 'addProduct',
                component: () => import('@/pages/pms/product/add'),
                meta: {title: '添加商品', icon: 'product-add'}
            },
            {
                path: 'updateProduct',
                name: 'updateProduct',
                component: () => import('@/pages/pms/product/update'),
                meta: {title: '修改商品', icon: 'product-add'},
                hidden: true
            },
            {
                path: 'productCate',
                name: 'productCate',
                component: () => import('@/pages/pms/category'),
                meta: {title: '商品分类', icon: 'product-cate'}
            },
            {
                path: 'addProductCate',
                name: 'addProductCate',
                component: () => import('@/pages/pms/category/add'),
                meta: {title: '添加商品分类'},
                hidden: true
            },
            {
                path: 'updateProductCate',
                name: 'updateProductCate',
                component: () => import('@/pages/pms/category/edit'),
                meta: {title: '修改商品分类'},
                hidden: true
            },
            {
                path: 'productAttr',
                name: 'productAttr',
                component: () => import('@/pages/pms/type/index'),
                meta: {title: '商品类型', icon: 'product-attr'}
            },
            {
                path: 'productAttrList',
                name: 'productAttrList',
                component: () => import('@/pages/pms/type/productAttrList'),
                meta: {title: '商品属性列表'},
                hidden: true
            },
            {
                path: 'addProductAttr',
                name: 'addProductAttr',
                component: () => import('@/pages/pms/type/addProductAttr'),
                meta: {title: '添加商品属性'},
                hidden: true
            },
            {
                path: 'updateProductAttr',
                name: 'updateProductAttr',
                component: () => import('@/pages/pms/type/updateProductAttr'),
                meta: {title: '修改商品属性'},
                hidden: true
            },
            {
                path: 'brand',
                name: 'brand',
                component: () => import('@/pages/pms/brand'),
                meta: {title: '品牌管理', icon: 'product-brand'}
            },
            {
                path: 'addBrand',
                name: 'addBrand',
                component: () => import('@/pages/pms/brand/add'),
                meta: {title: '添加品牌'},
                hidden: true
            },
            {
                path: 'editBrand',
                name: 'editBrand',
                component: () => import('@/pages/pms/brand/edit'),
                meta: {title: '添加品牌'},
                hidden: true
            },
        ]
    },
    {
        path: '/oms',
        component: Layout,
        redirect: '/oms/order',
        name: 'oms',
        meta: {title: '订单', icon: 'order'},
        children: [
            {
                path: 'order',
                name: 'order',
                component: () => import('@/pages/oms/order'),
                meta: {title: '订单列表', icon: 'product-list'}
            },
            {
                path: 'orderSetting',
                name: 'orderSetting',
                component: () => import('@/pages/oms/setting'),
                meta: {title: '订单设置', icon: 'order-setting'}
            },
            {
                path: 'returnApply',
                name: 'returnApply',
                component: () => import('@/pages/oms/return'),
                meta: {title: '退货申请处理', icon: 'order-return'}
            },
            {
                path: 'returnReason',
                name: 'returnReason',
                component: () => import('@/pages/oms/reason'),
                meta: {title: '退货原因设置', icon: 'order-return-reason'}
            }
        ]
    },
    {
        path: '/sms',
        component: Layout,
        redirect: '/sms/coupon',
        name: 'sms',
        meta: {title: '营销', icon: 'sms'},
        children: [
            // {
            //     path: 'flash',
            //     name: 'flash',
            //     component: () => import('@/pages/sms/flash/index'),
            //     meta: {title: '秒杀活动列表', icon: 'sms-flash'}
            // },
            // {
            //     path: 'flashSession',
            //     name: 'flashSession',
            //     component: () => import('@/pages/sms/flash/sessionList'),
            //     meta: {title: '秒杀时间段列表'},
            //     hidden:true
            // },
            // {
            //     path: 'selectSession',
            //     name: 'selectSession',
            //     component: () => import('@/pages/sms/flash/selectSessionList'),
            //     meta: {title: '秒杀时间段选择'},
            //     hidden:true
            // },
            // {
            //     path: 'flashProductRelation',
            //     name: 'flashProductRelation',
            //     component: () => import('@/pages/sms/flash/productRelationList'),
            //     meta: {title: '秒杀商品列表'},
            //     hidden:true
            // },
            // {
            //     path: 'coupon',
            //     name: 'coupon',
            //     component: () => import('@/pages/sms/coupon/index'),
            //     meta: {title: '优惠券列表', icon: 'sms-coupon'}
            // },
            // {
            //     path: 'addCoupon',
            //     name: 'addCoupon',
            //     component: () => import('@/pages/sms/coupon/add'),
            //     meta: {title: '添加优惠券'},
            //     hidden:true
            // },
            // {
            //     path: 'updateCoupon',
            //     name: 'updateCoupon',
            //     component: () => import('@/pages/sms/coupon/update'),
            //     meta: {title: '修改优惠券'},
            //     hidden:true
            // },
            // {
            //     path: 'couponHistory',
            //     name: 'couponHistory',
            //     component: () => import('@/pages/sms/coupon/history'),
            //     meta: {title: '优惠券领取详情'},
            //     hidden:true
            // },
            {
                path: 'brand',
                name: 'homeBrand',
                component: () => import('@/pages/sms/brand/index'),
                meta: {title: '品牌推荐', icon: 'product-brand'}
            },
            {
                path: 'new',
                name: 'homeNew',
                component: () => import('@/pages/sms/new/index'),
                meta: {title: '新品推荐', icon: 'sms-new'}
            },
            // {
            //     path: 'hot',
            //     name: 'homeHot',
            //     component: () => import('@/pages/sms/hot/index'),
            //     meta: {title: '人气推荐', icon: 'sms-hot'}
            // },
            // {
            //     path: 'subject',
            //     name: 'homeSubject',
            //     component: () => import('@/pages/sms/subject/index'),
            //     meta: {title: '专题推荐', icon: 'sms-subject'}
            // },
            {
                path: 'advertise',
                name: 'homeAdvertise',
                component: () => import('@/pages/sms/advertise/index'),
                meta: {title: '广告列表', icon: 'sms-ad'}
            },
            {
                path: 'addAdvertise',
                name: 'addHomeAdvertise',
                component: () => import('@/pages/sms/advertise/add'),
                meta: {title: '添加广告'},
                hidden: true
            },
            {
                path: 'updateAdvertise',
                name: 'updateHomeAdvertise',
                component: () => import('@/pages/sms/advertise/update'),
                meta: {title: '编辑广告'},
                hidden: true
            }
        ]
    },
    {
        path: '/ums',
        component: Layout,
        redirect: '/ums/admin',
        name: 'ums',
        meta: {title: '权限', icon: 'ums'},
        children: [
            {
                path: 'admin',
                name: 'admin',
                component: () => import('@/pages/ums/user'),
                meta: {title: '用户列表', icon: 'ums-admin'}
            },
            // {
            //     path: 'role',
            //     name: 'role',
            //     component: () => import('@/pages/ums/role'),
            //     meta: {title: '角色列表', icon: 'ums-role'}
            // },
            // {
            //     path: 'menu',
            //     name: 'menu',
            //     component: () => import('@/pages/ums/menu'),
            //     meta: {title: '菜单列表', icon: 'ums-menu'}
            // },
            // {
            //     path: 'resource',
            //     name: 'resource',
            //     component: () => import('@/pages/ums/resource'),
            //     meta: {title: '资源列表', icon: 'ums-resource'}
            // }
        ]
    },
    {path: '*', redirect: '/404', hidden: true}
]

export default new VueRouter({
    routes: defaultRouters
})
