<template>
  <div>
    <ComHeader title="选择城市" :back="true"></ComHeader>
    <van-index-bar class="cityBox">
      <div v-for="item in cityList" :key="item.letter">
        <van-index-anchor :index="item.letter.toUpperCase()">
        </van-index-anchor>
        <van-cell
          :title="city.name"
          v-for="(city, index) in item.data"
          :key="index"
          @click="selectCity(city.name)"
        />
      </div>
    </van-index-bar>
  </div>
</template>

<script setup>
import ComHeader from "../../components/ComHeader.vue";
import { cityApi } from "@/api/city";
import { ref, onMounted } from "vue";
import { showFailToast } from "vant";
import { useRouter } from "vue-router";
import { useCategoryStore } from "../../stores/category";
const router = useRouter();
const cityList = ref(null);
const category = useCategoryStore();
const { updateCity } = category;
const getCity = async () => {
  try {
    let res = await cityApi();
    cityList.value = JSON.parse(res.data);
  } catch (err) {
    showFailToast(err.message);
  }
};
const selectCity = (val) => {
  updateCity(val);
  router.replace("/list");
};
onMounted(() => {
  getCity();
});
</script>

<style lang="scss" scoped></style>
