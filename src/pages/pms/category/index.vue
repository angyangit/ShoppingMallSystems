<template>
    <div class='pms-category-warpper'>
        <div class='content-warpper'
             v-loading="listLoading">
            <el-table
                    :data="cateList"
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
                        prop="name"
                        align='center'
                        label="分类名称"
                        width="120">
                </el-table-column>
                <el-table-column
                        label="层级"
                        align='center'
                        width='80'>
                    <template slot-scope="scope">{{scope.row.level | levelFilter}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="productCount"
                        align='center'
                        label="商品数量"
                        width="100"
                        sortable
                        sort-by='productCount'>
                </el-table-column>
                <el-table-column
                        prop="productUnit"
                        align='center'
                        label="数量单位"
                        width="80">
                </el-table-column>
                <el-table-column label="导航栏" width="100" align="center">
                    <template slot-scope="scope">
                        <el-switch
                                @change="handleNavStatusChange(scope.$index, scope.row)"
                                :active-value="1"
                                :inactive-value="0"
                                v-model="scope.row.navStatus">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="是否显示" width="100" align="center">
                    <template slot-scope="scope">
                        <el-switch
                                @change="handleShowStatusChange(scope.$index, scope.row)"
                                :active-value="1"
                                :inactive-value="0"
                                v-model="scope.row.showStatus">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column
                        prop='sort'
                        label="排序"
                        width="100"
                        align="center"
                        sortable
                        sort-by='sort'>
                    <template slot-scope="scope">{{scope.row.sort }}</template>
                </el-table-column>
                <el-table-column label="设置" width="200" align="center">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                :disabled="scope.row.level | disableNextLevel"
                                @click="handleShowNextLevel(scope.$index, scope.row)">查看下级
                        </el-button>
                        <el-button
                                size="mini"
                                @click="handleTransferProduct(scope.$index, scope.row)">转移商品
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="200" align="center">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="handleUpdate(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class='pagination-warpper clearfix'>
            <el-button
                    class='btn-brand-add'
                    @click="handleAddProductCate"
                    type="primary"
                    size="small"><i class='icon-iconfontwendang' style='font-size: 14px;padding-right: 5px'></i>
                添加分类
            </el-button>
            <div class='pagination-container '>
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        background
                        :current-page.sync="searchOption.pageNum"
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
    import {fetchList, deleteProductCate, updateShowStatus, updateNavStatus} from '@/api/category'

    export default {
        name: "category",
        data() {
            return {
                searchOption: {
                    pageNum: 1,
                    pageSize: 10,
                },
                listLoading: true,
                options: ['show', 'hidden'],
                optionsSelect: '',
                cateList: [],
                totalItemCount: 0,
                selectItems: []
            }
        },
        created() {
            this.resetParentId();
            this.getList();
        },
        watch: {
            $route(route) {
                this.resetParentId();
                this.getList();
            }
        },
        filters: {
            levelFilter(value) {
                if (value === 0) {
                    return '一级';
                } else if (value === 1) {
                    return '二级';
                }
            },
            disableNextLevel(value) {
                if (value === 0) {
                    return false;
                } else {
                    return true;
                }
            }
        },
        methods: {
            resetParentId() {
                this.searchOption.pageNum = 1;
                if (this.$route.query.parentId != null) {
                    this.parentId = this.$route.query.parentId;
                } else {
                    this.parentId = 0;
                }
            },
            getList() {
                this.listLoading = true;
                fetchList(this.parentId, this.searchOption).then(response => {
                    this.listLoading = false;
                    this.cateList = response.list;
                    this.totalItemCount = response.total;
                });
            },
            handleAddProductCate() {
                this.$router.push('/pms/addProductCate');
            },
            handleSizeChange(val) {
                this.searchOption.pageNum = 1;
                this.searchOption.pageSize = val;
                this.getList();
            },
            handleCurrentChange(val) {
                this.searchOption.pageNum = val;
                this.getList();
            },
            handleNavStatusChange(index, row) {
                let data = new URLSearchParams();
                let ids = [];
                ids.push(row.id)
                data.append('ids', ids);
                data.append('navStatus', row.navStatus);
                updateNavStatus(data).then(response => {
                    this.$message({
                        message: '修改成功',
                        type: 'success',
                        duration: 1000
                    });
                });
            },
            handleShowStatusChange(index, row) {
                let data = new URLSearchParams();
                let ids = [];
                ids.push(row.id)
                data.append('ids', ids);
                data.append('showStatus', row.showStatus);
                updateShowStatus(data).then(response => {
                    this.$message({
                        message: '修改成功',
                        type: 'success',
                        duration: 1000
                    });
                });
            },
            handleShowNextLevel(index, row) {
                this.$router.push({path: '/pms/productCate', query: {parentId: row.id}})
            },
            handleTransferProduct(index, row) {
                console.log('handleAddProductCate');
            },
            handleUpdate(index, row) {
                this.$router.push({path: '/pms/updateProductCate', query: {id: row.id}});
            },
            handleDelete(index, row) {
                this.$confirm('是否要删除该品牌', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteProductCate(row.id).then(response => {
                        this.$message({
                            message: '删除成功',
                            type: 'success',
                            duration: 1000
                        });
                        this.getList();
                    });
                });
            }
        },
        filters: {
            levelFilter(value) {
                if (value === 0) {
                    return '一级';
                } else if (value === 1) {
                    return '二级';
                }
            },
            disableNextLevel(value) {
                if (value === 0) {
                    return false;
                } else {
                    return true;
                }
            }
        }
    }
</script>

<style lang='scss'>
    @import "../../../styles/variables";

    .pms-category-warpper {
        min-width: 800px;
        padding: 0 10px;
        height: 100%;
        box-sizing: border-box;
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
            .btn-brand-add {
                margin: 20px;
                height: $h_normal_action_view;
            }
        }
    }
</style>
