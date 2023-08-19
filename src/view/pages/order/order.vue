<template>
  <div>
    <div class="order-main">
      <header>
        <div class="header-all">
          <p>Pricing</p>
          <p class="header-p">我们致力于提供高性价比的优质服务</p>
          <p class="header-p">同时后期还会开放免费的接口平台,让更多的人体验gpt的魅力！！！</p>
          <p class="header-p" style="color: #8a4141">注：您无需为套餐本身付费，只要充值数额满足条件即可</p>
        </div>
      </header>

      <main>
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
                  享受本网站提供的第三方接口服务
                </li>
                <li>
                  <svg-icon icon-class="check2" style="margin-right: 5px;color: #409030"/>
                  免费使用此网站的3.5模型,语音等模型
                </li>
              </ul>
              <el-button size="medium" style="width:100%;margin-top: 20px; margin-bottom: 10px"
                         type="info">
                <span>立即订阅</span>
              </el-button>
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
                  可付费使用3.5优化线路
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
              <el-button size="medium" style="width:100%;margin-top: 20px; margin-bottom: 10px"
                         type="info">
                <span>立即订阅</span>
              </el-button>
            </div>
          </el-card>
          <el-card class="cards" shadow="hover">
            <div slot="header" class="card-header">
              <h4 style="font-size: xx-large">VIP/进阶版</h4>
            </div>
            <div class="card-sum">
              <h1>$99<small class="">/month</small></h1>
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
                  更优惠的扣费力度
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
              <el-button size="medium" style="width:100%;margin-top: 20px; margin-bottom: 10px"
                         type="info">
                <span>立即订阅</span>
              </el-button>
            </div>
          </el-card>
        </div>

        <!--套餐比较-->
        <div class="compare-card">
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
                <th class="text-start" scope="row">gpt4等额外语言模型</th>
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
                <th class="text-start" scope="row">3.5初级线路</th>
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
                <th class="text-start" scope="row">3.5优质线路</th>
                <td>
                  <svg-icon icon-class="error"/>
                </td>
                <td>
                  <a>0.6倍率</a>
                </td>
                <td>
                  <a>0.4倍率</a>
                </td>
              </tr>
              <tr>
                <th class="text-start" scope="row">4.0折扣力度</th>
                <td>
                  <svg-icon icon-class="error"/>
                </td>
                <td>
                  <a>0.7倍率</a>
                </td>
                <td>
                  <a>0.5倍率</a>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import SvgIcon from "../../../components/SvgIcon.vue";

export default {
  name: "Order",
  components: {
    SvgIcon
  },
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

.text-end {
  text-align: right !important
}

.text-center {
  text-align: center !important
}

.el-card {
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

  .compare-card {
    color: white;

    .table-responsive {
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;

      .table {
        width: 80%;
        margin: auto auto 10rem;
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
</style>
