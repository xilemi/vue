<template lang="">
    <div class="notfound">
        <p>111</p>
        <com></com>
    </div>
</template>
<script>
    export default {
        components: {
            com: () => import("./components/com.vue")
        }
    }
</script>
<style lang="scss" scoped>
    /* scoped会让css 只在当前组件中生效  让其没有深度选择  如何让两种效果都实现呢   sass 使用 ::-v-deep 后面接上选择器  就可以实现深度  */
    /* p {
        color: blue;
        font-size: 50px;
    } */
    ::v-deep p {
        color: blue;
        font-size: 50px;
    }
</style>