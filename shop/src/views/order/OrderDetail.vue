<template>
  <div>
    <ComHeader title="订单详情"></ComHeader>
    <van-cell title="商品地址"></van-cell>
    <van-contact-card
      type="edit"
      :tel="address.tel"
      :name="address.name"
      @click="onEidt"
      v-if="address"
    />
    <van-card
      v-for="item in orderDetail"
      :key="item.proid"
      :num="item.num"
      :price="(item.originprice * item.discount) / 10"
      :title="item.proname"
      :thumb="item.img1"
    >
      <template #footer>
        小计: {{ (item.originprice * item.discount * item.num) / 10 }}</template
      >
    </van-card>
    <van-cell-group>
      <van-cell
        title="下单时间"
        :value="dayjs(Number(time)).format('YYYY-MM-DD HH:mm:ss')"
      ></van-cell>
      <van-cell title="商品总量" :value="totalNum"></van-cell>
      <van-cell title="商品总价" :value="totalPrice"></van-cell>
    </van-cell-group>
  </div>
</template>

<script setup>
import * as dayjs from "dayjs";
import { ref, onMounted } from "vue";
import { confirmOrderApi } from "../../api/order.js";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "../../stores/user";
import { storeToRefs } from "pinia";
import ComHeader from "../../components/ComHeader.vue";
const User = useUserStore();
const { userid, addressInfo } = storeToRefs(User);
const route = useRoute();
const router = useRouter();
const orderDetail = ref(null);
const time = ref(route.query.time);
const totalPrice = ref(0);
const totalNum = ref(0);
const address = ref({
  name: "",
  tel: "",
});
const getAddress = (payload) => {
  address.value.name = payload[0].name;
  let str =
    payload.province == payload[0].city
      ? payload[0].city
      : payload[0].province + payload[0].city;
  address.value.tel =
    payload[0].tel + str + payload[0].county + payload[0].addressDetail;
};
const getTotalPrice = (payload) => {
  totalPrice.value = payload
    .reduce((prev, item) => {
      return prev + (item.num * item.discount * item.originprice) / 10;
    }, 0)
    .toFixed(2);
};
const getTotalNum = (payload) => {
  totalNum.value = payload.reduce((prev, item) => {
    return prev + item.num;
  }, 0);
};
const getConfirmOrder = async () => {
  let res = await confirmOrderApi({ userid: userid.value, time: time.value });
  orderDetail.value = res.data;
  getAddress(res.data);
  getTotalPrice(orderDetail.value);
  getTotalNum(orderDetail.value);
  console.log(orderDetail.value);
};
const onEidt = async () => {
  // 先跳转到地址列表  得到传回的item
  router.push({
    path: "/addressList",
    query: {
      returnUrl: route.fullPath,
    },
  });
};
onMounted(() => {
  getConfirmOrder();
});
</script>

<style lang="scss" scoped></style>
// 根据时间查找订单 // 一个订单中含有多个商品是被分开的记录 //
地址信息取一条就行
