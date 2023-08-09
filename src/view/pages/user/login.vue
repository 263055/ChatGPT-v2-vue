<template>
  <el-container>
    <div class="main-box">
      <div class="login-page1">
        <div class="grid">
          <div class="page1-left">
            <div>
              <h1 class="page1-left-1">
                <span class="black">
                  Access to AI tech
                </span>
                <span class="page1-left-1-font">
                  Easy, Cheap and Fast.
                </span>
              </h1>
              <p class="page1-left-2">4gai 可以让你便捷地访问ChatGPT等AI模型。</p>
              <p class="page1-left-2">使用Tokenizer分词器精准计费，目前完全免费。</p>
              <p class="page1-left-2">已经接入了chatgpt模型，whisper-1语音模型以及generations产图模型，目前正在努力接入更多的新功能。</p>
            </div>
          </div>
          <div class="page1-right">
            <!--登录第一页右边的内容，表格所在的卡片-->
            <div class="right-login-div">
              <div class="login-card">
                <template v-if="!this.haveLogin">
                  <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
                    <!--最顶端的文字描述部分-->
                    <div class="login-title">登录/注册</div>
                    <el-form-item prop="email">
                      <el-input v-model="loginForm.email"
                                auto-complete="off"
                                placeholder="账号"
                                type="text">
                        <svg-icon slot="prefix" class="el-input__icon input-icon" icon-class="user"/>
                      </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                      <el-input v-model="loginForm.password"
                                auto-complete="off"
                                placeholder="密码"
                                type="password"
                                @keyup.enter.native="handleLogin">
                        <svg-icon slot="prefix" class="el-input__icon input-icon" icon-class="password"/>
                      </el-input>
                    </el-form-item>
                    <el-form-item v-if="captchaEnabled" prop="code">
                      <div style="display: flex;">
                        <el-input v-model="loginForm.code"
                                  auto-complete="off"
                                  class="login-card-input"
                                  placeholder="验证码"
                                  @keyup.enter.native="handleLogin">
                          <svg-icon slot="prefix" class="el-input__icon input-icon" icon-class="validCode"/>
                        </el-input>
                        <div class="login-code">
                          <img :src="codeUrl" alt="" @click="getCode"/>
                        </div>
                      </div>
                    </el-form-item>
                    <el-checkbox v-model="loginForm.rememberMe" style="margin:0 0 10px 0;">
                      记住密码
                    </el-checkbox>
                    <el-form-item style="width:100%;">
                      <el-button :loading="loading"
                                 size="medium"
                                 style="width:100%;"
                                 type="primary"
                                 @click.native.prevent="handleLogin">
                        <span v-if="!loading">登录/注册</span>
                        <span v-else>加载中...</span>
                      </el-button>
                    </el-form-item>
                    <el-form-item style="width:100%;">
                      <el-button size="medium"
                                 style="width:100%;"
                                 type="info"
                                 @click.native.prevent="resetPassword">
                        <span>忘记密码</span>
                      </el-button>
                    </el-form-item>
                  </el-form>
                </template>
                <template v-else>
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
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--底部通知栏-->
    <template v-if="logInfo">
      <div class="bottom-alert">
        <div class="bottom-alert1">
          <div class="bottom-alert2">
            <div class="bottom-alert3">
              <div class="bottom-alert-left">
              <span>
                <svg class="bi bi-megaphone-fill" fill="currentColor" height="16"
                     viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 2.5a1.5 1.5 0 0 1 3 0v11a1.5 1.5 0 0 1-3 0v-11zm-1 .724c-2.067.95-4.539 1.481-7
                  1.656v6.237a25.222 25.222 0 0 1 1.088.085c2.053.204 4.038.668 5.912 1.56V3.224zm-8 7.841V4.93
                  4c-.68.027-1.399.043-2.008.053A2.02 2.02 0 0 0 0 7v2c0 1.106.896 1.996 1.994 2.009a68.14 68.1
                  4 0 0 1 .496.008 64 64 0 0 1 1.51.048zm1.39 1.081c.285.021.569.047.85.078l.253 1.69a1 1 0 0 1-
                  .983 1.187h-.548a1 1 0 0 1-.916-.599l-1.314-2.48a65.81 65.81 0 0 1 1.692.064c.327.017.65.037.966.06z"/>
                </svg>
              </span>
                <p>
                  GPT-3.5/GPT-3.5-16k(ChatGPT)免费使用，欢迎注册
                </p>
              </div>
              <div class="bottom-alert-right">
                <button class="bottom-alert-right-button" @click="getCode">立即注册</button>
              </div>
              <div class="bottom-alert-button">
              <span class="bottom-alert-right-close" @click="closeInfo">
                <svg class="bottom-alert-right-closes bi bi-x-circle" fill="currentColor" height="16"
                     viewBox="0 0 16 16"
                     width="16" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                  <path
                      d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
              </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <!--  底部  -->
    <el-footer style="height: 0;">
      <div class="el-login-footer">
        <span>Copyright © 2023 4gai.me All Rights Reserved.</span>
      </div>
    </el-footer>
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
    // window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    // resize() {
    //   this.asideStatus = window.innerWidth > 500;
    // },
    //监听窗口尺寸的变化
    // handleResize() {
    //   if (this.firstSize) {
    //     this.resize();
    //     this.firstSize = false;
    //     this.width = window.innerWidth;
    //   }
    //   if (this.width !== window.innerWidth) {
    //     this.resize();
    //     this.width = window.innerWidth;
    //   }
    // },
    closeInfo() {
      this.logInfo = false
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
    // window.addEventListener('resize', this.handleResize)
    // this.handleResize()
    this.getCode();
    this.getCookie();
    this.isLogin();
  },
  mounted() {
  },
  data() {
    return {
      // asideStatus: true,
      firstSize: true,
      logInfo: true,
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
      reNewMsg1: '1.加入了语音模型和照片模型',
      reNewMsg2: '2.完善了登录页面以及聊天页面的样式',
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

.login-page1 {
  --tw-bg-opacity: 1;
  background-color: rgb(17 24 39 / var(--tw-bg-opacity));
  margin-left: auto;
  margin-right: auto;
  max-width: 80rem;
  padding-top: 8rem;

  .page1-left {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    max-width: 28rem;
    margin-left: auto;
    margin-right: auto;

    .page1-left-1 {
      --tw-text-opacity: 1;
      color: rgb(255 255 255 / var(--tw-text-opacity));
      font-weight: 700;
      font-size: 3rem;
      line-height: 1;
      margin-top: -5rem;

      .page1-left-1-font {
        display: block;
        color: transparent;
        -webkit-background-clip: text;
        padding-bottom: 1rem;
        --tw-gradient-to: #22d3ee;
        --tw-gradient-from: #99f6e4;
        background-image: linear-gradient(to right, var(--tw-gradient-from), var(--tw-gradient-to));
      }
    }

    .page1-left-2 {
      --tw-text-opacity: 1;
      color: rgb(209 213 219 / var(--tw-text-opacity));
      font-size: 1rem;
      line-height: 1.5rem;
      margin-top: 1.25rem;
    }
  }

  .page1-right {
    margin-top: 3rem;
    margin-left: auto;
    margin-right: auto;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    max-width: 28rem;
    z-index: 50;

    .right-login-div {
      width: 100%;
      margin-top: 2rem;

      .login-card {
        --tw-bg-opacity: 1;
        background-color: rgb(31 41 55 / var(--tw-bg-opacity));
        --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / .1), 0 1px 2px -1px rgb(0 0 0 / .1);
        --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);
        box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, #0000), var(--tw-shadow);
        padding: 1.5rem;
        border-radius: 0.5rem;
        color: #fff;

        .input-icon {
          height: 39px;
          width: 14px;
          margin-left: 2px;
        }

        .login-card-input {
          width: 60%;
          flex: 1; /*将输入框自动调整为剩余空间的大小*/
          margin-right: 10px; /*为了在输入框和图片之间添加一些间距，你可以调整这个数值*/
        }

        .login-code {
          img {
            height: 38px;
            float: right;
          }
        }
      }
    }
  }
}


