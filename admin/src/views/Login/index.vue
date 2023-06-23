<template lang="">
    <div class="login">
        <div class="login-box">
            <el-form :model="queryParams" ref="loginForm" :rules="rules" label-width="50px" :inline="false" status-icon>
                <el-form-item label="账号" prop="adminname">
                    <el-input v-model="queryParams.adminname"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="queryParams.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitFrom()">登录</el-button>
                    <el-button type="primary" @click="resetFrom()">取消</el-button>
                </el-form-item>
            </el-form>

        </div>
    </div>
</template>
<script>
    import { adminLogin } from '@/api/admin.js'
    import { mapActions } from 'vuex'
    export default {
        name: 'LoginView',
        data() {
            let validatePwd = (rule, value, callback) => {
                let reg = /^\w{5,12}$/
                if (!value) {
                    callback('请输入密码')
                }
                else if (value.length > 12 || value.length < 5) {

                    callback('密码长度应该在5到12位')
                }
                else if (!reg.test(value)) {
                    callback('密码应该由字母，数字，下划线组成')
                } else {
                    callback()
                }

            }


            return {
                queryParams: {
                    adminname: 'admin',
                    password: '123456'
                },
                rules: {
                    adminname: [
                        { required: true, message: '请输入账户', trigger: 'blur' },
                        { min: 5, max: 12, message: '用户名请在5-12位', trigger: 'blur' },
                        { pattern: /^[a-zA-Z_]\w{4,11}/, message: '用户名以字母，数字，下户线组成', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        // { min: 5, max: 12, message: '密码请在5-12位', trigger: 'blur' },
                        { validator: validatePwd, trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            ...mapActions(['adminLoginInfo']),
            submitFrom() {
                this.$refs.loginForm.validate((bool, failField) => {
                    if (bool) {
                        this.adminLoginInfo(this.queryParams)
                        // adminLogin(this.queryParams).then((result) => {
                        //     let { code, data, message } = result
                        //     if (code == 200) {
                        //         console.log(data);
                        //         // 登录成功后将 data存入 store中
                        //         localStorage.setItem('token', data.token)
                        //         this.$router.push({ path: '/', query: { user: data.adminname } })
                        //         
                        //     } else {
                        //         // 这里的message如何显示到错误提示
                        //         alert(message)
                        //     }
                        // })
                        // // 后端返回的登录结果如何显示到对应的位置
                        // console.log('可以登录发送请求');
                    }
                    else {
                        // 展示的验证信息
                        console.log(failField);
                    }
                })
            },
            resetFrom() {
                this.$refs.loginForm.resetFields()
            }
        },
    }
</script>
<style>
    .login {
        width: 100%;
        background: url(@/assets/bg.jpeg);
        height: 100%;
    }

    .login-box {
        width: 450px;
        padding: 80px 50px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #fff;
        border-radius: 10px;
        opacity: 0.8;
    }
</style>