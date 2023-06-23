<script setup>
  import { useRouter, useRoute } from "vue-router"
  import { ref, useSlots, useAttrs } from "vue"
  import ComA from "@/components/ComA.vue"
  let a = ref(10)
  console.log(useSlots());
  console.log(useAttrs());
  // 获取到路由的方法
  let router = useRouter()
  // 当前路由的信息
  let route = useRoute()
  console.log(router);
  console.log(route);
</script>

<template>
  <main>
    <!-- 使用v-model  不再需要绑定 @update:a v-model会自动进行绑定 -->
    <ComA v-model:a="a">1111</ComA>
    <p>我是父组件{{a}}</p>
    <button @click="router.push({path:'/about'})">去about</button>
  </main>
</template>