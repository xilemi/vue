<template lang="">
    <div>
        <!-- adminname -->
        <!-- password -->
        <!-- role -->
        <!-- checkedKeys -->
        <el-form :model="paramsAdmin" ref="adminForm" :rules="rules" label-width="150px" :inline="false" size="normal"
            style="width: 800px;">
            <el-form-item label="管理员账号" prop="adminname">
                <el-input v-model="paramsAdmin.adminname"></el-input>
            </el-form-item>
            <el-form-item label="管理员密码" prop="password">
                <el-input v-model="paramsAdmin.password"></el-input>
            </el-form-item>
            <el-form-item label="管理员等级" prop="role">
                <el-select v-model="paramsAdmin.role" placeholder="请选择" @change="roleChangeHandler">
                    <el-option v-for="item in roles" :key="item" :label="item" :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="管理员权限" prop="checkedKeys">
                <el-tree :data="checked" ref='checkTree' show-checkbox node-key="path" @check-change="handleCheckChange"
                    :props="rednerProp">
                </el-tree>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitHandler()">提交</el-button>
                <el-button @click="resetHandler()">重置</el-button>
            </el-form-item>
        </el-form>

    </div>
</template>
<script>
    // 树状图  data 渲染树状图的数据 props 定制树状图的配置 
    // node-key 选择为id 的字段 后续可以配合  getCheckedKeys setCheckedKeys 使用
    import { routeToMenus, routeToRoleTree } from "@/router/index.js"
    import { adminAddApi } from "@/api/admin.js"
    console.log();
    export default {
        name: 'addAdminView',
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
                paramsAdmin: {
                    adminname: '',
                    password: '',
                    role: null,
                    checkedKeys: [],
                },
                roles: [1, 2, 3],
                // 这个结构如何生成
                checked: null,
                rednerProp: {
                    label: 'label',
                    children: "children"
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
            getMenusPath(obj) {
                let newArr = []
                for (let key in obj) {
                    if (Object.hasOwn(obj[key], "children")) {
                        obj[key].children.forEach(item => {
                            newArr.push(item.path)
                        })
                    } else {
                        newArr.push(obj[key].path)
                    }
                }
                return newArr
            },
            // 树状图选择改变时
            handleCheckChange(data, checked, indeterminate) {
                console.log(this.$refs.checkTree.getCheckedKeys())
                console.log(data);
                this.paramsAdmin.checkedKeys = this.$refs.checkTree.getCheckedKeys()
                // console.log(this.paramsAdmin.checkedkeys);
            },
            submitHandler() {
                // 提交
                adminAddApi(this.paramsAdmin).then((result) => {

                }).catch((err) => {
                    this.$message.error(err.message)
                });
            },
            resetHandler() {
                this.$refs.adminForm.resetFields()
                console.log(1);
                // 通过key 或者通过node 进行重置 但是我们生成的节点没有对应的
                this.$refs.checkTree.setCheckedKeys([])
            },
            roleChangeHandler(val) {
                // 可以通过这个直接开渲染菜单
                // routeToRoleMenus(val)
                // 但是 如何关联下面的勾选呢 
                // 但是又bug  就以role 为主导了 
                // 如果等级为1 但是还是要自定义权限呢 
                console.log(routeToRoleTree(val), 111);
                console.log(this.getMenusPath(routeToMenus(val)), 2222);
                this.$refs.checkTree.setCheckedKeys(this.getMenusPath(routeToRoleTree(val)))

            }
        },
        mounted() {
            this.checked = Object.values(routeToMenus())
        },
    }
</script>
<style lang="">

</style>