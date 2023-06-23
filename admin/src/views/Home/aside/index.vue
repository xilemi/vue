<template lang="">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1']" :router="true" v-for="(menu, index) in menus" :key="index">
            <el-menu-item :index="menu.name" :route="menu.path" v-if="!menu.children">{{menu.label}}</el-menu-item>
            <el-submenu index="2" v-else>
                <template slot="title"><i class="el-icon-menu"></i>{{menu.label}}</template>
                <el-menu-item :index="item.name" :route="item.path" v-for="(item, index) in menu.children"
                    :key="index">{{item.label}}</el-menu-item>
            </el-submenu>

        </el-menu>
    </el-aside>
</template>
<script>
    import { routeToMenus } from "@/router/index.js"
    import { mapState, mapGetters } from "vuex"
    //  路由跳转  给 menu 开启 router模式  给item 添加 route='路由'  能自动识别
    export default {
        name: "asideView",
        data() {
            return {
                menus: null
            }
        },
        computed: {
            ...mapState(["userInfo"]),
            ...mapGetters(["routeToRoleMenus"])
        },
        mounted() {
            this.menus = this.routeToRoleMenus
            console.log(this.menus);
        },

    }
</script>
<style lang="">

</style>