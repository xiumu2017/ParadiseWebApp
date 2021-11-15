<template>
  <div class="sleep-form">
    <van-form @submit="onSubmit">
      <van-field
        readonly
        clickable
        name="date"
        :value="formData.date"
        label="日期"
        placeholder="点击选择日期"
        @click="showCalendar = true"
      />
      <van-calendar
        v-model="showCalendar"
        :min-date="minDate"
        @confirm="onConfirm4Date"
      />

      <van-popup v-model="showPicker" position="bottom">
        <van-datetime-picker
          type="time"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </van-popup>
      <van-field
        readonly
        clickable
        name="bedTimePicker"
        :value="formData.bedTime"
        label="上床时间"
        placeholder="点击选择时间"
        @click="showPickerPopup(1)"
      />
      <van-field
        readonly
        clickable
        name="sleepTimePicker"
        :value="formData.sleepTime"
        label="入睡时间"
        placeholder="点击选择时间"
        @click="showPickerPopup(2)"
      />
      <van-field
        readonly
        clickable
        name="wakeTimePicker"
        :value="formData.wakeTime"
        label="醒来时间"
        placeholder="点击选择时间"
        @click="showPickerPopup(3)"
      />
      <van-field
        readonly
        clickable
        name="upTimePicker"
        :value="formData.upTime"
        label="起床时间"
        placeholder="点击选择时间"
        @click="showPickerPopup(4)"
      />
      <van-field name="sleepQuality" label="睡眠质量">
        <template #input>
          <van-rate v-model="formData.sleepQuality" />
        </template>
      </van-field>
      <van-field
        v-model="formData.memory"
        name="memory"
        label="睡前回忆"
        type="textarea"
        rows="3"
        autosize
        placeholder=""
      />
      <van-field
        v-model="formData.lateReason"
        name="lateReason"
        label="熬夜原因"
        placeholder=""
      />
      <van-field
        v-model="formData.bestTime"
        name="bestTime"
        label="今日最佳"
        placeholder=""
      />
      <van-field
        v-model="formData.remark"
        rows="3"
        autosize
        label="备注"
        name="remark"
        type="textarea"
        placeholder="请输入备注"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { create } from "@/api/sleep.js";
import Vue from "vue";
import { Rate } from "vant";

Vue.use(Rate);
export default {
  data() {
    return {
      minDate: new Date(2021, 0, 1),
      maxDate: new Date(2021, 5, 1),
      formData: {
        bedTime: "",
        sleepTime: "",
        wakeTime: "",
        upTime: "",
        date: "",
        sleepQuality: 0,
        lateReason: "/",
        memory: "",
        bestTime: "/",
        remark: "",
      },
      submitFormData: {},
      date: "",
      showCalendar: false,
      showPicker: false,
      activePickerValue: 0,
    };
  },
  created() {
    this.formData.date = this.getNow();
  },
  methods: {
    onSubmit() {
      // const data = Object.assign({}, this.formData);
      // data.date = data.date + " 00:00:00";
      this.handleFormData();
      console.log("提交睡眠数据：", this.submitFormData);
      create(this.submitFormData).then((res) => {
        if (res.code === 200) {
          this.$toast.success(res.message);
          this.$router.push("sleep");
        } else {
          this.$toast.fail(res.message);
        }
      });
    },
    onConfirm4Date(date) {
      this.formData.date = `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}`;
      this.showCalendar = false;
    },
    onConfirm(time) {
      console.log(time);
      switch (this.activePickerValue) {
        case 1:
          this.formData.bedTime = time;
          break;
        case 2:
          this.formData.sleepTime = time;
          break;
        case 3:
          this.formData.wakeTime = time;
          break;
        case 4:
          this.formData.upTime = time;
          break;
      }
      this.showPicker = false;
    },
    showPickerPopup(value) {
      this.showPicker = true;
      this.activePickerValue = value;
    },
    handleFormData() {
      this.submitFormData = Object.assign({}, this.formData);
      const bedTime = this.submitFormData.bedTime;
      const sleepTime = this.submitFormData.sleepTime;
      const v = new Date(this.submitFormData.date.replace(/-/g, "/"));
      const rq = v.getFullYear() + "/" + (v.getMonth() + 1) + "/" + v.getDate();
      const bt = rq + " " + this.submitFormData.bedTime + ":00";
      const st = rq + " " + this.submitFormData.sleepTime + ":00";
      const wt = rq + " " + this.submitFormData.wakeTime + ":00";
      const ut = rq + " " + this.submitFormData.upTime + ":00";
      const std = new Date(st);
      const btd = new Date(bt);
      const wtd = new Date(wt);
      const utd = new Date(ut);
      this.submitFormData.bedTime = btd.getTime();
      this.submitFormData.sleepTime = std.getTime();
      this.submitFormData.wakeTime = wtd.getTime();
      this.submitFormData.upTime = utd.getTime();
      this.submitFormData.date = v.getTime();
      // 时间修正
      if (bedTime.split(":")[0] > 20) {
        this.submitFormData.bedTime =
          this.submitFormData.bedTime - 24 * 3600 * 1000;
      }
      if (sleepTime.split(":")[0] > 20) {
        this.submitFormData.sleepTime =
          this.submitFormData.sleepTime - 24 * 3600 * 1000;
      }
      console.log("submitFormData", this.submitFormData);
    },
    getNow() {
      const date = new Date();
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    },
  },
};
</script>
