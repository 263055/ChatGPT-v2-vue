<template>
  <el-container>
    <div class="login-contain">
      <div class="one-page">
        <template v-if="asideStatus">
          <!--登录第一页左边的内容-->
          <div class="login-contain-log">
            <div class="login-loginLeft-card">
              In the simplest and cheapest way possible to access chatgpt model
            </div>
            <div class="login-loginLeft-card">
              使用与官网相同的token计费方式，同时降低了chatgpt的使用价格
            </div>
            <div class="login-loginLeft-card">
              使用Tokenizer分词器精准计费，支持微信支付
            </div>
            <div class="login-loginLeft-card">
              免费用户，也有机会体验gpt4的使用
            </div>
          </div>
          <!--登录第一页右边的内容，表格所在的卡片-->
          <div class="login-card">
            <div v-show="!this.haveLogin">
              <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
                <!--最顶端的文字描述部分-->
                <div class="login-title">登录/注册</div>
                <el-form-item prop="email">
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
                      @click.native.prevent="resetPassword"
                  >
                    <span>忘记密码</span>
                  </el-button>
                </el-form-item>
              </el-form>
            </div>
            <div v-show="this.haveLogin">
              <el-form class="login-form1">
                <div class="login-title">{{ getUserEmail }}</div>
                <div>{{ welcomeMsg }}</div>
                <div>{{ welcomeMsg1 }}</div>
                <div>{{ welcomeMsg2 }}</div>
                <div class="login-renew">最新一次更新：</div>
                <div>{{ reNewMsg1 }}</div>
                <div>{{ reNewMsg2 }}</div>
                <div class="welcome-button">
                  <el-button type="primary" @click="layout">
                    退出登录
                  </el-button>
                </div>
              </el-form>
            </div>
          </div>
        </template>
        <template v-else>
          <!--登录第一页右边的内容，表格所在的卡片-->
          <div class="login-card">
            <div v-show="!this.haveLogin">
              <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
                <!--最顶端的文字描述部分-->
                <div class="login-title">登录/注册</div>
                <el-form-item prop="email">
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
                      @click.native.prevent="resetPassword"
                  >
                    <span>忘记密码</span>
                  </el-button>
                </el-form-item>
              </el-form>
            </div>
            <div v-show="this.haveLogin">
              <el-form class="login-form1">
                <div class="login-title">{{ getUserEmail }}</div>
                <div>{{ welcomeMsg }}</div>
                <div>{{ welcomeMsg1 }}</div>
                <div>{{ welcomeMsg2 }}</div>
                <div class="login-renew">最新一次更新：</div>
                <div>{{ reNewMsg1 }}</div>
                <div>{{ reNewMsg2 }}</div>
                <div class="welcome-button">
                  <el-button type="primary" @click="layout">
                    退出登录
                  </el-button>
                </div>
              </el-form>
            </div>
          </div>
          <!--登录第一页左边的内容-->
          <!--<div class="login-contain-log">-->
          <!--  <div class="login-loginLeft-card">-->
          <!--    In the simplest and cheapest way possible to access chatgpt model-->
          <!--  </div>-->
          <!--  <div class="login-loginLeft-card">-->
          <!--    使用与官网相同的token计费方式，同时降低了chatgpt的使用价格-->
          <!--  </div>-->
          <!--  <div class="login-loginLeft-card">-->
          <!--    使用Tokenizer分词器精准计费，支持微信支付-->
          <!--  </div>-->
          <!--  <div class="login-loginLeft-card">-->
          <!--    免费用户，也有机会体验gpt4的使用-->
          <!--  </div>-->
          <!--</div>-->
        </template>
      </div>

      <!--  底部  -->
      <div class="el-login-footer">
        <span>Copyright © 2023 4gai.me All Rights Reserved.</span>
      </div>
    </div>
  </el-container>
</template>


<script>
import {decrypt, encrypt} from '@/util/jsencrypt'
import SvgIcon from "../../../components/SvgIcon.vue";
import {getCodeImg} from "@/api/login";
import Cookies from "js-cookie";
import {getToken} from "@/util/auth";

