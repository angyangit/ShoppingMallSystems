<template>
    <el-breadcrumb
            class='breadcrumb-warpper'
            separator-class="el-icon-arrow-right">
        <el-breadcrumb-item
                v-for='(item,index) in pageBreadcrumb'
                v-if="item.meta.title"
                :to="{ path: item.path }">
            <i v-if='index===0' class='icon-default' :class="'icon-'+item.meta.icon"></i>
            <span class='txt-frist'>{{ item.meta.title }}</span>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
    export default {
        name: "NavPageBreadcrumb",
        data() {
            return {
                pageBreadcrumb: null
            }
        },
        created() {
            this.getPageBreadcrumb()
        },
        methods: {
            getPageBreadcrumb() {
                console.log('matched', this.$route.matched)

                let matched = this.$route.matched.filter(item => item.name)
                const first = matched[0]
                if (first && first.name !== 'dashboard') {
                    matched = [{path: '/dashboard', meta: {title: '首页', icon: 'home'}}].concat(matched)
                }
                this.pageBreadcrumb = matched
            }
        },
        watch: {
            $route() {
                this.getPageBreadcrumb()
            }
        }

    }
</script>

<style lang='scss'>
    .breadcrumb-warpper {
        height: 30px;
        background: white;
        line-height: 30px;
        overflow: hidden;
        padding-left: 20px;
        .el-breadcrumb__inner {
            display: inline-block;
            line-height: 30px;
            vertical-align: top;
        }
        .el-breadcrumb__separator {
            line-height: 30px;
        }
        .txt-frist {
            display: inline-block;
            line-height: 30px;
            vertical-align: top;
        }
    }

</style>
