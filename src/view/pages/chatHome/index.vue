<template>
  <div class="chatHome">
    <!--聊天室左侧-->
    <div class="chatLeft" style="width:20%" v-show="showPersonList">
      <div class="title" style="text-align: center;">
        <h2>GPT Session</h2>
      </div>
      <div class="online-person" style="margin-top: 5%;">
        <!--上方的按钮-->
        <el-row :gutter="18" data-intro="第二步:选择ai模型和ai角色" data-step="2" data-title="使用步骤">
          <el-col :span="6">
            <div class="setting" style="text-align: center;">
              <span class="" @click="sessionClick" :class="{ whiteText: cutSetting === 1 }">
                {{ $t('session.title') }}</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="setting" style="text-align: center;">
              <span class="" @click="modelClick" :class="{ whiteText: cutSetting === 0 }">
                {{ $t('model.title') }}</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="setting" style="text-align: center;">
              <span :class="{ whiteText: cutSetting === 2 }" class="" @click="promptClick">
                {{ $t('role.title') }}</span>
            </div>
          </el-col>

        </el-row>
        <!--ai模型-->
        <div v-show="cutSetting === 0">
          <input class="inputs" v-model="modelSearch" style=" margin-top: 10px;"
                 :placeholder="$t('placeholder.model_name')"/>
          <div class="s-wrapper">
            <div v-for="personInfo in personList" :key="personInfo.id"
                 @click="clickPerson(personInfo)">
              <PersonCard :personInfo="personInfo" :pcCurrent="pcCurrent"></PersonCard>
            </div>
          </div>
        </div>
        <!--聊天室-->
        <div v-show="cutSetting === 1">
          <input class="inputs" v-model="sessionSearch" style=" margin-top: 10px;"
                 :placeholder="$t('placeholder.session_name')"/>
          <div class="s-wrapper">
            <div class="session boxinput" data-intro="第一步:创建聊天对话" data-step="1" data-title="使用步骤" @click="newSession">
              <svg class="icon" height="25" p-id="3128" version="1.1"
                   viewBox="0 0 1024 1024" width="25" x="1679215361568" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M512.001024 0A512 512 0 0 0 0.001024 512a506.88 506.88 0 0 0 92.16 292.352V972.8a51.2 51.2 0 0 0 51.2 51.2H512.001024a512 512 0 0 0 0-1024z m0 921.6H194.561024v-134.144a51.2 51.2 0 0 0-10.24-30.72A406.016 406.016 0 0 1 102.401024 512a409.6 409.6 0 1 1 409.6 409.6z"
                    fill="#ffffff" p-id="3129"></path>
                <path
                    d="M716.801024 486.4a51.2 51.2 0 0 0-51.2 51.2 153.6 153.6 0 0 1-307.2 0 51.2 51.2 0 0 0-102.4 0 256 256 0 0 0 512 0 51.2 51.2 0 0 0-51.2-51.2z"
                    fill="#ffffff" p-id="3130"></path>
              </svg>
              {{ $t('session.create') }}
            </div>
            <div class="session boxinput" style="margin-left: 0;margin-right: 0;width: 99%;"
                 @click="exportObjArrAllToJson">
              <span class="iconfont icon-daochu" style="color: #fff; margin-right:10px;"></span>
              {{ $t('session.export') }}
            </div>
            <!-- 所有会话-->
            <div v-for="sessionInfo in sessionList" :key="sessionInfo.id" @click="clickSession(sessionInfo)">
              <Session :pcCurrent="sessionCurrent" :sessionInfo="sessionInfo" :sessionList="sessionList"></Session>
            </div>
          </div>

        </div>
        <!--角色-->
        <div v-show="cutSetting === 2">
          <div class="s-wrapper" style="height: 80vh;">
            <div class="block">
              <input v-model="roleSearch" :placeholder="$t('placeholder.role_name')" class="weitiao"/>
            </div>
            <div v-for="roleInfo in roleList" :key="roleInfo.act" class="personList" @click="roleClick(roleInfo)">
              <RoleCard :prCurrent="prCurrent" :roleInfo="roleInfo"></RoleCard>
            </div>
          </div>
        </div>

      </div>
    </div>
    <!--聊天室-->
    <div class="chatRight">
      <!--折叠面板-->
      <div class="top-left" @click="toggleLeft">
        <svg x="1679366341860" class="icon" v-show="!showPersonList" viewBox="0 0 1024 1024" version="1.1"
             height="50" p-id="5764" width="50" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M912.8 513.2C912.8 733.1 733.9 912 514 912S115.2 733.1 115.2 513.2 294.1 114.3 514 114.3s398.8 179 398.8 398.9z m-701.5 0c0 166.9 135.8 302.7 302.7 302.7s302.7-135.8 302.7-302.7S680.9 210.5 514 210.5 211.3 346.3 211.3 513.2z"
              fill="#BDD2EF" p-id="5765"></path>
          <path
              d="M626.8 345.9c0 15-5.7 30.1-17.2 41.5L487.1 510l122.6 122.6c22.9 22.9 22.9 60.2 0 83.1-22.9 22.9-60.2 22.9-83.1 0L362.4 551.6c-22.9-22.9-22.9-60.2 0-83.1l164.1-164.1c22.9-22.9 60.2-22.9 83.1 0 11.5 11.5 17.2 26.5 17.2 41.5z"
              fill="#2867CE" p-id="5766"></path>
        </svg>
        <svg x="1679366707602" class="icon" v-show="showPersonList" viewBox="0 0 1024 1024" version="1.1"
             height="50" p-id="7551" width="50" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M514 912c-219.9 0-398.8-178.9-398.8-398.9 0-219.9 178.9-398.8 398.8-398.8s398.8 178.9 398.8 398.8c0 220-178.9 398.9-398.8 398.9z m0-701.5c-166.9 0-302.7 135.8-302.7 302.7S347.1 815.9 514 815.9s302.7-135.8 302.7-302.7S680.9 210.5 514 210.5z"
              fill="#BDD2EF" p-id="7552"></path>
          <path
              d="M402.5 677.3c0-15 5.7-30.1 17.2-41.5l122.6-122.6-122.6-122.6c-22.9-22.9-22.9-60.2 0-83.1 22.9-22.9 60.2-22.9 83.1 0l164.1 164.1c22.9 22.9 22.9 60.2 0 83.1L502.8 718.8c-22.9 22.9-60.2 22.9-83.1 0-11.5-11.4-17.2-26.5-17.2-41.5z"
              fill="#2867CE" p-id="7553"></path>
        </svg>
      </div>
      <div class="top-right" @click="toggleRight">
        <svg x="1679366707602" class="icon" v-show="!showSetupList" viewBox="0 0 1024 1024" version="1.1"
             height="50" p-id="7551" width="50" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M514 912c-219.9 0-398.8-178.9-398.8-398.9 0-219.9 178.9-398.8 398.8-398.8s398.8 178.9 398.8 398.8c0 220-178.9 398.9-398.8 398.9z m0-701.5c-166.9 0-302.7 135.8-302.7 302.7S347.1 815.9 514 815.9s302.7-135.8 302.7-302.7S680.9 210.5 514 210.5z"
              fill="#BDD2EF" p-id="7552"></path>
          <path
              d="M402.5 677.3c0-15 5.7-30.1 17.2-41.5l122.6-122.6-122.6-122.6c-22.9-22.9-22.9-60.2 0-83.1 22.9-22.9 60.2-22.9 83.1 0l164.1 164.1c22.9 22.9 22.9 60.2 0 83.1L502.8 718.8c-22.9 22.9-60.2 22.9-83.1 0-11.5-11.4-17.2-26.5-17.2-41.5z"
              fill="#2867CE" p-id="7553"></path>
        </svg>
        <svg x="1679366341860" class="icon" v-show="showSetupList" viewBox="0 0 1024 1024" version="1.1"
             height="50" p-id="5764" width="50" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M912.8 513.2C912.8 733.1 733.9 912 514 912S115.2 733.1 115.2 513.2 294.1 114.3 514 114.3s398.8 179 398.8 398.9z m-701.5 0c0 166.9 135.8 302.7 302.7 302.7s302.7-135.8 302.7-302.7S680.9 210.5 514 210.5 211.3 346.3 211.3 513.2z"
              fill="#BDD2EF" p-id="5765"></path>
          <path
              d="M626.8 345.9c0 15-5.7 30.1-17.2 41.5L487.1 510l122.6 122.6c22.9 22.9 22.9 60.2 0 83.1-22.9 22.9-60.2 22.9-83.1 0L362.4 551.6c-22.9-22.9-22.9-60.2 0-83.1l164.1-164.1c22.9-22.9 60.2-22.9 83.1 0 11.5 11.5 17.2 26.5 17.2 41.5z"
              fill="#2867CE" p-id="5766"></path>
        </svg>
      </div>
      <!--展示聊天窗口-->
      <div v-if="showChatWindow" v-show="showMainContent">
        <ChatWindow ref="chatWindow"
                    :frinedInfo="chatWindowInfo"
                    :settingInfo="SettingInfo"
                    :storeStatu="storeStatus"
                    :updateImage="updateImage"
        >
        </ChatWindow>
      </div>
      <div v-else class="showIcon">
        <svg class="icon iconfont icon-snapchat" height="200" p-id="3488" version="1.1"
             viewBox="0 0 1024 1024" width="200" x="1679552353056" xmlns="http://www.w3.org/2000/svg">
          <path d="M99" p-id="3489"></path>
        </svg>
      </div>
    </div>
    <!--右侧栏是否展示-->
    <div class="chatLeft" v-show="showSetupList">
      <!--欢迎用户-->
      <el-card shadow="hover" id="jianbian" style="line-height: 120%;text-align: center;">
        <div>{{ getUserEmail }}</div>
      </el-card>

      <div class="online-person">
        <!--展示右侧栏的上方按钮-->
        <el-row :gutter="20" data-intro="第五步:对话参数设置,以及语音,图片模型,更多新功能,等你尝试!!!" data-step="5" data-title="使用步骤">
          <el-col v-for="(setting, index) in getSettings" :key="index" :span="6">
            <span :class="{ active: SettingStatus === index }" class="setting"
                  @click="SettingStatus = index">{{ setting.name }}</span>
          </el-col>
        </el-row>

        <div class="s-wrapper" style="height: 75vh;">
          <!--对话设置-->
          <el-collapse-transition>
            <div v-show="SettingStatus === 0">
              <div class="button-group">
                <el-button class="left-btn" round size="small" type="primary" @click="saveSettingInfo">
                  {{ $t('model.saveSetting') }}
                </el-button>
                <el-button class="right-btn" round size="small" type="primary" @click="deleteSettingInfo">
                  {{ $t('model.resetSetting') }}
                </el-button>
              </div>
              <div class="button-group">
                <el-button class="left-btn" round size="small" type="primary" @click="upButton">
                  {{ $t('model.upButton') }}
                </el-button>
                <el-button class="right-btn" round size="small" type="primary" @click="bottomButton">
                  {{ $t('model.bottomButton') }}
                </el-button>
              </div>
              <!--联网设置-->
              <!--<div class="block" v-show="SettingInfo.openNet">-->
              <!--  <div class="block">-->
              <!--    <el-tooltip class="item" effect="dark" :content="$t('model.online')" placement="top">-->
              <!--      <span class="demonstration">{{ $t('model.online_title') }}</span>-->
              <!--    </el-tooltip>-->
              <!--    <el-switch v-model="SettingInfo.openNet" :width="defaulWidth" style="margin-left: 15%;"></el-switch>-->
              <!--  </div>-->
              <!--  <el-tooltip class="item" effect="dark" :content="$t('model.max_results_title')" placement="top">-->
              <!--    <span class="demonstration" style="">{{ $t('model.max_results') }}</span>-->
              <!--  </el-tooltip>-->

              <!--  <el-slider class="astrict" v-model="SettingInfo.max_results" :step="1" :min="0" :max="6"></el-slider>-->
              <!--</div>-->
              <!--不联网-->
              <div v-show="!SettingInfo.openNet">
                <!--停用词-->
                <div class="block">
                  <el-tooltip class="item" effect="dark" :content="$t('model.stop')" placement="top">
                    <span class="demonstration">{{ $t('model.stop_title') }}</span>
                  </el-tooltip>
                  <input v-model="SettingInfo.chat.stop" :placeholder="$t('placeholder.stop')" class="weitiao"/>
                </div>
                <!--最大上下文-->
                <div class="block">
                  <el-tooltip :content="$t('model.n')" class="item" effect="dark" placement="top">
                    <span class="demonstration">{{ $t('model.n') }}</span>
                  </el-tooltip>
                  <el-slider v-model="SettingInfo.chat.n" :max="10"
                             :min="0" :step="1" class="astrict"></el-slider>
                </div>
                <!--单词重复度-->
                <div class="block">
                  <el-tooltip class="item" effect="dark" :content="$t('model.frequency_penalty')" placement="top">
                    <span class="demonstration">{{ $t('model.frequency_penalty_title') }}</span>
                  </el-tooltip>
                  <el-slider class="astrict" v-model="SettingInfo.chat.FrequencyPenalty" :step="0.1" :min="-2"
                             :max="2"></el-slider>
                </div>
                <!--话题重复度-->
                <div class="block">
                  <el-tooltip class="item" effect="dark" :content="$t('model.presence_penalty')" placement="top">
                    <span class="demonstration">{{ $t('model.presence_penalty_title') }}</span>
                  </el-tooltip>
                  <el-slider class="astrict" v-model="SettingInfo.chat.PresencePenalty" :step="0.1" :min="-2"
                             :max="2"></el-slider>
                </div>
                <!--最大token-->
                <div class="block">
                  <el-tooltip class="item" effect="dark" :content="$t('model.max_tokens')" placement="top">
                    <span class="demonstration" style="">{{ $t('model.max_tokens_title') }}</span>
                  </el-tooltip>

                  <el-slider class="astrict" v-model="SettingInfo.chat.MaxTokens" :step="1" :min="0"
                             :max="2048"></el-slider>
                </div>
                <!--随机性-->
                <div class="block">
                  <el-tooltip class="item" effect="dark" :content="$t('model.temperature')" placement="top">
                    <span class="demonstration">{{ $t('model.temperature_title') }}</span>
                  </el-tooltip>
                  <el-slider class="astrict" v-model="SettingInfo.chat.Temperature" :step="0.1" :min="0"
                             :max="2"></el-slider>
                </div>
                <!--流输出-->
                <div class="block">
                  <el-tooltip class="item" effect="dark" :content="$t('model.stream')" placement="top">
                    <span class="demonstration">{{ $t('model.stream_title') }}</span>
                  </el-tooltip>
                  <el-switch v-model="SettingInfo.chat.stream" :width="defaulWidth"
                             style="margin-left: 15%;"></el-switch>
                </div>
                <!--是否联网-->
                <!--<div class="block">-->
                <!--  <el-tooltip class="item" effect="dark" :content="$t('model.online')" placement="top">-->
                <!--    <span class="demonstration">{{ $t('model.online_title') }}</span>-->
                <!--  </el-tooltip>-->
                <!--  <el-switch v-model="SettingInfo.openNet" :width="defaulWidth" style="margin-left: 15%;"></el-switch>-->
                <!--</div>-->
              </div>
            </div>
          </el-collapse-transition>
          <!--图片设置-->
          <el-collapse-transition>
            <div v-show="SettingStatus === 1">
              <!--改图模式-->
              <!--<div class="block">-->
              <!--  <el-tooltip class="item" effect="dark" :content="$t('image.change_title')" placement="top">-->
              <!--    <span class="demonstration">{{ $t('image.change') }}</span>-->
              <!--  </el-tooltip>-->
              <!--  <el-switch v-model="SettingInfo.openChangePicture"-->
              <!--             :width="defaulWidth" style="margin-left: 15%;"/>-->
              <!--</div>-->
              <template v-if="SettingInfo.openChangePicture">
                <!--图片展示-->
                <div class="block">
                  <!--导入图片-->
                  <span style="color: #ad4040;">{{ $t('message.upload_image1') }}</span>
                  <div style="display: flex;margin-top: 10px">
                    <span style="color: #ad4040">{{ $t('message.upload_image2') }}</span>
                    <div class="upload-image">
                      <el-tooltip :content="$t('icon.image')" effect="dark" placement="top">
                        <label for="imgFile">
                          <span class="iconfont icon-tupian"></span>
                        </label>
                      </el-tooltip>
                      <input id="imgFile" accept="image/*" name="" type="file" @change="sendImg"/>
                    </div>
                  </div>
                  <!--发送照片-->
                  <div v-if="picture" class="chat-img">
                    <el-image :src="picture" style="max-width: 300px; border-radius: 10px"/>
                    <span style="color: #ad4040">{{ $t('message.upload_image3') }}</span>
                  </div>
                </div>
              </template>
              <template v-else>
                <!--产图模式-->
                <div class="block">
                  <el-tooltip :content="$t('image.production_title')" class="item" effect="dark" placement="top">
                    <span class="demonstration">{{ $t('image.production') }}</span>
                  </el-tooltip>
                  <el-switch v-model="SettingInfo.openProductionPicture"
                             :width="defaulWidth" style="margin-left: 15%;"/>
                </div>
                <!--图片大小-->
                <div class="block">
                  <el-tooltip :content="$t('image.size_title')" class="item" effect="dark" placement="top">
                    <span class="demonstration">{{ $t('image.size') }}</span>
                  </el-tooltip>
                  <div>
                    <el-select v-model="SettingInfo.size" placeholder="请选择" style="margin-top: 10px;">
                      <el-option v-for="item in imgSizes" :key="item.value" :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <!--图片数量-->
                <div class="block">
                  <el-tooltip :content="$t('image.count_title')" class="item" effect="dark" placement="top">
                    <span class="demonstration">{{ $t('image.count') }}</span>
                  </el-tooltip>
                  <el-slider v-model="SettingInfo.n" :max="5" :min="-1" :step="1" class="astrict"></el-slider>
                </div>
                <!--提示文字-->
                <div class="block">
                  <h3 style="color: #ad4040">
                    {{ $t('message.create_image1') }}
                  </h3>
                  <h3 style="color: #ad4040">
                    {{ $t('message.create_image2') }}
                  </h3>
                </div>
              </template>
            </div>
          </el-collapse-transition>
          <!--音频设置-->
          <el-collapse-transition>
            <div v-show="SettingStatus === 2">
              <div class="block">
                <el-tooltip class="item" effect="dark" :content="$t('audio.to_text_title')" placement="top">
                  <span class="demonstration">{{ $t('audio.to_text') }}</span>
                </el-tooltip>
                <el-switch v-model="SettingInfo.translateEnglish" :width="defaulWidth"
                           style="margin-left: 15%;"></el-switch>
              </div>

              <div class="block">
                <el-tooltip class="item" effect="dark" :content="$t('audio.language_title')" placement="top">
                  <span class="demonstration">{{ $t('audio.language') }}</span>
                </el-tooltip>
                <div>
                  <el-select v-model="SettingInfo.language" placeholder="请选择" style="margin-top: 10px;">
                    <el-option v-for="item in languages" :key="item.key" :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </div>


              <div class="block">
                <el-tooltip class="item" effect="dark" :content="$t('audio.temperature_title')" placement="top">
                  <span class="demonstration">{{ $t('audio.temperature') }}</span>
                </el-tooltip>

                <el-slider class="astrict" v-model="SettingInfo.TemperatureAudio" :step="0.1" :min="0"
                           :max="1"></el-slider>
              </div>


            </div>
          </el-collapse-transition>
          <!--prompt-->
          <el-collapse-transition>
            <div v-show="SettingStatus === 3">
              <div class="button-group">
                <el-button class="left-btn" round size="small" type="primary" @click="savePrompt">
                  {{ $t('model.savePrompt') }}
                </el-button>
                <el-button class="right-btn" round size="small" type="primary" @click="deletePrompt">
                  {{ $t('model.resetPrompt') }}
                </el-button>
              </div>
              <!--prompt预设-->
              <div class="block">
                <el-tooltip :content="$t('model.prompt')" class="item" effect="dark" placement="top">
                  <span class="demonstration">{{ $t('model.prompt_title') }}</span>
                </el-tooltip>
                <textarea id="textareaMsg1" v-model="SettingInfo.prompt" v-autoheight
                          :placeholder="$t('placeholder.prompt')"
                          aria-autocomplete="both"
                          autocapitalize="off" autocomplete="off" autocorrect="off" class="weitiao" maxlength="2048"
                          rows="3" spellcheck="false"
                          style="z-index: 9999999999;min-height: 50px;max-height:400px;max-width: 100%;min-width: 45%;"></textarea>
              </div>
            </div>
          </el-collapse-transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PersonCard from "@/components/PersonCard.vue";
