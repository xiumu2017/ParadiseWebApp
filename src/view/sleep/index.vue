<template>
  <div class="sleep-div">
    <van-divider> {{ now }} </van-divider>

    <!-- // 按钮组，上床了，我醒了，我起了 -->
    <!-- 展示最近的睡眠记录？ -->

    <van-row style="margin: 10px">
      <van-button
        icon="https://paradise-1256237186.cos.ap-nanjing.myqcloud.com/1705357B%E7%9D%A1%E8%A7%89.png"
        color="linear-gradient(to right, #fff, #004)"
        block
        @click="sign('1')"
      >
        上床睡觉咯
      </van-button>
    </van-row>
    <van-row style="margin: 10px">
      <van-button
        icon="https://paradise-1256237186.cos.ap-nanjing.myqcloud.com/170806G3%E5%A4%AA%E9%98%B3-.png"
        color="linear-gradient(to left, #fff, #004)"
        block
        @click="sign('2')"
      >
        我醒啦
      </van-button>
    </van-row>
    <van-row style="margin: 10px">
      <van-button
        icon="https://paradise-1256237186.cos.ap-nanjing.myqcloud.com/170802SH%E5%8A%A0%E6%B2%B9.png"
        color="linear-gradient(to right, #fff, #004)"
        block
        @click="sign('3')"
      >
        起床咯
      </van-button>
    </van-row>
  </div>
</template>

<script>
import { sign } from "@/api/sleep.js";
import { Dialog } from "vant";

let interval;
export default {
  name: "sleep",
  data() {
    return {
      now: "大漠孤烟直，长河落日圆",
      weeks: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "SUN"],
      beforeCloseFun: null,
      val: 0,
    };
  },
  created() {
    interval = setInterval(() => {
      this.now = this.formatTime();
    }, 1000);
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
          ` + this.weeks[now.getDay() - 1]
      );
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
        title: "确认",
        message: "弹窗内容",
        beforeClose,
      });
    },
  },
  beforeDestroy() {
    clearInterval(interval);
  },
};
</script>