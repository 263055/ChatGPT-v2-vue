<template>
  <div class="contain-log">
    <!--<svg ref="markmap" style="width: 800px; height: 800px"></svg>-->
    <div class="main-log">
      <div class="main-log-header">用户操作记录</div>
      <div class="main-log-card">
        <div class="card-button">
          <a class="log-btn-solid" @click="jumpToLog = 0">
            对话日志
          </a>
          <a class="log-btn-solid" @click="jumpToLog = 1">
            账单日志
          </a>
          <a class="log-btn-solid" @click="jumpToLog = 2">
            邀请日志
          </a>
        </div>
        <!--对话记录-->
        <div v-show="jumpToLog === 0" class="my-table">
          <br/>
          <el-table :data="chatMsgLog" background-color="#FAFAFA" class="">
            <el-table-column label="对话时间" prop="time" width="220"/>
            <el-table-column label="问题token" prop="promptToken"/>
            <el-table-column label="回答token" prop="completeToken"/>
            <el-table-column label="总共消耗token" prop="totalToken"/>
            <el-table-column label="剩余token" prop="consume"/>
            <el-table-column label="是否免费" prop="free"/>
            <el-table-column label="问答类型" prop="chatType"/>
            <el-table-column align="right">
              <template #default="scope">
                <el-button
                    size="small"
                    type="danger"
                    @click="deleteChatMsgDetail(scope.$index, scope.row)"
                >删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination">
            <el-pagination :page-sizes="[5]" :total="chatMsgTotal"
                           layout="total, sizes, prev, pager, next, jumper"
                           @current-change="updateChtMsgPage"/>
          </div>
        </div>
        <!--支付记录-->
        <div v-show="jumpToLog === 1" class="my-table">
          <br/>
          <el-table :data="orderLog" background-color="#FAFAFA" class="">
            <el-table-column label="订单id" prop="aoid" width="280"/>
            <el-table-column label="订单金额" prop="balance"/>
            <el-table-column label="创建时间" prop="createTime"/>
            <el-table-column label="支付状态" prop="content"/>
            <el-table-column label="支付时间" prop="payTime"/>
          </el-table>
          <div class="pagination">
            <el-pagination :page-sizes="[5]" :total="orderLogTotal"
                           layout="total, sizes, prev, pager, next, jumper"
                           @current-change="updateOrderLogPage"/>
          </div>
        </div>
        <!--支付记录-->
        <div v-show="jumpToLog === 2" class="my-table">
          <br/>
          <el-table :data="inviteLog" background-color="#FAFAFA" class="">
            <el-table-column label="邀请者" prop="inviteEmail" width="280"/>
            <el-table-column label="受邀请者" prop="userEmail"/>
            <el-table-column label="奖励Token" prop="token"/>
            <el-table-column label="操作时间" prop="time"/>
            <el-table-column label="操作类型" prop="type"/>
          </el-table>
          <div class="pagination">
            <el-pagination :page-sizes="[5]" :total="inviteLogTotal"
                           layout="total, sizes, prev, pager, next, jumper"
                           @current-change="updateInviteLogPage"/>
          </div>
        </div>
      </div>
    </div>

    <div class="main-use">
      <div class="main-use-header">常见问题</div>
      <div class="main-use-body">
        <el-collapse v-model="activeNames">
          <el-collapse-item name="1" title="使用这个网站是否需要掏钱">
            <p>1.对于本网站的3.5模型以及claude2模型，是不需要额外付费的，但这毕竟是免费的服务，会出现线路崩溃等情况（比如key过期，key额度用完）</p>
            <p>2.可以付费使用更好的线路，保证响应速度以及稳定性，同时gpt的价格同官网（openai）相比，更为低价</p>
            <p>3.网站的4.0也可以直接使用，每个新用户都会有一定的额度，用来体验gpt3.5的优质线路或gpt4</p>
          </el-collapse-item>
          <el-collapse-item name="2" title="gpt的使用价格是怎么计算的">
            <p>Token消耗额度 = 模型倍率 x （用户输入 token 数 + 模型输出 token 数 x 补全倍率）</p>
            <p>其中(1) 模型倍率: GPT-3.5 为 0.75 GPT-4 为 15</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(2) 补全倍率: GPT-3.5 为 1.33 GPT-4 为 2</p>
            <p>以上的 Token消耗额度同比官方</p>
            <p>最后, 最终消耗额度 = Token消耗额度 × 用户对应倍率</p>
            <p>其中 用户对应倍率取决于用户当前的套餐等级</p>
            <p>举例: 普通用户 提问 "1+1" , gpt 回答 "2"</p>
            <p>此时问题Token是 "15", 回答Token 是 "1"</p>
            <p>根据上面的公式, 如果此时为普通用户, 则:</p>
            <p>3.5消耗: [0.75 * (15 + 1 * 1.33)] * 0.6 = 7 (小数向下取整)</p>
            <p>4.0消耗: [15 * (15 + 1 * 2)] * 1.1 = 280 (小数向下取整)</p>
          </el-collapse-item>
          <el-collapse-item name="3" title="gpt的充值价格是怎么计算的">
            <p>以官网的3.5的输出token, 0.002美元/1000Token为例进行计算</p>
            <p>0.002美元/1000Token ≈ 0.014RMB/1000Token ≈ 1RMB/71428Token (他们之间大概相差70倍, 可以自行计算)</p>
            <p>而在我们网站 1 rmb = 7W Token</p>
            <p>同时再加上本网站的低费倍率, 就可以让你在本网站享受到低价的gpt服务!!!</p>
          </el-collapse-item>
          <el-collapse-item name="4" title="为什么余额可以是负数？余额变成负数后会怎么样？">
            <p>由于语言模型的回答内容无法被预测，即最终请求产生的费用的在请求完成前无法预估，因此在某些情况下余额会变成为负数。</p>
            <p>当您的余额为负数时，您可能无法正常请求本站的资源，此时您可以通过充值来解决。</p>
          </el-collapse-item>
          <el-collapse-item name="5" title="如何才能被判定为套餐,升级自己的套餐?">
            <p>网站采用累计充值的方法计数,你充值的金额会在个人中心中显示出来</p>
            <p>当你想要升级套餐的时候,会将你的 "累计充值" 转换为对应的套餐以及一个月的订阅时间</p>
          </el-collapse-item>
          <el-collapse-item name="6" title="邀请用户有什么好处?怎么判别是否邀请新用户?">
            <p>1.邀请新用户当然是拿Token免费白嫖啦(开小号试试?似乎可以卡站主的bug)</p>
            <p>2.让新用户在登录页面填写你的邀请码,双方即可获得邀请奖励</p>
            <p>&nbsp;&nbsp;&nbsp;(1)被邀请者获得 30000 的Token,而邀请者获得 15000 Token</p>
            <p>&nbsp;&nbsp;&nbsp;(2)可以在 "日志" 中心中查看操作记录哦</p>
            <p>&nbsp;&nbsp;&nbsp;(3)每个人只可以 "被邀请" 一次,但可以 "邀请" 多个人</p>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
  </div>
