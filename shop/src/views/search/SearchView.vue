<template>
  <div>
    <div>
      <ComHeader title="搜索"> </ComHeader>
      <form action="/">
        <van-search
          v-model="searchParams.keyword"
          show-action
          placeholder="请输入搜索关键词"
          @search="onSearch"
          @cancel="onCancel"
        />
      </form>
    </div>
    <div class="searchList">
      <van-card
        :price="((item.originprice * item.discount) / 10).toFixed(2)"
        :title="item.proname"
        :thumb="item.img1"
        v-for="(item, index) in searchList"
        :key="index"
      />
    </div>
  </div>
</template>

<script setup>
import ComHeader from "../../components/ComHeader.vue";
import { proSearchApi } from "@/api/pro";
import { ref, onMounted } from "vue";
import { showFailToast } from "vant";
const searchParams = ref({
  count: 1,
  limitNum: 10,
  keyword: "",
});
const searchList = ref(null);
const onSearch = async () => {
  let res = await proSearchApi(searchParams.value);
  searchList.value = res.data;
};
const onCancel = () => {
  searchList.value = [];
};
onMounted(() => {});
</script>

<style lang="scss" scoped>
.searchList {
  overflow: scroll;
}
</style>
// 要么显示热门搜索 要么显示搜索的结果
