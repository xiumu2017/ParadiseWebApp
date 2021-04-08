<template>
  <div class="meal-form">
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
        name="type"
        :value="type"
        label="类型"
        placeholder="点击选择类型"
        @click="showPicker = true"
      />
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="typeArr"
          @confirm="onConfirm4Type"
          @cancel="showPicker = false"
        />
      </van-popup>
      <van-field
        v-model="formData.what"
        name="what"
        label="吃什么"
        placeholder=""
        :rules="[{ required: true, message: '请填写吃什么' }]"
      />
      <van-field
        v-model="formData.place"
        name="place"
        label="在哪儿吃"
        placeholder=""
        :rules="[{ required: true, message: '请填写在哪儿吃' }]"
      />
      <van-field
        v-model="formData.cost"
        type="number"
        name="cost"
        label="花了多少"
        placeholder=""
        :rules="[{ required: true, message: '请填写花了多少' }]"
      />
      <van-field
        readonly
        clickable
        name="payType"
        :value="payType"
        label="支付方式"
        placeholder="点击选择支付方式"
        @click="showPayTypePicker = true"
      />
      <van-popup v-model="showPayTypePicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="payTypeArr"
          @confirm="onConfirm4PayType"
          @cancel="showPayTypePicker = false"
        />
      </van-popup>
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
    <float-btn @onFloatBtnClicked="onFloatBtnClicked" />
  </div>
</template>

<script>
import { create, getPayTypes, getTypes } from "@/api/meal.js";
import FloatBtn from "../../components/FloatBtn.vue";

export default {
  components: { FloatBtn },
  data() {
    return {
      minDate: new Date(2021, 0, 1),
      maxDate: new Date(2021, 5, 1),
      formData: {
        what: "",
        place: "",
        cost: "",
        date: "",
        type: "",
        payType: "",
        remark: "",
      },
      date: "",
      type: "",
      payType: "",
      showCalendar: false,
      showPicker: false,
      showPayTypePicker: false,
      typeArr: [],
      payTypeArr: [],
    };
  },
  created() {
    getPayTypes().then((res) => {
      this.payTypeArr = res.data;
    });
    getTypes().then((res) => {
      this.typeArr = res.data;
    });
  },
  methods: {
    onSubmit() {
      const data = Object.assign({}, this.formData);
      data.date = data.date + " 00:00:00";
      data.cost = data.cost * 100;
      console.log("提交用餐数据：", data);
      create(data).then((res) => {
        if (res.code === 200) {
          this.$toast.success(res.message);
          this.$router.push("meal");
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
    onConfirm4Type(value, index) {
      this.formData.type = index;
      this.type = value;
      this.showPicker = false;
    },
    onConfirm4PayType(value, index) {
      this.formData.payType = index;
      this.payType = value;
      this.showPayTypePicker = false;
    },
    onFloatBtnClicked() {
      this.$router.push("home");
    },
  },
};
</script>