</template>

<script>
import {deleteChatMsgLog, getChatMsgDetail, getInviteLog, getOrderDetail} from "@/api/log";
import {JCMFormatTimestamp} from "@/util/util";
// import {Markmap} from 'markmap-view';
// import {Transformer} from 'markmap-lib';

export default {
  name: "App",
  computed() {

  },
  props: {
    default() {
      return {};
    },
  },
  data() {
    return {
      orderLog: [],
      orderLogTotal: 0,
      inviteLog: [],
      inviteLogTotal: 0,
      chatMsgLog: [],
      chatMsgTotal: 0,
      transformer: null,
      markmap: null,
      jumpToLog: 0,
      activeNames: ['0'],
    };
  },
  methods: {
    // createMarkMap(content) {
    //   const {transformer} = this
    //   const {root, features} = transformer.transform(content);
    //   this.markmap.setData(root, features);
    // },
    //获得订单的信息
    getOrderDetail(page) {
      if (page === undefined || page === '' || page === 0) page = 0
      new Promise((resolve, reject) => {
        getOrderDetail(page, 5).then((res) => {
          const resData = res.data.records
          this.orderLog = resData.map(item => ({
            ...item,
            createTime: JCMFormatTimestamp(item.createTime),
            payTime: item.payTime === null ? '未支付' : JCMFormatTimestamp(item.payTime)
          }));
          this.orderLogTotal = res.data.total
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    //修改订单日志的页数
    updateOrderLogPage(event) {
      this.getOrderDetail(event)
    },
    //获得对话记录
    getChtMsgDetail(page) {
      if (page === undefined || page === '' || page === 0) page = 0
      new Promise((resolve, reject) => {
        getChatMsgDetail(page, 5).then((res) => {
          const resData = res.data.records
          this.chatMsgLog = resData.map(item => ({
            ...item,
            time: JCMFormatTimestamp(item.time),
            free: item.free === true ? '是' : '否',
          }));
          this.chatMsgTotal = res.data.total
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    //修改对话记录日志的页数
    updateChtMsgPage(event) {
      this.getChtMsgDetail(event)
    },
    //删除某一条对话日志
    deleteChatMsgDetail(event) {
      deleteChatMsgLog(this.chatMsgLog[event].id)
      this.getChtMsgDetail();
    },
    //获取邀请日志
    getInviteLog(page) {
      if (page === undefined || page === '' || page === 0) page = 0
      new Promise((resolve, reject) => {
        getInviteLog(page, 5).then((res) => {
          const resData = res.data.records
          this.inviteLog = resData.map(item => ({
            ...item,
            time: JCMFormatTimestamp(item.time),
            type: item.type === 1 ? '被邀请者' : '邀请者'
          }));
          this.inviteLogTotal = res.data.total
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    //修改邀请日志页数
    updateInviteLogPage(event) {
      this.getInviteLog(event)
    },
  },
  mounted() {
//     this.transformer = new Transformer();
//     this.markmap = Markmap.create(this.$refs.markmap, null, {
//       autoFit: false,
//     });
//     const markdown = `
// # markmap
// ## Links
// - <https://markmap.js.org/>
// - [GitHub](https://github.com/gera2ld/markmap)
// ## Related
// - [coc-markmap](https://github.com/gera2ld/coc-markmap)
// - [gatsby-remark-markmap](https://github.com/gera2ld/gatsby-remark-markmap)
// `

    this.getOrderDetail();
    this.getChtMsgDetail();
    this.getInviteLog();
    // this.createMarkMap(markdown)
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-collapse-item__header {
  font-size: xx-large;
  font-weight: 500;
}

.contain-log {
  width: 100vw;
  height: 100vh;
  border-radius: 20px;
  box-sizing: border-box;

  .main-use {
    --tw-bg-opacity: 1;
    background-color: rgb(30 24 50 / var(--tw-bg-opacity));
    margin-left: auto;
    margin-right: auto;
    max-width: 80rem;
    padding-top: 1rem;

    .main-use-header {
      color: white;
      font-size: 30px;
      margin-bottom: 20px;
      margin-top: 20px;
      text-align: center
    }

    .main-use-body {
      background-color: white;
      padding: 30px;

      P {
        font-size: large;
        margin-bottom: 3px;
        white-space: pre;
      }
    }
  }

  .main-log {
    --tw-bg-opacity: 1;
    background-color: rgb(17 24 39 / var(--tw-bg-opacity));
    margin-left: auto;
    margin-right: auto;
    max-width: 80rem;
    padding-top: 1rem;

    .main-log-header {
      color: white;
      font-size: 30px;
      margin-bottom: 20px;
      margin-top: 20px;
      text-align: center
    }

    .main-log-card {
      background-color: white;

      .card-button {
        margin-left: 20px;
        padding-top: 5px;
        display: flex;

        .log-btn-solid {
          --clr-white: #fff;
          --clr-main: #5975aa;
          color: var(--clr-white);
          background-color: var(--clr-main);
          border-color: var(--clr-main);
          position: relative;
          display: inline-flex;
          letter-spacing: 1px;
          border-radius: 0.25rem 0.25rem 0.25rem 1rem;
          padding: 0.75rem 2.25rem;
          font-size: 1.1rem;
          font-weight: 500;
          cursor: pointer;
        }
      }

      .my-table {
        color: white;
        border-radius: 20px;
      }
    }
  }
}

</style>
