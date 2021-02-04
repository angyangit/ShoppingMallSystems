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
            <el-table :data="userList"
                      style="width: 100%">
                <el-table-column
                        prop="id"
                        label="编号"
                        align='center'
                        width="80"
                        sortable
                        sort-by='id'>
                </el-table-column>
                <el-table-column
                        prop="username"
                        align='center'
                        label="帐号"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="nickName"
                        label="姓名"
                        align='center'
                        width='120'>
                </el-table-column>
                <el-table-column
                        prop='email'
                        align='center'
                        label="邮箱"
                        width="120">
                </el-table-column>
                <el-table-column
                        align='center'
                        label="添加时间"
                        width="180">
                    <template slot-scope="scope">{{scope.row.createTime | formatDateTime}}</template>
                </el-table-column>
                <el-table-column
                        align='center'
                        label="最后登录"
                        width="180">
                    <template slot-scope="scope">{{scope.row.loginTime | formatDateTime}}</template>
                </el-table-column>
                <el-table-column
                        align='center'
                        label="启用"
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
                <el-table-column label="操作" align="center">
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
    import {getUserList, setUserStatus} from '@/api/ums';
    import {formatDate} from '@/utils/date';

    export default {
        name: "user",
        data() {
            return {
                queryOptions: {
                    keyword: '',
                    pageNum: 1,
                    pageSize: 10
                },
                userList: [],
                totalItemCount: 0
            }
        },
        filters: {
            formatDateTime(time) {
                if (time == null || time === '') {
                    return 'N/A';
                }
                let date = new Date(time);
                return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
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
                    this.loading = false
                    this.userList = res.list
                    this.totalItemCount = res.total
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
                this.$confirm('是否要修改用户启用状态?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    setUserStatus(item.id, {status: item.status}).then(res => {
                    }).catch(error => {
                        this.$message.error(error.message)
                        item.status = item.status === 1 ? 0 : 1
                    })
                })
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
