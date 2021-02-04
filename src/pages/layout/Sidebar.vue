<template>
    <aside class='sidebar-wrapper'>
        <el-menu
                mode="vertical"
                default-active="1-4-1"
                class="side-menu"
                :default-active="$route.path"
                text-color='#333333'
                active-text-color='#1989fa'
                router
                unique-opened
                :collapse="isSidebarOpen">
            <template v-for="item in routers" v-if="!item.hidden&&item.children">
                <template v-if='item.children.length===1'>
                    <!--                    <router-link-->
                    <!--                            :to="item.path+'/'+item.children[0].path"-->
                    <!--                            :key="item.children[0].name"-->
                    <!--                    >-->
                    <el-menu-item
                            :key="item.children[0].index"
                            :index="item.path+'/'+item.children[0].path">
                        <i class='icon-default' :class="'icon-'+item.children[0].meta.icon"></i>
                        <span class='txt-frist'>{{ item.children[0].meta.title }}</span>
                    </el-menu-item>
                    <!--                    </router-link>-->
                </template>
                <template v-else>
                    <el-submenu :index="item.path" :key="item.path">
                        <template slot="title">
                            <i class='icon-default' :class="'icon-'+item.meta.icon"></i>
                            <span class='txt-frist'>{{ item.meta.title }}</span>
                        </template>
                        <template
                                v-for="sub in item.children" v-if='!sub.hidden'>
                            <!--                            <router-link-->
                            <!--                                    :to="item.path+'/'+sub.path"-->
                            <!--                                    :key="sub.path">-->
                            <el-menu-item
                                    :key="sub.path"
                                    :index="item.path+'/'+sub.path"
                            >{{ sub.meta.title }}
                            </el-menu-item>
                            <!--                            </router-link>-->
                        </template>
                    </el-submenu>
                </template>
            </template>
        </el-menu>
    </aside>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "sidebar",
        computed: {
            ...mapGetters(['isSidebarOpen', 'routers'])
        }
    }
</script>

<style lang='scss'>
    @import "../../styles/variables";

    .sidebar-wrapper {
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom: 0;
        overflow-y: scroll;
        box-sizing: border-box;
        .sidebar-wrapper::-webkit-scrollbar {
            width: 0;
        }
        .side-menu:not(.el-menu--collapse) {
            width: 200px;
        }
        .sidebar-wrapper > ul {
            height: 100%;
        }
        .side-menu {
            .icon-default {
                font-size: 20px;
                font-weight: 700;
                color: $color-side-txt-def;
            }
            .txt-frist {
                font-size: 16px;
                font-weight: 700;
                color: $color-side-txt-def;
                display: inline-block;
                line-height: $h_side_item;
            }
            .el-menu-item {
                line-height: $h_side_item;
                height: $h_side_item;
            }
            .is-active {
                font-weight: 800;
                .icon-default {
                    color: $color-theme;
                }
                .txt-frist {
                    color: $color-theme;
                }
            }
            .el-submenu {
                .el-menu-item {
                    color: $color-side-txt-def;
                    font-size: 14px;
                    font-weight: 600;
                }
                .el-submenu__icon-arrow {
                    font-size: 16px;
                }
            }
        }
        .el-menu {
            border-right: 0;
        }
    }
</style>