.bottom-alert {
  padding-bottom: 0.5rem;
  z-index: 20;
  bottom: 0px;
  left: 0px;
  right: 0px;
  position: fixed;

  .bottom-alert1 {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    max-width: 80rem;
    margin-left: auto;
    margin-right: auto;

    .bottom-alert2 {
      padding: 0.5rem;
      --tw-bg-opacity: 1;
      background-color: rgb(79 70 229 / var(--tw-bg-opacity));
      border-radius: 0.5rem;
      --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / .1), 0 4px 6px -4px rgb(0 0 0 / .1);
      --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);
      box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, #0000), var(--tw-shadow);

      .bottom-alert3 {
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        display: flex;

        .bottom-alert-left {
          align-items: center;
          flex: 1 1 0%;
          width: 0px;
          display: flex;

          span {
            padding: 0.5rem;
            --tw-bg-opacity: 1;
            background-color: rgb(55 48 163 / var(--tw-bg-opacity));
            border-radius: 0.5rem;
            display: flex;
          }

          p {
            --tw-text-opacity: 1;
            color: rgb(255 255 255 / var(--tw-text-opacity));
            font-weight: 500;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin-left: 0.75rem;
          }
        }

        .bottom-alert-right {
          .bottom-alert-right-button {
            --tw-text-opacity: 1;
            color: rgb(79 70 229 / var(--tw-text-opacity));
            font-size: .875rem;
            line-height: 1.25rem;
            padding: 0.5rem;
            --tw-bg-opacity: 1;
            border-color: transparent;
            border-radius: 0.375rem;
          }
        }

        .bottom-alert-button {
          flex-shrink: 0;
          order: 2;

          button {
            --tw-bg-opacity: 1;
            background-color: rgb(55 48 163 / var(--tw-bg-opacity));
            border-radius: 0.5rem;
            display: flex;
          }

          .bottom-alert-right-close {
            background-color: transparent;
            margin-left: 10px;

            .bottom-alert-right-closes {
              --tw-text-opacity: 1;
              color: rgb(255 255 255 / var(--tw-text-opacity));
              width: 1.5rem;
              height: 1.5rem;
              vertical-align: middle;
            }
          }
        }
      }
    }
  }
}

