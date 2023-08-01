<template>
  <div class="chat-window">
    <!--聊天室顶部按钮-->
    <div class="top">
      <el-row style="height: 70px;">
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
            <el-tooltip :content="$t('icon.image')" effect="dark" placement="top">
              <label for="imgFile">
                <span class="iconfont icon-tupian"></span>
              </label>
            </el-tooltip>
            <input id="imgFile" accept="image/*" name="" type="file" @change="sendImg"/>
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
              <!--<div class="chat-text" v-if="item.chatType === 0">-->
              <el-row :gutter="20">
                <el-col :span="2">
                  <svg class="icon" viewBox="0 0 1024 1024" x="1679666016648" @click="$copy(item.content, '已复制')"
                       xmlns="http://www.w3.org/2000/svg" p-id="6241" width="22" height="22">
                    <path
                        d="M661.333333 234.666667A64 64 0 0 1 725.333333 298.666667v597.333333a64 64 0 0 1-64 64h-469.333333A64
                        64 0 0 1 128 896V298.666667a64 64 0 0 1 64-64z m-21.333333 85.333333H213.333333v554.666667h426.666667v-554.666667z m191.829333-256a64
                        64 0 0 1 63.744 57.856l0.256 6.144v575.701333a42.666667 42.666667 0 0 1-85.034666
                        4.992l-0.298667-4.992V149.333333H384a42.666667 42.666667 0 0 1-42.368-37.674666L341.333333
                        106.666667a42.666667 42.666667 0 0 1 37.674667-42.368L384 64h447.829333z"
                        fill="#909399" p-id="6242"></path>
                  </svg>
                </el-col>
                <el-col :span="21">
                </el-col>
              </el-row>
              <markdown-it-vue :content="item.content.trim()"/>
            </div>
            <!--如果是图片,就直接展示-->
            <div class="chat-img" v-if="item.chatType === 1">
              <img :src="item.msg" alt="表情" v-if="item.extend.imgType === 1" style="width: 100px; height: 100px"/>
              <el-image style="border-radius: 10px" :src="item.msg" :preview-src-list="srcImgList" v-else>
              </el-image>
            </div>
            <!--图片,不知道有什么用-->
            <div class="chat-img" v-if="item.chatType === 2">
              <div class="word-file">
                <FileCard :fileType="item.extend.fileType" :file="item.msg"></FileCard>
              </div>
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
            <div class="chat-text">
              <markdown-it-vue :content="item.content.trim()" style="font-size:16px"/>
            </div>
            <!--发送照片-->
            <div class="chat-img" v-if="item.chatType === 1">
              <img :src="item.msg" alt="表情" v-if="item.extend.imgType === 1" style="width: 100px; height: 100px"/>
              <el-image style="max-width: 300px; border-radius: 10px" :src="item.msg" :preview-src-list="srcImgList"
                        v-else>
              </el-image>
            </div>
            <!--发送文件-->
            <div class="chat-img" v-if="item.chatType === 2">
              <div class="word-file">
                <FileCard :fileType="item.extend.fileType" :file="item.msg"></FileCard>
              </div>
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
        <div class="emoji boxinput" @click="clickEmoji" v-show="buttonStatus">
          <img src="@/assets/img/emoji/smiling-face.png" alt=""/>
        </div>
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
                  autocapitalize="off" autocomplete="off" v-model="inputMsg" @keyup.enter="handleKeyDown"></textarea>
        <!--发送-->
        <div>
          <div class="send boxinput" @click="sendText">
            <img src="@/assets/img/emoji/rocket.png" alt=""/>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import {animation, animationToUp, getNowTime, JCMFormatDate} from "@/util/util";
