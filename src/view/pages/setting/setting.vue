<template>
  <div class="contain-log">
    <el-card>
      <div class="order-chatMsg-detail" data-intro="导航菜单" data-step="1">使用记录和充值记录</div>
      <!--<svg ref="markmap" style="width: 800px; height: 800px"></svg>-->
      <div class="my-table">
        <!--对话记录-->
        <div style="font-size: 30px;">使用记录：</div>
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
          <el-pagination
              :page-sizes="[5]"
              :total="chatMsgTotal"
              layout="total, sizes, prev, pager, next, jumper"
              @current-change="updateChtMsgPage"
          />
        </div>
        <!--支付记录-->
        <div style="font-size: 30px; margin-top: 20px">支付记录：</div>
        <el-table :data="orderLog" background-color="#FAFAFA" class="">
          <el-table-column label="订单id" prop="aoid" width="280"/>
          <el-table-column label="订单金额" prop="balance"/>
          <el-table-column label="创建时间" prop="createTime"/>
          <el-table-column label="支付状态" prop="content"/>
          <el-table-column label="支付时间" prop="payTime"/>
        </el-table>
        <div class="pagination">
          <el-pagination
              :page-sizes="[5]"
              :total="orderLogTotal"
              layout="total, sizes, prev, pager, next, jumper"
              @current-change="updateOrderLogPage"
          />
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import {deleteChatMsgLog, getChatMsgDetail, getOrderDetail} from "@/api/log";
import {JCMFormatTimestamp} from "@/util/util";
import introJs from 'intro.js'
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
      chatMsgLog: [],
      chatMsgTotal: 0,
      transformer: null,
      markmap: null,
    };
  },
  methods: {
    guide() {
      introJs().setOptions({
        nextLabel: '下一个',  // 下一个按钮文字
        prevLabel: '上一个',  // 上一个按钮文字
        skipLabel: '跳过',    // 跳过按钮文字
        doneLabel: '立即体验',// 完成按钮文字
        hidePrev: true,       // 在第一步中是否隐藏上一个按钮
        hideNext: true,       // 在最后一步中是否隐藏下一个按钮
        exitOnOverlayClick: false,  // 点击叠加层时是否退出介绍
        showStepNumbers: false,     // 是否显示红色圆圈的步骤编号
        disableInteraction: true,   // 是否禁用与突出显示的框内的元素的交互，就是禁止点击
        showBullets: false          // 是否显示面板指示点
      }).start()
    },
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
  },
  mounted() {
    this.guide()
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
    // this.createMarkMap(markdown)
  },
};
</script>

<style>
.order-chatMsg-detail {
  font-size: 30px;
  margin-bottom: 20px;
  margin-top: 20px;
  text-align: center
}

.contain-log {
  height: 100%;
  max-height: 95vh;
  overflow: auto;
  overflow-x: scroll;
  overflow-y: scroll;
}

.my-table {
  width: 80%;
}
</style>
