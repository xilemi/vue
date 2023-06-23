<template>
  <div>
    <a :href="to" v-if="isLink">
      <slot></slot>
    </a>
    <router-link
      :to="to"
      :replace="replace"
      custom="{isActive,inactiveClass}"
      v-else
    >
      <a href="" :class="isActive ? activeClass : inactiveClass">
        <slot></slot>
      </a>
    </router-link>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { RouterLink } from "vue-router";
const props = defineProps({
  ...RouterLink.props,
  inactiveClass: String,
});
console.log(props);
const { to, isActive, replace, inactiveClass } = props;
// 检测to的类型
const isLink = computed(() => {
  return to.startsWith("https") && typeof to == "string";
});
</script>

<style lang="" scoped></style>
