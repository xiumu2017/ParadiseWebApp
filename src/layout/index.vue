<template>
  <div :class="classObj" class="app-wrapper">
    <div class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <van-nav-bar
          title="标题"
          left-text="返回"
          right-text="按钮"
          left-arrow
          @click-left="onClickLeft"
          @click-right="onClickRight"
        />
      </div>
      <app-main />
      <van-tabbar v-model="active" @change="onChange">
        <van-tabbar-item icon="home-o">标签1</van-tabbar-item>
        <van-tabbar-item icon="search">标签2</van-tabbar-item>
        <van-tabbar-item icon="friends-o">标签3</van-tabbar-item>
        <van-tabbar-item icon="setting-o">标签4</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
import { Toast, Notify } from "vant";
import AppMain from "./AppMain.vue";

export default {
  name: "Layout",
  components: {
    AppMain,
  },
  computed: {
  },
  data() {
    return {
      active: 0,
    };
  },
  methods: {
    onClickLeft() {
      Toast("返回");
    },
    onClickRight() {
      Toast("按钮");
    },
    onChange(index) {
      Notify({ type: "primary", message: index });
    },
  },
};
</script>