import Session from "@/components/Session.vue";
import File from "@/components/File.vue";
import ChatWindow from "./chatwindow.vue";
import {AI_HEAD_IMG_URL} from '@/store/mutation-types'
import RoleCard from "@/components/RoleCard.vue";
import {createChatRoom, getChatRoom} from "@/api/session";
import {generateUUID} from "@/util/util";
import Cookies from "js-cookie";
import introJs from 'intro.js'

import {
  getModels,
  getRoles,
} from "@/api/getData";

export default {
  directives: {
    autoheight: {
      inserted: function (el) {
        const Msg = document.getElementById("textareaMsg1").value;
        if (Msg === "") {
          el.style.height = "26px"
        } else {
          el.style.height = el.scrollHeight + 'px'
        }
      },
      update: function (el) {
        const Msg = document.getElementById("textareaMsg1").value;
        if (Msg === "") {
          el.style.height = "26px"
        } else {
          el.style.height = el.scrollHeight + 'px'
        }
      }
    }
  },
  components: {
    RoleCard,
    PersonCard,
    ChatWindow,
    Session,
    File,
  },
  data() {
    return {
      picture: "",
      updateImage: null,
      fileSearch: "",
      sessionSearch: "",
      showFineSetting: false,
      cancelFineStatus: true,
      storeStatus: 0,
      //宽度
      defaulWidth: 70,
      //0是聊天设置，1是图片设置
      SettingStatus: 0,
      //0是模型列表，1是会话列表
      cutSetting: 1,
      //余额信息
      moneryInfo: {
        totalGranted: 0,
        totalUsed: 0,
        totalAvailable: 0
      },
      batch_sizeStr: "",
      //全部的设置参数
      SettingInfo: {
        cutSetting: 1,
        KeyMsg: "",
        readefile: false,
        inputStatus: true,
        translateEnglish: false,
        openProductionPicture: false,
        openChangePicture: false,
        TemperatureAudio: 0,
        n: 1,
        size: "256x256",
        language: "中文",
        prompt: localStorage.getItem("prompt") == null ? "" : localStorage.getItem("prompt"),
        chat: {
          // 后缀
          suffix: localStorage.getItem("suffix") == null ? "" : localStorage.getItem("suffix"),
          // 停用词
          stop: localStorage.getItem("stop") == null ? "" : localStorage.getItem("stop"),
          // 单词重复度
          FrequencyPenalty: localStorage.getItem("FrequencyPenalty") == null ? 0 :
              parseFloat(localStorage.getItem("FrequencyPenalty")),
          // 话题重复度
          PresencePenalty: localStorage.getItem("PresencePenalty") == null ? 0 :
              parseFloat(localStorage.getItem("PresencePenalty")),
          // 最大token
          MaxTokens: localStorage.getItem("MaxTokens") == null ? 1024 :
              parseFloat(localStorage.getItem("MaxTokens")),
          // 随机度
          Temperature: localStorage.getItem("Temperature") == null ? 1 :
              parseFloat(localStorage.getItem("Temperature")),
          // 流
          stream: localStorage.getItem("stream") == null ? true :
              Boolean(localStorage.getItem("stream")),
          // 回显词
          n: localStorage.getItem("n") == null ? false :
              parseInt(localStorage.getItem("n")),
        },
        openNet: false,
        // max_results: 3,
      },
      //当前点击的文件
      fiCurrent: "",
      //当前点击的模型
      pcCurrent: "",
      //当前点击的角色
      prCurrent: "",
      //当前点击的会话
      sessionCurrent: "",
      //当前点击的微调模型
      ftCurrent: "",
      //微调搜索数据
      // fineTuningSearch: "",
      //模型搜索数据
      modelSearch: "",
      //角色搜索数据
      roleSearch: "",
      //文件列表
      fileList: [],
      //文件缓存列表
      fineTuningSearch: [],
      //微调模型列表
      fineTuningList: [],
      //微调模型缓存列表
      fineTuningCacheList: [],
      //模型列表
      personList: [],
      //会话列表
      sessionList: [],
      sessionCacheList: [],
      //角色列表
      roleList: [],
      //模型列表缓存
      personListCache: [],
      //是否显示聊天窗口
      showChatWindow: true,
      //当前窗口的对话模型信息
      chatWindowInfo: {},
      //图片大小参数列表
      imgSizes: [{
        value: '256x256'
      }, {
        value: '512x512'
      }, {
        value: '1024x1024'
      }],
      //语音定义的参数
      languages: [{
        key: 'zh',
        value: '中文'
      }, {
        key: 'en',
        value: '英语'
      }, {
        key: 'fr',
        value: '法语'
      }, {
        key: 'de',
        value: '德语'
      }, {
        key: 'ja',
        value: '日语'
      }],
      // 是否隐藏模型列表和功能设置选择列表
      showPersonList: true,
      showSetupList: true,
      showMainContent: true,
      firstSize: true,
      width: 0
    };
  },
  computed: {
    getUserEmail() {
      let res = '';
      const token = localStorage.getItem('4gai-Token');
      if (token) {
        res = '4gai 欢迎你的到来' + Cookies.get("email")
      } else {
        res = '请点击左侧栏的按钮登录'
      }
      return res
    },
    // 把获取setting列表的操作放到computed计算属性里来，这样才能动态绑定i18n的值
    getSettings() {
      return [{name: this.$t('model.talk'), active: true},
        {name: this.$t('image.title'), active: false},
        {name: this.$t('audio.title'), active: false},
        {name: this.$t('model.prompt_title'), active: false},
      ]
    }
  },
  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  destoryed() {
    window.removeEventListener('resize', this.handleResize)
  },
  mounted() {
    this.chatWindowInfo = {
      img: "",
      name: "ChatGPT",
      detail: this.$t('index.detail'),
      lastMsg: this.$t('index.lastMsg'),
      id: "gpt-3.5-turbo",
      headImg: AI_HEAD_IMG_URL,
      showHeadImg: true
    }
    this.guide()
    this.getRolesList();
    this.getModelList();
    this.getSessionList();
    this.$watch('fileSearch', this.watchFileSearch);
  },
  filters: {},
  watch: {
    modelSearch: {
      handler: function (newVal, oldVal) {
        if (this.personList) {
          this.personList = this.personListCache.filter(person => person.id.includes(newVal))
        } else {
          this.personList = this.personListCache
        }
      }
    },
    sessionSearch: {
      handler: function (newVal, oldVal) {
        if (this.sessionList) {
          this.sessionList = this.sessionCacheList.filter(fileList => fileList.name.includes(newVal))
        } else {
          this.sessionList = this.sessionCacheList
        }
      }
    },
    roleSearch: {
      handler: function (newVal, oldVal) {
        if (this.roleList) {
          this.roleList = this.roleCacheList.filter(fileList => fileList.act.toLowerCase().includes(newVal.toLowerCase()))
        } else {
          this.roleList = this.roleCacheList
        }
      }
    },
    SettingInfo: {
      handler: function (newVal, oldVal) {
        if (newVal.openChangePicture) {
          this.SettingInfo.openProductionPicture = false
        }
        if (newVal.openProductionPicture) {
          this.SettingInfo.openChangePicture = false
        }
      },
      deep: true
    }
  },
  methods: {
    // 指导栏
    guide() {
      introJs().setOptions({
        nextLabel: '下一个',  // 下一个按钮文字
        prevLabel: '上一个',  // 上一个按钮文字
        doneLabel: '立即体验',// 完成按钮文字
        hidePrev: true,       // 在第一步中是否隐藏上一个按钮
        disableInteraction: true,   // 是否禁用与突出显示的框内的元素的交互，就是禁止点击
        keyboardNavigation: true /* 是否允许键盘来操作 */,
        showButtons: true /* 是否按键来操作 */,
        showProgress: false /* 是否显示进度条 */,
        dontShowAgain: true /* 是否再次显示 */,
        dontShowAgainLabel: '不再显示', /* 是否再次的具体文字 */
      }).start()
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
      let _this = this;
      if (this.SettingInfo.openChangePicture) {
        this.updateImage = file
        this.$message.success(this.$t('message.upload_complete'))
        e.target.files = null;
        this.$nextTick(() => {
          this.acqStatus = true
        });
        if (!e || !window.FileReader) return; // 看是否支持FileReader
        let reader = new FileReader();
        reader.readAsDataURL(file); // 关键一步，在这里转换的
        reader.onloadend = function () {
          _this.picture = this.result; //赋值
        };
        return
      }
      this.acqStatus = true
      e.target.files = null;
    },
    savePrompt() {
      localStorage.setItem("prompt", this.SettingInfo.prompt)
      this.$notify({
        message: '系统预设保存成功',
        duration: 5000,
        type: 'success'
      })
    },
    deletePrompt() {
      localStorage.removeItem("prompt")
      this.SettingInfo.prompt = ""
      this.$notify({
        message: '系统预设重置成功',
        duration: 5000,
        type: 'success'
      })
    },
    saveSettingInfo() {
      localStorage.setItem("suffix", this.SettingInfo.chat.suffix)
      localStorage.setItem("stop", this.SettingInfo.chat.stop)
      localStorage.setItem("FrequencyPenalty", this.SettingInfo.chat.FrequencyPenalty)
      localStorage.setItem("PresencePenalty", this.SettingInfo.chat.PresencePenalty)
      localStorage.setItem("MaxTokens", this.SettingInfo.chat.MaxTokens)
      localStorage.setItem("Temperature", this.SettingInfo.chat.Temperature)
      localStorage.setItem("stream", this.SettingInfo.chat.stream)
      localStorage.setItem("n", this.SettingInfo.chat.n)
      this.$notify({
        message: '对话设置保存成功',
        duration: 5000,
        type: 'success'
      })
    },
    deleteSettingInfo() {
      localStorage.removeItem("suffix")
      localStorage.removeItem("stop")
      localStorage.removeItem("FrequencyPenalty")
      localStorage.removeItem("PresencePenalty")
      localStorage.removeItem("MaxTokens")
      localStorage.removeItem("Temperature")
      localStorage.removeItem("stream")
      localStorage.removeItem("n")
      this.SettingInfo.chat.suffix = ""
      this.SettingInfo.chat.stop = ""
      this.SettingInfo.chat.FrequencyPenalty = 0
      this.SettingInfo.chat.PresencePenalty = 0
      this.SettingInfo.chat.MaxTokens = 1024
      this.SettingInfo.chat.Temperature = 1
      this.SettingInfo.chat.stream = true
      this.SettingInfo.chat.n = 0
      this.$notify({
        message: '对话设置重置成功',
        duration: 5000,
        type: 'success'
      })
    },
    bottomButton() {
      this.$refs.chatWindow.scrollBottom()
    },
    upButton() {
      this.$refs.chatWindow.scrollUp()
    },
    getSessionList() {
      return new Promise((resolve, reject) => {
        getChatRoom().then(res => {
          res.list.forEach((element) => {
            this.sessionList.push(element);
            this.sessionCacheList = this.sessionList
          });
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    //导出所有会话到json文件
    exportObjArrAllToJson() {
      this.$refs.chatWindow.exportObjArrToJson()
    },
    // 点击切换显示状态
    toggleLeft() {
      this.showPersonList = !this.showPersonList;
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
      if (isMobile && (this.showPersonList || this.showSetupList)) {
        this.showMainContent = false;
        this.showSetupList = !this.showPersonList;
        document.querySelectorAll('.chatLeft')[0].style.width = '100%';
      } else {
        this.showMainContent = true;
        document.querySelectorAll('.chatLeft')[0].style.width = '20%';
      }
    },
    toggleRight() {
      this.showSetupList = !this.showSetupList;
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
      if (isMobile && (this.showPersonList || this.showSetupList)) {
        this.showMainContent = false;
        this.showPersonList = !this.showSetupList;
        document.querySelectorAll('.chatLeft')[1].style.width = '100%';
      } else {
        this.showMainContent = true;
        document.querySelectorAll('.chatLeft')[1].style.width = '20%';
      }
    },
    // 获取模型列表
    getModelList() {
      getModels().then((modelsRes) => {
        this.personList = modelsRes;
        this.personListCache = modelsRes;
      }).catch(e => {
        this.$message.error(this.$t('message.get_model_fail'))
      })
    },
    //获取角色列表
    getRolesList() {
      getRoles().then((res) => {
        let data = res.data
        this.roleList = data
        this.roleCacheList = data
      }).catch(e => {
        this.$message.error(this.$t('message.get_roles_fail'))
      })
    },
    resize() {
      if (window.innerWidth <= 1150) {
        this.showPersonList = false;
        this.showSetupList = false;
        this.showChatWindow = true;
        const info = {
          img: "",
          name: "ChatGPT",
          detail: "chatgpt v3.5 所基于的模型",
          lastMsg: "chatgpt v3.5 所基于的模型",
          id: "gpt-3.5-turbo",
          headImg: AI_HEAD_IMG_URL,
          showHeadImg: true
        }
        this.chatWindowInfo = info;
        this.personInfo = info;
      } else {
        this.showPersonList = true;
        this.showSetupList = true;
      }
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
    //创建会话
    newSession() {
      this.$prompt('最长15个字符哦', '请输入会话标题', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[\u4e00-\u9fa5\w\s]{1,15}$/,
        inputErrorMessage: '长度不要超过15哦',
      }).then(({value}) => {
        const uuid = generateUUID()
        new Promise((resolve, reject) => {
          createChatRoom(uuid, value).then(() => {
            const newSession = {id: uuid, name: value};
            this.sessionList.unshift(newSession);
            this.sessionCacheList = this.sessionList
            this.$message({
              type: 'success',
              message: '创建成功'
            });
            resolve()
          }).catch(error => {
            this.$message({
              type: 'info',
              message: '创建失败'
            });
            reject(error)
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消创建'
        });
      });
    },
    //模型列表被点击
    modelClick() {
      this.clearCurrent()
      this.cutSetting = 0
    },
    promptClick() {
      this.clearCurrent()
      this.cutSetting = 2
      this.SettingStatus = 3
    },
    //会话列表被点击
    sessionClick() {
      //清除当前点击的状态
      this.clearCurrent()
      this.SettingStatus = 0
      this.cutSetting = 1
      this.SettingInfo.cutSetting = 1
    },
    //角色列表被点击
    roleClick(info) {
      if (!this.showChatWindow) {
        this.$message({
          message: "请选一个模型",
          type: "error",
        });
      } else {
        // const chatWindow = this.$refs.chatWindow;
        this.SettingInfo.prompt = info.prompt;
      }

    },
    clearCurrent() {
      //清除当前选择的模型微调模型
      this.ftCurrent = ""
      //清除当前选择的模型
      this.pcCurrent = "";
      //清除当前选择的会话
      this.sessionCurrent = "";
      //清除当前选择的文件
      this.fiCurrent = "";
    },
    //模型被点击
    clickPerson(info) {
      this.storeStatus = 0;
      //传入当前聊天窗口信息
      this.chatWindowInfo = info;
      //设置当前被点击的对象
      this.personInfo = info;
      //设置当前被点击的模型id
      this.pcCurrent = info.id;
    },
    //会话被点击
    clickSession(info) {
      this.sessionCurrent = info.id;
      // 获取聊天记录到这里
      this.$refs.chatWindow.getMessage(info.id)
    },
    //文件被点击
    clickFile(info) {
      this.chatWindowInfo = {
        img: "",
        name: info.id,
        detail: info.detail,
        lastMsg: info.lastMsg,
        id: info.id
      }
      this.fiCurrent = info.fileId
      this.fileInfo = info
    },
    personCardSort(id) {
      if (typeof this.personList[0] != 'undefined' && id !== this.personList[0].id) {
        console.log(id);
        let nowPersonInfo;
        for (let i = 0; i < this.personList.length; i++) {
          if (this.personList[i].id === id) {
            nowPersonInfo = this.personList[i];
            this.personList.splice(i, 1);
            break;
          }
        }
        this.personList.unshift(nowPersonInfo);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.top-left,
.top-right {
  position: absolute;
  top: 5px;
  z-index: 9999;
}

.button-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.left-btn {
  margin-right: 10px; /* 调整左边按钮与右边按钮之间的距离 */
}

.right-btn {
  margin-left: 10px; /* 调整右边按钮与左边按钮之间的距离 */
}

.top-left {
  left: 5px;
}

.top-right {
  right: 5px;
}

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.boxinput {
  height: 30px;
  line-height: 50px;
  color: #fff;
  margin-top: 10px;
  margin-left: 20px;
  margin-right: 20px;
  width: 90%;
  text-align: center;
  background-color: rgb(66, 70, 86);
  border-radius: 15px;
  border: 1px solid rgb(80, 85, 103);
  position: relative;
  cursor: pointer;
}

.icon {
  margin-right: 10px;
  vertical-align: middle;
}

.send {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: rgb(66, 70, 86);
  border: 0;
  transition: 0.3s;
  box-shadow: 0 0 5px 0 rgb(84, 89, 110);

  &:hover {
    box-shadow: 0 0 10px 0 rgb(91, 219, 239);
  }
}

.weitiao {
  margin-top: 10px;
  width: 100%;
  margin-left: 0;
  margin-right: 0;
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

  &:focus {
    outline: none;
  }
}

.fineTune {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: rgb(66, 70, 86);
  border: 0;
  transition: 0.3s;
  box-shadow: 0 0 5px 0 rgb(84, 89, 110);

  &:hover {
    box-shadow: 0 0 10px 0 rgb(29, 144, 245);
  }
}

.session {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: rgb(66, 70, 86);
  border: 0;
  transition: 0.3s;
  box-shadow: 0 0 5px 0 rgb(84, 89, 110);
  margin-left: 0;
  margin-right: 0;
  width: 99%;

  &:hover {
    box-shadow: 0 0 10px 0 rgb(29, 144, 245);
  }
}

.inputs {
  width: 65%;
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

.whiteText {
  color: #fff;
}

::v-deep .el-input__inner {
  background-color: transparent;
  color: #409EFF;
}

.setting {
  margin-left: 0;
  padding-left: 10px;
  color: rgb(176, 178, 189);
}

.setting.active {
  color: #fff; // 选中后的颜色
}

.setting:hover {
  cursor: pointer;
}

#jianbian {
  background-color: rgb(39, 42, 55);
  border-color: #409EFF;
  color: #fff;
  border-width: 0;
}

.astrict {
  width: 90%;
}

.settingButton {
  width: 99%;
}

.block {
  margin-top: 5%;

  .demonstration {
    color: aliceblue;
    text-align: center;
  }

  .chat-img {
    img {
      max-width: 300px;
      max-height: 200px;
      border-radius: 10px;
    }
  }

  .upload-image {
    span {
      font-size: 30px
    }

    input {
      display: none;
    }
  }
}

.iconfont:hover {
  color: rgb(29, 144, 245);

  .block {
    opacity: 1;
  }
}

.inputs {
  width: 90%;
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

.chatHome {
  display: flex;
  height: 91vh;

  .chatLeft {
    width: 20%;

    .title {
      color: #fff;
      padding-left: 10px;
      margin-top: 10px;
    }

    .online-person {
      .onlin-text {
        margin-left: 20%;
        padding-left: 10px;
        color: rgb(176, 178, 189);
      }

      .s-wrapper {
        padding-left: 10px;
        height: 70vh;
        margin-top: 10px;
        overflow: hidden;
        overflow-y: scroll;
        box-sizing: border-box;

        &::-webkit-scrollbar {
          width: 0;
          /* Safari,Chrome 隐藏滚动条 */
          height: 0;
          /* Safari,Chrome 隐藏滚动条 */
          display: none;
          /* 移动端、pad 上Safari，Chrome，隐藏滚动条 */
        }
      }
    }
  }

  .chatRight {
    flex: 1;
    padding-right: 0;

    .showIcon {
      position: absolute;
      top: calc(50% - 150px);
      /*垂直居中 */
      left: calc(50% - 50px);

      /*水平居中 */
      .icon-snapchat {
        width: 300px;
        height: 300px;
        font-size: 300px;
        // color: rgb(28, 30, 44);
      }
    }
  }
}

@media only screen and (min-width: 768px) { // 当屏幕宽度大于或等于768px时
  .chatHome {
    .chatRight {
      padding-right: 30px;
    }
  }
}
</style>