export default {
  name: "Login",
  computed: {
    getUserEmail() {
      return '4gai 欢迎你的到来'
    },
  },
  props: {
    default() {
      return {};
    },
  },
  components: {
    SvgIcon
  },
  destoryed() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    resize() {
      this.asideStatus = window.innerWidth > 500;
    },
    //监听窗口尺寸的变化
    handleResize() {
      if (this.firstSize) {
        this.resize();
        this.firstSize = false;
        this.width = window.innerWidth;
      }
      if (this.width !== window.innerWidth) {
        this.resize();
        this.width = window.innerWidth;
      }
    },
    getCode() {
      getCodeImg().then(res => {
        this.codeUrl = "data:image/gif;base64," + res.data.img;
        this.loginForm.uuid = res.data.uuid;
      });
    },
    getCookie() {
      const email = Cookies.get("email");
      const password = Cookies.get("password");
      const rememberMe = Cookies.get('rememberMe')
      this.loginForm = {
        email: email === undefined ? this.loginForm.email : email,
        password: password === undefined ? this.loginForm.password : decrypt(password),
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
      };
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          if (this.loginForm.rememberMe) {
            Cookies.set("email", this.loginForm.email, {expires: 30});
            Cookies.set("password", encrypt(this.loginForm.password), {expires: 30});
            Cookies.set('rememberMe', this.loginForm.rememberMe, {expires: 30});
          } else {
            Cookies.remove("email");
            Cookies.remove("password");
            Cookies.remove('rememberMe');
          }
          this.$store.dispatch("Login", this.loginForm).then(() => {
            this.loading = false;
            this.isLogin()
          }).catch(() => {
            this.loading = false;
            if (this.captchaEnabled) {
              this.getCode();
            }
          });
        }
      });
    },
    isLogin() {
      const token = getToken();
      this.haveLogin = !(token === undefined || token === '' || token === null);
    },
    layout() {
      localStorage.removeItem('4gai-Token');
      this.$notify({
        message: '注销成功',
        duration: 5000,
        type: 'success'
      })
      this.isLogin()
    },
    resetPassword() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          if (this.loginForm.rememberMe) {
            Cookies.set("email", this.loginForm.email, {expires: 30});
            Cookies.set("password", encrypt(this.loginForm.password), {expires: 30});
            Cookies.set('rememberMe', this.loginForm.rememberMe, {expires: 30});
          } else {
            Cookies.remove("email");
            Cookies.remove("password");
            Cookies.remove('rememberMe');
          }
          this.$store.dispatch("resetPassword", this.loginForm).then(() => {
            this.isLogin()
          }).catch(() => {
            if (this.captchaEnabled) {
              this.getCode();
            }
          });
        }
      });
    }
  },
  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
    this.getCode();
    this.getCookie();
    this.isLogin();
  },
  mounted() {
  },
  data() {
    return {
      asideStatus: true,
      firstSize: true,
      width: 0,
      loginForm: {
        email: "",
        password: "",
        rememberMe: true,
        code: "",
        uuid: ""
      },
      loading: false,
      loginRules: {
        email: [
          {required: true, trigger: "blur", message: "请输入您的邮箱"}
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
      haveLogin: false,
      reNewMsg1: '1.加入了聊天室页面的上下滚动，加入了加载聊天室的加载动画',
      reNewMsg2: '2.加入了重置密码，加入了相关提示词',
      welcomeMsg1: '2.你的支持，就是我做下去的动力！',
      welcomeMsg2: '3.目前暂不支持图片和语音的调用，我后续会一一加入，敬请期待',
      welcomeMsg: '1.如果您觉得网站做的不错，请多多支持并分享给身边的朋友，' +
          '网站已经持续运行了接近三个月，始终秉承着以廉价为主。' +
          '希望这次的更新能为你提供更好的服务。',
    };
  },
};
</script>

<style lang="scss" rel="stylesheet/scss">
.login-contain {
  width: 100%;
  height: 100%;

  .one-page {
    display: flex;

    .login-contain-log {
      height: 100%;
      width: 80%;
      background: rgb(39, 42, 55);
      max-height: 95vh;
      margin-top: 20px;
      margin-left: 20px;

      .login-loginLeft-card {
        font-size: 30px;
        margin-bottom: 30px;
        color: white;
      }
    }

    .login-card {
      display: flex;
      justify-content: center;
      word-wrap: anywhere;
      width: 100%;
      background: rgb(39, 42, 55);
      margin-top: 40px;

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
          margin-left: 2px;
        }

        .login-code {
          width: 36%;
          height: 38px;
          float: right;

          img {
            cursor: pointer;
            vertical-align: middle;
          }
        }
      }

      .login-form1 {
        border-radius: 6px;
        background: #ffffff;
        width: 400px;
        height: 400px;
        padding: 0 25px 5px 25px;
      }
    }
  }

  .el-login-footer {
    height: 40px;
    line-height: 40px;
    position: absolute;
    bottom: 0;
    width: 80%;
    text-align: center;
    color: #f8e4e4;
    font-size: 12px;
    letter-spacing: 1px;
  }
}

.login-title {
  font-size: 35px;
  margin-bottom: 20px;
  text-align: center;
}

.login-renew {
  font-size: 25px;
  margin-bottom: 20px;
  text-align: center;
}

.welcome-card {
  text-align: center;
}

.welcome-button {
  text-align: center;
  margin-top: 10px;
}

@media only screen and (max-width: 768px) { // 当屏幕宽度小于或等于768px时
  .login-contain {
    width: auto;

    .one-page {
      flex-direction: column;

      .login-card {
        width: 300px;

        .login-form {
          .login-code {
            img {
              width: 110px;
            }
          }
        }

        .login-form1 {
          width: 300px;
          height: 500px;
        }
      }
    }

    .el-login-footer {
      position: relative;
      color: #09030d;
    }
  }
}
</style>
