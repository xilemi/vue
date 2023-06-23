<template>
  <div id="main" style="width: 800px; height: 600px"></div>
</template>

<script setup>
import * as echarts from "echarts";
import { onMounted } from "vue";
let init = async () => {
  let myChart = echarts.init(document.getElementById("main"));

  let option = {
    xAxis: {
      type: "category",
      data: ["学员", "班主任", "讲师", "管理员"],
    },
    yAxis: {
      type: "value",
    },
    legend: {},
    series: [
      { name: "柱状图", type: "bar", data: [1, 2, 3, 4] },
      {
        name: "饼图",
        type: "pie",
        data: [
          {
            value: 1,
            label: "学员",
          },
          {
            value: 2,
            label: "班主任",
          },
          {
            value: 3,
            label: "讲师",
          },
          {
            value: 4,
            label: "管理员",
          },
        ],
      },
    ],
  };
  myChart.setOption(option);
};
// 先获取到元素,然后对元素进行配置
onMounted(() => {
  init();
});
</script>
<style></style>
