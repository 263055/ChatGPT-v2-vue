<template>
  <div class="chatHome">
    <!--聊天室左侧-->
    <div class="chatLeft" style="width:20%" v-show="showPersonList">
      <div class="title" style="text-align: center;">
        <h2>4gai Manager</h2>
      </div>
      <div class="online-person" style="margin-top: 5%;">
        <!--上方的按钮-->
        <el-row :gutter="18">
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
            <div class="personList" v-for="personInfo in personList" :key="personInfo.id"
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
            <div v-for="sessionInfo in sessionList" :key="sessionInfo.id" @click="clickSession(sessionInfo)">
              <Session :sessionInfo="sessionInfo" :pcCurrent="sessionCurrent"></Session>
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
    <!--聊天室右侧-->
    <div class="chatRight">
      <!--折叠面板-->
      <div class="top-left" @click="toggleLeft">
        <svg x="1679366341860" class="icon" v-show="!showPersonList" viewBox="0 0 1024 1024" version="1.1"
             xmlns="http://www.w3.org/2000/svg" p-id="5764" width="30" height="30">
          <path
              d="M912.8 513.2C912.8 733.1 733.9 912 514 912S115.2 733.1 115.2 513.2 294.1 114.3 514 114.3s398.8 179 398.8 398.9z m-701.5 0c0 166.9 135.8 302.7 302.7 302.7s302.7-135.8 302.7-302.7S680.9 210.5 514 210.5 211.3 346.3 211.3 513.2z"
              fill="#BDD2EF" p-id="5765"></path>
          <path
              d="M626.8 345.9c0 15-5.7 30.1-17.2 41.5L487.1 510l122.6 122.6c22.9 22.9 22.9 60.2 0 83.1-22.9 22.9-60.2 22.9-83.1 0L362.4 551.6c-22.9-22.9-22.9-60.2 0-83.1l164.1-164.1c22.9-22.9 60.2-22.9 83.1 0 11.5 11.5 17.2 26.5 17.2 41.5z"
              fill="#2867CE" p-id="5766"></path>
        </svg>
        <svg x="1679366707602" class="icon" v-show="showPersonList" viewBox="0 0 1024 1024" version="1.1"
             height="30" p-id="7551" width="30" xmlns="http://www.w3.org/2000/svg">
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
             height="30" p-id="7551" width="30" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M514 912c-219.9 0-398.8-178.9-398.8-398.9 0-219.9 178.9-398.8 398.8-398.8s398.8 178.9 398.8 398.8c0 220-178.9 398.9-398.8 398.9z m0-701.5c-166.9 0-302.7 135.8-302.7 302.7S347.1 815.9 514 815.9s302.7-135.8 302.7-302.7S680.9 210.5 514 210.5z"
              fill="#BDD2EF" p-id="7552"></path>
          <path
              d="M402.5 677.3c0-15 5.7-30.1 17.2-41.5l122.6-122.6-122.6-122.6c-22.9-22.9-22.9-60.2 0-83.1 22.9-22.9 60.2-22.9 83.1 0l164.1 164.1c22.9 22.9 22.9 60.2 0 83.1L502.8 718.8c-22.9 22.9-60.2 22.9-83.1 0-11.5-11.4-17.2-26.5-17.2-41.5z"
              fill="#2867CE" p-id="7553"></path>
        </svg>
        <svg x="1679366341860" class="icon" v-show="showSetupList" viewBox="0 0 1024 1024" version="1.1"
             height="30" p-id="5764" width="30" xmlns="http://www.w3.org/2000/svg">
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
        <ChatWindow ref="chatWindow" :frinedInfo="chatWindowInfo" :settingInfo="SettingInfo" :storeStatu="storeStatus"
                    @personCardSort="personCardSort">
        </ChatWindow>
      </div>
      <div class="showIcon" v-else>
        <svg x="1679552353056" class="icon iconfont icon-snapchat" viewBox="0 0 1024 1024" version="1.1"
             height="200" p-id="3488" width="200" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M992.33 416.37c17.66 0 31.98-14.32 31.98-31.98s-14.32-31.98-31.98-31.98h-63.98v-63.96h63.98c17.66 0 31.98-14.32 31.98-31.98s-14.32-31.98-31.98-31.98h-63.98v-95.94c0.01-8.48-3.36-16.62-9.35-22.62-6-6-14.14-9.37-22.62-9.36h-95.94V32.61c0-17.67-14.32-31.98-31.98-31.98-17.67 0-31.98 14.32-31.98 31.98v63.96h-63.96V32.61c0-17.67-14.32-31.98-31.98-31.98-17.67 0-31.98 14.32-31.98 31.98v63.96H544.6V32.61c0-17.67-14.32-31.98-31.98-31.98-17.67 0-31.98 14.32-31.98 31.98v63.96h-63.96V32.61c0-17.67-14.32-31.98-31.98-31.98s-31.98 14.32-31.98 31.98v63.96h-63.96V32.61c0-17.67-14.32-31.98-31.98-31.98S224.8 14.95 224.8 32.61v63.96h-95.94c-8.48 0-16.62 3.36-22.62 9.36s-9.36 14.14-9.36 22.62v95.94H32.92c-17.67 0-31.98 14.32-31.98 31.98s14.32 31.98 31.98 31.98h63.96v63.96H32.92c-17.67 0-31.98 14.32-31.98 31.98 0 17.67 14.32 31.98 31.98 31.98h63.96v63.97H32.92c-17.66 0-31.97 14.31-31.97 31.97 0 17.65 14.31 31.97 31.97 31.97h63.96v63.98H32.92c-17.66 0-31.97 14.31-31.97 31.97 0 17.66 14.31 31.97 31.97 31.97h63.96v63.98H32.92C15.26 736.18 0.95 750.5 0.95 768.15s14.31 31.97 31.97 31.97h63.96v95.95a31.944 31.944 0 0 0 9.36 22.62c6 5.99 14.14 9.36 22.62 9.35h95.94v63.98c0 17.66 14.32 31.98 31.98 31.98 17.67 0 31.98-14.32 31.98-31.98v-63.98h63.96v63.98c0 17.66 14.32 31.98 31.98 31.98 17.67 0 31.98-14.32 31.98-31.98v-63.98h63.96v63.98c0 17.66 14.32 31.98 31.98 31.98s31.98-14.32 31.98-31.98v-63.98h63.96v63.98c0 17.66 14.32 31.98 31.98 31.98s31.98-14.32 31.98-31.98v-63.98h63.96v63.98c0 17.66 14.32 31.98 31.98 31.98s31.98-14.32 31.98-31.98v-63.98h95.94c8.48 0.02 16.62-3.35 22.62-9.35s9.37-14.14 9.35-22.62v-95.95h63.98c17.65 0 31.97-14.31 31.97-31.97 0-17.66-14.31-31.97-31.97-31.97h-63.98V672.2h63.98c17.65 0 31.97-14.31 31.97-31.97 0-17.66-14.31-31.97-31.97-31.97h-63.98v-63.98h63.98c17.65 0 31.97-14.31 31.97-31.97 0-17.66-14.31-31.97-31.97-31.97h-63.98v-63.97h63.98zM864.41 864.1H160.84V160.53h703.57V864.1zM406.82 580.42h79.2l15.48 61.56h67.68l-83.16-267.84h-77.04l-83.16 267.84h65.52l15.48-61.56z m18-72.36c6.84-26.64 14.04-57.96 20.52-86.04h1.44c7.2 27.36 14.04 59.4 21.24 86.04l5.76 22.68h-54.72l5.76-22.68zM697.7 641.98h-64.44V374.14h64.44v267.84z"
              p-id="3489"></path>
        </svg>
      </div>
    </div>
    <!--右侧栏是否展示-->
    <div class="chatLeft" v-show="showSetupList">
      <!--api key-->
      <el-card shadow="hover" id="jianbian" style="line-height: 120%;text-align: center;">
        <div>
          <input class="inputs" v-model="SettingInfo.KeyMsg" :placeholder="$t('placeholder.openai_key')"
                 type="password" autocomplete="new-password"
                 style="width: 100%; margin-left: 0;margin-right: 0;"/>
        </div>
      </el-card>

      <div class="online-person">
        <!--展示右侧栏的按钮 aaaa -->
        <el-row :gutter="20">
          <el-col v-for="(setting, index) in getSettings" :key="index" :span="6">
            <span :class="{ active: SettingStatus === index }" class="setting"
                  @click="SettingStatus = index">{{ setting.name }}</span>
          </el-col>
        </el-row>

        <div class="s-wrapper" style="height: 75vh;">
          <!--对话设置-->
          <el-collapse-transition>
            <div v-show="SettingStatus === 0">
              <!--联网设置-->
              <div class="block" v-show="SettingInfo.openNet">
                <div class="block">
                  <el-tooltip class="item" effect="dark" :content="$t('model.online')" placement="top">
                    <span class="demonstration">{{ $t('model.online_title') }}</span>
                  </el-tooltip>
                  <el-switch v-model="SettingInfo.openNet" :width="defaulWidth" style="margin-left: 15%;"></el-switch>
                </div>
                <el-tooltip class="item" effect="dark" :content="$t('model.max_results_title')" placement="top">
                  <span class="demonstration" style="">{{ $t('model.max_results') }}</span>
                </el-tooltip>

                <el-slider class="astrict" v-model="SettingInfo.max_results" :step="1" :min="0" :max="6"></el-slider>
              </div>
              <!--不联网-->
              <div v-show="!SettingInfo.openNet">
                <!--prompt预设-->
                <div class="block">
                  <el-tooltip :content="$t('model.prompt')" class="item" effect="dark" placement="top">
                    <span class="demonstration">{{ $t('model.prompt_title') }}</span>
                  </el-tooltip>
                  <input v-model="SettingInfo.prompt" :placeholder="$t('placeholder.prompt')" class="weitiao"/>
                </div>
                <!--后缀-->
                <div class="block">
                  <el-tooltip class="item" effect="dark" :content="$t('model.suffix')" placement="top">
                    <span class="demonstration">{{ $t('model.suffix_title') }}</span>
                  </el-tooltip>
                  <input v-model="SettingInfo.chat.suffix" :placeholder="$t('placeholder.suffix')" class="weitiao"/>
                </div>
                <!--停用词-->
                <div class="block">
                  <el-tooltip class="item" effect="dark" :content="$t('model.stop')" placement="top">
                    <span class="demonstration" is>{{ $t('model.stop_title') }}</span>
                  </el-tooltip>

                  <input v-model="SettingInfo.chat.stop" :placeholder="$t('placeholder.stop')" class="weitiao"/>
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
                <!--保留词-->
                <div class="block">
                  <el-tooltip class="item" effect="dark" :content="$t('model.top_p')" placement="top">
                    <span class="demonstration" is>{{ $t('model.top_p_title') }}</span>
                  </el-tooltip>
                  <el-slider class="astrict" v-model="SettingInfo.chat.TopP" :step="0.1" :min="0" :max="1"></el-slider>
                </div>
                <!--流输出-->
                <div class="block">
                  <el-tooltip class="item" effect="dark" :content="$t('model.stream')" placement="top">
                    <span class="demonstration">{{ $t('model.stream_title') }}</span>
                  </el-tooltip>
                  <el-switch v-model="SettingInfo.chat.stream" :width="defaulWidth"
                             style="margin-left: 15%;"></el-switch>
                </div>
                <!--回显词-->
                <div class="block">
                  <el-tooltip class="item" effect="dark" :content="$t('model.echo')" placement="top">
                    <span class="demonstration">{{ $t('model.echo_title') }}</span>
                  </el-tooltip>
                  <el-switch v-model="SettingInfo.chat.echo" :width="defaulWidth" style="margin-left: 22%;"></el-switch>
                </div>
                <!--是否联网-->
                <div class="block">
                  <el-tooltip class="item" effect="dark" :content="$t('model.online')" placement="top">
                    <span class="demonstration">{{ $t('model.online_title') }}</span>
                  </el-tooltip>
                  <el-switch v-model="SettingInfo.openNet" :width="defaulWidth" style="margin-left: 15%;"></el-switch>
                </div>
              </div>
              <!-- <div class="block">
                <el-tooltip class="item" effect="dark" content="开启读文模式" placement="top">
                  <span class="demonstration">开启读文模式</span>
                </el-tooltip>
                <el-switch v-model="SettingInfo.readefile" :width="defaulWidth"
                  style="margin-left: 15%;"></el-switch>
              </div>
              <div style="height: 30px;"></div> -->
            </div>
          </el-collapse-transition>
          <!--图片设置-->
          <el-collapse-transition>
            <div v-show="SettingStatus === 1">

              <div class="block">
                <el-tooltip class="item" effect="dark" :content="$t('image.production_title')" placement="top">
                  <span class="demonstration">{{ $t('image.production') }}</span>
                </el-tooltip>
                <el-switch v-model="SettingInfo.openProductionPicture" :width="defaulWidth"
                           style="margin-left: 15%;"></el-switch>
              </div>

              <div class="block">
                <el-tooltip class="item" effect="dark" :content="$t('image.change_title')" placement="top">
                  <span class="demonstration">{{ $t('image.change') }}</span>
                </el-tooltip>
                <el-switch v-model="SettingInfo.openChangePicture" :width="defaulWidth"
                           style="margin-left: 15%;"></el-switch>
              </div>

              <div class="block">
                <el-tooltip class="item" effect="dark" :content="$t('image.size_title')" placement="top">
                  <span class="demonstration">{{ $t('image.size') }}</span>
                </el-tooltip>
                <div>
                  <el-select v-model="SettingInfo.size" placeholder="请选择" style="margin-top: 10px;">
                    <el-option v-for="item in imgSizes" :key="item.value" :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </div>

              <div class="block">
                <el-tooltip class="item" effect="dark" :content="$t('image.count_title')" placement="top">
                  <span class="demonstration">{{ $t('image.count') }}</span>
                </el-tooltip>
                <el-slider class="astrict" v-model="SettingInfo.n" :step="1" :min="-1" :max="10"></el-slider>
              </div>

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
                    <el-option v-for="item in languages" :key="item.value" :value="item.value">
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
          <!--会话-->
          <el-collapse-transition>
            <div v-show="SettingStatus === 3">
              <div class="session boxinput" @click="newSession">
                <svg t="1679215361568" class="icon" viewBox="0 0 1024 1024" version="1.1"
                     height="25" p-id="3128" width="25" xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M512.001024 0A512 512 0 0 0 0.001024 512a506.88 506.88 0 0 0 92.16 292.352V972.8a51.2 51.2 0 0 0 51.2 51.2H512.001024a512 512 0 0 0 0-1024z m0 921.6H194.561024v-134.144a51.2 51.2 0 0 0-10.24-30.72A406.016 406.016 0 0 1 102.401024 512a409.6 409.6 0 1 1 409.6 409.6z"
                      fill="#ffffff" p-id="3129"></path>
                  <path
                      d="M716.801024 486.4a51.2 51.2 0 0 0-51.2 51.2 153.6 153.6 0 0 1-307.2 0 51.2 51.2 0 0 0-102.4 0 256 256 0 0 0 512 0 51.2 51.2 0 0 0-51.2-51.2z"
                      fill="#ffffff" p-id="3130"></path>
                </svg>
                {{ $t('session.create') }}
              </div>
              <div class="session boxinput" @click="exportObjArrAllToJson"
                   style="margin-left: 0;margin-right: 0;width: 99%;">
                <span class="iconfont icon-daochu" style="color: #fff; margin-right:10px;"></span>
                {{ $t('session.export') }}
              </div>
              <div class="session boxinput" @click="importFromJsonArrAll">
                <span class="iconfont icon-daoru" style="color: #fff; margin-right:10px;"></span>
                {{ $t('session.import') }}
                <input type="file" ref="onupdateJosnArrAll" @change="handleFileUploadAll" style="display: none;">
              </div>
              <div class="session boxinput" @click="clearAllContext">
                <span class="iconfont icon-qingchu" style="color: #fff; margin-right:10px;"></span>
                {{ $t('session.clear') }}
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
import {
  cancelFineTune,
  createFineTune,
  deleteFile,
  deleteFineTuneModel,
  getFilesList,
  getFineTunesList,
  getModels,
  getRoles,
  retrieveFile,
  retrieveFineTune,
  uploadFile
} from "@/api/getData";

