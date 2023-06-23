<template>
  <div>
    <ComHeader class="header" title="购物车">
      <div @click="claerCart">清除购物车</div>
    </ComHeader>
    <div class="carBox" v-if="isLogin">
      <van-swipe-cell v-for="item in cartList" :key="item.proid">
        <van-checkbox
          v-model="item.flag"
          class="checkOne"
          @change="changeOne(item.cartid, $event)"
        ></van-checkbox>
        <van-card
          :price="((item.originprice * item.discount) / 10).toFixed(2)"
          :title="item.proname"
          class="goods-card"
          :thumb="item.img1"
        >
          <template #num>
            <van-stepper
              v-model="item.num"
              theme="round"
              button-size="22"
              disable-input
              @change="updateNum(item.cartid, item.num)"
            />
          </template>
        </van-card>
        <template #right>
          <van-button
            square
            text="删除"
            type="danger"
            class="delete-button"
            @click="delCart(item.cartid)"
          />
        </template>
      </van-swipe-cell>
      <van-submit-bar
        :price="totalPrice"
        button-text="提交订单"
        @submit="onSubmit"
        class="submitBar"
      >
        <van-checkbox v-model="checkAll">全选</van-checkbox>
      </van-submit-bar>
    </div>
    <div class="carBox" v-else>
      <van-row style="margin-top: 50px">
        <van-col span="24" style="text-align: center">
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
    </div>
  </div>
</template>

<script setup>
import {
  listCartApi,
  updateNumApi,
  updateCheckOneApi,
  delCartApi,
} from "@/api/cart.js";
import { computed, ref, watchEffect } from "vue";
import { useUserStore } from "@/stores/user.js";
import { useCartStore } from "../../stores/cart";
import { claerCartApi } from "@/api/cart.js";
import { storeToRefs } from "pinia";
import { showFailToast, showSuccessToast } from "vant";
import { useRouter, useRoute } from "vue-router";
let User = useUserStore();
let { userid, isLogin } = storeToRefs(User);
let router = useRouter();
let route = useRoute();
const Cart = useCartStore();
const { cartList } = storeToRefs(Cart);
const { updateCartList } = Cart;
let listCart = async () => {
  try {
    let res = await listCartApi({ userid: userid.value });
    cartList.value = res.data;
    updateCartList(res.data);
  } catch (err) {
    showFailToast(err.message);
  }
};
let checkAll = computed({
  get() {
    if (cartList.value) {
      return cartList.value.every((item) => {
        return item.flag == true;
      });
    }
  },
  set(val) {
    cartList.value.forEach((item) => {
      item.flag = val;
    });
  },
});
let changeOne = async (cartid, val) => {
  updateCheckOneApi({ cartid, flag: val });
};
let updateNum = async (cartid, num) => {
  try {
    if (num) {
      let res = await updateNumApi({ cartid, num });
      showSuccessToast(res.message);
    }
  } catch (err) {
    showFailToast(err.message);
  }
};
let delCart = async (cartid) => {
  try {
    if (cartList.value) {
      let index = cartList.value.findIndex((item) => {
        return item.cartid == cartid;
      });
      cartList.value.splice(index, 1);
    }
    let res = await delCartApi({ cartid });
    showSuccessToast(res.message);
  } catch (err) {
    showFailToast(err.message);
  }
};
let claerCart = async () => {
  try {
    let res = await claerCartApi({ userid: userid.value });
    cartList.value = null;
    showSuccessToast(res.message);
  } catch (err) {
    showFailToast(err.message);
  }
};
let totalPrice = computed(() => {
  if (cartList.value) {
    return cartList.value
      .filter((item) => {
        return item.flag == true;
      })
      .reduce((prve, item) => {
        return prve + item.originprice * item.discount * item.num * 10;
      }, 0);
  }
});
let onSubmit = async () => {
  try {
    //   把购物车的商品提交到订单详情界面  还没有到提交订单阶段
    //   过滤勾选的商品 传递勾选的商品id 即可  在订单详情界面使用  在查询购物车 获取商品详情
    // 使用 addOrderApi
    let orderList = cartList.value.filter((item) => {
      return item.flag == true;
    });
    // 携带已经勾选商品的id  在订单详情页面 在购物车在查询商品的信息
    if (orderList.length > 0) {
      router.push({
        path: "/order",
      });
    } else {
      showFailToast("请添加商品");
    }
  } catch (err) {
    showFailToast(err.message);
  }
};
console.log(totalPrice);
watchEffect(() => {
  listCart();
  changeOne();
  updateNum();
});
</script>

<style lang="scss" scoped>
.carBox {
  overflow: scroll;
}
.goods-card {
  margin: 0;
  background-color: #fff;
  padding: 8px 30px;
}
.checkOne {
  position: absolute;
  top: 50%;
  left: 5px;
  transform: translateY(-50%);
  z-index: 10;
}
.delete-button {
  height: 100%;
}
.submitBar {
  margin-bottom: 49px;
}
</style>
