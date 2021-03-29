<template>
  <div class="login-container">
    <cube-form
      :model="model"
      :schema="schema"
      :immediate-validate="false"
      :options="options"
      @validate="validateHandler"
      @submit="submitHandler"
      @reset="resetHandler"
    ></cube-form>
  </div>
</template>

<script>
// import { login } from "@/api/user";

export default {
  name: "Login",
  data() {
    return {
      validity: {},
      valid: undefined,
      loading: false,
      redirect: undefined,
      model: {
        username: "",
        password: "",
      },
      schema: {
        fields: [
          {
            type: "input",
            modelKey: "username",
            label: "用户名",
            props: {
              placeholder: "请输入用户名",
            },
            rules: {
              required: true,
            },
            // validating when blur
            trigger: "blur",
          },
          {
            type: "input",
            modelKey: "password",
            label: "密码",
            props: {
              placeholder: "请输入",
              type: "password",
              eye: {
                open: false,
                reverse: false,
              },
            },
            rules: {
              required: true,
            },
            // validating when blur
            trigger: "blur",
          },
          {
            type: "submit",
            label: "Submit",
          },
        ],
      },
      options: {
        scrollToInvalidField: true,
        layout: "standard", // classic fresh
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
    submitHandler(e) {
      e.preventDefault();
      // login(this.model).then((res) => {
      //   console.log("res", res);
      //   if (res.code === 200) {
      //     this.$createToast({
      //       txt: "登录成功",
      //       type: "correct",
      //     }).show();
      //     this.$router.push('home')
      //   }
      // });
       this.$store
            .dispatch("user/login", this.model)
            .then(() => {
              this.$router.push({ path: this.redirect || "/home" });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
    },
    validateHandler(result) {
      this.validity = result.validity;
      this.valid = result.valid;
      console.log(
        "validity",
        result.validity,
        result.valid,
        result.dirty,
        result.firstInvalidFieldIndex
      );
    },
    resetHandler(e) {
      console.log("reset", e);
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || "/" });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

