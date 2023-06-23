<template>
  <el-container style="height: 100%;border: 1px solid #eee">
    <el-header style="text-align: right; font-size: 12px;">
      <headerView></headerView>
    </el-header>
    <el-container>
      <asideView></asideView>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
  import { mapActions, mapState, mapGetters } from 'vuex'
  import headerView from './header/index.vue'
  import asideView from "./aside/index.vue"
  export default {
    name: 'HomeView',
    data() {
      return {

      }
    },
    computed: {
      ...mapState(['userInfo']),
      ...mapGetters(['isLogin'])
    },
    methods: {
      ...mapActions(['getUserInfo']),
    },
    created() {
      this.getUserInfo()
    },
    mounted() {
      console.log(this.isLogin);
      //没有登录就访问  回直接跳转到登录页  并且携带从那个页面去的
    },
    components: {
      headerView,
      asideView
    }
  }
</script>
<style lang="scss" scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  /* 如何让父级的样式 可以在子组件内生效 */
</style>