<template>
  <div class="appointment-ctn">
    <div class="appointment-img">
      <img src="../../public/images/success.png" alt="">
    </div>
    <h1>{{userMsg}}</h1>
    <p class="ti-shi">{{tiShi}}</p>
    <div class='select-time'>
      <div class='select-time-icon'>
        <img src="../../public/images/selectKlass.png" alt="">
      </div>
      <h2>选择上课日期</h2>
    </div>
    <div class="select-time-list">
      <p @click="onSelectTime(item, key)" v-for="(item, key) in timeList" :key="key" :class="key === current ? 'select' : ''">{{item}}</p>
    </div>
    <p class="error-msg" :style="{ visibility : errorMsg }">请选择上课时间</p>
    <p @click="onAppointment()" class="appointment">马上约课</p>
  </div>
</template>

<script>
import api from '@/api';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      userMsg: '',
      tiShi: '',
      timeList: {},
      current: '',
      selectDate: '',
      selectKey: '',
      errorMsg: 'hidden',
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
  created(id) {
    if (this.getClassStatus === -1) {
      this.userMsg = '恭喜您获得免费体验课';
    } else if (this.getClassStatus === 0) {
      this.userMsg = '您好,老朋友';
      this.tiShi = '您有一节免费体验课，等待您的预约。';
    }
    api.getClass(this.getAccountId).then((res) => {
      this.timeList = res.data.data.dates;
    });
  },
  methods: {
    onSelectTime(item, key) {
      this.errorMsg = 'hidden';
      this.current = key;
      this.selectDate = item;
      this.selectKey = key;
    },
    onAppointment() {
      if (!this.selectKey) {
        this.errorMsg = 'visible';
      } else {
        api.postAppointment({ start_date: this.selectKey, account_id: this.getAccountId }).then((res) => {
          if (res.data.ret === true) {
            this.$router.push('/Success');
          }
        });
      }
    },
  },
};
</script>

<style lang="stylus">
  *{
    box-sizing border-box
  }
  .appointment-img{
    width 155px
    margin 0 auto
    padding-top 20px
  }
  imgm, .appointment-ctn{
    width 100%
    height 100%
  }
  .appointment-ctn{
    padding 0 25px
  }
  .appointment-ctn h1{
    color #FF542E
    font-size 17px
    text-align center
    margin-top 5px
  }
  .ti-shi{
    text-align center
    color #9B9B9D
    margin-top 15px
  }
  .select-time{
    display flex
    justify-content flex-start
    align-items center
    margin-top 40px
  }
  .select-time-icon{
    width 17px
    height 16px
  }
  .select-time h2{
    font-size 16px
    margin-left 10px
  }
  .select-time-list{
    display flex
    justify-content space-between
    align-items center
    flex-wrap wrap
    margin-top 20px
  }
  .select-time-list>p{
    width 30%
    line-height 40px
    text-align center
    border-radius 20px
    margin-bottom 15px
    font-size 14px
    background #F3F6F8
    color #9B9B9D
    border 1px solid #F3F6F8
  }
  .error-msg{
    color #ff542e
    margin-top 5px
    font-size 10px
  }
  .appointment{
    height 50px
    background #FF542E
    text-align center
    color #fff
    line-height 50px
    border-radius 24px
    margin-top 20px
    font-size 17px
  }
  .select-time-list>p.select{
    background #fff
    border 1px solid #F8542E
    color #F8542E
  }
</style>