import {getNowTime, JCMFormatDate, JCMFormatTimestamp} from "@/util/util";

const {Configuration, OpenAIApi} = require("openai");
export default {
  name: "App",
  components: {
    RoleCard,
    PersonCard,
    ChatWindow,
    Session,
    File
  },
  data() {
    return {
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
        prompt: "",
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
        language: "zh",
        chat: {
          suffix: "",
          MaxTokens: localStorage.getItem("MaxTokens") == null ? 5 : localStorage.getItem("MaxTokens"),
          Temperature: 1,
          TopP: 1,
          n: 1,
          stream: true,
          echo: false,
          stop: "",
          FrequencyPenalty: 0,
          PresencePenalty: 0,
        },
        openNet: false,
        max_results: 3,
        fineTunes: {
          training_file: "",
          model: "curie",
          n_epochs: 4,
          prompt_loss_weight: 0.01,
          suffix: ""
        }
      },
      //当前点击的文件
      fiCurrent: "",
      //当前点击的模型
      pcCurrent: "",
      //当前点击的角色
      prCurrent: "",
      //当前点击的会话
      sessionCurrent: "",
      //当前点击的微调模型 aaaa
      ftCurrent: "",
      // //微调搜索数据
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
        value: 'zh'
      }, {
        value: 'en'
      }, {
        value: 'fr'
      }, {
        value: 'de'
      }, {
        value: 'ja'
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
    // 把获取setting列表的操作放到computed计算属性里来，这样才能动态绑定i18n的值
    getSettings() {
      return [{name: this.$t('model.talk'), active: true}, // aaaa
        {name: this.$t('image.title'), active: false},
        {name: this.$t('audio.title'), active: false},
        {name: this.$t('session.title'), active: false},
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
    if (this.SettingInfo.KeyMsg) {
      this.getModelList(this.SettingInfo.KeyMsg);
    }
    this.getRolesList();
    this.$watch('fileSearch', this.watchFileSearch);
  },
  filters: {
    // //截取数据到小数点后几位
    // numFilterReserved(value, digit) {
    //   return parseFloat(value).toFixed(digit)
    // }
  },
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
    fineTuningSearch: {
      handler: function (newVal, oldVal) {
        if (this.fineTuningList) {
          if (!this.cancelFineStatus) {
            this.fineTuningList = this.fineTuningCacheList.filter(fineTunin => fineTunin.fineTunesStatus === "succeeded").filter(fineTuning => fineTuning.id.includes(newVal))
          } else {
            this.fineTuningList = this.fineTuningCacheList.filter(fineTuning => fineTuning.id.includes(newVal))
          }
        } else {
          if (!this.cancelFineStatus) {
            this.fineTuningList = this.fineTuningCacheList.filter(fineTunin => fineTunin.fineTunesStatus === "succeeded")
          } else {
            this.fineTuningList = this.fineTuningCacheList
          }
        }

      }
    },
    fileSearch: {
      handler: function (newVal, oldVal) {
        if (this.fileList) {
          this.fileList = this.fileCacheList.filter(fileList => fileList.id.includes(newVal))
        } else {
          this.fileList = this.fileCacheList
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
        if (newVal.fineTunes.batch_size) {
          this.SettingInfo.fineTunes.batch_size = parseInt(newVal.fineTunes.batch_size)
        } else {
        }
        if (newVal.fineTunes.validation_file) {
          this.SettingInfo.fineTunes.validation_file = newVal.fineTunes.validation_file
        }
        if (newVal.fineTunes.learning_rate_multiplier) {
          this.SettingInfo.fineTunes.learning_rate_multiplier = parseInt(newVal.fineTunes.learning_rate_multiplier)
        }
        if (newVal.KeyMsg && newVal !== oldVal) {
          //获取模型列表
          getModels(newVal).then((res) => {
            this.personList = res;
            this.personListCache = res;
          }).catch(e => {
            this.$message.error(this.$t('message.get_model_fail'))
          })
        }
      },
      deep: true
    }
  },
  methods: {
    //导入会话列表触发的方法
    importFromJsonArrAll() {
      this.$refs.onupdateJosnArrAll.click(); // 触发选择文件的弹框
    },
    handleFileUploadAll(event) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const fileContent = reader.result; // 文件内容
        this.sessionList = JSON.parse(fileContent)  // 转换为数组
      };
      reader.readAsText(file);
    },
    //导出所有会话到json文件
    exportObjArrAllToJson() {
      let jsonString = JSON.stringify(this.sessionList); // 将数组转为JSON字符串
      let blob = new Blob([jsonString], {type: "application/json;charset=utf-8"});
      saveAs(blob, "data.json");
    },

    //清除所有的会话内容
    clearAllContext() {
      this.sessionList = []
    },
    //清除当前会话内容
    clearCurrentContext() {
      this.$refs.chatWindow.clearMsgList()
    },
    // 点击切换显示状态
    toggleLeft() {
      console.log("left clicked")
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
      console.log("right clicked")
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
    //获取模型列表
    getModelList(key) {
      getModels(key).then((modelsRes) => {
        // 提取fineTunesRes集合中所有id属性值
        getFineTunesList(key).then((fineTunesRes) => {
          const fineTunesIds = fineTunesRes.map(item => item.id);
          const models = modelsRes.filter(item => !fineTunesIds.includes(item.id));
          this.personList = models;
          this.personListCache = models;
        })
        // this.updateMoneyInfo()
      }).catch(e => {
        this.$message.error(this.$t('message.get_model_fail'))
      })
    },
    //获取微调模型列表
    getFineTunessList(key) {
      getFineTunesList(key).then((res) => {
        this.fineTuningCacheList = res
        if (this.cancelFineStatus === true) {
          this.fineTuningList = this.fineTuningCacheList
        } else {
          this.fineTuningList = this.fineTuningCacheList.filter(fineTunin => fineTunin.fineTunesStatus === "succeeded")
        }
      }).catch(e => {
        this.$message.error(this.$t('message.get_model_fail'))
      })
    },
    //获取文件列表
    getFilessList(key) {
      getFilesList(key).then((res) => {
        this.fileList = res
        this.fileCacheList = res
      }).catch(e => {
        this.$message.error(this.$t('message.get_files_fail'))
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
      //获取当前会话长度
      const currentLen = this.sessionList.length + 1
      //定义对象
      const obj = {
        "id": currentLen,
        "title": "",
        "dataList": []
      }
      //先获取对话的列表
      const msgList = this.$refs.chatWindow.getMesList();
      if (msgList.length >= 2) {
        if (this.sessionCurrent) {
          this.sessionCurrent = ""
          //清除当前窗口数据
          this.$refs.chatWindow.clearMsgList();
        } else {
          obj.title = msgList[0].msg
          obj.dataList = msgList;
          let tempSessionList = this.sessionList;
          tempSessionList.push(obj)

          this.sessionList = tempSessionList.reverse();
          this.sessionCurrent = "";
          //清除当前窗口数据
          this.$refs.chatWindow.clearMsgList();
        }
      } else if (msgList.length === 1) {
        //清除当前窗口数据
        this.$refs.chatWindow.clearMsgList();
      }
    },
    //模型列表被点击
    modelClick() {
      this.clearCurrent()
      // this.getModelList(this.SettingInfo.KeyMsg)
      this.SettingStatus = 0
      this.cutSetting = 0
      this.SettingInfo.cutSetting = 0
    },
    promptClick() {
      this.clearCurrent()
      this.cutSetting = 2
      this.SettingInfo.cutSetting = 0
    },
    //会话列表被点击
    sessionClick() {
      //清除当前点击的状态
      this.clearCurrent()
      this.SettingStatus = 3
      this.cutSetting = 1
      this.SettingInfo.cutSetting = 1
      this.chatWindowInfo = {
        img: "",
        name: "ChatGPT",
        detail: "chatgpt v3.5 所基于的模型",
        lastMsg: "chatgpt v3.5 所基于的模型",
        id: "gpt-3.5-turbo",
        headImg: AI_HEAD_IMG_URL,
        showHeadImg: true
      }
      // this.showChatWindow = true;
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
    //文件列表被点击
    fileClick() {
      this.clearCurrent()
      //清除被点击的微调对象
      this.SettingStatus = 4;
      this.cutSetting = 3
      this.SettingInfo.cutSetting = 3
      //获取微调模型列表
      this.getFilessList(this.SettingInfo.KeyMsg)
    },
    //上传文件按钮被点击触发的方法
    uploadFile() {
      this.$refs.fileInput.click();
    },
    //文件上传触发的方法
    onFileChange(e) {
      //获取文件
      const file = e.target.files[0];
      // 验证文件类型是否为jsonl格式
      if (!file.name.endsWith('.jsonl')) {
        this.$message.warning(this.$t('message.valid_json'))
        return;
      }
      // 通过验证后，上传文件
      const formData = new FormData();
      formData.append("file", file);
      formData.append("purpose", "fine-tune");
      uploadFile(formData, this.SettingInfo.KeyMsg).then((res) => {
        this.$copy(res.id, this.$t('index.up_file_id') + res.id + this.$t('index.copy'))
        //更新文件列表
        this.getFilessList(this.SettingInfo.KeyMsg)
      })
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
      this.$refs.chatWindow.assignmentMesList(info.dataList)
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
    //删除文件
    deleteOnFile() {
      if (!this.fileInfo || !this.fileInfo.fileId) {
        this.$message.error(this.$t('message.only_del_file'))
      } else {
        deleteFile(this.fileInfo.fileId, this.SettingInfo.KeyMsg).then((res) => {
          this.$message.success(this.$t('message.del_file_succ'))
          this.getFilessList(this.SettingInfo.KeyMsg)
        }).catch(e => {
          this.$message.error(this.$t('message.del_fail'))
        })
      }
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
  cursor: pointer;
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
  //height: 50px;
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
  // margin-top: 20px;
  display: flex;

  .chatLeft {
    width: 20%;

    .title {
      color: #fff;
      padding-left: 10px;
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
    padding-right: 0px;

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
