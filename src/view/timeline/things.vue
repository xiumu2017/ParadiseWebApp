<template>
  <div class="timeline-form">
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
      <van-field
        readonly
        clickable
        name="startTime"
        :value="formData.startTime"
        label="开始时间"
        placeholder="点击选择开始时间"
        @click="showStartTimePicker = true"
      />
      <van-popup v-model="showStartTimePicker" position="bottom">
        <van-datetime-picker
          v-model="formData.startTime"
          type="time"
          @confirm="onConfirm4StartTime"
          @cancel="showStartTimePicker = false"
          title="选择开始时间"
        />
      </van-popup>
      <van-field
        readonly
        clickable
        name="endTime"
        :value="formData.endTime"
        label="结束时间"
        placeholder="点击选择结束时间"
        @click="showEndTimePicker = true"
      />
      <van-popup v-model="showEndTimePicker" position="bottom">
        <van-datetime-picker
          v-model="formData.endTime"
          type="time"
          title="选择结束时间"
          @confirm="onConfirm4EndTime"
          @cancel="showEndTimePicker = false"
        />
      </van-popup>
      <van-field
        v-model="formData.things"
        name="things"
        label="干了啥"
        placeholder="想想干了啥~"
        :rules="[{ required: true, message: '请填写干了啥' }]"
      />
      <van-field
        v-model="formData.label"
        name="label"
        label="标签"
        placeholder="输入标签~"
        :rules="[{ required: true, message: '请填写标签' }]"
      />
      <van-field
        v-model="formData.location"
        name="location"
        label="在哪儿"
        placeholder="在哪里呢~"
        :rules="[{ required: true, message: '请填写在哪儿' }]"
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
      <van-uploader
        :after-read="afterRead"
        v-model="fileList"
        multiple
        :max-count="2"
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
import { create } from "@/api/timeline.js";
import { upload } from "@/api/upload.js";
import Vue from "vue";
import { Uploader } from "vant";

Vue.use(Uploader);
export default {
  data() {
    return {
      minDate: new Date(2021, 0, 1),
      maxDate: new Date(2021, 5, 1),
      formData: {
        date: "",
        startTime: "",
        endTime: "",
        things: "",
        location: "",
        label: "",
        remark: "",
      },
      date: "",
      type: "",
      payType: "",
      showCalendar: false,
      showPicker: false,
      fileList: [],
      photos: [],
      showStartTimePicker: false,
      showEndTimePicker: false,
    };
  },
  created() {},
  methods: {
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
      const fileData = new FormData();
      fileData.append("file", file.file);
      upload(fileData).then((res) => {
        if (res.code === 200) {
          this.$toast.success("上传成功");
          console.log("fileList", this.fileList);
          this.photos.push(res.data.url);
          console.log("photos", this.photos);
        } else {
          this.$toast.fail(res.message);
        }
      });
    },
    onSubmit() {
      const data = Object.assign({}, this.formData);
      data.date = data.date + " 00:00:00";
      data.photos = this.photos.toString();
      data.startTime = this.formData.date + " " + data.startTime + ":00";
      data.endTime = this.formData.date + " " + data.endTime + ":00";
      console.log("提交Timeline数据：", data);
      create(data).then((res) => {
        if (res.code === 200) {
          this.$toast.success(res.message);
          this.$router.push("timeline");
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
    onConfirm4StartTime(time) {
      this.formData.startTime = time;
      this.showStartTimePicker = false;
    },
    onConfirm4EndTime(time) {
      this.formData.endTime = time;
      this.showEndTimePicker = false;
    },
  },
};
</script>