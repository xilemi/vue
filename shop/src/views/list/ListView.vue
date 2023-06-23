<template>
  <div>
    <ComHeader class="header" title="列表">
      <div @click="router.push('/city')">
        <span>
          {{ cityInfo ? cityInfo : "选择城市" }}
        </span>
        <van-icon name="arrow-down" />
      </div>
    </ComHeader>
    <div class="listBox">
      <van-sidebar v-model="activeCategory" @change="onChange" class="left">
        <van-sidebar-item
          :title="item"
          v-for="(item, index) in categoryList"
          :key="index"
        />
      </van-sidebar>
      <div>
        <!-- 需要传 category brand  count limitNum-->
        <van-space wrap>
          <van-button
            type="primary"
            v-for="(item, index) in categoryBrandList"
            :key="index"
            @click="categoryBrandProList(item.brand, activeCategory)"
            >{{ item.brand }}</van-button
          >
        </van-space>
      </div>
    </div>
  </div>
</template>

<script setup>
import { proCategoryListApi, proCategoryBrandListApi } from "@/api/pro.js";
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useCategoryStore } from "../../stores/category";
import { storeToRefs } from "pinia";
const category = useCategoryStore();
const { updateActiveCategory } = category;
const { categoryList, cityInfo, activeCategory } = storeToRefs(category);
const categoryBrandList = ref(null);

const router = useRouter();
const proCategoryList = async () => {
  let res = await proCategoryListApi();
  categoryList.value = res.data;
  proCategoryBrandList(activeCategory.value);
  console.log(categoryList.value);
};
const proCategoryBrandList = async (index) => {
  console.log(categoryList.value[index]);
  let res = await proCategoryBrandListApi({
    category: categoryList.value[index],
  });
  categoryBrandList.value = res.data;
  console.log(res);
};
const onChange = (val) => {
  console.log(1);
  updateActiveCategory(val);
  proCategoryBrandList(activeCategory.value);
};
const categoryBrandProList = (brand, category) => {
  router.push({
    path: "/proBrand",
    query: { brand, category: categoryList.value[category] },
  });
};
onMounted(() => {
  proCategoryList();
});
</script>

<style lang="scss" scoped>
.listBox {
  display: flex;
  height: 100%;
  overflow: scroll;
  .left {
    flex-shrink: 0;
  }
}
</style>
// 获取所有分类 选中的分类 应该存储下来
