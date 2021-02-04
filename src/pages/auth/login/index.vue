<template>
    <div class='login-warpper'>
        <header class="login-content">
            <h1 class='title'>后台管理系统</h1>
            <div class='login-info'>
                <el-form :model="ruleForm"
                         status-icon
                         :rules="rules"
                         ref="ruleForm"
                         label-width="100px"
                         class="demo-ruleForm">
                    <el-form-item label="用户名" prop="uname" class='uname-warpper'>
                        <el-input
                                class='ipt-uname'
                                placeholder="请输入用户名"
                                v-model="ruleForm.uname"
                                @keyup.enter.native="toLogin"
                                @input='unameChange'
                                clearable>
                            <i slot="prefix" class="icon-iconfontwo"></i>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="密  码" prop="pwd" class='pwd-warpper'>
                        <el-input placeholder="请输入密码"
                                  v-model="ruleForm.pwd"
                                  class='ipt-pwd'
                                  @keyup.enter.native="toLogin"
                                  show-password
                                  @input='pwdChange'
                                  clearable>
                            <i slot="prefix" class="icon-iconfonticon-mim"></i>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary"
                                   class='login-btn'
                                   :disabled='!uNameCheckPass||!pwdCheckPass'
                                   @click="toLogin"
                                   :loading="isLoginLoading">
                            {{isLoginLoading?'加载中':'登录'}}
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>
        </header>
    </div>
</template>

<script>
    import {validUsername, CheckPassWord} from '@/utils/validate';
    import {mapActions} from 'vuex'

    export default {
        name: "login",
        data() {
            const validateUname = (rule, value, callback) => {
                if (!validUsername(value)) {
                    callback(new Error('请输入正确的用户名'))
                    this.uNameCheckPass = false
                } else {
                    callback()
                    this.uNameCheckPass = true
                }
            };
            const validatePwd = (rule, value, callback) => {
                if (!CheckPassWord(value)) {
                    callback(new Error('密码必须大于6且包含数字和字母'))
                    this.pwdCheckPass = false
                } else {
                    callback()
                    this.pwdCheckPass = true
                }
            };
            return {
                uname: '',
                pwd: '',
                isLoginLoading: false,
                uNameCheckPass: false,
                pwdCheckPass: false,
                ruleForm: {
                    uname: 'admin',
                    pwd: 'macro123'
                },
                rules: {
                    uname: [
                        {required: true, validator: validateUname, trigger: 'blur'}
                    ],
                    pwd: [
                        {required: true, validator: validatePwd, trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            unameChange(val) {
                if (!validUsername(val)) {
                    this.uNameCheckPass = false
                } else {
                    this.uNameCheckPass = true
                }
            },
            pwdChange(val) {
                if (!CheckPassWord(val)) {
                    this.pwdCheckPass = false
                } else {
                    this.pwdCheckPass = true
                }
            },
            toLogin() {
                this.isLoginLoading = true
                this.$refs.ruleForm.validate((valid, obj) => {
                    console.log('loginAction', valid, obj)
                    if (valid) {
                        this.loginAction(this.ruleForm).then(() => {
                            this.isLoginLoading = false
                            this.$router.push('/')
                        }).catch(err => {
                            this.isLoginLoading = false
                            this.$message.error(err.message);
                        })
                    } else {
                        this.isLoginLoading = false
                        for (const key in obj) {
                            this.$message.error(obj[key][0].message);
                            return
                        }
                    }
                })
            },
            ...mapActions(['loginAction'])
        }
    }
</script>

<style lang='scss'>
    @import "../../../styles/variables";

    .login-warpper {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url("../../../assets/images/bg_img.png") no-repeat;
        background-size: cover;
        .login-content {
            position: absolute;
            top: 50%;
            left: 50%;
            min-width: 500px;
            border-radius: 5px;
            padding-bottom: 20px;
            border: 2px solid white;
            background-color: rgba(255, 255, 255, .8);
            transform: translate3d(-50%, -50%, 0);
            .title {
                text-align: center;
                line-height: 60px;
                border-bottom: 2px solid white;
            }
            .login-info {
                width: 80%;
                margin: 20px auto;
                .uname-warpper {
                    .ipt-uname {
                        box-sizing: border-box;
                        line-height: 50px;
                        .el-input__inner {
                            height: 50px;
                            font-size: 16px;
                            color: $color-text-dark;
                        }

                    }
                }
                .pwd-warpper {
                    .ipt-pwd {
                        box-sizing: border-box;
                        line-height: 50px;
                        .el-input__inner {
                            font-size: 16px;
                            color: $color-text-dark;
                            height: 50px;
                        }
                    }
                }
                .el-form-item__label {
                    line-height: 50px;
                    font-weight: 700;
                    font-size: 18px;
                }
                .login-btn {
                    height: 50px;
                    font-size: 18px;
                    width: 100%;
                }
            }
        }
    }
</style>
