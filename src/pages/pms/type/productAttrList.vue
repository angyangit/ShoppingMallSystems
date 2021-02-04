<template> 
    <div class="pms-attr-warpper">
        <el-card class="content-warpper" shadow="never">

            <div class="batch-operate-container">
                <el-select
                        size="small"
                        class='sel-warpper'
                        v-model="operateType" placeholder="批量操作">
                    <el-option
                            v-for="item in operates"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-button
                        style="margin-left: 20px"
                        class="search-button"
                        @click="handleBatchOperate()"
                        type="primary"
                        size="small">
                    确定
                </el-button>
            </div>
            <el-button
                    class="btn-add"
                    @click="addProductAttr()"
                    size="mini"
                    type="primary"><i class='icon-iconfontwendang' style='font-size: 14px;padding-right: 5px'></i>
                添加属性
            </el-button>
        </el-card>
        <div class="table-container">
            <el-table ref="productAttrTable"
                      :data="list"
                      style="width: 100%"
                      @selection-change="handleSelectionChange"
                      v-loading="listLoading"
                      border>
                <el-table-column type="selection" width="60" align="center"></el-table-column>
                <el-table-column label="编号" width="100" align="center">
                    <template slot-scope="scope">{{scope.row.id}}</template>
                </el-table-column>
                <el-table-column label="属性名称" width="140" align="center">
                    <template slot-scope="scope">{{scope.row.name}}</template>
                </el-table-column>
                <el-table-column label="商品类型" width="140" align="center">
                    <template slot-scope="scope">{{$route.query.cname}}</template>
                </el-table-column>
                <el-table-column label="属性是否可选" width="120" align="center">
                    <template slot-scope="scope">{{scope.row.selectType|selectTypeFilter}}</template>
                </el-table-column>
                <el-table-column label="属性值的录入方式" width="150" align="center">
                    <template slot-scope="scope">{{scope.row.inputType|inputTypeFilter}}</template>
                </el-table-column>
                <el-table-column label="可选值列表" align="center">
                    <template slot-scope="scope">{{scope.row.inputList}}</template>
                </el-table-column>
                <el-table-column label="排序" width="100" align="center">
                    <template slot-scope="scope">{{scope.row.sort}}</template>
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
        <div class="pagination-warpper clearfix">
            <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    layout="total, sizes,prev, pager, next,jumper"
                    :page-size="listQuery.pageSize"
                    :page-sizes="[5,10,15]"
                    class='pagination-container'
                    :current-page.sync="listQuery.pageNum"
                    :total="total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    import {fetchList, deleteProductAttr} from '@/api/productAttr'

    export default {
        name: 'productAttrList',
        data() {
            return {
                list: null,
                total: null,
                listLoading: true,
                listQuery: {
                    pageNum: 1,
                    pageSize: 5,
                    type: this.$route.query.type
                },
                operateType: null,
                multipleSelection: [],
                operates: [
                    {
                        label: "删除",
                        value: "deleteProductAttr"
                    }
                ]
            }
        },
        created() {
            this.getList();
        },
        methods: {
            getList() {
                this.listLoading = true;
                fetchList(this.$route.query.cid, this.listQuery).then(response => {
                    this.listLoading = false;
                    this.list = response.list;
                    this.total = response.total;
                });
            },
            addProductAttr() {
                this.$router.push({
                    path: '/pms/addProductAttr',
                    query: {cid: this.$route.query.cid, type: this.$route.query.type}
                });
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleBatchOperate() {
                if (this.multipleSelection < 1) {
                    this.$message({
                        message: '请选择一条记录',
                        type: 'warning',
                        duration: 1000
                    });
                    return;
                }
                if (this.operateType !== 'deleteProductAttr') {
                    this.$message({
                        message: '请选择批量操作类型',
                        type: 'warning',
                        duration: 1000
                    });
                    return;
                }
                let ids = [];
                for (let i = 0; i < this.multipleSelection.length; i++) {
                    ids.push(this.multipleSelection[i].id);
                }
                this.handleDeleteProductAttr(ids);
            },
            handleSizeChange(val) {
                this.listQuery.pageNum = 1;
                this.listQuery.pageSize = val;
                this.getList();
            },
            handleCurrentChange(val) {
                this.listQuery.pageNum = val;
                this.getList();
            },
            handleUpdate(index, row) {
                this.$router.push({path: '/pms/updateProductAttr', query: {id: row.id}});
            },
            handleDeleteProductAttr(ids) {
                this.$confirm('是否要删除该属性', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let data = new URLSearchParams();
                    data.append("ids", ids);
                    deleteProductAttr(data).then(response => {
                        this.$message({
                            message: '删除成功',
                            type: 'success',
                            duration: 1000
                        });
                        this.getList();
                    });
                });
            },
            handleDelete(index, row) {
                let ids = [];
                ids.push(row.id);
                this.handleDeleteProductAttr(ids);
            },
        },
        filters: {
            inputTypeFilter(value) {
                if (value === 1) {
                    return '从列表中选取';
                } else {
                    return '手工录入'
                }
            },
            selectTypeFilter(value) {
                if (value === 1) {
                    return '单选';
                } else if (value === 2) {
                    return '多选';
                } else {
                    return '唯一'
                }
            },
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    @import "../../../styles/variables";

    .pms-attr-warpper {
        min-width: 800px;
        padding: 0 10px;
        height: 100%;
        box-sizing: border-box;
        .content-warpper {
            border-radius: 5px;
            background: white;
            background: white;
            margin-top: 10px;
            .batch-operate-container {
                display: inline-block;
                .sel-warpper {
                    width: $w_normal_action_frame;
                    height: $h_normal_action_view;
                    .el-input {
                        height: 100%;
                        .el-input__inner{
                            height: 100%;
                        }
                    }

                }
                .search-button {
                    height: $h_normal_action_view;
                }

            }
            .btn-add {
                float: right;
                height: $h_normal_action_view;
            }
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


