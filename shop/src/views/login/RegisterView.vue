<template>
  <div class="regBox">
    <ComHeader title="注册"></ComHeader>
    <div class="register">
      <van-form @submit="onSubmit" class="registerForm" ref="registernForm">
        <van-cell-group inset>
          <van-field
            v-model="regParams.tel"
            name="tel"
            label="手机号"
            placeholder="手机号"
            :rules="rulesTel"
          />
          <van-field
            v-model="regParams.password"
            name="password"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
            type="password"
          />
        </van-cell-group>
        <van-cell-group inset>
          <van-field
            v-model="code"
            center
            clearable
            label="短信验证码"
            placeholder="请输入短信验证码"
            :rules="rulesCode"
          >
            <template #button>
              <van-button
                size="small"
                type="primary"
                @click="dosendmsgcode()"
                v-if="!isSend"
                >发送验证码</van-button
              >
              <van-count-down
                ref="countDown"
                :time="time"
                :auto-start="true"
                @finish="onFinish"
                format="ss"
                v-else
              />
            </template>
          </van-field>
        </van-cell-group>
        <div style="margin: 16px">
          <van-row>
            <van-col span="24" offset="1" @click="router.push('/login')"
              >去登录</van-col
            >
          </van-row>
          <van-button round block type="primary" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { showSuccessToast, showFailToast } from "vant";
import { useRouter } from "vue-router";
import {
  docheckphoneApi,
  docheckcodeApi,
  dosendmsgcodeApi,
  dofinishregisterApi,
} from "@/api/user.js";
import ComHeader from "../../components/ComHeader.vue";
// 用户名参数
let regParams = reactive({ tel: "13147146358", password: "123123" });
let sms = ref("");
let code = ref("");
let registerForm = ref();
const isSend = ref(false);
const time = ref(120 * 1000);
const countDown = ref();
// 开始显示倒计时
const start = () => {
  countDown.value.start();
};
// 倒计时结束
const onFinish = () => {
  countDown.value.reset();
  isSend.value = false;
};
// 验证验证码
let docheckcode = async () => {
  if (regParams.tel) {
    try {
      let res = await docheckcodeApi({
        tel: regParams.tel,
        telcode: code.value,
      });
    } catch (err) {
      return err.message;
    }
  }
};
let rulesTel = [
  { required: true, message: "请填写手机号" },
  { pattern: /^1[3-9]\d{9}$/, message: "请填写正确的电话号码" },
  // { validator: validateTel, message: "手机号已经被注册", trigger: "onBlur" },
];
let rulesCode = [
  // { validator: docheckcode, message: "验证码错误" },
  { required: true, message: "请填写验证码" },
];
//发送验证码
let dosendmsgcode = async () => {
  docheckphoneApi({ tel: regParams.tel })
    .then(() => {
      dosendmsgcodeApi({ tel: regParams.tel }).then((res) => {
        showSuccessToast(res.data);
        sms.value = res.data;
        console.log(res.data);
        isSend.value = true;
        start();
      });
    })
    .catch((err) => {
      showFailToast(err.message);
    });
  // 切换发送按钮状态 开启倒计时
};
// 注册
let router = useRouter();
const onSubmit = async () => {
  try {
    let res = await dofinishregisterApi(regParams);
    showSuccessToast(res.message);
    router.push("/login");
  } catch (err) {
    showFailToast(err.message);
  }
};
</script>

<style scoped>
.regBox {
  height: 100%;
}
.register {
  width: 100%;
  height: 100%;
  background-color: #f4f4f4;
  padding-top: 50px;
}
.registerForm {
  width: 90%;
  background-color: #fff;
  margin: 0 auto;
  border-radius: 5px;
}
</style>
/* 需求 点击发送点验证码 触发手机号是否存在验证 手机号不存在才能发送验证码
把发送验证码变为禁用 开始显示倒计时 倒计时结束 禁用改可用 验证码 弹提示 */
