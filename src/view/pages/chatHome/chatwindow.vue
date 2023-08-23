<template>
  <div class="chat-window">
    <!--聊天室顶部按钮-->
    <div class="top">
      <el-row style="height: 30px;">
        <!--主页面的头像-->
        <el-col :span="personInfoSpan[0]">
          <div class="head-pic">
            <HeadPortrait :imgUrl="frinedInfo.headImg"></HeadPortrait>
          </div>
        </el-col>
        <!--主页面的模型名称和介绍-->
        <el-col :span="personInfoSpan[1]">
          <div class="info-detail">
            <div class="name">{{ frinedInfo.name }}</div>
            <div class="detail">{{ frinedInfo.detail }}</div>
          </div>
        </el-col>
        <!--聊天室上方,右侧的快捷按钮-->
        <el-col :span="personInfoSpan[2]">
          <div class="other-fun">
            <!--滚动上方-->
            <el-tooltip :content="$t('icon.up')" effect="dark" placement="top">
              <label @click="scrollUp">
                <svg class="iconfont" fill="currentColor" height="30" viewBox="0 0 16 16"
                     width="30" xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"/>
                </svg>
              </label>
            </el-tooltip>
            <!--滚动下方-->
            <el-tooltip :content="$t('icon.down')" effect="dark" placement="top">
              <label @click="scrollBottom">
                <svg class="iconfont" fill="currentColor" height="30"
                     viewBox="0 0 16 16" width="30" xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"/>
                </svg>
              </label>
            </el-tooltip>
            <!--导出会话-->
            <el-tooltip :content="$t('icon.export')" effect="dark" placement="top">
              <label @click="exportObjArrToJson">
                <span class="iconfont icon-daochu"></span>
              </label>
            </el-tooltip>
            <!--导入图片-->
            <!--<el-tooltip :content="$t('icon.image')" effect="dark" placement="top">-->
            <!--  <label for="imgFile">-->
            <!--    <span class="iconfont icon-tupian"></span>-->
            <!--  </label>-->
            <!--</el-tooltip>-->
            <!--<input id="imgFile" accept="image/*" name="" type="file" @change="sendImg"/>-->
            <!--切换 中英文-->
            <el-tooltip :content="$t('icon.language')" effect="dark" placement="top">
              <label @click="changeLanguage">
                <span class="iconfont icon-iconyuanbanben_fanyi"></span>
              </label>
            </el-tooltip>
          </div>
        </el-col>
      </el-row>
    </div>
    <!--发送消息时展示的加载动画-->
    <div v-show="!acqStatus">
      <div class="line"></div>
    </div>
    <!--聊天室页面-->
    <div class="botoom" style="background-color:rgb(50, 54, 68);">
      <!--聊天室主页面,正常的用户对话-->
      <div id="chat-content" ref="chatContent" class="chat-content" @scroll="onScroll">
        <div class="chat-wrapper" v-for="item in chatList" :key="item.id">
          <!--gpt回答-->
          <div v-if="item.messageType === 'ANSWER'" class="chat-friend">
            <!--如果是文字,提供复制按钮-->
            <div class="chat-text">
              <div v-if="item.chatType === 0" class="chat-text">
                <el-row :gutter="20">
                  <!--复制文本-->
                  <el-col :span="10">
                    <svg class="icon" height="22" p-id="6241" viewBox="0 0 24 24"
                         width="22" x="1679666016648" xmlns="http://www.w3.org/2000/svg"
                         @click="$copy(item.content, '已复制')">
                      <path d="M16.02 20.96H3.78c-.41 0-.75-.34-.75-.75V7.74c0-.41.34-.75.75-.75h7.87c.21 0
                    .39.08.53.22l4.37 4.37c.14.14.22.32.22.53v8.11c0 .4-.34.74-.75.74ZM4.53 19.47h10.75v-6.61h-3.62c-.41
                     0-.75-.34-.75-.75V8.48H4.53v10.99Z"/>
                      <path d="m20.74 7.63-4.37-4.37c-.14-.14-.36-.2-.53-.22H8.01c-.41 0-.75.34-.75.75V5.5h1.49v-.97h6.34v3.62c0
                    .41.34.75.75.75h3.62v8.19h-1.2v1.49h1.95c.41 0 .75-.34.75-.75V8.16c0-.21-.08-.4-.22-.53Z"/>
                    </svg>
                  </el-col>
                  <!--朗读文本-->
                  <el-col v-if="!settingInfo.talk.isSpeech" :span="10">
                    <svg class="icon" height="22" p-id="6241" viewBox="0 0 16 16"
                         width="22" x="1679666016648" xmlns="http://www.w3.org/2000/svg"
                         @click=speechRead(item.content)>
                      <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476
                    7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"/>
                      <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483
                    5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"/>
                      <path d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489
                    3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825
                     10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z"/>
                    </svg>
                  </el-col>
                  <!--停止朗读文本-->
                  <el-col v-else :span="10">
                    <svg class="icon" height="22" viewBox="0 0 16 16"
                         width="22" xmlns="http://www.w3.org/2000/svg" @click="speechStop">
                      <path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1
                    .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zm7.137 2.096a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0
                     0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5
                     7.293l1.646-1.647a.5.5 0 0 1 .708 0z"/>
                    </svg>
                  </el-col>
                </el-row>
                <markdown-it-vue :content="item.content.trim()"/>
              </div>
            </div>
            <!--如果是图片,就直接展示-->
            <div class="chat-img" v-if="item.chatType === 1">
              <!-- v-else 表示gpt发送的图片-->
              <el-image :preview-src-list="srcImgList" :src="item.msg" style="border-radius: 10px"/>
            </div>
            <!--展示名字和时间-->
            <div class="info-time">
              <span>{{ frinedInfo.name }}</span>
              <span>{{ item.time }}</span>
            </div>
          </div>
          <!--用户提问-->
          <div class="chat-me" v-else>
            <!--文字部分-->
            <div v-if="item.chatType === 0" class="chat-text">
              <el-row :gutter="20">
                <!--复制文本-->
                <el-col :span="10">
                  <svg class="icon" height="22" p-id="6241" viewBox="0 0 24 24"
                       width="22" x="1679666016648" xmlns="http://www.w3.org/2000/svg"
                       @click="$copy(item.content, '已复制')">
                    <path d="M16.02 20.96H3.78c-.41 0-.75-.34-.75-.75V7.74c0-.41.34-.75.75-.75h7.87c.21 0
                    .39.08.53.22l4.37 4.37c.14.14.22.32.22.53v8.11c0 .4-.34.74-.75.74ZM4.53 19.47h10.75v-6.61h-3.62c-.41
                     0-.75-.34-.75-.75V8.48H4.53v10.99Z"/>
                    <path d="m20.74 7.63-4.37-4.37c-.14-.14-.36-.2-.53-.22H8.01c-.41 0-.75.34-.75.75V5.5h1.49v-.97h6.34v3.62c0
                    .41.34.75.75.75h3.62v8.19h-1.2v1.49h1.95c.41 0 .75-.34.75-.75V8.16c0-.21-.08-.4-.22-.53Z"/>
                  </svg>
                </el-col>
                <!--朗读文本-->
                <el-col v-if="!settingInfo.talk.isSpeech" :span="10">
                  <svg class="icon" height="22" p-id="6241" viewBox="0 0 16 16"
                       width="22" x="1679666016648" xmlns="http://www.w3.org/2000/svg" @click=speechRead(item.content)>
                    <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476
                    7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"/>
                    <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483
                    5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"/>
                    <path d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489
                    3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825
                     10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z"/>
                  </svg>
                </el-col>
                <!--停止朗读文本-->
                <el-col v-else :span="10">
                  <svg class="icon" height="22" viewBox="0 0 16 16"
                       width="22" xmlns="http://www.w3.org/2000/svg" @click="speechStop">
                    <path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1
                    .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zm7.137 2.096a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0
                     0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5
                     7.293l1.646-1.647a.5.5 0 0 1 .708 0z"/>
                  </svg>
                </el-col>
              </el-row>
              <markdown-it-vue :content="item.content.trim()" style="font-size:16px"/>
            </div>
            <!--展示名字和时间-->
            <div class="info-time">
              <span>{{ userName }}</span>
              <span>{{ item.time }}</span>
            </div>
          </div>
        </div>
      </div>
      <!--下面的按钮部分-->
      <div class="chatInputs">
        <!--表情-->
        <!--<div class="emoji boxinput" @click="clickEmoji" v-show="buttonStatus">-->
        <!--  <img src="@/assets/img/emoji/smiling-face.png" alt=""/>-->
        <!--</div>-->
        <!--录音-->
        <div class="luyin boxinput" @click="stopRecording" v-if="recording" v-show="buttonStatus">
          <i class="el-icon-microphone" style="margin-top: 17%;"></i>
        </div>
        <div class="luyin boxinput" @click="startRecording" v-if="!recording" v-show="buttonStatus">
          <i class="el-icon-turn-off-microphone" style="margin-top: 17%;"></i>
        </div>
        <!--emo表情列表-->
        <div class="emoji-content" v-show="buttonStatus">
          <Emoji v-show="showEmoji" @sendEmoji="sendEmoji" @closeEmoji="clickEmoji"></Emoji>
        </div>
        <!--输入框-->
        <textarea id="textareaMsg" :placeholder="$t('placeholder.question')" class="inputs" v-autoheight
                  style="z-index: 9999999999;min-height: 50px;max-height:400px;max-width: 100%;min-width: 45%;"
                  maxlength="2048" rows="3" autocorrect="off" aria-autocomplete="both" spellcheck="false"
                  v-model="inputMsg" autocapitalize="off" autocomplete="off" data-intro="第三步:输入你的聊天内容"
                  data-step="3" data-title="使用步骤" @keyup.enter="handleKeyDown"></textarea>
        <!--发送-->
        <div>
          <div class="send boxinput" data-intro="第四步:点击即可发送消息" data-step="4" data-title="使用步骤" @click="sendText">
            <img src="@/assets/img/emoji/rocket.png" alt=""/>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import {animation, animationToUp, getNowTime, JCMFormatDate, compareLang} from "@/util/util";
