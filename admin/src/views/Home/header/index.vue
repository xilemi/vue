<template lang="">
    <div>
        <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
                <!--  -->
                <el-dropdown-item>
                    查看
                </el-dropdown-item>
                <el-dropdown-item @click.native="handlerEixt()">退出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <span>{{userInfo.adminname}}</span>
    </div>

</template>
<script>
    import { mapActions, mapState } from 'vuex'
    export default {
        name: 'headerView',
        methods: {
            ...mapActions(['adminExitLogin']),
            handlerEixt() {
                this.adminExitLogin()
                this.$router.replace('/login')
                this.$message.success('退出成功')
            }
        },
        computed: {
            ...mapState(['userInfo']),
        },
    }
</script>
<style lang="">

</style>