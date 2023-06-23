<script setup></script>

<template>
  <div class="box">
    <!-- <ComHeader class="header"></ComHeader> -->
    <!-- <ComFooter></ComFooter> -->
    <RouterView class="main" />
    <RouterView name="footer" />
  </div>
</template>

<style lang="scss">
.box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .main {
    overflow: scroll;
    display: flex;
    flex-direction: column;
  }
}
</style>
