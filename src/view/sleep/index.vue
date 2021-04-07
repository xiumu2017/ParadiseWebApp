<template>
  <div class="sleep-div">
    <van-divider> {{ now }} </van-divider>

    <!-- // 按钮组，上床了，我醒了，我起了 -->
    <van-row style="margin: 10px" v-show="showSleepBtn">
      <van-button
        icon="https://paradise-1256237186.cos.ap-nanjing.myqcloud.com/1705357B%E7%9D%A1%E8%A7%89.png"
        color="linear-gradient(to right, #fff, #004)"
        block
        @click="sign('1')"
      >
        上床睡觉咯
      </van-button>
    </van-row>
    <van-row style="margin: 10px" v-show="showWakeBtn">
      <van-button
        icon="https://paradise-1256237186.cos.ap-nanjing.myqcloud.com/170806G3%E5%A4%AA%E9%98%B3-.png"
        color="linear-gradient(to left, #fff, #004)"
        block
        @click="sign('2')"
      >
        我醒啦
      </van-button>
    </van-row>
    <van-row style="margin: 10px" v-show="showUpBtn">
      <van-button
        icon="https://paradise-1256237186.cos.ap-nanjing.myqcloud.com/170802SH%E5%8A%A0%E6%B2%B9.png"
        color="linear-gradient(to right, #fff, #004)"
        block
        @click="sign('3')"
      >
        起床咯
      </van-button>
    </van-row>
    <!-- 展示最近的睡眠记录？ -->
    <van-row style="margin: 10px">
      <van-cell-group
        v-for="(item, index) in sleepData"
        :key="index"
        :title="item.date + ' ' + item.title"
      >
        <van-cell :title="item.title">
          <template #label>
            <span class="custom-title" style="font-size: 15px">{{
              item.st + " ~ " + item.et
            }}</span
            ><br />
            <van-rate
              v-model="item.sleepQuality"
              :size="15"
              color="#ffd21e"
              void-icon="star"
              void-color="#eee"
            /><br />
            <span class="custom-title" v-show="item.memory !== '/'"
              >睡前回忆：{{ item.memory }}</span
            >
            <br />
            <span class="custom-title" v-show="item.remark !== '/'"
              >备注：{{ item.remark }}</span
            >
            <br />
            <van-tag type="danger" v-show="item.lateReason !== '/'"
              >熬夜原因：{{ item.lateReason }}</van-tag
            >
            <br />
            <van-tag type="success" v-if="item.bestTime !== '/'">{{
              item.bestTime
            }}</van-tag>
          </template>
        </van-cell>
      </van-cell-group>
    </van-row>
  </div>
</template>

<script>
import { sign, fetch } from "@/api/sleep.js";
import { Dialog } from "vant";
import Vue from "vue";
import { Rate } from "vant";

Vue.use(Rate);
let interval;
export default {
  name: "sleep",
  data() {
    return {
      now: "大漠孤烟直，长河落日圆",
      weeks: ["Sun🔆", "Mon💥", "Tue💪", "Wed🙃", "Thu🤬", "Fri👏", "Sat🎉"],
      beforeCloseFun: null,
      val: 0,
      sleepData: [],
      showSleepBtn: false,
      showWakeBtn: false,
      showUpBtn: false,
    };
  },
  created() {
    interval = setInterval(() => {
      this.now = this.formatTime();
    }, 1000);
    this.fetchData();
    // 如果是睡觉时间，显示1隐藏23
    let hour = new Date().getHours();
    if (hour > 18) {
      this.showSleepBtn = true;
      this.showWakeBtn = false;
      this.showUpBtn = false;
    }
    if (hour > 4 && hour <= 12) {
      this.showSleepBtn = false;
      this.showWakeBtn = true;
      this.showUpBtn = true;
    }
  },
  methods: {
    formatTime() {
      const now = new Date();
      return (
        `${now.getFullYear()}/
          ${now.getMonth() + 1}/
          ${now.getDate()} 
          ${now.getHours() < 10 ? "0" + now.getHours() : now.getHours()}:
          ${now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes()}:
          ${now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds()} 
          ` + this.weeks[now.getDay()]
      );
    },
    fetchData() {
      fetch({ pageNum: 1, pageSize: 7 }).then((res) => {
        if (res.code === 200) {
          this.sleepData = res.data.list;
          this.sleepData.forEach((item) => {
            // iOS 下这种获取 date 的方法不生效
            // item.title = this.weeks[new Date(item.date).getDay()];
            let d = new Date(item.date.replace(/-/g, "/")).getDay();
            item.title = this.weeks[d];
            item.date = this.formatDate(item.date);
            item.st = this.formatDateTime(item.sleepTime);
            item.et = this.formatDateTime(item.upTime);
          });
          console.log("sleepData", this.sleepData);
        }
      });
    },
    sign(val) {
      console.log("val", val);
      this.val = val;

      let beforeClose = function (action, done) {
        if (action === "confirm") {
          // setTimeout(done, 1000);
          sign(val)
            .then((res) => {
              if (res.code === 200) {
                this.$toast.success(res.message);
                this.fetchData();
              } else {
                this.$toast.fail(res.message);
              }
              done();
            })
            .catch(() => {
              done();
            });
        } else {
          done();
        }
      };
      // 提交之前 二次确认
      Dialog.confirm({
        title: "确认提交",
        message: "沧海月明珠有泪，蓝田日暖玉生烟。",
        beforeClose,
      });
    },
    formatDate(date) {
      return date.split(" ")[0];
    },
    formatDateTime(date) {
      if (!date) {
        return "";
      }
      return date.split(" ")[1].replace(":00", "");
    },
  },
  beforeDestroy() {
    clearInterval(interval);
  },
};
</script>