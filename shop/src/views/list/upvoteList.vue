<template>
  <div>
    <ComHeader title="我的点赞"></ComHeader>
  </div>
</template>

<script setup>
import ComHeader from "../../components/ComHeader.vue";
import { upvoteListApi } from "../../api/upvote";
import { useUserStore } from "../../stores/user";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
const User = useUserStore();
const { userid } = storeToRefs(User);
// 获取点赞列表
const upvoteList = async () => {
  let res = await upvoteListApi({ userid: userid.value });
  console.log(res.data);
};
onMounted(() => {
  upvoteList();
});
</script>

<style lang="scss" scoped></style>
