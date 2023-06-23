<template>
  <div>
    <ComHeader title="我的订单"></ComHeader>
    <div class="orderList">
      <router-link
        :to="{ path: '/orderDetail', query: { time } }"
        v-for="(time, index) in timeList"
        :key="index"
      >
        <van-cell-group inset class="orderBox">
          <van-cell
            title="下单时间"
            :value="dayjs(+time).format('YYYY-MM-DD HH:mm:ss')"
          />
          <van-card
            v-for="item in orderList.filter((item) => item.time == time)"
            :key="item.proid"
            :price="(item.originprice * item.discount) / 10"
            :title="item.proname"
            class="goods-card"
            :thumb="item.img1"
            :num="item.num"
          />
        </van-cell-group>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import * as dayjs from "dayjs";
import { ref, onMounted } from "vue";
import { orderListApi } from "../../api/user";
import { useUserStore } from "../../stores/user";
import { storeToRefs } from "pinia";
import ComHeader from "../../components/ComHeader.vue";
const orderList = ref(null);
const user = useUserStore();
const timeList = ref(null);
const { userid } = storeToRefs(user);
const getOrderTime = (payload) => {
  timeList.value = new Set(
    payload.map((item) => {
      return item.time;
    })
  );
};
const getOrderList = async () => {
  let res = await orderListApi({ userid: userid.value });
  orderList.value = res.data;
  getOrderTime(orderList.value);
  console.log(orderList.value);
  console.log(timeList.value);
};
onMounted(() => {
  getOrderList();
});
</script>

<style lang="scss" scoped>
.orderList {
  background-color: #f3f3f3;
  overflow: scroll;
  .orderBox {
    margin: 10px 10px;
  }
}
</style>
// 订单时间去重 事件格式化显示 // 点击订单跳转到 订单详情
