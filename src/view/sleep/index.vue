<template>
  <div class="sleep-div">
    <van-divider> {{ now }} </van-divider>

    // 按钮组，上床了，我醒了，我起了
  </div>
</template>

<script>
let interval;
export default {
  name: "sleep",
  data() {
    return {
      now: "",
      weeks: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "SUN"],
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
  },
  beforeDestroy() {
    clearInterval(interval);
  },
};
</script>