import {getToken} from '@/util/auth'
import {
  createImage,
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
import {getMessage} from "@/api/chatMsg";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

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
      updateImage: null,
      // 是否隐藏对话框上方介绍（空间局促时隐藏）
      personInfoSpan: [1, 13, 10],

    };
  },
  mounted() {
    this.setChatContentWidth();
    window.addEventListener('resize', this.setChatContentWidth);
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
      const botoom = this.$el.querySelector('.botoom');
      const chatContent = botoom.querySelector('.chat-content');
      const width = botoom.offsetWidth;
      chatContent.style.width = `${width}px`;
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
          this.personInfoSpan = [4, 0, 20];
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
          this.personInfoSpan = [1, 13, 10]
        });
      }
    },
    //获得聊天室所有消
    getMessage(id) {
      this.isAutoScroll = false;
      NProgress.start()
      this.curSessionId = id;
      new Promise((resolve, reject) => {
        getMessage(id).then((res) => {
          this.chatList = res.list.map(item => ({
            ...item,
            time: JCMFormatDate(item.time)
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
          content: this.inputMsg,
          chatType: 0, //信息类型，0文字，1图片
          messageType: "QUESTION",
          id: "",
          sessionId: "",
          parentId: "",
          childrenId: "",
        };
        this.lastChatMsg = this.chatList[this.chatList.length - 1] === undefined ? [] : this.chatList[this.chatList.length - 1];
        this.sendMsg(chatMsg);
        //如果是图片模式则进入待开发不过可用改状态使用
        if (false) {
          // if (this.settingInfo.openProductionPicture) { // aaaaa
          params.prompt = this.inputMsg
          params.n = this.settingInfo.n
          params.size = this.settingInfo.size
          createImage(params, this.settingInfo.KeyMsg).then(data => {
            for (const imgInfo of data) {
              let imgResMsg = {
                headImg: AI_HEAD_IMG_URL,
                name: this.frinedInfo.name,
                time: JCMFormatDate(getNowTime()),
                msg: imgInfo.url,
                chatType: 1, //信息类型，0文字，1图片
                extend: {
                  imgType: 2, //(1表情，2本地图片)
                },
                uid: this.frinedInfo.id, //uid
              };
              this.sendMsg(imgResMsg);
              this.srcImgList.push(imgInfo.url);
            }
            this.acqStatus = true
          })
        } else {
          this.options.sessionId = this.curSessionId
          this.options.parentMessageId = this.lastChatMsg.id

          this.setting.model = this.frinedInfo.id
          // this.setting.suffix = this.settingInfo.chat.suffix
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
    },
    // 发送表情
    sendEmoji(msg) {
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
        uid: "QUESTION",
      };
      this.sendMsg(chatMsg);
      this.clickEmoji();
    },
    // 发送本地图片
    sendImg(e) {
      this.acqStatus = false
      //获取文件
      const file = e.target.files[0];

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
        this.$message.info(this.$t('message.upload_complete'))
        e.target.files = null;
        this.$nextTick(() => {
          this.acqStatus = true
        });
        return
      }
      // 通过验证后，上传文件
      const formData = new FormData();
      formData.append("image", file);
      formData.append("n", this.settingInfo.n);
      formData.append("size", this.settingInfo.size);

      const dateNow = JCMFormatDate(getNowTime());
      let _this = this;

      let chatMsg = {
        headImg: USER_HEAD_IMG_URL,
        name: USER_NAME,
        time: dateNow,
        msg: "",
        chatType: 1, //信息类型，0文字，1图片, 2文件
        extend: {
          imgType: 2, //(1表情，2本地图片)
        },
        uid: "jcm",
      };

      if (!e || !window.FileReader) return; // 看是否支持FileReader
      let reader = new FileReader();
      reader.readAsDataURL(file); // 关键一步，在这里转换的
      reader.onloadend = function () {
        chatMsg.msg = this.result; //赋值
        _this.srcImgList.push(chatMsg.msg);
      };
      this.sendMsg(chatMsg);

      createImageVariations(formData, this.settingInfo.KeyMsg).then(data => {
        for (var imgInfo of data) {
          let imgResMsg = {
            headImg: AI_HEAD_IMG_URL,
            name: this.frinedInfo.name,
            time: JCMFormatDate(getNowTime()),
            msg: imgInfo.url,
            chatType: 1, //信息类型，0文字，1图片
            extend: {
              imgType: 2, //(1表情，2本地图片)
            },
            uid: this.frinedInfo.id, //uid
          };
          this.sendMsg(imgResMsg);
          this.srcImgList.push(imgInfo.url);
        }
        this.acqStatus = true
      }).catch(e => {
        console.log("错误")
        console.log(e)
      })
      e.target.files = null;
    },
    // 开始录音
    startRecording() {  //
      this.$message({
        type: 'info',
        message: '暂不支持语音转文字哦o.O~~我会尽快加入这个操作的'
      });
      // navigator.mediaDevices.getUserMedia({audio: true}).then((stream) => {
      //   this.recorder = new MediaRecorder(stream);
      //   this.recorder.addEventListener('dataavailable', event => {
      //     this.audioChunks.push(event.data)
      //   })
      //   this.recording = true
      //   this.recorder.start()
      //   // 在这里使用录音器
      //   this.$message.success(this.$t('message.start_recording'))
      // }).catch((error) => {
      //   this.$message.error(this.$t('message.fail_audio'))
      // });
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
        formData.append('file', file)
        formData.append('model', "whisper-1")
        formData.append('temperature', this.settingInfo.TemperatureAudio)
        formData.append('response_format', "text")

        if (this.settingInfo.translateEnglish) {
          createTranslation(formData, this.settingInfo.KeyMsg).then(data => {
            this.$nextTick(() => {
              this.inputMsg = data;
            });
          })
        } else {
          formData.append('language', this.settingInfo.language)

          createTranscription(formData, this.settingInfo.KeyMsg).then(data => {
            this.$nextTick(() => {
              this.inputMsg = data;
            });
          })
        }
      }
      this.$message.success(this.$t('message.end_recording'))
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
      margin-top: 20px;

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
    height: 85vh;
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
          max-width: 90%;
          padding: 15px;
          border-radius: 20px 20px 20px 5px;
          background-color: #fff;
          word-break: break-all;
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
          max-width: 90%;
          padding: 15px;
          border-radius: 20px 20px 5px 20px;
          background-color: #95ec69;
          color: #000;
          word-break: break-all;
          overflow-wrap: anywhere;
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

    .botoom {
      padding: 20px;
    }
  }
  .chat-window {
    .botoom {
      .chatInputs {
        width: 90%;
      }
    }
  }
}
</style>
