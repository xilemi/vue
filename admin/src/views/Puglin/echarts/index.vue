<template lang="">
    <div ref="echarts" class="echarts">

    </div>
</template>
<script>
    import * as echarts from "echarts"
    export default {
        name: 'echarts',
        data() {
            return {
                Myecharts: null
            }
        },
        methods: {
            echartsInit() {
                this.Myecharts = echarts.init(this.$refs.echarts, "dark")
                this.Myecharts.setOption({
                    title: {
                        text: 'ECharts 入门示例'
                    },
                    tooltip: {},
                    // 可以选展示
                    legend: {
                        data: ['name', "age", "heigth", "weight"]
                    },
                    xAxis: {
                        // data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
                        type: 'category'
                    },
                    yAxis: {},
                    dataset: {
                        // 用 dimensions 指定了维度的顺序。直角坐标系中，如果 X 轴 type 为 category，
                        // 默认把第一个维度映射到 X 轴上，后面维度映射到 Y 轴上。
                        // 如果不指定 dimensions，也可以通过指定 series.encode
                        // 完成映射，参见后文。
                        dimensions: ['name', 'age', 'heigth', 'weight'],
                        source: [
                            { name: 'Matcha Latte', 'age': 43.3, 'heigth': 85.8, 'weight': 93.7 },
                            { name: 'Milk Tea', 'age': 83.1, 'heigth': 73.4, 'weight': 55.1 },
                            { name: 'Cheese Cocoa', 'age': 86.4, 'heigth': 65.2, 'weight': 82.5 },
                            { name: 'Walnut Brownie', 'age': 72.4, 'heigth': 53.9, 'weight': 39.1 }
                        ]
                    },
                    series: [
                        {
                            name: '销量',
                            type: 'bar',
                            // data: [5, 20, 36, 10, 10, 20]
                        },
                        {
                            name: '价格',
                            type: 'bar',
                            // data: [99, 80, 50, 69, 79, 39]
                        },
                        {
                            name: '库存',
                            type: 'line',
                            // data: [1000, 1999, 500, 399, 176, 256]
                        },
                        {
                            type: 'bar',
                            color: ['#dd6b66',
                                '#759aa0',
                                '#e69d87',
                                '#8dc1a9',
                                '#ea7e53',
                                '#eedd78',]
                        }
                    ]
                })
            }
        },
        mounted() {
            this.echartsInit()
        },
    }
</script>
<style lang="scss">
    .echarts {
        width: 100%;
        height: 600px;
    }
</style>