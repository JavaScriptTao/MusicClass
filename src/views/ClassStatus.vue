<template>
  <div class="class-status-ctn">
    <div class="class-status-wrap">
      <div class="class-status-img">
        <img src="../../public/images/lookClass.png" alt="">
      </div>
      <h1>{{userStatus}}</h1>
      <p class="phone-call">{{classStatusDom}}</p>
      <p>{{row}}</p>
      <h2>{{go}}</h2>
    </div>
    <div class="look-msg">
    <div class="wechat-ma">
      <img src="../../public/images/erweima.png" alt="">
    </div>
    <p>{{weChat}}</p>
  </div>
  </div>
</template>

<script>
import api from '@/api';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      userStatus: '您好，老朋友',
      classStatusDom: '',
      row: '',
      go: '',
      date: '',
      weChat: '微信关注「快陪练」，查看课程安排',
    };
  },
  computed: {
    ...mapGetters(['getAccountId', 'getClassStatus']),
    accountId() {
      return this.getAccountId;
    },
    classStatus() {
      return this.getClassStatus;
    },
  },
  created() {
    this.prepareData();
  },
  methods: {
    prepareData() {
      if (this.getClassStatus === 1) {
        this.classStatusDom = '您已经上过体验课啦';
        this.go = '快去查看老师的点评';
        this.weChat = '微信关注「快陪练」，查看老师点评';
      } else if (this.getClassStatus === 2 || this.getClassStatus === 5 || this.getClassStatus === 6) {
        this.classStatusDom = '您已是我们尊贵的购课用户了';
        this.go = '';
      } else if (this.getClassStatus === 3) {
        api.getClass(this.getAccountId).then((res) => {
          this.date = res.data.data.datetime;
          this.classStatusDom = `您期望的上课时间：${this.date}`;
        });
      } else if (this.getClassStatus === 4) {
        api.getClass(this.getAccountId).then((res) => {
          this.date = res.data.data.datetime;
          this.classStatusDom = `您预约的免费体验课上课时间为：${this.date}`;
        });
      } else if (this.getClassStatus === 7) {
        api.getClass(this.getAccountId).then((res) => {
          this.date = res.data.data.datetime;
        });
        this.userStatus = '您已预约一节正式课。';
        this.classStatusDom = '您的专属课程顾问将致电您';
        this.row = '沟通具体的上课时间，请您注意接听';
        this.go = `您期望的上课时间：${this.date}`;
      }
    },
  },
};
</script>

<style lang="stylus">
  *{
    box-sizing border-box
  }
  .class-status-wrap{
    padding-top 20px
  }
  .class-status-img{
    width 160px
    margin 0 auto
  }
  imgm, .class-status-ctn{
    width 100%
    height 100%
  }
  .class-status-ctn{
    padding 0 25px
  }
  .class-status-wrap h1{
    color #FF542E
    font-size 20px
    text-align center
    margin-top 5px
    font-weight 600
  }
  .class-status-wrap p{
    text-align center
    color #9B9B9D
  }
  .phone-call{
    margin 15px auto 5px auto
  }
  .class-status-wrap h2{
    font-size 16px
    text-align center
    color #666666
    margin 20px auto;
  }
  .look-msg{
     margin-top 70px
  }
  .wechat-ma{
    width 120px
    height 120px
    margin 0 auto 20px auto;
  }
  .look-msg p{
    color #9B9B9D;
    font-size 14px
    text-align center
    line-height 20px
  }
</style>
