<template>
  <div id="app">
    <!-- 在 head 标签中添加 meta 标签，并设置 viewport-fit=cover 值 -->
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover"
    />

    <!-- 开启顶部安全区适配 -->
    <van-nav-bar safe-area-inset-top v-show="isWebview"/>

    <div :class="{ 'fixed-header': fixedHeader }">
      <van-nav-bar
        v-show="showTopNav"
        :title="title"
        left-text="返回"
        right-text="···"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
    </div>
    <!-- 开启底部安全区适配 -->
    <!-- <van-number-keyboard safe-area-inset-bottom /> -->
    <section class="app-main">
      <transition name="fade-transform" mode="out-in">
        <router-view :key="key" />
      </transition>
    </section>
    <van-tabbar v-model="active" @change="onChange" v-show="showBottomNav">
      <van-tabbar-item icon="home-o" to="home">首页</van-tabbar-item>
      <van-tabbar-item icon="records">记录</van-tabbar-item>
      <van-tabbar-item icon="plus"></van-tabbar-item>
      <van-tabbar-item icon="chart-trending-o" to="bing">统计</van-tabbar-item>
      <van-tabbar-item icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Toast, Notify } from "vant";

export default {
  name: "App",
  components: {},
  computed: {
    key() {
      return this.$route.path;
    },
    showTopNav() {
      if (
        this.$route.meta.showTopNav ||
        this.$route.meta.showTopNav === undefined
      ) {
        return true;
      }
      return false;
    },
    showBottomNav() {
      if (this.$route.meta.showBottomNav ||
      this.$route.meta.showBottomNav === undefined
      ) {
        return true;
      }
      return false;
    },
    sidebar() {
      return this.$store.state.app.sidebar;
    },
    device() {
      return this.$store.state.app.device;
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader;
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === "mobile",
      };
    },
    title() {
      return this.$route.meta.title;
    },
  },
  watch: {},
  data() {
    return {
      active: 10,
      isWebview: false
    };
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch("app/closeSideBar", { withoutAnimation: false });
    },
    onClickLeft() {
      this.$router.back();
    },
    onClickRight() {
      Toast("···");
    },
    onChange(index) {
      Notify({ type: "primary", message: index });
    }
  },
};
</script>

<style>
body {
  font-size: 16px;
  background-color: #f8f8f8;
  -webkit-font-smoothing: antialiased;
  margin: 1px;
}
</style>