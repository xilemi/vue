<template>
  <div>
    <!-- 有默认地址选择默认地址  没有显示添加地址-->
    <ComHeader></ComHeader>
    <div class="oredrBox">
      <van-contact-card
        type="edit"
        :name="addressInfo.name"
        :tel="
          addressInfo.tel +
          (addressInfo.province == addressInfo.city
            ? addressInfo.city
            : addressInfo.province + addressInfo.city) +
          addressInfo.county +
          addressInfo.addressDetail
        "
        :editable="true"
        @click="onEdit"
        v-if="addressInfo"
      />
      <van-contact-card type="add" @click="onAdd" add-text="添加地址" v-else />

      <van-card
        v-for="item in orderList"
        :key="item.proid"
        :price="(item.originprice * item.discount) / 10"
        :title="item.proname"
        class="goods-card"
        :thumb="item.img1"
        :num="item.num"
      />
      <van-submit-bar
        :price="totalPrice"
        button-text="确认订单"
        @submit="onSubmit"
      />
    </div>
  </div>
</template>

<script setup>
// 购物车页面点击提交订单 添加订单
// 本页面渲染 订单信息
import { addOrderApi, deleteCartItemApi } from "@/api/order.js";
import { getDefaultAddressApi } from "@/api/address.js";
import { onMounted, ref } from "vue";
import { useUserStore } from "@/stores/user.js";
import { useCartStore } from "../../stores/cart";
import { proDetailApi } from "@/api/pro.js";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";
import ComHeader from "../../components/ComHeader.vue";
let User = useUserStore();
let { userid, addressInfo } = storeToRefs(User);
const Cart = useCartStore();
const { updateCartList } = Cart;
const { cartList } = storeToRefs(Cart);
let route = useRoute();
let router = useRouter();
const orderList = ref([]);
const totalPrice = ref(0);
const getTotalPrice = async () => {
  totalPrice.value = await orderList.value.reduce((prve, item) => {
    return prve + item.originprice * item.discount * item.num * 10;
  }, 0);
};
// 其实就是查购物车勾选的商品
let getOrderList = async () => {
  if (route.query.proid) {
    let res = await proDetailApi({ proid: route.query.proid });
    res.data.num = route.query.num;
    orderList.value = [res.data];
    console.log(res.data);
  } else {
    orderList.value = cartList.value.filter((item) => {
      return item.flag == true;
    });
    console.log(orderList.value);
  }
  getTotalPrice();
};

const resetAddress = async () => {
  let res = await getDefaultAddressApi({ userid: userid.value });
  // 如何判断进去选择地址没有
  addressInfo.value = res.data[0];
};
// 点击添加地址  跳转到地址页面   如果存在默认地址应该直接 显示默认地址
const onEdit = () => {
  router.push({
    path: "/addressList",
    query: { returnUrl: route.fullPath },
  });
};
const onAdd = () => {
  router.push({
    path: "/addressList",
    query: { returnUrl: route.fullPath },
  });
};
// 选好地址后切换地址
// 确认订单 使用  addOrderApi
const onSubmit = async () => {
  let res = await addOrderApi({
    userid: userid.value,
    addressid: addressInfo.value.addressid,
  });
  router.push("/orderList");
  resetAddress();
  // 购买后删除购物车中购买的勾选的商品 应为做了数据持久化
  deleteCartItemApi({ userid: userid.value });
  // 更新下购物车的pinia
  updateCartList(null);
  console.log(res);
};
onMounted(() => {
  getOrderList();
});
</script>

<style lang="scss" scoped>
.oredrBox {
  overflow: scroll;
}
</style>
