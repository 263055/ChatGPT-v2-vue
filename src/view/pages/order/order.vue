<template>
  <div>
    <div class="order-main">
      <header>
        <div class="header-all">
          <p>Pricing</p>
          <p class="header-p">我们致力于提供高性价比的优质服务</p>
          <p class="header-p">同时后期还会开放免费的接口平台,让更多的人体验gpt的魅力！！！</p>
        </div>
      </header>

      <main>
        <!--用户信息-->
        <div class="user-card" style="text-align: center;">
          <p class="user-header">当前用户信息</p>
          <div class="table-responsive">
            <table class="table text-center">
              <thead>
              <tr>
                <th style="width: 20%;">邮箱</th>
                <th style="width: 20%;">累计充值</th>
                <th style="width: 20%;">用户等级</th>
                <th style="width: 20%;">剩余token</th>
                <th style="width: 20%;">订阅到期时间</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>
                  <a> {{ user.email }} </a>
                </td>
                <td>
                  <a> {{ user.balance }} </a>
                </td>
                <td>
                  <a> {{ user.version }} </a>
                </td>
                <td>
                  <a> {{ user.token }} </a>
                </td>
                <td>
                  <a> {{ user.expireTime }} </a>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div style="color: #8a4141; font-size: larger; margin-bottom: 10px">
            点击下方按钮升级套餐
          </div>
          <el-button size="medium" type="info" @click="updateTo1">
            <span>升级到基础版</span>
          </el-button>
          <el-button size="medium" type="info" @click="updateTo2">
            <span>升级到进阶版</span>
          </el-button>
          <p class="user-footer" style="color: #8a4141">注：您无需为套餐本身付费，只要充值数额满足条件即可</p>
        </div>

        <!--三个支付计划-->
        <div class="plan-card">
          <el-card class="cards" shadow="hover">
            <div slot="header" class="card-header">
              <h4 style="font-size: xx-large">Free/体验版</h4>
            </div>
            <div class="card-sum">
              <h1>$0<small class="">/month</small></h1>
            </div>
            <div class="card-body">
              <ul class="">
                <li>
                  <svg-icon icon-class="check2" style="margin-right: 5px;color: #409030"/>
                  稳定性一般
                </li>
                <li>
                  <svg-icon icon-class="check2" style="margin-right: 5px;color: #409030"/>
                  响应速度一般
                </li>
                <li>
                  <svg-icon icon-class="check2" style="margin-right: 5px;color: #409030"/>
                  免费使用初级线路
                </li>
                <li>
                  <svg-icon icon-class="check2" style="margin-right: 5px;color: #409030"/>
                  付费1.3倍率使用gpt4模型（待定）
                </li>
                <li>
                  <svg-icon icon-class="check2" style="margin-right: 5px;color: #409030"/>
                  享受本网站提供的第三方接口服务
                </li>
                <li>
                  <svg-icon icon-class="check2" style="margin-right: 5px;color: #409030"/>
                  免费使用此网站的3.5模型,语音等模型
                </li>
              </ul>
            </div>
          </el-card>
          <el-card class="cards" shadow="hover">
            <div slot="header" class="card-header">
              <h4 style="font-size: xx-large">Model/基础版</h4>
            </div>
            <div class="card-sum">
              <h1>$18<small class="">/month</small></h1>
            </div>
            <div class="card-body">
              <ul class="">
                <li>
                  <svg-icon icon-class="check2" style="margin-right: 5px;color: #409030"/>
                  稳定性优质
                </li>
                <li>
                  <svg-icon icon-class="check2" style="margin-right: 5px;color: #409030"/>
                  响应速度良好
                </li>
                <li>
                  <svg-icon icon-class="check2" style="margin-right: 5px;color: #409030"/>
                  可付费使用3.5优化线路（高稳定性）
                </li>
                <li>
                  <svg-icon icon-class="check2" style="margin-right: 5px;color: #409030"/>
                  享受本网站提供的第三方接口服务
                </li>
                <li>
                  <svg-icon icon-class="check2" style="margin-right: 5px;color: #409030"/>
                  付费0.8倍率使用gpt4模型（待定）
                </li>
                <li>
                  <svg-icon icon-class="check2" style="margin-right: 5px;color: #409030"/>
                  解锁网站包含4.0在内的所有模型
                </li>
              </ul>
              <el-button size="medium" style="width:100%;margin-top: 20px; margin-bottom: 10px" type="info"
                         @click="jumpToPay">
                <span>立即订阅</span>
              </el-button>
            </div>
          </el-card>
          <el-card class="cards" shadow="hover">
            <div slot="header" class="card-header">
              <h4 style="font-size: xx-large">VIP/进阶版</h4>
            </div>
            <div class="card-sum">
              <h1>$59<small class="">/month</small></h1>
            </div>
            <div class="card-body">
              <ul class="">
                <li>
                  <svg-icon icon-class="check2" style="margin-right: 5px;color: #409030"/>
                  稳定性优质
                </li>
                <li>
                  <svg-icon icon-class="check2" style="margin-right: 5px;color: #409030"/>
                  响应速度快
                </li>
                <li>
                  <svg-icon icon-class="check2" style="margin-right: 5px;color: #409030"/>
                  付费使用自定义线路
                </li>
                <li>
                  <svg-icon icon-class="check2" style="margin-right: 5px;color: #409030"/>
                  一对一客服服务
                </li>
                <li>
                  <svg-icon icon-class="check2" style="margin-right: 5px;color: #409030"/>
                  付费0.6倍率使用gpt4模型（待定）
                </li>
                <li>
                  <svg-icon icon-class="check2" style="margin-right: 5px;color: #409030"/>
                  享受本网站提供的第三方接口服务
                </li>
                <li>
                  <svg-icon icon-class="check2" style="margin-right: 5px;color: #409030"/>
                  解锁网站包含4.0在内的所有模型
                </li>
              </ul>
              <el-button size="medium" style="width:100%;margin-top: 20px; margin-bottom: 10px" type="info"
                         @click="jumpToPay">
                <span>立即订阅</span>
              </el-button>
            </div>
          </el-card>
        </div>

        <!--支付面板-->
        <div ref="targetDiv" class="pay-card">
          <el-form :model="form" class="pay-from" label-width="80px">
            <h4 class="text-center pay-header">order计划</h4>
            <div class="pay-body">
              <div class="col-sm-6">
                <label class="form-label">邮箱:</label>
                <input v-model="form.email" class="form-control" placeholder="。。。。。。。。O.o?">
              </div>
            </div>
            <div class="pay-body">
              <div class="col-sm-6">
                <label class="form-label">备注:</label>
                <input v-model="form.text" class="form-control" placeholder="随便说点啥吧，不说也行">
              </div>
            </div>
            <div class="pay-body">
              <div class="col-sm-6">
                <label class="form-label">token:</label>
                <input v-model="form.token" :disabled="true" class="form-control" style="cursor: auto;">
              </div>
            </div>
            <div class="pay-body">
              <div class="col-sm-6">
                <label class="form-label">额度:</label>
                <input v-model="form.price" class="form-control" placeholder="(⊙o⊙)？">
              </div>
            </div>
            <div class="pay-body pay-slider">
              <el-slider v-model="form.price" :max="60" :min="0" :step="0.1"/>
              <el-input-number v-model="form.price"/>
            </div>
            <hr class="my-4">
            <el-button size="medium" style="width:100%;margin-top: 20px; margin-bottom: 10px" type="info"
                       @click="getQrCode">
              <span>立即支付</span>
            </el-button>
          </el-form>
        </div>

        <!--二维码面板-->
        <div v-show="qrCodeShow" class="qrCode-card">
          <hr class="qrCode-line">
          <p class="qrCode-header">目前仅支持微信扫码支付</p>
          <el-image :src=qrCode class="qrCode-image"/>
          <div class="qrCode-font">
            <el-button size="medium" style="margin-top: 5px; margin-bottom: 15px" type="info"
                       @click="getQrStatus">
              <span>点我查询订单状态</span>
            </el-button>
            <p style="color: #9c4a4a;">{{ qrStatus }}</p>
            <p>支付成功后，如果账户余额未发生改变，或有任何问题</p>
            <p>请联系邮箱至
              <a href="mailto:lhr@4gai.me" style="color: #964040;">lhr@4gai.me</a>
            </p>
          </div>
          <hr class="qrCode-line">
        </div>

        <!--套餐比较-->
        <div class="compare-card" style="text-align: center;">
          <p>Compare plans/套餐区别</p>
          <div class="table-responsive">
            <table class="table text-center">
              <thead>
              <tr>
                <th style="width: 34%;"></th>
                <th style="width: 22%;">Free/体验版</th>
                <th style="width: 22%;">Model/基础版</th>
                <th style="width: 22%;">VIP/进阶版</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <th class="text-start" scope="row">稳定性</th>
                <td>
                  <svg-icon icon-class="error"/>
                </td>
                <td>
                  <svg-icon icon-class="check2"/>
                </td>
                <td>
                  <svg-icon icon-class="check2"/>
                </td>
              </tr>
              <tr>
                <th class="text-start" scope="row">响应速度</th>
                <td>
                  <svg-icon icon-class="error"/>
                </td>
                <td>
                  <svg-icon icon-class="check2"/>
                </td>
                <td>
                  <svg-icon icon-class="check2"/>
                </td>
              </tr>
              <tr>
                <th class="text-start" scope="row">优质线路</th>
                <td>
                  <svg-icon icon-class="error"/>
                </td>
                <td>
                  <svg-icon icon-class="check2"/>
                </td>
                <td>
                  <svg-icon icon-class="check2"/>
                </td>
              </tr>
              <tr>
                <th class="text-start" scope="row">接口平台</th>
                <td>
                  <svg-icon icon-class="check2"/>
                </td>
                <td>
                  <svg-icon icon-class="check2"/>
                </td>
                <td>
                  <svg-icon icon-class="check2"/>
                </td>
              </tr>
              <tr>
                <th class="text-start" scope="row">客服服务</th>
                <td>
                  <svg-icon icon-class="error"/>
                </td>
                <td>
                  <svg-icon icon-class="error"/>
                </td>
                <td>
                  <svg-icon icon-class="check2"/>
                </td>
              </tr>
              <tr>
                <th class="text-start" scope="row">gpt3.5普通线路（低稳定）</th>
                <td>
                  <a>free</a>
                </td>
                <td>
                  <a>free</a>
                </td>
                <td>
                  <a>free</a>
                </td>
              </tr>
              <tr>
                <th class="text-start" scope="row">generations产图模型</th>
                <td>
                  <a>free(暂定)</a>
                  <!--<a>6000token/次</a>-->
                </td>
                <td>
                  <a>free(暂定)</a>
                  <!--<a>5000token/次</a>-->
                </td>
                <td>
                  <a>free(暂定)</a>
                  <!--<a>4000token/次</a>-->
                </td>
              </tr>
              <tr>
                <th class="text-start" scope="row">whisper-1语音转文字模型</th>
                <td>
                  <a>free(暂定)</a>
                  <!--<a>0.6倍率</a>-->
                </td>
                <td>
                  <a>free(暂定)</a>
                  <!--<a>0.5倍率</a>-->
                </td>
                <td>
                  <a>free(暂定)</a>
                  <!--<a>0.3倍率</a>-->
                </td>
              </tr>
              <tr>
                <th class="text-start" scope="row">claude2线路</th>
                <td>
                  <a>3次/1min/free</a>
                </td>
                <td>
                  <a>10次/1min/free</a>
                </td>
                <td>
                  <a>无限制/free</a>
                </td>
              </tr>
              <tr>
                <th class="text-start" scope="row">gpt3.5优质线路</th>
                <td>
                  <a>0.6倍率</a>
                </td>
                <td>
                  <a>0.5倍率</a>
                </td>
                <td>
                  <a>0.3倍率</a>
                </td>
              </tr>
              <tr>
                <th class="text-start" scope="row">gpt4</th>
                <td>
                  <a>1.4倍率</a>
                </td>
                <td>
                  <a>0.8倍率</a>
                </td>
                <td>
                  <a>0.6倍率</a>
                </td>
              </tr>
              </tbody>
            </table>
            <el-image :src="require('@/assets/gpt.jpg')" style="text-align: center;"/>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import SvgIcon from "../../../components/SvgIcon.vue";
