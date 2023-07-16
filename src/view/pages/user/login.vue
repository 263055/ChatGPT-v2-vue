<template>
  <el-container style="height: 94vh;">
    <div class="login-contain-log">
      <div class="login-loginLeft-card1">
        In the simplest and cheapest way possible to access chatgpt different model
      </div>
      <br>
      <div class="login-loginLeft-card2">
        使用与官网相同的token计费方式，同时降低了chatgpt的使用价格
      </div>
      <div class="login-loginLeft-card2">
        使用Tokenizer分词器精准计费，支持微信支付，价格实惠
      </div>
      <div class="login-loginLeft-card2">
        支持第三方api调用
      </div>
    </div>

    <!--登录表格所在的卡片-->
    <div class="login-card">
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
        <!--最顶端的文字描述部分-->
        <div class="login-title">登录/注册</div>
        <el-form-item prop="username">
          <el-input
              v-model="loginForm.email"
              auto-complete="off"
              placeholder="账号"
              type="text"
          >
            <svg-icon slot="prefix" class="el-input__icon input-icon" icon-class="user"/>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
              v-model="loginForm.password"
              auto-complete="off"
              placeholder="密码"
              type="password"
              @keyup.enter.native="handleLogin"
          >
            <svg-icon slot="prefix" class="el-input__icon input-icon" icon-class="password"/>
          </el-input>
        </el-form-item>
        <el-form-item v-if="captchaEnabled" prop="code">
          <el-input
              v-model="loginForm.code"
              auto-complete="off"
              placeholder="验证码"
              style="width: 63%"
              @keyup.enter.native="handleLogin"
          >
            <svg-icon slot="prefix" class="el-input__icon input-icon" icon-class="validCode"/>
          </el-input>
          <div class="login-code">
            <img :src="codeUrl" alt="" class="login-code-img" @click="getCode"/>
          </div>
        </el-form-item>
        <el-checkbox v-model="loginForm.rememberMe" style="margin:0 0 25px 0;">
          记住密码
        </el-checkbox>
        <el-form-item style="width:100%;">
          <el-button
              :loading="loading"
              size="medium"
              style="width:100%;"
              type="primary"
              @click.native.prevent="handleLogin"
          >
            <span v-if="!loading">登录/注册</span>
            <span v-else>加载中...</span>
          </el-button>
        </el-form-item>
        <el-form-item style="width:100%;">
          <el-button
              size="medium"
              style="width:100%;"
              type="info"
              @click.native.prevent="handleLogin"
          >
            <span>忘记密码</span>
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <!--  底部  -->
    <div class="el-login-footer">
      <span>Copyright © 2023 4gai.me All Rights Reserved.</span>
    </div>
  </el-container>
</template>


<script>
import {ref} from "vue";
import SvgIcon from "../../../components/SvgIcon.vue";

export default {
  name: "Login",
  computed() {
  },
  props: {
    default() {
      return {};
    },
  },
  components: {
    SvgIcon
  },
  methods: {
    getCode() {
      // getCodeImg().then(res => {
      //   this.captchaEnabled = res.captchaEnabled === undefined ? true : res.captchaEnabled;
      //   if (this.captchaEnabled) {
      //     this.codeUrl = "data:image/gif;base64," + res.img;
      //     this.loginForm.uuid = res.uuid;
      //   }
      // });
    },
    handleLogin() {
      // this.$refs.loginForm.validate(valid => {
      //   if (valid) {
      //     this.loading = true;
      //     if (this.loginForm.rememberMe) {
      //       Cookies.set("username", this.loginForm.username, { expires: 30 });
      //       Cookies.set("password", encrypt(this.loginForm.password), { expires: 30 });
      //       Cookies.set('rememberMe', this.loginForm.rememberMe, { expires: 30 });
      //     } else {
      //       Cookies.remove("username");
      //       Cookies.remove("password");
      //       Cookies.remove('rememberMe');
      //     }
      //     this.$store.dispatch("Login", this.loginForm).then(() => {
      //       this.$router.push({ path: this.redirect || "/" }).catch(()=>{});
      //     }).catch(() => {
      //       this.loading = false;
      //       if (this.captchaEnabled) {
      //         this.getCode();
      //       }
      //     });
      //   }
      // });
    }
  },
  created() {
    this.getCode();
    this.getCookie();
  },
  mounted() {
  },
  data() {
    return {
      loginForm: {
        email: "",
        password: "",
        rememberMe: true,
        code: "",
        uuid: ""
      },
      loading: false,
      loginRules: {
        username: [
          {required: true, trigger: "blur", message: "请输入您的账号"}
        ],
        password: [
          {required: true, trigger: "blur", message: "请输入您的密码"}
        ],
        code: [{required: true, trigger: "change", message: "请输入验证码"}]
      },
      // 注册开关
      register: false,
      redirect: undefined,
      captchaEnabled: true,
      codeUrl: '',
    };
  },
};
</script>

<style lang="scss" rel="stylesheet/scss">
.login-loginLeft-card1 {
  font-size: 45px;
  color: white;
}

.login-loginLeft-card2 {
  font-size: 30px;
  margin-bottom: 30px;
  color: white;
}

.login-contain-log {
  height: 100%;
  background: rgb(39, 42, 55);
  max-height: 95vh;
  overflow: auto;
  overflow-x: scroll;
  overflow-y: scroll;
  margin-top: 20px;
  margin-left: 20px;
  width: 650px;
}

.login-card {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 900px;
  height: 500px;
  //background-size: cover;
}

.login-code {
  width: 33%;
  height: 38px;
  float: right;

  img {
    cursor: pointer;
    vertical-align: middle;
  }
}

.login-title {
  font-size: 35px;
  margin-bottom: 20px;
}

.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-size: 12px;
  letter-spacing: 1px;
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 400px;
  padding: 25px 25px 5px 25px;

  .el-input {
    height: 38px;

    input {
      height: 38px;
    }
  }

  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}
</style>
