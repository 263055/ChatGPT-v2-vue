<template>
  <div class="nav">
    <!--顶部栏左斌-->
    <div v-show="asideStatus" class="left-header">
      4gai Manager
    </div>
    <!--图标-->
    <div class="nav-menu-wrapper">
      <ul class="menu-list">
        <li v-for="(item, index) in menuList"
            :key="index"
            :class="{ activeNav: index === current }"
            @click="changeMenu(index)">
          <!--按钮上方的蓝色显示-->
          <div class="block"></div>
          <!--按钮的具体展示-->
          <svg-icon :class="item" :icon-class="item" class="iconfont"/>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {USER_HEAD_IMG_URL} from '@/store/mutation-types'
import SvgIcon from "../components/SvgIcon.vue";

export default {
  components: {
    SvgIcon
  },
  data() {
    return {
      menuList: [
        "house",
        "message",
        "gear",
        "user",
      ],
      current: 0,
      asideStatus: true,
      imgUrl: USER_HEAD_IMG_URL
    };
  },
  created() {
    this.updateCurrent()
    window.addEventListener('resize', this.resize)
    this.resize()
  },

  destoryed() {
    window.removeEventListener('resize', this.resize)
  },

  methods: {
    changeMenu(index) {
      switch (index) {
        case 0:
          this.$router.push({
            name: "Login",
          }, () => {
          });
          break;
        case 1:
          this.$router.push({
            name: "ChatHome",
          }, () => {
          });
          break;
        case 2:
          this.$router.push({
            name: "Setting",
          }, () => {
          });
          break;
        case 3:
          this.$router.push({
            name: "Order",
          }, () => {
          });
          break;
        default:
          this.$router.push({
            name: "ChatHome",
          });
      }

      this.current = index;
    },
    updateCurrent() {
      const url = this.$route.path;
      if (url === '/Login') {
        this.current = 0
      } else if (url === '/ChatHome') {
        this.current = 1
      } else if (url === '/Setting') {
        this.current = 2
      } else {
        this.current = 1
      }
    },
    //监听窗口尺寸的变化
    resize() {
      this.asideStatus = window.innerWidth > 800;
    },
  },
}
;
</script>

<style lang="scss" scoped>
.nav {
  color: #fff;
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100vw;
  height: 8vh;
  background: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, .8)), to(rgba(0, 0, 0, .2)));
  background: linear-gradient(180deg, rgba(0, 0, 0, .8), rgba(0, 0, 0, .2));
  //background: #159957;
  //background-image: -webkit-linear-gradient(330deg, #155799, #159957);
  //background-image: linear-gradient(120deg, #155799, #159957);

  .left-header {
    width: 32%;
    background: url("../assets/left-header.png") no-repeat;
    background-size: 100% 100%;
    font-weight: 700;
    text-align: center;
    line-height: 60px;
    font-size: 1.45833vw;
  }

  .nav-menu-wrapper {
    box-sizing: border-box;
    width: 60%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 70px;

    .menu-list {
      display: flex;

      li {
        margin: 0 30px;
        list-style: none;
        position: relative;

        //最左边的蓝色提示
        .block {
          background-color: rgb(29, 144, 245);
          position: absolute;
          top: -10px;
          left: -3px;
          width: 30px;
          height: 6px;
          transition: 0.5s;
          border-bottom-right-radius: 4px;
          border-bottom-left-radius: 4px;
          opacity: 0;
        }

        // 鼠标移动到按钮的时候高亮显示
        &:hover {
          .svg-icon {
            color: rgb(29, 76, 162);
          }

          .block {
            opacity: 1;
          }
        }
      }
    }
  }
}

// 点击按钮之后保持高亮
.activeNav {
  .svg-icon {
    color: rgb(22, 81, 134);
  }

  .block {
    opacity: 1 !important;
  }
}

@media only screen and (max-width: 800px) {
  .nav {
    .nav-menu-wrapper {
      width: 100%;
      justify-content: center;
      padding-right: 10px;
    }
  }
}
</style>
