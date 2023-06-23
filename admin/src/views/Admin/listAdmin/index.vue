<template lang="">
    <div>
        <el-table :data="adminList" border stripe style="width: 100%;">
            <el-table-column prop="adminname" label="用户名">
            </el-table-column>
            <el-table-column prop="role" label="用户等级">
            </el-table-column>
            <el-table-column prop="checkedKeys" label="用户权限">
            </el-table-column>
            <el-table-column label="操作">
                <template v-slot="{row}">
                    <!-- 抽屉里去修改吗 -->
                    <el-button type="primary" size="default" @click="">查看</el-button>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template v-slot="{row}">
                    <el-button type="primary" size="default" @click="delAdmin(row.adminid)">删除</el-button>
                </template>
            </el-table-column>


        </el-table>

    </div>
</template>
<script>
    import { adminListApi, adminDeleteApi } from "@/api/admin.js"
    export default {
        name: 'listAdminView',
        data() {
            return {
                adminList: null
            }
        },
        methods: {
            getAdminList() {
                adminListApi().then((result) => {
                    this.adminList = result.data
                    console.log(this.adminList);
                }).catch((err) => {
                    this.$message.error(err.message)
                });
            },
            delAdmin(adminid) {
                adminDeleteApi({ adminid }).then(res => {
                    let index = this.adminList.findIndex(item => {
                        return item.adminid = adminid
                    })
                    this.adminList.splice(index, 1)
                }).catch(err => {
                    this.$message.error(err.message)
                })

            }
        },
        mounted() {
            this.getAdminList()
        },
    }
</script>
<style lang="">

</style>