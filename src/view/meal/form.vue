<template>
  <div class="meal-form">
    <van-form @submit="onSubmit">
      <van-field
        readonly
        clickable
        name="date"
        :value="date"
        label="日期"
        placeholder="点击选择日期"
        @click="showCalendar = true"
      />
      <van-calendar v-model="showCalendar" @confirm="onConfirm4Date" />
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
        v-model="what"
        name="what"
        label="吃什么"
        placeholder=""
        :rules="[{ required: true, message: '请填写吃什么' }]"
      />
      <van-field
        v-model="place"
        name="place"
        label="在哪儿吃"
        placeholder=""
        :rules="[{ required: true, message: '请填写在哪儿吃' }]"
      />
      <van-field
        v-model="cost"
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
        v-model="remark"
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
import Vue from "vue";
import { Form } from "vant";
import { Calendar } from "vant";
import { Field } from "vant";
import { Button } from "vant";
import { Picker } from "vant";
import { Popup } from "vant";
import { create, getPayTypes, getTypes } from "@/api/meal.js";

Vue.use(Picker);
Vue.use(Popup);
Vue.use(Form);
Vue.use(Calendar);
Vue.use(Field);
Vue.use(Button);

export default {
  data() {
    return {
      what: "",
      place: "",
      cost: "",
      date: "",
      type: "",
      payType: "",
      remark: "",
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
    onSubmit(values) {
      console.log("submit", values);

      create(values).then((res) => {
        if (res.code === 200) {
          this.$toast.success(res.message);
        } else {
          this.$toast.fail(res.message);
        }
      });
    },
    onConfirm4Date(date) {
      this.date =
        `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}` +
        " 00:00:00";
      this.showCalendar = false;
    },
    onConfirm4Type(value, index) {
      this.type = index;
      this.showPicker = false;
    },
    onConfirm4PayType(value, index) {
      this.payType = index;
      this.showPayTypePicker = false;
    },
  },
};
</script>