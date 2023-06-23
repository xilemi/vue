<template>
  <div id="main" style="width: 800px; height: 600px"></div>
</template>

<script setup>
import * as echarts from "echarts";
import { onMounted, ref } from "vue";
import { searchAllGradeApi } from "@/api/grade.js";
let math = ref([]);
let chinese = ref([]);
let english = ref([]);
let formatList = (payload, key) => {
  let list1 = payload.filter((item) => {
    return item[key] < 20;
  });
  console.log(list1);
  let list2 = payload.filter((item) => {
    return item[key] > 20 && item[key] < 40;
  });
  console.log(list2);
  let list3 = payload.filter((item) => {
    return item[key] > 40 && item[key] < 60;
  });
  console.log(list3);
  let list4 = payload.filter((item) => {
    return item[key] > 60 && item[key] < 80;
  });
  console.log(list4);
  let list5 = payload.filter((item) => {
    return item[key] < 100 && item[key] > 80;
  });
  console.log(list5);
  let list6 = payload.filter((item) => {
    return item[key] > 100;
  });
  console.log(list6);
  return [
    list1.length,
    list2.length,
    list3.length,
    list4.length,
    list5.length,
    list6.length,
  ];
};
let searchAllGrade = async () => {
  let res = await searchAllGradeApi();
  math.value = formatList(res.list, "math");
  chinese.value = formatList(res.list, "chinese");
  english.value = formatList(res.list, "english");
  init();
};

let init = async () => {
  let myChart = echarts.init(document.getElementById("main"));
  let option = {
    title: {
      text: "成绩分段分布图",
    },
    legend: {
      data: ["数学成绩", "语文成绩", "英语成绩"],
    },
    radar: {
      // shape: 'circle',
      indicator: [
        { name: "0-20", max: 4000 },
        { name: "20-40", max: 4000 },
        { name: "40-60 Technology", max: 4000 },
        { name: "60-80 Support", max: 4000 },
        { name: "80-100", max: 4000 },
        { name: "100以上", max: 4000 },
      ],
    },
    series: [
      {
        name: "grade",
        type: "radar",
        data: [
          {
            value: math.value,
            name: "数学成绩",
          },
          {
            value: chinese.value,
            name: "语文成绩",
          },
          {
            value: english.value,
            name: "英语成绩",
          },
        ],
      },
    ],
  };
  myChart.setOption(option);
};
// 先获取到元素,然后对元素进行配置
onMounted(() => {
  // 在真实dom加载完后  再 初始化
  searchAllGrade();
  init();
});
</script>

<style lang="scss" scoped></style>
