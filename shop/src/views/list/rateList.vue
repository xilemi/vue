<template>
  <div>
    <ComHeader title="我的评论"></ComHeader>
  </div>
</template>

<script setup>
import ComHeader from "../../components/ComHeader.vue";
import { userListRateApi } from "../../api/rate";
import { useUserStore } from "../../stores/user";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
const User = useUserStore();
const { userid } = storeToRefs(User);
const userListRate = async () => {
  let res = await userListRateApi({ userid: userid.value });
  console.log(res.data);
};
onMounted(() => {
  userListRate();
});
</script>

<style lang="scss" scoped></style>
