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
                        @click="searchBrandList"
                        type="primary"
                        size="small">
                    搜索
                </el-button>
            </div>
            <div class='action-warper'>
                <el-select
                        class='sel-warpper'
                        v-model="optionsSelect"
                        placeholder="批量操作显示模式"
                        @change='change'>
                    <el-option
                            v-for="item in options"
                            :value="item"
                            :label="item ==='show'?'显示品牌':'隐藏品牌'">
                    </el-option>
                </el-select>
                <el-button
                        class='btn-search'
                        @click="handlerBrandShow()"
                        type="primary"
                        size="small">
                    确定
                </el-button>
            </div>
            <el-button
                    class='btn-brand-add'
                    @click="toAddPage()"
                    type="primary"
                    size="small"><i class='icon-iconfontwendang' style='font-size: 14px;padding-right: 5px'></i>添加品牌
            </el-button>
        </div>
        <div class='content-warpper'
             v-loading="loading">
            <el-table
                    :data="brandList"
                    @selection-change='selectChange'
                    style="width: 100%">
                <el-table-column type='selection' width='60' align='center'>

                </el-table-column>
                <el-table-column
                        prop="id"
                        label="编号"
                        align='center'
                        width="80"
                        sortable
                        sort-by='id'>
                </el-table-column>
                <el-table-column
                        prop="name"
                        align='center'
                        label="品牌名称"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="bigPic"
                        label="logo"
                        align='center'
                        width='180'>
                    <template slot-scope="scope">
                        <img style="height: 80px" :src="scope.row.logo">
                    </template>
                </el-table-column>
                <el-table-column
                        prop="firstLetter"
                        align='center'
                        label="首字母"
                        width="120"
                        sortable
                        sort-by='firstLetter'>
                </el-table-column>
                <el-table-column
                        align='center'
                        label="品牌制造商"
                        width="120">
                    <template slot-scope="scope">
                        <el-switch
                                @change="setFactoryStatus( scope.row)"
                                v-model="scope.row.factoryStatus"
                                :active-value='1'
                                :inactive-value='0'
                                active-color="#1989fa"
                                inactive-color="#cccccc">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column
                        align='center'
                        label="是否显示"
                        width="120">
                    <template slot-scope="scope">
                        <el-switch
                                @change="setShowStatus( scope.row)"
                                v-model="scope.row.showStatus"
                                :active-value='1'
                                :inactive-value='0'
                                active-color="#1989fa"
                                inactive-color="#cccccc">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="商品名称" align="center">
                    <template slot-scope="scope">
                        <p>商品数量：<span>{{scope.row.productCount}}</span></p>
                        <p>评价数量：<span>{{scope.row.productCommentCount}}</span></p>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="160" align="center">
                    <template slot-scope="scope">
                        <el-button
                                @click="toEditPage( scope.row)"
                                type="primary"
                                size="mini">编辑
                        </el-button>
                        <el-button
                                type="danger"
                                @click="handleDelete( scope.row)"
                                size="mini">删除
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
    import {brandListApi, setFactoryStatusApi, deleteBrand, setShowStatus} from '../../../api/brand';

    export default {
        name: "brand",
        data() {
            return {
                queryOptions: {
                    keyword: '',
                    pageNum: 1,
                    pageSize: 10
                },
                loading: true,
                options: ['show', 'hidden'],
                optionsSelect: '',
                brandList: [],
                totalItemCount: 0,
                selectItems: []
            }
        },
        created() {
            this.searchBrandList()
        },
        methods: {
            change(val) {
                console.log(val, this.optionsSelect)
                if (val === 'show') {
                } else {
                }
            },
            searchBrandList() {
                this.loading = true
                brandListApi(this.queryOptions).then(res => {
                    this.brandList = res.list
                    this.loading = false
                    this.totalItemCount = res.total;
                }).catch(error => {
                    this.loading = false
                })
            },
            handleSizeChange(pageSize) {
                this.queryOptions.pageNum = 1
                this.queryOptions.pageSize = pageSize
                this.searchBrandList()
            },
            handleCurrentChange(curPage) {
                this.queryOptions.pageNum = curPage
                this.searchBrandList()
            },
            setFactoryStatus(item) {
                this.$confirm('是否要修改品牌制造商?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    setFactoryStatusApi({
                        ids: [item.id],
                        factoryStatus: item.factoryStatus
                    }).then(res => {
                        this.$message.success('更新成功')
                    }).catch(error => {
                        this.$message.error(error.message)
                        item.factoryStatus = item.factoryStatus === 1 ? 0 : 1
                    })
                })
            },
            setShowStatus(item) {
                this.$confirm('是否要修改显示状态?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    setShowStatus({
                        ids: [item.id],
                        showStatus: item.showStatus
                    }).then(res => {
                        this.$message.success('更新成功')
                    }).catch(error => {
                        this.$message.error(error.message)
                        item.showStatus = item.showStatus === 1 ? 0 : 1
                    })
                })
            },
            handleDelete(row) {
                this.$confirm('是否要删除该品牌', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteBrand(row.id).then(response => {
                        this.$message({
                            message: '删除成功',
                            type: 'success',
                            duration: 1000
                        });
                        this.searchBrandList();
                    });
                });
            },
            selectChange(val) {
                this.selectItems = val
            },
            handlerBrandShow() {
                const isShow = this.optionsSelect === 'show' ? 1 : this.optionsSelect === 'hidden' ? '0' : -1
                if (isShow === -1) {
                    this.$message({
                        message: '请选择显示模式',
                        type: 'warning',
                        duration: 1000
                    });
                    return;
                }
                if (this.selectItems.length === 0) {
                    this.$message({
                        message: '至少选择一条记录',
                        type: 'warning',
                        duration: 1000
                    });
                    return;
                }
                const ids = this.selectItems.map(item => {
                    return item.id
                })
                console.log('ids', ids)
                this.$confirm('是否确定批量修改显示状态?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    setShowStatus({
                        ids: ids,
                        showStatus: isShow
                    }).then(res => {
                        this.$message.success('更新成功')
                        this.searchBrandList();
                    }).catch(error => {
                        this.$message.error(error.message)
                        this.searchBrandList();
                    })
                })
            },
            toEditPage(item) {
                this.$router.push({path: '/pms/editBrand', query: {id: item.id}})
            },
            toAddPage() {
                this.$router.push({path: '/pms/addBrand'})
            }

        }
    }
</script>

<style lang='scss'>
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
            overflow: hidden;
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
            .btn-brand-add {
                float: right;
                margin-top: 5px;
                height: $h_normal_action_view;
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
