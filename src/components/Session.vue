<template>
  <div :class="{ activeCard: sessionInfo.id === current }" class="person-card">
    <div class="info">
      <div class="info-detail">
        <div class="name">{{ sessionInfo.name }}</div>
        <div class="detail">
          <div v-show="!isDelete">
            <i class="el-icon-refresh-left" @click="updateSessionName"></i>
            <i class="el-icon-delete" @click="openDeleteSessionName"></i>
          </div>
          <div v-show="isDelete">
            <i class="el-icon-check" @click="deleteSession"></i>
            <i class="el-icon-close" @click="closeDeleteSessionName"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {deleteSession, updateChatRoom} from "@/api/session";

export default {
  components: {},
  props: {
    sessionInfo: {
      default: {},
    },
    sessionList: {
      default: {},
    },
    pcCurrent: {
      default: ''
    }
  },
  data() {
    return {
      current: '',
      isDelete: false,
    }
  },
  watch: {
    pcCurrent: function () {
      this.isActive()
    }
  },
  methods: {
    updateSessionName() {
      this.$prompt('最长15个字符哦', '修改会话标题', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[\u4e00-\u9fa5\w\s]{1,15}$/,
        inputErrorMessage: '长度不要超过15哦',
      }).then(({value}) => {
        const uuid = this.sessionInfo.id;
        new Promise((resolve, reject) => {
          updateChatRoom(uuid, value).then(() => {
            this.sessionInfo.name = value;
            this.$message({
              type: 'success',
              message: '修改成功'
            });
            resolve()
          }).catch(error => {
            this.$message({
              type: 'info',
              message: '修改失败'
            });
            reject(error)
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消修改'
        });
      });
    },

    openDeleteSessionName() {
      this.isDelete = true;
    },

    closeDeleteSessionName() {
      this.isDelete = false;
    },

    deleteSession() {
      new Promise((resolve, reject) => {
        const uuid = this.sessionInfo.id;
        deleteSession(uuid).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功'
          });
          // 删除成功后，从sessionList中删除对应的sessionInfo
          const index = this.sessionList.findIndex(session => session.id === uuid);
          if (index !== -1) {
            this.sessionList.splice(index, 1);
          }
          this.isDelete = false;
          console.log(this.sessionList)
          resolve()
        }).catch(error => {
          this.$message({
            type: 'info',
            message: '删除失败'
          });
          reject(error)
        })
      })
    },

    isActive() {
      this.current = this.pcCurrent
    },
    truncateString(str, num) {
      if (str.length <= num) {
        return str;
      }
      return str.slice(0, num) + "...";
    },
  }
};
</script>

<style lang="scss" scoped>
.person-card {
  width: 100%;
  height: 60px;
  border-radius: 10px;
  background-color: rgb(50, 54, 68);
  position: relative;
  margin: 25px 0;
  cursor: pointer;

  .info {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 90%;
    transform: translate(-50%, -50%);
    overflow: hidden;
    display: flex;
  }

  .info-detail {
    margin-top: 5px;
    margin-left: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
  }

  .name {
    color: #fff;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-right: 20px;
    font-size: 20px;
  }

  .detail {
    color: #fff;
    font-size: 15px;
    display: flex;
    align-items: center;
  }

  .detail i {
    margin-left: 10px;
    margin-right: 0;
  }

  &:hover {
    background-color: #1d90f5;
    transition: 0.3s;
    box-shadow: 0 0 10px 0 rgba(0, 136, 255);
    // box-shadow:  0 5px 20px rgba(251, 152, 11, .5);
    .info {
      .info-detail {
        .detail {
          color: #fff;
        }
      }
    }
  }
}

.activeCard {
  background-color: #1d90f5;
  transition: 0.3s;
  box-shadow: 3px 2px 10px 0 rgba(0, 136, 255);

  .info {
    .info-detail {
      .detail {
        color: #fff;
      }
    }
  }
}
</style>
