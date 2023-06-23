<template>
  <div>
    <ComHeader class="header" title="个人中心"></ComHeader>
    <van-row style="height: 120px" align="center">
      <van-col span="24" style="text-align: center" v-if="isLogin"
        >用户名:{{ id }}</van-col
      >
      <van-col span="24" style="text-align: center" v-else>
        <van-button
          type="primary"
          @click="
            router.replace({
              path: '/login',
              query: { returnUrl: route.fullPath },
            })
          "
          >去登录</van-button
        >
      </van-col>
    </van-row>
    <van-divider />
    <van-cell-group v-if="isLogin">
      <van-cell title="地址管理" is-link to="/addressList" />
      <van-cell title="订单管理" is-link to="/orderList" />
      <van-cell title="我的评论" is-link to="/rateList" />
      <van-cell title="我的点赞" is-link to="/upvoteList" />
      <van-cell title="绑定用户名" is-link @click="change" />
      <van-cell title="修改密码" is-link @click="change" />
      <van-cell title="退出登录" @click="exitAndUpdateUserInfo" />
    </van-cell-group>
    <van-cell title="清除缓存" />
    <van-cell title="设置" />
    <van-popup
      v-model:show="showBottom"
      round
      closeable
      position="bottom"
      @closed="isbindusername = false"
      :style="{ height: '40%', padding: '20px' }"
    >
      <template #default v-if="isbindusername">
        <van-field
          v-model="username"
          placeholder="请输入用户名"
          style="margin-top: 30px"
        />
        <van-col span="24" style="text-align: center">
          <van-button type="primary" block @click="bindUserName"
            >提交</van-button
          >
        </van-col>
      </template>
      <template #default v-else>
        <van-field
          v-model="updatePasswordParams.oldpassword"
          placeholder="旧密码"
          label="旧密码"
          style="margin-top: 30px"
        />
        <van-field
          v-model="updatePasswordParams.newpassword"
          placeholder="新密码"
          label="新密码"
          style="margin-top: 30px"
        />
        <van-col span="24" style="text-align: center">
          <van-button type="primary" block @click="updatePassword"
            >提交</van-button
          >
        </van-col>
      </template>
    </van-popup>
  </div>
</template>

<script setup>
import { useUserStore } from "../../stores/user";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { bindUserNameApi, userInfoApi, updatePasswordApi } from "@/api/user.js";
import { showSuccessToast, showFailToast } from "vant";
const User = useUserStore();
const { exitAndUpdateUserInfo } = useUserStore();
const { userid, isLogin } = storeToRefs(User);
const router = useRouter();
const route = useRoute();
const id = ref(null);
const isbindusername = ref(false);
const updatePasswordParams = ref({
  userid: userid.value,
  oldpassword: "",
  newpassword: "",
});
const showBottom = ref(false);
const username = ref(null);
// 通过id 查用户 账号
let getUserInfo = async () => {
  if (userid.value) {
    let res = await userInfoApi({ userid: userid.value });
    console.log(res.data[0]);
    id.value = res.data[0].username ? res.data[0].username : res.data[0].tel;
  }
};
const bindUserName = async () => {
  try {
    let res = await bindUserNameApi({
      userid: userid.value,
      username: username.value,
    });
    showSuccessToast(res.message);
  } catch (err) {
    showFailToast(err.message);
  }
  showBottom.value = false;
};
const updatePassword = async () => {
  try {
    let res = await updatePasswordApi(updatePasswordParams.value);
    showSuccessToast(res.message);
  } catch (err) {
    showFailToast(err.message);
  }
  showBottom.value = false;
};
const change = (e) => {
  showBottom.value = true;
  if (e.currentTarget.innerText == "绑定用户名") {
    isbindusername.value = true;
  }
};
onMounted(() => {
  getUserInfo();
});
</script>

<style lang="scss" scoped>
.popupBox {
  padding-top: 20px;
}
</style>
