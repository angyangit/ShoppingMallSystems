<template>
    <div class='topbar-warpper'>
        <div class='left'>
            <i class='icon-side-switch'
               :class='getSideSwitchIcon'
               @click='toggleSidebar'></i>
            <span class='title'>后台管理系统</span>
        </div>
        <div class='right'>
            <div class='fullscreen-wapper'
                 @click="toggleFullScreen">
                <el-tooltip
                        :content='fullscreen ? "取消全屏":"全屏"'
                        placement="bottom">
                   <span>
                       <i class='icon-screen'
                          :class='getFullScreenIcon'>
                    </i>
                   </span>
                </el-tooltip>
            </div>
            <img :src='getImg'
                 class='avatar'>
            <span class='name'>admin</span>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex'
    import {IS_SIDEBAR_OPEN} from '../../store/mutation-types';
    import avatar from '@/assets/images/ic_launcher.png'

    export default {
        name: "topbar",
        data() {
            return {
                fullscreen: false,
            }
        },
        computed: {
            getSideSwitchIcon() {
                return this.isSidebarOpen ? 'icon-cebianlanshousuo' : 'icon-cebianlandanchu'
            },
            getFullScreenIcon() {
                return '' ? 'icon-iconfonthezi' : 'icon-iconfonthezi'
            },
            getImg() {
                return avatar
            },
            ...mapGetters(['isSidebarOpen'])
        },
        methods: {
            toggleSidebar() {
                this.setIsSidebarOpen(!this.isSidebarOpen)
            },
            toggleFullScreen() {
                let element = document.documentElement;
                if (this.fullscreen) {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                } else {
                    if (element.requestFullscreen) {
                        element.requestFullscreen();
                    } else if (element.webkitRequestFullScreen) {
                        element.webkitRequestFullScreen();
                    } else if (element.mozRequestFullScreen) {
                        element.mozRequestFullScreen();
                    } else if (element.msRequestFullscreen) {
                        // IE11
                        element.msRequestFullscreen();
                    }
                }
                this.fullscreen = !this.fullscreen;
            },
            ...mapMutations({
                setIsSidebarOpen: IS_SIDEBAR_OPEN
            })
        }
    }
</script>

<style scoped lang='scss'>
    @import "../../styles/variables";

    .topbar-warpper {
        height: 50px;
        background-color: $color-theme;
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box;
        line-height: 50px;
        .left {
            height: 50px;
            float: left;
            .icon-side-switch {
                color: white;
                font-weight: 800;
            }
            .title {
                color: white;
                font-size: 24px;
                margin-left: 20px;
                font-weight: 800;
            }
        }
        .right {
            height: 50px;
            float: right;
            margin-right: 20px;
            margin-top: 0;
            vertical-align: top;
            .fullscreen-wapper {
                height: 50px;
                vertical-align: top;
                display: inline-block;
                .icon-screen {
                    color: white;
                    vertical-align: top;
                    font-weight: 800;
                }
            }
            .avatar {
                width: 30px;
                margin: 10px;
                height: 30px;
            }
            .name {
                color: white;
                font-size: 18px;
                vertical-align: top;
                font-weight: 800;
                position: relative;
                &:after {
                    display: block;
                    content: '';
                    border-width: 6px;
                    border-style: solid;
                    border-color: white transparent transparent transparent;
                    position: absolute;
                    right: -16px;
                    top: 40%;
                }
            }
        }
    }
</style>