@media only screen and (max-width: 640px) {
  .bottom-alert {
    padding-bottom: 1.25rem;

    .bottom-alert1 {
      padding-left: 1.5rem;
      padding-right: 1.5rem;

      .bottom-alert2 {
        padding: 0.75rem;

        .bottom-alert-right {
          width: auto;
          margin-top: 0;
          order: 2;

          a {
            --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / .05);
            --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
            box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, #0000), var(--tw-shadow);
            --tw-text-opacity: 1;
            color: rgb(79 70 229 / var(--tw-text-opacity));
            font-weight: 500;
            font-size: .875rem;
            line-height: 1.25rem;
            padding: 0.5rem;
            --tw-bg-opacity: 1;
            background-color: rgb(255 255 255 / var(--tw-bg-opacity));
            border-color: transparent;
            border-width: 1px;
            border-radius: 0.375rem;
            justify-content: center;
            align-items: center;
          }
        }

        .bottom-alert-button {
          margin-left: 0.5rem;
          order: 3;
        }
      }
    }
  }
  .main-box {
  }
  .login-page1 {
    padding-top: 4rem;

    .page1-left {
      text-align: center;
      max-width: 42rem;

      .page1-left-1 {
        font-size: 2.25rem;
        line-height: 2.5rem;
        margin-top: 1.25rem;

        .page1-left-1-font {
          padding-bottom: 1.25rem
        }
      }

      .page1-left-2 {
        font-size: 1.25rem;
        line-height: 1.75rem;
      }
    }

    .page1-right {
      .right-login-div {
        min-width: 15rem;
      }
    }
  }
}

@media only screen and (min-width: 1024px) {
  .bottom-alert {
    .bottom-alert1 {
      padding-left: 2rem;
      padding-right: 2rem;
    }
  }
  .login-page1 {
    overflow: hidden;
    padding: 2rem 2rem 14rem;

    .grid {
      gap: 2rem;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      display: grid;

      .page1-left {
        text-align: left;
        padding-left: 0;
        padding-right: 0;
        align-items: center;
        display: flex;

        .page1-left-1 {
          padding-top: 6rem;
        }
      }

      .page1-right {
        position: relative;
        margin: 0;

        .right-login-div {
          left: 0;
          top: 0;
          bottom: 0;
          max-width: none;
          width: auto;
          height: 100%;
          margin-left: 4rem;


          .login-card {
            width: 350px;
          }
        }
      }
    }
  }
}

.black {
  display: block;
}

.login-title {
  font-size: 35px;
  margin-bottom: 20px;
  text-align: center;
}

.main-box {
  width: 100vw;
  height: 88vh;
  border-radius: 20px;
  box-sizing: border-box;
}
</style>
