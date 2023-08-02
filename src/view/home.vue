<template>
  <div class="home" :class="{'is-pc':isPc}">
    <el-container height="100%">
      <template v-if="asideStatus">
        <el-aside width="50px">
          <Nav></Nav>
        </el-aside>
      </template>
      <template v-else>
        <el-header height="25px">
          <Nav1></Nav1>
        </el-header>
      </template>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Nav from "../components/Nav.vue";
import Nav1 from "../components/Nav1.vue";
import {isPc} from '@/util/util.js'

export default {
  name: "App",
  components: {
    Nav,
    Nav1,
  },
  computed:{
    isPc:()=>isPc()
  },
  data() {
    return {
      asideStatus: true,
      firstSize: true,
      width: 0
    };
  },
  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },

  destoryed() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    resize() {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
      this.asideStatus = !isMobile;
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

    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  width: 100vw;
  height: 100vh;
  background-color: rgb(39, 42, 55);
  border-radius: 15px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.is-pc {
  width: 100vw;
  height: 100vh;
  border-radius: unset;
}
</style>
