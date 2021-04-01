<template>
  <div class="login-container">
    <van-row type="flex" justify="center" style="margin-top: 5%">
      <van-image
        width="100%"
        height="auto"
        src="https://cn.bing.com//th?id=OHR.BifengxiaPanda_ZH-CN8879969527_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp"
      />
    </van-row>
    <van-row style="margin-top: 5%">
      <van-divider
        :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
        >欢迎登录</van-divider
      >
    </van-row>
    <van-row style="margin-top: 5%">
      <van-cell-group>
        <van-field
          v-model="model.username"
          name="username"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
      </van-cell-group>
      <!-- </van-row>
    <van-row gutter="20"> -->
      <van-cell-group>
        <van-field
          v-model="model.password"
          :type="passwordType"
          name="password"
          :right-icon="icon"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
          @click-right-icon="showPassword"
          ref="password"
        />
      </van-cell-group>
    </van-row>
    <van-row style="margin-top: 5%">
      <van-button round block type="info" @click="onSubmit">提交</van-button>
    </van-row>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      redirect: undefined,
      icon: "closed-eye",
      passwordType: "password",
      model: {
        username: "",
        password: "",
      },
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    onSubmit(values) {
      console.log("submit", values);
      this.$store
        .dispatch("user/login", this.model)
        .then(() => {
          this.$router.push({ path: this.redirect || "/home" });
          this.loading = false;
          this.$toast.success("登录成功");
        })
        .catch(() => {
          this.loading = false;
        });
    },
    showPassword() {
      if (this.passwordType === "password") {
        this.passwordType = "";
        this.icon = "eye-o";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
  },
};
</script>

