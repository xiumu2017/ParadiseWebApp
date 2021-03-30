<template>
  <div class="meal-container">
    <van-empty v-if="showEmpty" description="暂无数据" />
    <van-cell-group v-for="item in mealData" :key="item.id" :title="item.title">
      <van-cell title="吃什么" :value="item.what" :label="item.remark" />
      <van-cell title="在哪儿吃" :value="item.place" />
      <van-cell title="花了多少" :value="item.cost" />
      <van-cell title="支付方式" :value="item.payTypeStr" />
    </van-cell-group>
    <van-button type="info" block to="/meal-form">添加新记录</van-button>
  </div>
</template>

<script>
import Vue from "vue";
import { Empty } from "vant";
import { Cell, CellGroup } from "vant";
import { Button } from "vant";
import { fetch, getPayTypes, getTypes } from "@/api/meal.js";

Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Empty);
Vue.use(Button);

export default {
  name: "meal",
  created() {
    getPayTypes().then((res) => {
      this.payTypeArr = res.data;
    });
    getTypes().then((res) => {
      this.typeArr = res.data;
    });
    this.fetchData();
    if (this.mealData && this.mealData.length > 0) {
      this.showEmpty = false;
    }
  },
  data() {
    return {
      showEmpty: true,
      typeArr: [],
      payTypeArr: [],
      mealData: [],
    };
  },
  methods: {
    fetchData() {
      fetch({ pageNum: 1, pageSize: 5 }).then((res) => {
        if (res.code === 200) {
          this.mealData = res.data.list;
          this.mealData.forEach((item) => {
            item.title = item.date + " " + this.typeArr[item.type];
            item.payTypeStr = this.payTypeArr[item.payType];
          });
        }
      });
    },
  },
};
</script>