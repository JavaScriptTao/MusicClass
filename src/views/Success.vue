<template>
  <div class="success-ctn">
    <div class="success-img">
      <img src="../../public/images/appointment.png" alt="">
    </div>
    <h1>恭喜您成功约课</h1>
    <p @click="onSuccess()" class="success">完成</p>
    <classfooter :classfooter="classfooter"></classfooter>
  </div>
</template>

<script>
import classfooter from '@/components/ClassFooter.vue';

export default {
  components: {
    classfooter,
  },
  data() {
    return {
      classfooter: '',
    };
  },
  methods: {
    onSuccess() {
      this.$router.push('/reserve');
    },
  },
};
</script>

<style lang="stylus">
  *{
    box-sizing border-box
  }
  .success-ctn{
    padding 0 25px
  }
  .success-ctn, img{
    width 100%
    height 100%
  }
  .success-img{
    width 155px
    margin 0 auto
    padding-top 20px
  }
  .success-ctn h1{
    color #FF542E
    font-size 17px
    text-align center
    margin-top 5px
  }
  .success{
    height 50px
    background #FF542E
    text-align center
    color #fff
    line-height 50px
    border-radius 24px
    margin-top 50px
    font-size 17px
  }
</style>
