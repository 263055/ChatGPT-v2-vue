<template>
  <div class="nav">
    <div class="nav-menu-wrapper">
      <ul class="menu-list">
        <li
            v-for="(item, index) in menuList"
            :key="index"
            :class="{ activeNav: index === current }"
            @click="changeMenu(index)"
        >
          <div class="block"></div>
          <span class="iconfont" :class="item"></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {USER_HEAD_IMG_URL} from '@/store/mutation-types'

export default {

  data() {
    return {
      menuList: [
        "icon-weidenglu",
        "icon-xinxi",
        "icon-shezhi",
      ],
      current: 0,
      imgUrl: USER_HEAD_IMG_URL
    };
  },
  created() {
    this.updateCurrent()
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
    }
  },
};
</script>

<style lang="scss" scoped>
.nav {
  width: 100%;
  height: 90vh;
  position: relative;
  border-radius: 20px 0 0 20px;

  .nav-menu-wrapper {
    position: absolute;
    top: 40%;
    transform: translate(0, -50%);

    .menu-list {

      li {
        margin: 40px 0 0 20px;
        list-style: none;
        cursor: pointer;
        position: relative;

        //最左边的蓝色提示
        .block {
          background-color: rgb(29, 144, 245);
          position: absolute;
          left: -20px;
          width: 6px;
          height: 25px;
          transition: 0.5s;
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
          opacity: 0;
        }

        // 点击按钮的时候高亮显示
        &:hover {
          span {
            color: rgb(29, 144, 245);
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
  span {
    color: rgb(29, 144, 245);
  }

  .block {
    opacity: 1 !important;
  }
}
</style>