import {getToken} from '@/util/auth'
import {
  createImageVariations,
  createTranscription,
  createTranslation,
} from "@/api/getData";
import HeadPortrait from "@/components/HeadPortrait";
import Emoji from "@/components/Emoji";
import FileCard from "@/components/FileCard.vue";
import MarkdownItVue from 'markdown-it-vue'
import 'markdown-it-vue/dist/markdown-it-vue.css'
import {AI_HEAD_IMG_URL, USER_HEAD_IMG_URL, USER_NAME} from '@/store/mutation-types'
import {saveAs} from 'file-saver';
import {getMessage, getImages, createImageEdit, transcriptions} from "@/api/chatMsg";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Speech from "speak-tts";

export default {
  //用于自适应文本框的高度
  directives: {
    autoheight: {
      inserted: function (el) {
        const Msg = document.getElementById("textareaMsg").value;
        if (Msg === "") {
          el.style.height = "26px"
        } else {
          el.style.height = el.scrollHeight + 'px'
        }
      },
      update: function (el) {
        const Msg = document.getElementById("textareaMsg").value;
        if (Msg === "") {
          el.style.height = "26px"
        } else {
          el.style.height = el.scrollHeight + 'px'
        }
      }
    }
  },
  components: {
    HeadPortrait,
    Emoji,
    FileCard,
    MarkdownItVue
  },
  props: {
    storeStatu: Number,
    updateImage: File,
    settingInfo: Object,
    frinedInfo: Object,


    default() {
      return {};
    },
  },
  watch: {},
  data() {
    return {
      options: {
        sessionId: '',
        parentMessageId: '',
      },
      setting: {
        model: "",
        suffix: "",
        stop: "",
        frequencyPenalty: "",
        presencePenalty: "",
        maxTokens: "",
        temperature: "",
        stream: "",
        echo: ""
      },
      userName: USER_NAME,
      fileArrays: [],
      rows: 1,
      //是否显示表情和录音按钮
      buttonStatus: true,
      isAutoScroll: false, // 是否滚动到了最底部
      loadPage: false, // 是否滚动到了最底部
      lastChatMsg: {
        id: "",
        sessionId: "",
        messageType: "",
        content: "",
        parentId: "",
        childrenId: "",
        time: "",
      },
      curSessionId: '',
      //是否在接收消息中，如果是则true待发送状态，如果是false则是等待消息转圈状态
      acqStatus: true,
      chatList: [],
      inputMsg: "",
      showEmoji: false,
      friendInfo: {},
      srcImgList: [],
      recording: false,
      audioChunks: [],
      screenshot: "",
      contentBackImageUrl: "https://bpic.51yuansu.com/backgd/cover/00/31/39/5bc8088deeedd.jpg?x-oss-process=image/resize,w_780",
      // 是否隐藏对话框上方介绍（空间局促时隐藏）
      personInfoSpan: [2, 2, 20],

    };
  },
  mounted() {
    window.addEventListener('resize', this.setChatContentWidth);
    this.setChatContentWidth();
    this.speechInit();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.setChatContentWidth);
  },
  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  destoryed() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    // 改变聊天室的宽度
    setChatContentWidth() {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
      if (isMobile) {
        const botoom = this.$el.querySelector('.botoom');
        const chatContent = botoom.querySelector('.chat-content');
        const width = botoom.offsetWidth;
        chatContent.style.width = `${width}px`;
      }
    },
    // 聊天室按回车键发消息发送函数
    handleKeyDown(event) {
      if (event.keyCode === 13 && (!event.shiftKey)) {  // 按下回车键，没按shift
        this.sendText()
      }
    },
    // 导出当前会话到json文件
    exportObjArrToJson() {
      const res = this.chatList.map(item => {
        return {
          content: item.content,
          type: item.messageType,
          time: item.time
        };
      });
      let jsonString = JSON.stringify(res);
      console.log(jsonString);
      let blob = new Blob([jsonString], {type: "application/json;charset=utf-8"});
      saveAs(blob, "data.json");
    },
    // 切换语言
    changeLanguage() {
      const lang = this.$i18n.locale === "zh" ? "en" : "zh";
      localStorage.setItem("lang", lang);
      this.$i18n.locale = lang;
    },
    // 监听窗口的变化
    handleResize() {
      if (window.innerWidth <= 700) {
        this.$nextTick(() => {
          document.querySelectorAll('.chat-content')[0].style.height = '93%';
          this.buttonStatus = false
          const textareaMsg = document.getElementById("textareaMsg");
          textareaMsg.style.marginLeft = "0px";
          this.personInfoSpan = [0, 0, 24];
          const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
          if (isMobile) {
            document.querySelectorAll('.chatInputs')[0].style.margin = '0%';
          } else {
            document.querySelectorAll('.chatInputs')[0].style.margin = '3%';
          }
        });
      } else {
        this.$nextTick(() => {
          document.querySelectorAll('.chat-content')[0].style.height = '88%';
          this.buttonStatus = true
          this.personInfoSpan = [1, 6, 17]
        });
      }
    },
    //获得聊天室所有消
    getMessage(id) {
      this.isAutoScroll = false;
      this.acqStatus = true;
      NProgress.start()
      this.curSessionId = id;
      new Promise((resolve, reject) => {
        getMessage(id).then((res) => {
          this.chatList = res.list.map(item => ({
            ...item,
            time: JCMFormatDate(item.time),
            chatType: 0,
          }));
          NProgress.done()
          resolve()
        }).catch(error => {
          NProgress.done()
          reject(error)
        })
      })
    },
    //  把消息展示到聊天页面
    sendMsg(msgList) {
      this.chatList.push(msgList);
      this.scrollBottom();
    },
    // 发送文字信息
    sendText() {
      if (this.curSessionId === undefined || this.curSessionId === '') {
        this.$message.error('请开启新的聊天室后再与ai聊天')
        return;
      }
      const curMessage = this.inputMsg;
      if (curMessage === '\n') {
        this.$message.error('请输入完整的对话再发送')
        return;
      }
      this.rows = 1;
      this.$nextTick(() => {
        this.acqStatus = false
      })
      const dateNow = JCMFormatDate(getNowTime());
      if (curMessage) {
        let chatMsg = {
          time: dateNow,
          content: this.inputMsg.trim(),
          chatType: 0, //信息类型，0文字，1图片
          messageType: "QUESTION",
          id: "",
          sessionId: "",
          parentId: "",
          childrenId: "",
        };
        this.lastChatMsg = this.chatList[this.chatList.length - 1] === undefined ? [] : this.chatList[this.chatList.length - 1];
        if (this.settingInfo.openChangePicture) // 首先是编辑图片，根据提示词去修改图片
        {
          // 如果未上传图片，则报错
          if (this.updateImage == null) {
            this.$nextTick(() => {
              this.acqStatus = true
            });
            this.$message.warning(this.$t('message.edit_picture'))
            return
          } else {
            this.sendMsg(chatMsg);
            // 通过验证后，上传文件
            const formData = new FormData();
            formData.append("image", this.updateImage);
            formData.append("prompt", this.inputMsg);
            formData.append("n", this.settingInfo.n);
            formData.append("size", this.settingInfo.size);
            this.inputMsg = "";
            createImageEdit(formData).then(res => {
              const data = res.data.data
              for (const imgInfo of data) {
                let imgResMsg = {
                  time: JCMFormatDate(getNowTime()),
                  msg: imgInfo.url,
                  chatType: 1, //信息类型，0文字，1图片
                  headImg: AI_HEAD_IMG_URL,
                  name: this.frinedInfo.name,
                  messageType: "ANSWER",
                };
                this.sendMsg(imgResMsg);
                this.srcImgList.push(imgInfo.url);
              }
              this.updateImage = null
              this.acqStatus = true
            })
            return
          }
        } //
        else if (this.settingInfo.openProductionPicture) // 产图模式
        {
          this.sendMsg(chatMsg);
          let params = {}
          params.prompt = this.inputMsg
          params.n = this.settingInfo.n
          params.size = this.settingInfo.size
          getImages(params).then(res => {
            const data = res.data.data
            console.log(data)
            for (const imgInfo of data) {
              let imgResMsg = {
                headImg: AI_HEAD_IMG_URL,
                name: this.frinedInfo.name,
                time: JCMFormatDate(getNowTime()),
                msg: imgInfo.url,
                chatType: 1, //信息类型，0文字，1图片
                messageType: "ANSWER",
              };
              this.sendMsg(imgResMsg);
              this.srcImgList.push(imgInfo.url);
            }
            this.acqStatus = true
          })
        } //
        else // 普通的gpt对话
        {
          const routeType = this.settingInfo.chat.routeType
          this.sendMsg(chatMsg);
          this.options.sessionId = this.curSessionId
          this.options.parentMessageId = this.lastChatMsg.id
          this.options.routeType = 0
          console.log(routeType)
          if (routeType !== '普通线路/free') this.options.routeType = 1
          console.log(this.options.routeType)
          this.setting.model = this.frinedInfo.id
          this.setting.stop = this.settingInfo.chat.stop
          this.setting.frequencyPenalty = this.settingInfo.chat.FrequencyPenalty
          this.setting.presencePenalty = this.settingInfo.chat.PresencePenalty
          this.setting.maxTokens = this.settingInfo.chat.MaxTokens
          this.setting.temperature = this.settingInfo.chat.Temperature
          this.setting.stream = this.settingInfo.chat.stream
          this.setting.n = this.settingInfo.chat.n
          //新增一个空的消息
          let chatBeforResMsg = {
            time: JCMFormatDate(getNowTime()),
            messageType: "ANSWER",
            chatType: 0, //信息类型，0文字，1图片
            content: "",
            id: "",
            sessionId: "",
            parentId: "",
            childrenId: "",
          };
          this.sendMsg(chatBeforResMsg);
          this.lastChatMsg = this.chatList[this.chatList.length - 1] === undefined ? [] : this.chatList[this.chatList.length - 1];
          this.fetchChatMsg(this.inputMsg, this.options, this.settingInfo.prompt, this.setting)
        }
        this.inputMsg = ""
        this.$nextTick(() => {
          this.acqStatus = false
        });
      } else {
        this.$nextTick(() => {
          this.acqStatus = true
        });
        this.$message.warning(this.$t('message.msg_empty'))
      }
    },
    // 真正的发送gpt消息
    async fetchChatMsg(question, options, prompt, setting) {
      const currentResLocation = this.chatList.length - 1
      let _this = this
      await fetch('/api/chatMsg/send', {
            method: 'POST',
            body: JSON.stringify({
              question: question,
              options: options,
              prompt: prompt,
              setting: setting,
            }),
            headers: {
              'Content-Type': 'application/json',
              'Authorization': getToken(),
              Accept: "application/utf-8",
            },
          }
      ).then(response => {
        const reader = response.body.getReader();
        this.readStream(reader, _this, currentResLocation, "chat");
        this.lastChatMsg = this.chatList[currentResLocation] === undefined ? [] : this.chatList[currentResLocation];
      });
    },
    // 读取gpt的回复流
    readStream(reader, _this, currentResLocation, type) {
      return reader.read().then(({done, value}) => {
        if (done) {
          this.$nextTick(() => {
            this.acqStatus = true
          });
          if (this.settingInfo.talk.autoRead) {
            this.speechRead(_this.chatList[currentResLocation].content)
          }
          return;
        }
        if (!_this.chatList[currentResLocation].reminder) {
          _this.chatList[currentResLocation].reminder = "";
        }
        let decoded = new TextDecoder("utf-8").decode(value);
        decoded = _this.chatList[currentResLocation].reminder + decoded;
        let decodedArray = decoded.split("data: ");
        let longstr = "";
        decodedArray.forEach(decoded => {
          try {
            decoded = decoded.trim();
            if (longstr === "") {
              JSON.parse(decoded);
            } else {
              decoded = longstr + decoded;
              longstr = "";
              JSON.parse(decoded);
            }
          } catch (e) {
            longstr = decoded;
            decoded = "";
          }
          if (decoded !== "") {
            if (decoded.trim() === "[DONE]") {
              this.$nextTick(() => {
                this.acqStatus = true
              });
            } else {
              if (type === "chat") {
                //{"role":"user","id":"3db99dc1-296b-4379-8b83-b37abf3c12dd","parentMessageId":"abc14b91-b5bc-4253-b826-785e00fad2ea","text":"2","sessionId":"1b604023-dc9d-4def-bdf2-9d0259bd6e78"}
                const parseMsg = JSON.parse(decoded);
                const response = parseMsg.text ? parseMsg.text : "";
                _this.lastChatMsg.id = parseMsg.id ? parseMsg.id : "";
                _this.chatList[currentResLocation].content = response
                _this.scrollBottom();
                // const response = parseMsg.choices[0].delta.content ? JSON.parse(decoded).choices[0].delta.content : "";
              } else {
                // const response = JSON.parse(decoded).choices[0].text;
                // _this.chatList[currentResLocation].content = _this.chatList[currentResLocation].content + response
              }
            }
          }
        })
        return this.readStream(reader, _this, currentResLocation, type);
      });
    },
    onScroll() {
      if (this.isAutoScroll === true) {
        return
      }
      this.scrollBottom()
      this.isAutoScroll = true;
    },
    // 滚动至最底层
    scrollBottom() {
      this.$nextTick(() => {
        const scrollDom = this.$refs.chatContent;
        animation(scrollDom, scrollDom.scrollHeight - scrollDom.offsetHeight);
      });
    },
    // 滚动至最高层
    scrollUp() {
      this.$nextTick(() => {
        const scrollDom = this.$refs.chatContent;
        animationToUp(scrollDom, 0)
      });
    },
    // 关闭标签框
    clickEmoji() {
      this.showEmoji = !this.showEmoji;
      console.log(124)
    },
    // 发送表情
    sendEmoji(msg) {
      console.log(123)
      const dateNow = JCMFormatDate(getNowTime());
      let chatMsg = {
        headImg: USER_HEAD_IMG_URL,
        name: USER_NAME,
        time: dateNow,
        msg: msg,
        chatType: 1, //信息类型，0文字，1图片
        extend: {
          imgType: 1, //(1表情，2本地图片)
        },
        messageType: "QUESTION",
      };
      this.sendMsg(chatMsg);
      this.clickEmoji();
    },
    // 发送本地图片
    sendImg(e) {
      this.acqStatus = false
      //获取文件
      const file = e.target.files[0];

      console.log(1)
      // 验证文件类型是否为PNG格式
      if (file.type !== "image/png") {
        this.$message.warning(this.$t('message.valid_png'))
        this.$nextTick(() => {
          this.acqStatus = true
        });
        return;
      }

      // 验证文件大小是否小于4MB
      if (file.size > 4 * 1024 * 1024) {
        this.$message.warning(this.$t('message.less_4M'))
        this.$nextTick(() => {
          this.acqStatus = true
        });
        return;
      }

      if (this.settingInfo.openChangePicture) {
        this.updateImage = file
        this.$message.success(this.$t('message.upload_complete'))
        e.target.files = null;
        this.$nextTick(() => {
          this.acqStatus = true
        });
        return
      }
      this.acqStatus = true
      e.target.files = null;
    },
    // 开始录音
    startRecording() {
      if (this.settingInfo.translateEnglish === false) {
        this.$message({
          type: 'info',
          message: '请先在右侧栏的音频中打开 "语音转文字" 按钮之后在使用哦(⊙o⊙)？'
        });
        return;
      }
      navigator.mediaDevices.getUserMedia({audio: true}).then((stream) => {
        this.recorder = new MediaRecorder(stream);
        this.recorder.addEventListener('dataavailable', event => {
          this.audioChunks.push(event.data)
        })
        this.recording = true
        this.recorder.start()
        // 在这里使用录音器
        this.$message.success(this.$t('message.start_recording'))
      }).catch((error) => {
        this.$message.error(this.$t('message.fail_audio'))
      });
    },
    // 停止录音
    async stopRecording() {
      this.recorder.stop()
      this.recording = false
      this.recorder.ondataavailable = (event) => {
        const blob = new Blob([event.data], {type: 'audio/wav'});
        const file = new File([blob], 'recording.wav', {
          type: 'audio/wav',
          lastModified: Date.now()
        });
        const formData = new FormData()
        let language = this.settingInfo.language;
        if (language === '中文') language = 'zh'
        else if (language === '英语') language = 'en'
        else if (language === '法语') language = 'fr'
        else if (language === '德语') language = 'de'
        else if (language === '日语') language = 'ja'
        else language = 'zh'
        formData.append('file', file)
        formData.append('prompt', '')
        formData.append('temperature', this.settingInfo.TemperatureAudio)
        formData.append('language', language)
        transcriptions(formData).then(res => {
          const data = res.data.text
          this.$nextTick(() => {
            this.inputMsg = data;
          });
        })
      }
      this.$message.success(this.$t('message.end_recording'))
    },
    // 初始化语音模块
    speechInit() {
      this.settingInfo.talk.speech = new Speech();
      this.settingInfo.talk.speech.init({
        volume: this.settingInfo.talk.volume, // 设置TTS所生成语音的音量大小。可以是0到1之间的浮点数，其中0表示完全静默，1表示最大可听到的音量
        rate: this.settingInfo.talk.rate, // 置TTS所生成语速。可以是小数或整数值，默认为1。较小值会使合成速度变慢，较大值会使合成速度加快
        pitch: this.settingInfo.talk.pitch, // 设置TTS生成语调(频率)。它类似于录制时说话人"抬高"或"降低"他们说话时嗓子发出
        lang: this.settingInfo.talk.langShow, // 设置TTS的语言。它表示要说话文本或内容所使用的语言
        splitSentences: true, // 拆分句子
        listeners: {
          onvoiceschanged: () => {
          }
        }
      }).then((data) => {
        this._addVoicesList(data.voices);
      }).catch(() => {
        this.$message.error('语音播报出现错误....请稍后再试,或更换浏览器再试')
      });
    },
    speechUpdate() {
      this.settingInfo.talk.speech = new Speech();
      this.settingInfo.talk.speech.init({
        volume: this.settingInfo.talk.volume, // 设置TTS所生成语音的音量大小。可以是0到1之间的浮点数，其中0表示完全静默，1表示最大可听到的音量
        rate: this.settingInfo.talk.rate, // 置TTS所生成语速。可以是小数或整数值，默认为1。较小值会使合成速度变慢，较大值会使合成速度加快
        pitch: this.settingInfo.talk.pitch, // 设置TTS生成语调(频率)。它类似于录制时说话人"抬高"或"降低"他们说话时嗓子发出
        lang: this.settingInfo.talk.langShow, // 设置TTS的语言。它表示要说话文本或内容所使用的语言
        splitSentences: true, // 拆分句子
        listeners: {
          onvoiceschanged: () => {
          }
        }
      }).then(() => {
      }).catch(() => {
        this.$message.error('语音播报出现错误....请稍后再试,或更换浏览器再试')
      });
    },
    // 增加浏览器支持的语音列表
    _addVoicesList(voices) {
      voices.sort(compareLang);
      // 将所有的数据都赋值给 typeAll
      this.settingInfo.talk.typeAll = voices
      // 处理数组
      this.settingInfo.talk.type = voices.filter(function (element) {
        return element.lang.includes('zh-CN');
      })
      // 处理语言
      const langSet = new Set();
      voices.forEach(function (element) {
        if (element.lang.length <= 8) {
          langSet.add(element.lang);
        }
      });
      // 将 Set 转换回数组
      this.settingInfo.talk.langAll = Array.from(langSet);
    },
    speechRead(test) {
      const talk = this.settingInfo.talk;
      const language = talk.langShow;
      const voice = talk.typeShow;
      if (language) this.settingInfo.talk.speech.setLanguage(language);
      if (voice) this.settingInfo.talk.speech.setVoice(voice);
      this.settingInfo.talk.speech.speak({
        text: test,
        queue: false,
        listeners: {
          onstart: () => {
            this.settingInfo.talk.isSpeech = true
            // console.log("Start utterance");
          },
          onend: () => {
            // console.log("End utterance");
            this.settingInfo.talk.isSpeech = false
          },
          onresume: () => {
            // console.log("Resume utterance");
            this.settingInfo.talk.isSpeech = false
          },
          onboundary: event => {
            console.log(
                // event.name +
                // " boundary reached after " +
                // event.elapsedTime +
                // " milliseconds."
            );
          }
        }
      }).then(data => {
        // console.log("Success !", data);
      }).catch(e => {
        this.settingInfo.talk.isSpeech = false
        // console.error("An error occurred :", e);
      });
    },
    speechStop() {
      this.settingInfo.talk.speech.pause();
      this.settingInfo.talk.isSpeech = false
    },
  },
};
</script>


