<template>
  <div id="app">
    <!-- 在 head 标签中添加 meta 标签，并设置 viewport-fit=cover 值 -->
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover"
    />

    <!-- 开启顶部安全区适配 -->
    <van-nav-bar safe-area-inset-top />

    <div :class="{ 'fixed-header': fixedHeader }">
      <van-nav-bar
        v-show="showTopNav"
        :title="title"
        left-text="返回"
        right-text="按钮"
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
      <van-tabbar-item icon="home-o">标签1</van-tabbar-item>
      <van-tabbar-item icon="search">标签2</van-tabbar-item>
      <van-tabbar-item icon="friends-o">标签3</van-tabbar-item>
      <van-tabbar-item icon="setting-o">标签4</van-tabbar-item>
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
      return this.$route.showTopNav || true;
    },
    showBottomNav() {
      return this.$route.showBottomNav || true;
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
  },
  data() {
    return {
      active: 0,
      title: document.title,
    };
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch("app/closeSideBar", { withoutAnimation: false });
    },
    onClickLeft() {
      Toast("返回");
      this.back()
    },
    onClickRight() {
      Toast("按钮");
      this.$router.go(-1);
    },
    onChange(index) {
      Notify({ type: "primary", message: index });
    },
    back() {
      console.log('route', this.$route)
      this.$router.push('/home');
    },
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