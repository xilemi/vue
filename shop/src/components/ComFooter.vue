<template>
  <van-tabbar v-model="active" route>
    <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
    <van-tabbar-item icon="search" to="/list">列表</van-tabbar-item>
    <van-tabbar-item icon="friends-o" to="/car">购物车</van-tabbar-item>
    <van-tabbar-item icon="setting-o" to="/mine">我的</van-tabbar-item>
  </van-tabbar>
</template>
<script setup>
import { ref } from "vue";
const active = ref(0);
</script>
