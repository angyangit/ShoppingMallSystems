<template>
    <div class='brand-detail-warpper'>
        <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="120px"
                class="demo-ruleForm">
            <el-form-item label="品牌名称:" prop="name" required>
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="品牌首字母:" prop="word">
                <el-input v-model="ruleForm.firstLetter"></el-input>
            </el-form-item>
            <el-form-item label="品牌故事：">
                <el-input
                        placeholder="请输入内容"
                        type="textarea"
                        v-model="ruleForm.brandStory"
                        :autosize="true"></el-input>
            </el-form-item>
            <el-form-item label="排序：" prop="sort">
                <el-input v-model.number="ruleForm.sort"></el-input>
            </el-form-item>
            <el-form-item label="是否显示：">
                <el-radio-group v-model="ruleForm.showStatus">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="品牌制造商：">
                <el-radio-group v-model="ruleForm.factoryStatus">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="品牌LOGO：" prop="logo" required>
                <single-upload v-model="ruleForm.logo"></single-upload>
            </el-form-item>
            <el-form-item label="品牌专区大图：">
                <single-upload v-model="ruleForm.bigPic"></single-upload>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">
                    {{actionType?'更新品牌':'添加品牌'}}
                </el-button>
                <el-button type='danger' @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import SingleUpload from '../../../../components/SingleUpload';
    import {getBrand, updateBrand, addBrand} from '../../../../api/brand';

    const defaultBrand = {
        bigPic: '',
        brandStory: '',
        factoryStatus: 0,
        firstLetter: '',
        logo: '',
        name: '',
        showStatus: 0,
        sort: 0
    };
    export default {
        name: "BrandDetail",
        components: {
            SingleUpload
        },
        props: {
            actionType: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                ruleForm: Object.assign({}, defaultBrand),
                rules: {}
            }
        },
        created() {
            if (this.actionType) {
                getBrand(this.$route.query.id).then(res => {
                    this.ruleForm = res
                })
                console.log(' this.ruleForm', this.ruleForm)
            } else {
                this.ruleForm = Object.assign({}, defaultBrand);
            }
        },
        methods: {
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.ruleForm = {};
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        const tip = this.actionType ? '是否确定更新品牌信息' : '是否确定添加新品牌信息'
                        this.$confirm(tip, '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            if (this.actionType) {
                                updateBrand(this.$route.query.id, this.ruleForm).then(response => {
                                    this.$refs[formName].resetFields();
                                    this.$message({
                                        message: '修改成功',
                                        type: 'success',
                                        duration: 1000
                                    });
                                    this.$router.back();
                                });
                            } else {
                                addBrand(this.ruleForm).then(response => {
                                    this.$refs[formName].resetFields();
                                    this.ruleForm = Object.assign({}, defaultBrand);
                                    this.$message({
                                        message: '提交成功',
                                        type: 'success',
                                        duration: 1000
                                    });
                                });
                            }
                        });

                    } else {
                        this.$message({
                            message: '验证失败',
                            type: 'error',
                            duration: 1000
                        });
                        return false;
                    }
                });
            },
        }
    }
</script>

<style scoped lang='scss'>
    .brand-detail-warpper {
        background: white;
        height: 100%;
        margin: 10px;
        min-width: 400px;
        .demo-ruleForm {
            width: 70%;
            height: 100%;
            padding: 30px;
            margin: 0 auto;
        }
    }

</style>
