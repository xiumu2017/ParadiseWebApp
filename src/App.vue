<template>
  <div id="app">
    <cube-button @click="showDialog">show dialog</cube-button>
    <cube-button :light="true" @click="doLogin">登录</cube-button>
    <cube-button :inline="true">Inline Button</cube-button>
    <cube-button :outline="true">Outline Button</cube-button>
    <cube-button :primary="true">Primary Button</cube-button>
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
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import { login } from "./api/user";

export default {
  name: "App",
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
          heroes: [
            "敌法师",
            "变体精灵",
            "幻影长矛手",
            "复仇之魂",
            "力丸",
            "矮人狙击手",
            "圣堂刺客",
            "露娜",
            "赏金猎人",
            "熊战士",
          ],
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
