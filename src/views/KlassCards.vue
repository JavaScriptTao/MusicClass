<template>
  <div class="klass-ctn">
    <cube-scroll
      ref="scrollList"
      :data="listData"
      :options="scrollOptions"
      @pulling-down="onPullingDown"
      @pulling-up="onPullingUp"
    >
      <ul v-if="isShowList">
        <CardItem :valid = valid @onGoDetail = 'onGoDetail' v-for="(item, index) in listData" :item="item" :key="index"></CardItem>
        <div @click = 'onGoUnusedCards' class="un-used-cards disp-flex jst-cont-cen">
          <span class="un-used-label">点击查看不可用卡</span>
          <i class="unused-icon">>></i>
        </div>
      </ul>
      <div v-else style=" flex: 1" class="no-message disp-flex jst-cont-cen">
        <div class="empty-img"></div>
        <div @click = 'onGoUnusedCards' class="empty-msg un-used-label disp-flex jst-cont-cen">
          <span class="un-used-label">点击查看不可用卡</span>
          <i class="unused-icon">>></i>
        </div>
      </div>
    </cube-scroll>
  </div>
</template>

<script>
import CardItem from '@/components/CardItem.vue';
import api from '@/api';

export default {
  components: {
    CardItem,
  },
  data() {
    return {
      listData: [],
      valid: true,
      isPulldown: true,
      scrollOptions: {
        pullDownRefresh: { // 下拉刷新方法
          threshold: 90, // 下拉刷新动作的距离阈值，默认一般90比较好用
          stop: 60, // 回弹时显示的元素高度
          stopTime: 800, // 刷新成功的文案显示时间
          txt: '刷新成功', // 刷新成功显示的文案
        },
        pullUpLoad: { // 上拉加载方法
          threshold: 0, // 上拉加载动作的距离阈值，一般上拉时希望不显示滑动的效果
          txt: { // 上拉加载时候的显示文案
            more: '加载更多', // 上拉加载有数据时
            stopTime: 800,
            noMore: '没有更多数据啦', // 上拉加载没有数据时
          },
        },
        click: true, // 是否允许在组件里有点击事件
        bounceTime: 1000, // 回弹动画的时间
      },
      offset: 0,
      limit: 5,
      currentPage: 1,
      totalPage: 1,
      isShowList: false,
    };
  },
  created() {
    this.getClassList();
  },
  methods: {
    onPullingDown() {
      this.isPulldown = true;
      this.currentPage = 1;
      this.getClassList();
    },
    onPullingUp() {
      this.isPulldown = false;
      if (this.totalPage > this.currentPage) {
        this.currentPage = this.currentPage + 1;
        this.getClassList();
      } else {
        this.$refs.scrollList.forceUpdate();
      }
    },
    getClassList() {
      api.getKlassCards({ cardStatus: 'valid', page: this.currentPage }).then((res) => {
        if (res.status === 200) {
          this.totalPage = Math.ceil(res.data.data.total / this.limit);
          if (this.totalPage === 0) {
            this.isShowList = false;
          } else {
            this.isShowList = true;
          }
          if (this.isPulldown) {
            this.listData = res.data.data.list;
          } else {
            this.listData = this.listData.concat(res.data.data.list);
            this.currentPage++;
          }
        }
      });
    },
    onGoDetail(id) {
      this.$router.push(`/klassCardsDetail/${id}`);
    },
    onGoUnusedCards() {
      window.kpl && window.kpl.clickUnableKlassCard && window.kpl.clickUnableKlassCard();
      this.$router.push('/unUsedCards');
    },
  },
};
</script>

