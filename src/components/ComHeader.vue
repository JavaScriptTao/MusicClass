<template>
  <div class="header-container">
    <div v-show="isShowBack" class="img-wrap" @click="goBack">
      <img class="back-icon" :src="backIcon"/>
    </div>
    <div class="title-wrap">{{title}}</div>
  </div>
</template>

<script>
import backIcon from '../assets/img/back.png';

export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    backIcon: {
      type: String,
      default: backIcon,
    },
    isShowBack: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="stylus" >
  .header-container {
    height  50px
    width 100%
    background red
    color black
    display flex
    align-items center
    justify-content center

    .img-wrap {
      position fixed
      left 10px
      .back-icon {
        width  20px
        height  22px
      }
    }

    .add-wrap {
      position  fixed
      right 10px
      font-size  28px
    }

    .title-wrap {
      text-align  center
      overflow  hidden
      text-overflow  ellipsis
      white-space  nowrap
      font-size  18px
    }
  }
</style>
