<script setup>
    defineProps(["a"])
    defineEmits(['update:a'])
</script>
<template>
    <div>
        <h1>我是一个组件</h1>
        <h2>{{a}}</h2>
        <button @click="$emit('update:a',1000)">点击</button>
        <slot></slot>
    </div>
</template>