<style lang="scss" scoped>
.iconfont:hover {
  color: rgb(29, 144, 245);

  .block {
    opacity: 1;
  }
}

.iconfont {
  margin-left: 20px;
  cursor: pointer;
}

::v-deep {
  .el-textarea__inner {
    background-color: rgb(66, 70, 86);
    border-radius: 15px;
    border: 2px solid rgb(34, 135, 225);
    /* padding: 10px; */
    box-sizing: border-box;
    transition: 0.2s;
    font-size: 20px;
    color: #fff;
    font-weight: 100;
    /* margin: 0 20px; */
    width: 98%;
    height: 70px !important;

  }
}

pre {
  background-color: #211f1f !important;
  border-radius: 20px !important;
  box-shadow: 0 0 9px 0 #000000 !important;
  color: #ffff !important;
}

.hljs {
  background-color: #211f1f !important;
  border-radius: 20px !important;
  box-shadow: 0 0 9px 0 #000000 !important;
  color: #ffff !important;
}

textarea::-webkit-scrollbar {
  width: 3px;
  /* 设置滚动条宽度 */
}

textarea::-webkit-scrollbar-thumb {
  background-color: rgb(66, 70, 86);
  /* 设置滚动条滑块的背景色 */
  border-radius: 50%;
  /* 设置滑块的圆角 */
}

