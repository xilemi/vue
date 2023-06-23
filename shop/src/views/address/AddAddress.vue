<template>
  <div>
    <com-header title="添加地址"></com-header>
    <van-address-edit
      :area-list="areaList"
      show-set-default
      show-delete
      :address-info="initInfo"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="delAddress"
    />
  </div>
</template>

<script setup>
import { areaList } from "@vant/area-data";
import { ref } from "vue";
import { showFailToast, showToast } from "vant";
import {
  addAddressApi,
  updateAddressApi,
  delAddressApi,
} from "@/api/address.js";
import { useUserStore } from "../../stores/user";
import { storeToRefs } from "pinia";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const isEidt = ref(false);
const initInfo = ref({});
// 没有query信息时 为新增   有query 为 编辑
if (route.query?.info) {
  initInfo.value = JSON.parse(route.query?.info);
  isEidt.value = true;
} else {
  isEidt.value = false;
}
const onSave = async (info) => {
  let User = useUserStore();
  let { userid } = storeToRefs(User);
  try {
    if (isEidt.value) {
      let res = await updateAddressApi({ userid: userid.value, ...info });
      router.push("/addressList");
      console.log(res.message);
    } else {
      let res = await addAddressApi({ userid: userid.value, ...info });
      showToast(res.message);
      initInfo.value = {};
      router.push("/addressList");
    }
  } catch (err) {
    showFailToast(err.message);
  }
};
const delAddress = async () => {
  // 通过addressid
  let res = await delAddressApi({ addressid: initInfo.value.addressid });
  console.log(res.message);
  router.push("/addressList");
};
</script>

<style lang="scss" scoped></style>
