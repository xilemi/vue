<template>
  <div class="loginBox">
    <ComHeader title="登录"></ComHeader>
    <div class="login">
      <van-form @submit="onSubmit" class="loginForm" ref="loginForm">
        <van-cell-group inset>
          <van-field
            v-model="loginParams.loginname"
            name="loginname"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="loginParams.password"
            type="password"
            name="password"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
        </van-cell-group>
        <div style="margin: 16px">
          <van-row>
            <van-col span="24" offset="1" @click="router.push('/register')"
              >去注册</van-col
            >
          </van-row>
          <van-row>
            <van-col span="11">
              <van-button block type="primary" native-type="submit"
                >登录</van-button
              >
            </van-col>
            <van-col span="11" offset="2">
              <van-button block type="primary" native-type="reset"
                >重置</van-button
              >
            </van-col>
          </van-row>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user.js";
import ComHeader from "../../components/ComHeader.vue";
const loginParams = reactive({ loginname: "", password: "" });
let loginForm = ref();
const router = useRouter();
// 登录可以放进pinia 中 完成数据持久化
const userStore = useUserStore();
const { loginAndUpdateUserInfo } = userStore;
const onSubmit = async () => {
  loginAndUpdateUserInfo(loginParams);
};
</script>

<style scoped>
.loginBox {
  height: 100%;
}
.login {
  width: 100%;
  height: 100%;
  background-color: #f4f4f4;
  padding-top: 50px;
}
.loginForm {
  width: 90%;
  background-color: #fff;
  margin: 0 auto;
  border-radius: 5px;
}
</style>
