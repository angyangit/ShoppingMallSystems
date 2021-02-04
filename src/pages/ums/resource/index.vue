<template>
    <div class='pms-brand-warpper'>
        <div class='option-warpper'>
            <div class='search-warper'>
                <span>品牌搜索:</span>
                <el-input
                        class='ipt-search'
                        placeholder="请输入搜索内容"
                        v-model="queryOptions.keyword"
                        clearable>
                </el-input>
                <el-button
                        class='btn-search'
                        @click="searchUserList"
                        type="primary"
                        size="small">
                    搜索
                </el-button>
            </div>
        </div>
        <div class='content-warpper'
             v-loading="loading">
            <el-table :data="brandList"
                      style="width: 100%">
                <el-table-column
                        prop="id"
                        label="编号"
                        align='center'
                        width="120"
                        sortable
                        sort-by='id'>
                </el-table-column>
                <el-table-column
                        prop="username"
                        align='center'
                        label="帐号"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="nickName"
                        label="姓名"
                        align='center'
                        width='180'>>
                </el-table-column>
                <el-table-column
                        prop='email'
                        align='center'
                        label="邮箱"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop='createTime'
                        align='center'
                        label="添加时间"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop='loginTime'
                        align='center'
                        label="最后登录"
                        width="120">
                </el-table-column>
                <el-table-column
                        align='center'
                        label="是否启用"
                        width="120">
                    <template slot-scope="scope">
                        <el-switch
                                @change="setActionStatus( scope.row)"
                                v-model="scope.row.status"
                                :active-value='1'
                                :inactive-value='0'
                                active-color="#1989fa"
                                inactive-color="#cccccc">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="160" align="center">
                    <template slot-scope="scope">
                        <el-button
                                type="primary"
                                size="mini">编辑
                        </el-button>
                        <el-button
                                type="danger"
                                size="mini">删除
                        </el-button>
                        <el-button
                                type="primary"
                                size="mini">设置角色
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class='pagination-warpper clearfix'>
            <div class='pagination-container '>
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        background
                        :current-page.sync="queryOptions.pageNum"
                        :page-sizes="[5, 10, 15, 20]"
                        :page-size="10"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="totalItemCount">
                </el-pagination>
            </div>
        </div>
    </div>

</template>
<script>
    import {getUserList} from '@/api/ums';

    export default {
        name: "user",
        data() {
            return {
                queryOptions: {
                    keyword: '',
                    pageNum: 1,
                    pageSize: 10
                },
                totalItemCount: 0
            }
        },
        created() {
            this.searchUserList()
        },
        methods: {
            searchUserList() {
                this.loading = true
                getUserList(this.queryOptions).then(res => {
                    console.log('getUserList', res)
                }).catch(error => {
                    this.loading = false
                })
            },
            handleSizeChange(pageSize) {
                this.queryOptions.pageNum = 1
                this.queryOptions.pageSize = pageSize
                this.searchUserList()
            },
            handleCurrentChange(curPage) {
                this.queryOptions.pageNum = curPage
                this.searchUserList()
            },
            setActionStatus(item) {
            }
        }
    }
</script>

<style scoped lang='scss'>
    @import "../../../styles/variables";

    .pms-brand-warpper {
        min-width: 800px;
        padding: 10px 10px;
        height: 100%;
        box-sizing: border-box;
        .option-warpper {
            background: white;
            border-radius: 5px;
            padding: 10px;
            .search-warper {
                display: inline-block;
                margin: 5px 0;
                .ipt-search {
                    margin-left: 10px;
                    height: $h_normal_action_view;
                    width: $w_normal_action_frame;
                }
            }
            .action-warper {
                display: inline-block;
                margin: 5px 0;
                .sel-warpper {
                    margin-left: 50px;
                    width: $w_normal_action_frame;
                }
            }
            .btn-search {
                margin-left: 20px;
                height: $h_normal_action_view;
            }
            .el-button {
                vertical-align: top;
            }
        }
        .content-warpper {
            border-radius: 5px;
            background: white;
            background: white;
            margin-top: 10px;
        }
        .pagination-warpper {
            background: white;
            .pagination-container {
                display: inline-block;
                float: right;
                padding: 20px;
            }
        }
    }
</style>