<style lang="stylus">
  .disp-flex{
    display -webkit-box
    display -ms-flexbox
    display -webkit-flex
    display flex
  }
  .flex-dir-col{
    -webkit-box-orient vertical
    -ms-flex-direction column
    -webkit-flex-direction column
    flex-direction column
  }
  .jst-cont-cen{
    -webkit-box-pack center
    -ms-flex-pack center
    -webkit-justify-content center
    justify-content center
  }
  .align-items-cen{
    -webkit-box-align center
    -ms-flex-align center
    -webkit-align-items center
    align-items center
  }
  .align-items-bas{
    -webkit-box-align baseline
    -ms-flex-align baseline
    -webkit-align-items baseline
    align-items baseline
  }
  .flex_1{
    -webkit-box-flex 1
    -ms-flex 1
    -webkit-flex 1
    flex 1
  }


  .klass-ctn{
    width 100%
    background rgba(243,246,248,1)
    padding .3rem .4rem 0 .4rem
    box-sizing border-box
  }
  .happy-package-wrap{
    width 100%
    background rgba(255,255,255,1)
    box-shadow 0px 2px 4px 0px rgba(239,243,245,0.64)
    border-radius .267rem
    overflow hidden
    padding 0 .4rem
    box-sizing border-box
    margin-bottom 0.26666667rem
  }
  .top-wrap{
    border-bottom 1px dashed  rgba(239,243,245,1)
    box-sizing border-box
    padding .53rem .8rem 0rem 0rem
    position relative
    /* background url(/images/circle-bg@2x.png) no-repeat
    background-size contain  */
  }
  .bottom-wrap{
    height 2.08rem
    box-sizing border-box
    padding .4rem

  }
  .top-title{
    height 0.427rem
  }
  .happy-icon-title{
    background url(/images/taocantuijian@2x.png) no-repeat
  }
  .t-icon{
    width .467rem
    height .467rem
    display block
    background-size contain
  }
  .used-icon{
    background url(/images/used@2x.png) no-repeat
    height 0.3398rem
    width 0.3388rem
    background-size contain
  }
  .rest-icon{
    background url(/images/had@2x.png) no-repeat
    height 0.3398rem
    width 0.3388rem
    background-size contain
  }

  .t-title{
    font-size 0.43rem
    font-family PingFangSC-Medium
    font-weight 500
    color rgba(53,53,54,1)
    display flex
    box-sizing border-box
    padding-left .24rem
  }
  .klass-time{
    box-sizing border-box
    padding .4rem 0 .18rem 0

  }
  .klass-wrap{
    font-size .32rem
    font-family PingFangSC-Regular
    font-weight 400
    color rgba(155,155,157,1)
  }
  .next-icon{
    width .12rem
    height .213rem
    background url(/images/next@2x.png) no-repeat
    background-size contain
    display block
    position absolute
    right 0rem
    top 50%
    transform translate(0, -50%)
  }

  .middel-line{
    width 1px
    height 0.66666667rem
    border-right 1px solid rgba(239,243,245,1)
    align-self center
    -webkit-align-self center
  }
  .bottom-top-wrap{
    padding-bottom .2rem
  }
  .bottom-item{
    width 1.70666667rem
    height 1.28rem
  }
  .used-lable-num{
    font-size .32rem
    font-family PingFangSC-Regular
    font-weight 400
    color rgba(155,155,157,1)
    box-sizing border-box
    padding-left .147rem
  }
  .used-num{
    font-size 0.63rem
    font-family PingFangSC-Medium
    font-weight 500
    color rgba(53,53,54,1)
  }
  .bottom-bot-wrap{
    align-items baseline
  }
  .unit{
    box-sizing border-box
    padding-left .053rem
    font-size .293rem
    font-family PingFangSC-Regular
    font-weight 400
    color rgba(155,155,157,1)
  }
  .klass-num {
    box-sizing border-box
    padding-bottom .28rem
  }

  .look-unused{
    font-size .32rem
    font-family PingFangSC-Regular
    font-weight 400
    color rgba(155,155,156,1)
    box-sizing border-box
    padding 1.06666667rem 0 .5rem 0

  }

  .foot-unused-wrap{
    font-size 0.32rem
    font-family PingFangSC-Regular
    font-weight 400
    color rgba(155,155,156,1)
    box-sizing border-box
  }
  .app-wrap{
    -webkit-box-flex 1
    -ms-flex 1
    -webkit-flex 1
    flex 1
  }

  .klass-ctn .before-trigger{
    font-size .3rem
    color #ccc
  }
  .klass-ctn .cube-pulldown-loaded{
    font-size .3rem
    color #ccc
  }
  .hicon{
    background url('/images/taocantuijian@2x.png') no-repeat
    background-size contain
  }
  .cicon{
    background url(/images/give@2x.jpg) no-repeat
    background-size contain
  }
  .no-message{
    width 100%
    position absolute
    top 24.5%
    left 0
    display flex
    flex-direction column
    align-items center
    .empty-img{
      width 140px
      height 140px
      background url('/images/empty@2x.png') no-repeat
      background-size contain

    }
    .empty-msg{
      padding 19px 0
      font-size 14px
      font-family PingFangSC-Regular
      font-weight 400
      color rgba(155,155,157,1)
    }
  }
  .un-used-cards{
    box-sizing border-box
    padding 0.533rem 0
    font-size .3rem
    color #ccc
  }
  .unused-icon{
    display inline

    background-size contain
    font-size .3rem
  }

  .d-list-wrap .before-trigger{
    font-size .3rem
    color #ccc
  }
  .cube-pulldown-loaded span{
    font-size .3rem
    color #ccc
  }
</style>
