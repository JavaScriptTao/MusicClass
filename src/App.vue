<template>
  <div id="app">
    <!-- <com-header v-if="isShowHeader" :isShowBack="isShowBack" :title="title"/> -->
    <div class="content">
      <transition :name="transitionName">
        <router-view class="child-view" />
      </transition>
    </div>
  </div>
</template>

<script>
// import ComHeader from '@/components/ComHeader.vue';
// import getCookie from '@/tool/cookie';

export default {
  name: 'home',
  // components: {
  //   ComHeader,
  // },
  data() {
    return {
      title: '',
      transitionName: '',
    };
  },
  // computed: {
  //   isShowBack() {
  //     return this.$route.meta.level > 1;
  //   },
  //   isShowHeader() {
  //     const { token } = getCookie('kplCookie');
  //     // 从cookie取不到token时展示头部
  //     // 上线时注释掉更好
  //     return !token;
  //   },
  // },
  watch: {
    $route(to, from) {
      const toLevel = Number(to.meta.level);
      const fromLevel = Number(from.meta.level);
      this.title = to.meta.title;
      this.setRouteTransiton(toLevel, fromLevel);
    },
  },
  methods: {
    setRouteTransiton(toLevel, fromLevel) {
      // 如果是切换底部tab或首次打开h5 不加动画
      if (!fromLevel) {
        this.transitionName = '';
      } else if (toLevel === 1 && fromLevel === 1) {
        this.transitionName = '';
      } else {
        // 根据路由 元信息的层级判断 切换的动画
        this.transitionName = toLevel < fromLevel ? 'slide-right' : 'slide-left';
      }
    },
  },
};
</script>

<style lang="stylus">
  html,body {
    height 100%
    width 100%
    overflow hidden
    margin 0
    padding 0
  }
  input:focus {
    outline none
  }
  input:-webkit-autofill {
    -webkit-box-shadow 0 0 0 100px white inset
  }
  img{
    width 100%
    height 100%
  }
  a link{
    text-decoration   none
  }
  #app {
    height 100%
    display flex
    flex-direction column
    font-size 15px
    background #fff

    .content {
      height calc(100%)
      overflow-y auto
      overflow-x hidden

      .child-view {
        height 100%
      }
      .cube-pullup-wrapper{
        .before-trigger{
          span{
            font-size .3rem
            color #ccc
          }
        }
      }
    }

    .slide-left-enter-active {
      animation slideLeft .3s
    }
    .slide-right-enter-active {
      animation slideRight .3s
    }
    .fold-enter-active, .fold-leave-active {
      transition transform .3s ease-in
    }
    .fold-enter, .fold-leave-active {
      transform translate3d(0, 100%, 0)
    }

    @keyframes slideLeft {
      from {
        transform translate3d(100%, 0, 0)
        visibility visible
      }
      to {
        transform translate3d(0, 0, 0)
      }
    }

    @keyframes slideRight {
      from {
        transform translate3d(-100%, 0, 0)
        visibility visible
      }
      to {
        transform translate3d(0, 0, 0)
      }
    }
  }
</style>
