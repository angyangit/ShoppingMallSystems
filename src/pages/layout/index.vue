<template>
    <div class='layout-wrapper'>
        <topbar></topbar>
        <sidebar></sidebar>
        <div class='layout-page' :class="{'layout-page-collapse':isSidebarOpen}">
            <nav-page-breadcrumb></nav-page-breadcrumb>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import Sidebar from '@/pages/layout/Sidebar';
    import Topbar from '@/pages/layout/Topbar';
    import NavPageBreadcrumb from '../../components/NavPageBreadcrumb';
    export default {
        name: "layout",
        components: {
            Sidebar,
            Topbar,
            NavPageBreadcrumb
        },
        computed: {
            ...mapGetters(['isSidebarOpen'])
        }
    }
</script>

<style scoped lang='sass' lang='scss'>
    .layout-wrapper {
        width: 100%;
        height: 100%;
        .layout-content {
        }
        .layout-page {
            position: absolute;
            left: 200px;
            right: 0;
            top: 50px;
            overflow-y: scroll;
            bottom: 0;
            -webkit-transition: left .3s ease-in-out;
            transition: left .3s ease-in-out;
            background: #f0f0f0;
        }
        .layout-page-collapse {
            left: 65px;
        }
    }
</style>