import Cookies from "js-cookie";
import {getQrCode, getQrStatus, updateBalance} from "@/api/order";
import {getUserDto} from "@/api/login";
import {JCMFormatTimestamp} from "@/util/util";
import {Message, MessageBox} from "element-ui";

export default {
  name: "Order",
  components: {
    SvgIcon
  },
  watch: {
    'form.price': function (newVal) {
      this.form.token = newVal * 50000;
    }
  },
  data() {
    return {
      qrCodeShow: false,
      qrAoid: '',
      qrCode: '',
      qrStatus: '当前订单状态:  订单未支付',
      form: {
        email: Cookies.get('email'),
        text: '',
        price: 0.0,
        token: 0.0,
      },
      user: {
        email: Cookies.get('email'),
        token: 0.0,
        version: 0,
        balance: 0,
        expireTime: 0,
      }
    }
  },
  methods: {
    jumpToPay() {
      this.$refs.targetDiv.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center'
      });
    },
    getQrStatus() {
      new Promise((resolve, reject) => {
        getQrStatus(this.qrAoid).then((res) => {
          this.qrStatus = '当前订单状态:  ' + res.msg
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    updateTo1() {
      if (this.user.balance < 18) {
        Message({message: '累计充值金额不足', type: 'error'})
        return
      }
      MessageBox.confirm('当点击确定按钮之后，累计充值的金额会转变为"基础版套餐和一个月的使用期限"，你确定要执行此操作吗',
          '系统提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
        this.updateBalance(18);
      });
    },
    updateTo2() {
      if (this.user.balance < 59) {
        Message({message: '累计充值金额不足', type: 'error'})
        return
      }
      MessageBox.confirm('当点击确定按钮之后，累计充值的金额会转变为"进阶版套餐和一个月的使用期限"，你确定要执行此操作吗',
          '系统提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
        this.updateBalance(59);
      });
    },
    updateBalance(balance) {
      new Promise((resolve, reject) => {
        updateBalance(balance).then(() => {
          this.getUserInfo()
          this.$notify({
            message: '套餐更改成功！！！',
            duration: 5000,
            type: 'success'
          })
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    getUserInfo() {
      new Promise((resolve, reject) => {
        getUserDto().then((res) => {
          const userInfo = res.data
          this.user.email = userInfo.email
          this.user.balance = userInfo.balance
          const curTime = new Date().getTime()
          if (curTime > userInfo.expireTime) this.user.expireTime = '暂无订阅'
          else this.user.expireTime = JCMFormatTimestamp(userInfo.expireTime)
          this.user.token = userInfo.token
          this.user.version = '体验版'
          if (userInfo.version === 0) {
            this.user.version = '体验版'
          } else if (userInfo.version === 1) {
            this.user.version = '基础版'
          } else if (userInfo.version === 2) {
            this.user.version = '进阶版'
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    getQrCode() {
      new Promise((resolve, reject) => {
        const text = this.form.text;
        const price = this.form.price;
        const token = this.form.token;
        getQrCode(text, price, token).then((res) => {
          this.qrCodeShow = true
          this.qrAoid = res.data.aoid
          this.qrCode = 'https://xorpay.com/qr?data=' + res.data.info.qr
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  },
  mounted() {
    this.getUserInfo()
  }
}
</script>

<style lang="scss" scoped>
*, :after, :before {
  box-sizing: border-box;
}

.table > :not(caption) > * > * {
  padding: .8rem .8rem;
  color: var(--bs-table-color-state, var(--bs-table-color-type, var(--bs-table-color)));
  background-color: var(--bs-table-bg);
  border-bottom-width: 0.5px;
  box-shadow: inset 0 0 0 9999px var(--bs-table-bg-state, var(--bs-table-bg-type, var(--bs-table-accent-bg)))
}

.text-start {
  text-align: left !important
}

.text-center {
  text-align: center !important
}

.el-card {
  color: white;
}

.el-form {
  color: white;
}

td, th, thead, tr {
  border-color: inherit;
  border-style: solid;
  border-width: 0;
}

.order-main {
  .header-all {
    padding-top: 2rem;
    color: white;

    p {
      font-size: xx-large;
      margin-bottom: 1rem;
      text-align: center;
      max-width: 56rem;
      margin-left: auto;
      margin-right: auto;
      font-weight: 700;
    }
  }

  .plan-card {
    margin-right: auto;
    margin-left: auto;
    display: grid;
    margin-top: 2rem;
    row-gap: 2rem;
    justify-content: center;

    li {
      margin-top: 10px;
      list-style: none;
    }

    .card-sum {
      //border-bottom: 1px solid #EBEEF5;
    }

    .cards {
      margin-right: 14px;
      margin-left: 14px;
      padding-right: 10px;
      padding-left: 10px;
      border-radius: 20px 20px 20px 20px;
      --tw-bg-opacity: 1;
      background-color: rgb(31 41 55 / var(--tw-bg-opacity));
      --tw-ring-opacity: 1;
      --tw-ring-color: rgb(107 114 128 / var(--tw-ring-opacity));
      --tw-ring-offset-shadow: var(--tw-bg-opacity) 0 0 0 var(--tw-bg-opacity) var(--tw-bg-opacity);
      --tw-ring-shadow: var(--tw-bg-opacity) 0 0 0 calc(1px + var(--tw-bg-opacity)) var(--tw-ring-color);
      box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, #ffffff);
    }
  }

  .pay-card {
    max-width: 56rem;
    font-weight: 700;
    margin: 5rem auto;
    row-gap: 2rem;
    justify-content: center;

    .pay-from {
      margin-right: 14px;
      margin-left: 14px;
      border-radius: 20px;
      --tw-bg-opacity: 0.5;
      background-color: rgb(31 25 50 / var(--tw-bg-opacity));

      .pay-header {
        margin-bottom: 1rem;
        font-size: xx-large;
        text-align: center;
        font-weight: 700;
      }

      .pay-slider {
        padding: 10px;
        justify-content: space-between;
        font-size: medium;

        .el-slider {
          margin: 10px;
          width: 100%;
        }

        .el-input-number {
          width: 100%;
          margin: 10px;
        }
      }

      .pay-body {
        width: 100%;
        bottom: 0;
        display: flex;
        background-color: #323644;
        flex-wrap: wrap;
        flex: 0 0 auto;
        padding: 15px;

        .form-label {
          display: inline-block;
          text-align: right;
        }

        .form-control {
          color: #a2a1a1;
          background-color: rgb(50, 54, 60);
          border: 1px solid rgb(80, 85, 80);
          box-shadow: 0 0 5px 0 rgb(0, 136, 255);
          position: relative;
          cursor: pointer;
          margin-left: 25px;
          padding: .375rem .75rem;
          border-radius: 0.375rem;
          transition: box-shadow .15s ease-in-out, box-shadow .15s ease-in-out
        }
      }
    }
  }

  .qrCode-card {
    max-width: 56rem;
    font-weight: 700;
    margin: 5rem auto;
    row-gap: 2rem;
    text-align: center;

    .qrCode-font {
      margin-top: 15px;

      p {
        color: white;
        margin-bottom: 1rem;
        text-align: center;
        max-width: 56rem;
        margin-left: auto;
        margin-right: auto;
        font-weight: 700;
      }
    }

    .qrCode-image {
      width: 300px;
      height: 300px;
    }

    .qrCode-header {
      text-align: center;
      color: #964040;
      margin-top: 1.25rem;
      margin-bottom: 1.25rem;
      font-size: 1.75rem;
      line-height: 1.75rem;
    }

    .qrCode-line {
      margin-top: 1.5rem !important;
      margin-bottom: 1.5rem !important
    }
  }

  .compare-card {
    color: white;

    .table-responsive {
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      margin-bottom: 10rem;

      .table {
        width: 80%;
        margin: auto auto 2rem;
        vertical-align: top;
        border-color: var(--bs-table-border-color);
      }
    }

    p {
      font-size: xxx-large;
      margin: 3rem auto;
      text-align: center;
      max-width: 56rem;;
      font-weight: 700;
    }
  }

  .user-card {
    color: white;
    border-radius: 20px;
    --tw-bg-opacity: 0.5;
    background-color: rgb(31 25 50 / var(--tw-bg-opacity));
    margin: 5rem 14px;

    td, th, thead, tr {
      border-width: 0.1rem;
    }

    .table-responsive {
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;

      .table {
        width: 80%;
        margin: auto auto 2rem;
        vertical-align: top;
        border-color: var(--bs-table-border-color);
      }
    }

    .user-header {
      padding-top: 20px;
      padding-bottom: 30px;
    }

    .user-footer {
      padding-top: 20px;
      padding-bottom: 30px;
    }

    p {
      font-size: xx-large;
      max-width: 35rem;
      margin-left: auto;
      margin-right: auto;
      font-weight: 700;
    }
  }
}

@media only screen and (max-width: 640px) {
  .order-main {
    .header-all {
      .header-p {
        text-align: center;
        max-width: 42rem;
        --tw-text-opacity: 1;
        color: rgb(209 213 219/var(--tw-text-opacity));
        margin-top: 1.25rem;
        margin-left: 1.25rem;
        margin-right: 1.25rem;
        font-size: 1.75rem;
        line-height: 1.75rem;
      }
    }

    .plan-card {
      .cards {
      }
    }

    .compare-card {
      p {
        font-size: 1.75rem;
        line-height: 1.75rem;
      }
    }
  }
}

@media (min-width: 1000px) {
  .order-main {
    padding-left: 2rem;
    padding-right: 2rem;
    max-width: 80rem;
    margin-left: auto;
    margin-right: auto;

    .header-all {
    }

    .plan-card {
      max-width: none;
      grid-template-columns: repeat(3, minmax(0, 1fr));

      .cards {
      }
    }
  }
}

@media (min-width: 1000px) {
  .order-main {
    padding-left: 2rem;
    padding-right: 2rem;
    max-width: 80rem;
    margin-left: auto;
    margin-right: auto;

    .plan-card {
      max-width: none;
      grid-template-columns: repeat(3, minmax(0, 1fr));

      .cards {
      }
    }

    .pay-card {
      font-size: x-large;
      display: grid;

      .pay-from {
        min-width: 40rem;
        padding: 35px;

        .pay-slider {

          .el-slider {
            margin: 10px;
            width: 60%;
          }

          .el-input-number {
            width: 30%;
            margin: 10px;
          }
        }
      }

      .pay-body {

        .form-label {
          min-width: 100px;
        }

        .form-control {
          font-size: 1.5rem;
        }
      }
    }
  }
}
</style>
