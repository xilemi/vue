<template>
  <div class="proBrandBox">
    <com-header :title="route.query.brand"></com-header>
    <div class="proBrandList">
      <router-link
        :to="{ path: '/Prodetail', query: { proid: item.proid } }"
        v-for="item in proList"
        :key="item.proid"
      >
        <van-col span="24" class="proBrand">
          <van-image :src="item.img1" fit="contain" radius="10" />
          <van-row>
            <van-text-ellipsis
              rows="1"
              :content="item.proname"
              expand-text="展开"
              collapse-text="收起"
              @click-action.prevent=""
            />
          </van-row>
          <van-row gutter="20">
            <van-col span="6">原价:{{ item.originprice }}</van-col>
            <van-col span="6" offset="2"
              >折后:{{ (item.originprice * item.discount) / 10 }}</van-col
            >
          </van-row>
        </van-col>
      </router-link>
    </div>
  </div>
</template>

<script setup>
// 接收 list 页面传递过来的 brand category
import { useRoute } from "vue-router";
import { ref, reactive, onMounted } from "vue";
import { proCategoryBrandProListApi } from "@/api/pro.js";
const route = useRoute();
const brand = ref(route.query.brand);
const category = ref(route.query.category);
const proList = ref();
const proParams = reactive({
  count: 1,
  limitNum: 10,
  category: category.value,
  brand: brand.value,
});
const proCategoryBrandProList = async () => {
  let res = await proCategoryBrandProListApi({ ...proParams });
  proList.value = res.data;
  console.log(res.data);
};
onMounted(() => {
  proCategoryBrandProList();
});
</script>

<style lang="scss" scoped>
.proBrandBox {
  height: 100%;

  background-color: #f3f3f3;
  .proBrandList {
    overflow: scroll;
  }
  .proBrand {
    margin: 20px;
    border-radius: 10px;
    background-color: #fff;
    border-radius: 10px;
    padding: 0 10px;
  }
}
</style>
