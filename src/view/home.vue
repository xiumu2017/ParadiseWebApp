<template>
  <div class="main-app" style="margin: 1px">
    <div class="grid-div">
      <van-grid clickable :column-num="2" :gutter="10" :square="false">
        <van-grid-item icon="smile" text="吃的啥" to="/meal" />
        <van-grid-item icon="photograph" text="时光机" to="/timeline" />
        <van-grid-item icon="music" text="睡了没" to="/sleep" />
        <van-grid-item icon="todo-list" text="要做的" to="/todo" />
        <van-grid-item icon="balance-list" text="钱去哪" to="/bill" />
        <van-grid-item icon="photo" text="看看图" to="/bing" />
        <van-grid-item icon="like" text="诗" to="/poem" />
        <van-grid-item icon="star" text="" to="/login" />
        <van-grid-item icon="setting" text="Console开关" @click="showVconsole" />
      </van-grid>
    </div>
    <!-- <cube-tab-bar
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
    </cube-tab-panels> -->
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
      showConsole: true,
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
    showVconsole() {
      if (this.showConsole) {
        document.getElementById("__vconsole").style.display = "none";
        this.showConsole = false;
        this.$toast.success("Console \n已隐藏");
      } else {
        document.getElementById("__vconsole").style = "";
        this.showConsole = true;
        this.$toast.success("Console \n已开启");
      }
    },
  },
};
</script>

<style>
.grid-div {
  margin: 10px;
}
</style>
