<template>
  <div class="main-app">
    <div class="grid-div">
      <van-grid clickable :column-num="3" :gutter="10" :square="true">
        <van-grid-item icon="smile" text="饮食管理" to="/meal" />
        <van-grid-item icon="home-o" text="路由跳转" to="/" />
        <van-grid-item icon="home-o" text="路由跳转" to="/" />
        <van-grid-item icon="search" text="URL 跳转" url="/vant/mobile.html" />
        <van-grid-item icon="search" text="URL 跳转" url="/vant/mobile.html" />
        <van-grid-item icon="search" text="URL 跳转" url="/vant/mobile.html" />
      </van-grid>
    </div>
    <cube-tab-bar
      v-model="selectedLabel"
      show-slider
      @click="clickHandler"
      @change="changeHandler"
    >
      <cube-tab
        v-for="(item, index) in tabs"
        :icon="item.icon"
        :label="item.label"
        :key="index"
      >
      </cube-tab>
    </cube-tab-bar>
    <cube-tab-panels v-model="selectedLabel">
      <cube-tab-panel
        v-for="(item, index) in tabs"
        :label="item.label"
        :key="index"
      >
        <ul>
          <li
            class="tab-panel-li"
            :key="index"
            v-for="(hero, index) in item.heroes"
          >
            {{ index + hero }}
          </li>
        </ul>
      </cube-tab-panel>
    </cube-tab-panels>
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import { login } from "@/api/user";
import Vue from "vue";
import { Grid, GridItem } from "vant";
Vue.use(Grid);
Vue.use(GridItem);

export default {
  name: "home",
  components: {
    // HelloWorld,
  },
  data() {
    return {
      selectedLabelDefault: "Vip",
      selectedLabel: "Home",
      tabs: [
        {
          label: "Home",
          icon: "cubeic-home",
          heroes: ["敌法师", "变体精灵", "幻影长矛手"],
        },
        {
          label: "Like",
          icon: "cubeic-like",
        },
        {
          label: "Vip",
          icon: "cubeic-vip",
        },
        {
          label: "Me",
          icon: "cubeic-person",
        },
      ],
    };
  },
  methods: {
    showDialog() {
      this.$createDialog({
        type: "alert",
        title: "Alert",
        content: "dialog content",
      }).show();
    },
    clickHandler(label) {
      // if you clicked home tab, then print 'Home'
      console.log(label);
    },
    changeHandler(label) {
      // if you clicked different tab, this methods can be emitted
      console.log("tag", label);
    },
    showLogin() {
      this.$router.push("login");
    },
    doLogin() {
      const param = { username: "admin", password: "123456" };
      login(param).then((res) => {
        console.log("res", res);
      });
    },
  },
};
</script>

<style>
.grid-div {
  margin: 10px;
}
</style>
