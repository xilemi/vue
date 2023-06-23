<script setup>
    import { useMdaStore } from "@/stores/counter.js"
    // 创建一个ref 引用对象 对于 state getters  会忽略掉methods和非响应性的属性 
    import { storeToRefs } from "pinia"
    // 只能把ref  reactive 等类型的进行转换成ref 类型
    let { a, b, obj } = storeToRefs(useMdaStore())
    // 对于函数  不需要进行storeToRef 来解除丢失响应性的问题
    // console.log(useMdaStore());
    let { addA } = useMdaStore()
</script>
<template>
    <div>
        <p>a{{a}}</p>
        <p>b{{b}}</p>
        <p>obj{{obj.age}}</p>
        <button @click="addA()">点击</button>
    </div>
</template>