.spinner {
  width: 50px;
  height: 50px;
  animation: spin 1s infinite linear;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.chat-window {
  width: 100%;
  height: 100%;
  margin-left: 0;
  position: relative;

  .top {
    &::after {
      content: "";
      display: block;
      clear: both;
    }

    .head-pic {
      float: left;
    }

    .info-detail {
      float: left;
      margin: 5px 20px 0;

      .name {
        font-size: 20px;
        font-weight: 600;
        color: #fff;
      }

      .detail {
        color: #9e9e9e;
        font-size: 12px;
        margin-top: 2px;
      }
    }

    .other-fun {
      float: right;
      margin-right: 40px;

      input {
        display: none;
      }
    }
  }


  .textarea {
    &:focus {
      outline: none;
    }
  }

  .botoom {
    width: 100%;
    height: 82vh;
    background-size: 100% 100%;
    // background-color: rgb(50, 54, 68);
    border-radius: 20px;
    padding: 0;
    box-sizing: border-box;
    position: relative;

    .chat-content {
      width: 100%;
      height: 85%;
      overflow-y: scroll;
      padding: 20px;
      box-sizing: border-box;

      &::-webkit-scrollbar {
        width: 3px;
        /* 设置滚动条宽度 */
      }

      &::-webkit-scrollbar-thumb {
        background-color: rgb(66, 70, 86);
        /* 设置滚动条滑块的背景色 */
        border-radius: 50%;
        /* 设置滑块的圆角 */
      }

      .chat-friend {
        width: 100%;
        float: left;
        margin-bottom: 20px;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-start;

        .chat-text {
          float: left;
          word-break: break-word;
          max-width: 55ch;
          padding: 15px;
          border-radius: 20px 20px 20px 5px;
          background-color: #fff;
          overflow-wrap: anywhere;
          color: #000;
        }

        .chat-img {
          img {
            max-width: 300px;
            max-height: 200px;
            border-radius: 10px;
          }
        }

        .info-time {
          margin: 10px 0;
          color: #fff;
          font-size: 14px;
          display: flex;
          justify-content: flex-start;

          img {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            vertical-align: middle;
            margin-right: 10px;
          }

          span {
            line-height: 30px;
          }

          span:last-child {
            color: rgb(101, 104, 115);
            margin-left: 10px;
            vertical-align: middle;
          }
        }
      }

      .chat-me {
        width: 100%;
        float: right;
        margin-bottom: 20px;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-end;

        .chat-text {
          float: right;
          max-width: 55ch;
          padding: 15px;
          border-radius: 20px 20px 5px 20px;
          background-color: #95ec69;
          color: #000;
          white-space: pre-wrap;
          word-break: break-all;
        }

        .chat-img {
          img {
            max-width: 300px;
            max-height: 200px;
            border-radius: 10px;
          }
        }

        .info-time {
          margin: 10px 0;
          color: #fff;
          font-size: 14px;
          display: flex;
          justify-content: flex-end;

          img {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            vertical-align: middle;
            margin-left: 10px;
          }

          span {
            line-height: 30px;
          }

          span:first-child {
            color: rgb(101, 104, 115);
            margin-right: 10px;
            vertical-align: middle;
          }
        }
      }
    }

    .chatInputs {
      width: 100%;
      position: absolute;
      bottom: 0;
      margin: 3%;
      display: flex;
      background-color: #323644;

      .boxinput {
        width: 50px;
        height: 50px;
        background-color: rgb(50, 54, 68);
        border-radius: 15px;
        border: 1px solid rgb(80, 85, 103);
        box-shadow: 0 0 5px 0 rgb(0, 136, 255);
        position: relative;
        cursor: pointer;

        img {
          width: 30px;
          height: 30px;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }

      .emoji {
        transition: 0.3s;
        width: 50px;
        min-width: 50px;
      }

      .luyin {
        color: #fff;
        margin-left: 1.5%;
        font-size: 30px;
        text-align: center;
        transition: 0.3s;
        width: 50px;
        min-width: 50px;
      }

      .inputs {
        width: 95%;
        height: 50px;
        background-color: rgb(66, 70, 86);
        border-radius: 15px;
        border: 2px solid rgb(34, 135, 225);
        padding: 10px;
        box-sizing: border-box;
        transition: 0.2s;
        font-size: 20px;
        color: #fff;
        font-weight: 100;
        margin: 0 20px;

        &:focus {
          outline: none;
        }
      }

      .send {
        background-color: rgb(29, 144, 245);
        border: 0;
        transition: 0.3s;
        box-shadow: 0 0 5px 0 rgba(0, 136, 255);

        &:hover {
          box-shadow: 0 0 10px 0 rgba(0, 136, 255);
        }
      }
    }
  }
}


.line {
  position: relative;
  width: 94%;
  margin-left: 2%;
  height: 2px;
  background: linear-gradient(to right, red, yellow, green);
  animation: shrink-and-expand 2s ease-in-out infinite;

}

.line::before,
.line::after {
  content: "";
  position: absolute;
  top: 0;
  width: 50%;
  height: 100%;
  background: inherit;
}

.line::before {
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
  left: 0;
  transform-origin: left;
  animation: shrink-left 2s ease-in-out infinite;
}

.line::after {
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
  right: 0;
  transform-origin: right;
  animation: shrink-right 2s ease-in-out infinite;
}

@keyframes shrink-and-expand {

  0%,
  100% {
    transform: scaleX(1);
  }

  50% {
    transform: scaleX(0);
  }
}

@keyframes shrink-left {

  0%,
  50% {
    transform: scaleX(1);
  }

  50.1%,
  100% {
    transform: scaleX(0);
  }
}

@keyframes shrink-right {

  0%,
  50% {
    transform: scaleX(1);
  }

  50.1%,
  100% {
    transform: scaleX(0);
  }
}

@media only screen and (min-width: 768px) { // 当屏幕宽度大于或等于768px时
  .chat-window {
    margin-left: 20px;

    .top {
      .other-fun {
        margin-top: 20px;
      }
    }
  }
  .botoom {
    height: 84vh;
  }
  .chat-window {
    .botoom {
      .chat-content {
        .chat-me {
          .chat-text {
            //max-width: 55ch;
          }
        }
      }

      .chatInputs {
        width: 90%;
      }
    }
  }
}
</style>
