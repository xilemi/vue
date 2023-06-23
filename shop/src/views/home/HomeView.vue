<template>
  <div>
    <ComHeader class="header" title="首页" :back="false">
      <van-icon name="arrow-left" />
      <span>返回</span>
    </ComHeader>
    <div class="list">
      <van-grid square class="list-grid">
        <van-grid-item icon="photo-o" text="文字">
          <template v-slot:icon>
            <van-image
              src="https://m15.360buyimg.com/mobilecms/jfs/t1/187640/12/30456/5256/639c2315Ebc95c142/350a8f0c766f5460.png"
            ></van-image>
          </template>
          <template v-slot:text> 电脑 </template>
        </van-grid-item>
        <van-grid-item icon="photo-o" text="文字">
          <template v-slot:icon>
            <van-image
              src="https://m15.360buyimg.com/mobilecms/jfs/t1/187640/12/30456/5256/639c2315Ebc95c142/350a8f0c766f5460.png"
            ></van-image>
          </template>
          <template v-slot:text> 电脑 </template>
        </van-grid-item>
        <van-grid-item icon="photo-o" text="文字">
          <template v-slot:icon>
            <van-image
              src="https://m15.360buyimg.com/mobilecms/jfs/t1/187640/12/30456/5256/639c2315Ebc95c142/350a8f0c766f5460.png"
            ></van-image>
          </template>
          <template v-slot:text> 电脑 </template>
        </van-grid-item>
        <van-grid-item icon="photo-o" text="文字">
          <template v-slot:icon>
            <van-image
              src="https://m15.360buyimg.com/mobilecms/jfs/t1/187640/12/30456/5256/639c2315Ebc95c142/350a8f0c766f5460.png"
            ></van-image>
          </template>
          <template v-slot:text> 电脑 </template>
        </van-grid-item>
        <van-grid-item icon="photo-o" text="文字">
          <template v-slot:icon>
            <van-image
              src="https://m15.360buyimg.com/mobilecms/jfs/t1/187640/12/30456/5256/639c2315Ebc95c142/350a8f0c766f5460.png"
            ></van-image>
          </template>
          <template v-slot:text> 电脑 </template>
        </van-grid-item>
        <van-grid-item icon="photo-o" text="文字">
          <template v-slot:icon>
            <van-image
              src="https://m15.360buyimg.com/mobilecms/jfs/t1/187640/12/30456/5256/639c2315Ebc95c142/350a8f0c766f5460.png"
            ></van-image>
          </template>
          <template v-slot:text> 电脑 </template>
        </van-grid-item>
        <van-grid-item icon="photo-o" text="文字">
          <template v-slot:icon>
            <van-image
              src="https://m15.360buyimg.com/mobilecms/jfs/t1/187640/12/30456/5256/639c2315Ebc95c142/350a8f0c766f5460.png"
            ></van-image>
          </template>
          <template v-slot:text> 电脑 </template>
        </van-grid-item>
        <van-grid-item icon="photo-o" text="文字">
          <template v-slot:icon>
            <van-image
              src="https://m15.360buyimg.com/mobilecms/jfs/t1/187640/12/30456/5256/639c2315Ebc95c142/350a8f0c766f5460.png"
            ></van-image>
          </template>
          <template v-slot:text> 电脑 </template>
        </van-grid-item>
      </van-grid>
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          class="good-list"
        >
          <van-cell v-for="item in list" :key="item.proid" class="item-list">
            <router-link
              :to="{ path: '/Prodetail', query: { proid: item.proid } }"
            >
              <img :src="item.img1" alt="" />
              <p>{{ item.proname }}</p>
              <p>{{ item.originprice }}</p>
            </router-link>
          </van-cell>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>
<script setup>
import ComHeader from "../../components/ComHeader.vue";
import { ref, onMounted, reactive, watchEffect } from "vue";
import { proListApi } from "@/api/pro.js";
const list = ref([]);
const proParams = reactive({ count: 1, limitNum: 10 });
const loading = ref(false);
const finished = ref(false);
const proList = async () => {
  let res = await proListApi(proParams);
  list.value.push(...res.data);
};
const onLoad = () => {
  proParams.count++;
  console.log("到底了");
};
// 在 数据请求完成后 在loading变为false 在所有页都加载完  把finished 转变为true
let stop = watchEffect(() => {
  proList().then(() => {
    loading.value = false;
    // 到最后一页为加载完成状态
    if (proParams.count >= 15) {
      finished.value = true;
      stop();
    }
  });
});
const refreshing = ref(false);
const onRefresh = () => {
  console.log("刷新了");
  refreshing.value = false;
  // 随机生成一个页数
  let count = Math.floor(Math.random() * 14);
  if (count == proParams.count) {
    onRefresh();
    return;
  }
  proParams.count = count;
  list.value = [];
  // 如果两次页面相同会有问题
};

onMounted(() => {
  proList();
});
</script>

<style lang="scss" scoped>
.list {
  width: 100%;
  height: 100%;
  overflow: scroll;
  background-color: #f3f3f3;
}
.list-grid {
  img {
    width: 60%;
    margin: 0 auto;
  }
}
.good-list {
  margin-top: 0.2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  min-height: 8rem;
  .item-list {
    width: 49%;
    :deep(.van-cell__value) {
      text-align: left;
    }
    img {
      width: 80%;
      display: block;
      margin: 0.2rem auto;
    }
    .goods-name {
      font-size: 0.24rem;
    }
  }
}
</style>
