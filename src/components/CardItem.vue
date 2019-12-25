<template>
  <div class="list">
    <div class = 'happy-package-wrap'>
      <div class = 'top-wrap' @click="onGoDetail(item.id)">
        <div class = 'top-title disp-flex align-items-cen'>
          <i class = 't-icon happy-icon-title' :class="item.is_gift == 1?'cicon':'hicon'"></i>
          <h2 :class="valid?'isValid':'onValid'">{{item.card_name}}</h2>
        </div>
        <div class = 'klass-time klass-wrap disp-flex'>
          <p class = 'klass-time-lable'>课时分钟：</p>
          <p class = 'klass-time-value'>{{parseInt(item.unit*25)}}分钟</p>
        </div>
        <div class = 'klass-num klass-wrap disp-flex' v-if="!item.is_gift">
          <p class = 'klass-num-lable'>课时数量：</p>
          <p class = 'klass-num-value'>{{parseInt(item.total_klasses)}}节（ 包含赠课{{item.gift_klasses}}节 ）</p>
        </div>
        <i class = 'next-icon'></i>
      </div>
      <div class = 'bottom-wrap disp-flex jst-cont-cen'>
        <div class = 'bottom-item bottom-used-wrap flex_1 disp-flex flex-dir-col align-items-cen'>
          <div class = 'bottom-top-wrap disp-flex align-items-cen'>
            <i class = 't-icon used-icon'></i>
            <p class = 'used-lable-num'>已上节数</p>
          </div>
        <div class = 'bottom-bot-wrap disp-flex align-items-bas'>
          <p class = 'used-num'>{{item.finished_klasses}}</p>
          <p class = 'unit'>节</p>
        </div>
      </div>
      <p class = 'middel-line'></p>
      <div class = 'bottom-item bottom-used-wrap flex_1 disp-flex flex-dir-col align-items-cen'>
        <div class = 'bottom-top-wrap disp-flex align-items-cen'>
          <i class = 't-icon rest-icon'></i>
          <p class = 'used-lable-num'>剩余课节</p>
        </div>
        <div class = 'bottom-bot-wrap disp-flex align-items-bas'>
          <p class = 'used-num'>{{item.has_klasses}}</p>
          <p class = 'unit'>节</p>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
    valid: {
      type: Boolean,
      default() {
        return true;
      },
    },
  },
  methods: {
    onGoDetail(id) {
      this.$emit('onGoDetail', id);
    },
  },
};
</script>

<style lang="stylus" >
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
    background-size cover  */
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
    background-size cover
  }
  .used-icon{
    background url(/images/used@2x.png) no-repeat
    height 0.3398rem
    width 0.3388rem
    background-size cover
  }
  .rest-icon{
    background url(/images/had@2x.png) no-repeat
    height 0.3398rem
    width 0.3388rem
    background-size cover
  }

  .isValid{
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
    background-size cover
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
    background-size cover
  }
  .cicon{
    background url('/images/give@2x.jpg') no-repeat
    background-size cover
  }
  .onValid{
    font-size 0.43rem
    font-family PingFangSC-Medium
    font-weight 500
    color rgba(53,53,54,1)
    display flex
    box-sizing border-box
    padding-left .24rem
    color #9B9B9D
  }
</style>
