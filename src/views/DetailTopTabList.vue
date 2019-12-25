<template>
  <div class="detail-all-ctn">
    <div class="d-top-wrap">
      <div class = 'header-wrap disp-flex'>
      <div class = 'head-lef head-item disp-flex flex_1 flex-dir-col jst-cont-cen align-items-cen'>
        <div class = 'head-num-wrap disp-flex jst-cont-cen align-items-cen flex-dir-col'>
          <div class = 'disp-flex jst-cont-cen align-items-cen'>
            <i class = 'num-icon'></i>
            <p class = 'num-top-val'>已上节数</p>
          </div>
          <div class = 'head-item-bottom disp-flex jst-cont-cen align-items-cen align-items-bas'>
            <p class = 'num-bootom-val'>{{topData.finished_klasses}}</p><p class = 'num-unit'>节</p>
          </div>
        </div>
      </div>
      <div class = 'head-rig head-item disp-flex flex_1 flex-dir-col jst-cont-cen align-items-cen'>
        <div class = 'head-num-wrap disp-flex jst-cont-cen align-items-cen flex-dir-col'>
            <div class = 'disp-flex jst-cont-cen align-items-cen'>
              <i class = 'num-icon had-icon'></i>
              <p class = 'num-top-val'>剩余节数</p>
            </div>
            <div class = 'head-item-bottom disp-flex jst-cont-cen align-items-cen align-items-bas'>
              <p class = 'num-bootom-val'>{{topData.has_klasses}}</p><p class = 'num-unit'>节</p>
            </div>
          </div>
        </div>
    </div>
      <div class="nav-wrap">
        <cube-tab-bar v-model="selectedLabel" show-slider  @click = 'clickHandler'>
          <cube-tab v-for="(item, index) in tabs" :label="item.label" :key="index">
          </cube-tab>
        </cube-tab-bar>
      </div>
    </div>
    <div class="d-list-wrap">
      <cube-scroll ref="scrollList" :data="listData" :options="scrollOptions" @pulling-down="onPullingDown" @pulling-up="onPullingUp">
        <ul v-if = 'isShowList' class="detail-list-wrap">
          <li class="tab-panel-li" v-for="(list, index) in listData" :key="index">
            <div class="item-wrap">
              <p class="item-title">{{list.title}}</p>
              <p class="item-time">{{convertDateStr(list.created_at)}}</p>
              <p class="klass-time" :class="list.direction == 'out'?'out-klass':'in-klass'">{{list.direction == 'out'?'-':'+'}}{{list.amount}}节</p>
            </div>
          </li>
        </ul>
        <div v-else class="no-message disp-flex jst-cont-cen">
          <div class="empty-img"></div>
        </div>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
import api from '@/api';

export default {
  data() {
    return {
      topData: {},
      isShowList: true,
      listData: [],
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
      limit: 10,
      currentPage: 1,
      totalPage: 1,
      selectedLabel: '全部',
      type: '',
      tabIndex: 0,
      tabs: [{
        label: '全部',
        lists: [],
        type: '',
        page: 1,
        totalPage: 1,
      },
      {
        label: '获得',
        lists: [],
        type: 'in',
        page: 1,
        totalPage: 1,
      },
      {
        label: '消耗',
        lists: [],
        type: 'out',
        page: 1,
        totalPage: 1,
      },
      ],
    };
  },
  created() {
    this.onPullingDown();
  },
  methods: {
    convertDateStr(dateStr) {
      return (dateStr || '').replace(/[时分]/g, ':').replace('秒', '');
    },
    onPullingDown() {
      this.isPulldown = true;
      this.tabs[this.tabIndex].page = 1;
      this.getClassList(this.type, this.currentPage);
    },
    onPullingUp() {
      this.isPulldown = false;
      if (this.tabs[this.tabIndex].totalPage > this.tabs[this.tabIndex].page) {
        this.tabs[this.tabIndex].page++;
        this.getClassList(this.type, this.tabs[this.tabIndex].page);
      } else {
        this.$refs.scrollList.forceUpdate();
      }
    },
    clickHandler(label) {
      this.isPulldown = true;
      for (let index = 0; index < this.tabs.length; index++) {
        const element = this.tabs[index];
        if (element.label === label) {
          this.type = this.tabs[index].type;
          this.tabIndex = index;
          this.getClassList(this.type, 1);
        }
      }
      this.tabs[this.tabIndex].page = 1;
    },
    getClassList(type, scpage) {
      api.getUnUsedCards({ card_id: this.$route.params.id, direction: type, page: scpage }).then((res) => {
        if (res.status === 200) {
          this.tabs[this.tabIndex].totalPage = res.data.data.total / this.limit;
          if (this.tabs[this.tabIndex].totalPage === 0) {
            this.isShowList = false;
          } else {
            this.isShowList = true;
          }
          if (this.isPulldown) {
            this.tabs[this.tabIndex].lists = res.data.data.list;
          } else {
            this.tabs[this.tabIndex].lists = this.tabs[this.tabIndex].lists.concat(res.data.data.list);
          }
          this.listData = this.tabs[this.tabIndex].lists;
        }
      });
      api.getDetailTop(this.$route.params.id).then((res) => {
        if (res.status === 200) {
          this.topData = res.data.data;
          document.title = res.data.data.card_name;
        }
      });
    },
    changeHandler() {
      // if you clicked different tab, this methods can be emitted
    },
  },
};
</script>

<style lang = 'stylus'>
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
#app .cube-pulldown-loaded span{
  font-size .3rem
  color #ccc
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
.detail-all-ctn {
  height 100%
  display flex
  flex-direction column
  .header-wrap{
    width 100%
    height 2.52rem
    background #F8613D
  }
  .num-icon{
    width 0.28rem
    height .28rem
    background url(/images/used-num@2x.png) no-repeat
    background-size cover
  }
  .head-item-bottom{
    box-sizing border-box
    padding-top 0.3467rem
  }
  .num-top-val{
    box-sizing border-box
    padding-left .13rem
    font-size 0.32rem
    font-family PingFangSC-Regular
    font-weight 400
    color rgba(255,255,255,1)
  }
  .num-bootom-val{
    font-size 0.693rem
    font-family PingFangSC-Medium
    font-weight 500
    color rgba(255,255,255,1)
    line-height .693rem
  }
  .num-unit{
    font-size 0.293rem
    font-family PingFangSC-Regular
    font-weight 400
    color rgba(255,255,255,1)
    box-sizing border-box
    padding-left 0.053rem
  }
  .nav-tap-wrap{
    height 100%
  }
  .nav-tap{
    box-sizing border-box
    padding 0 .4rem
    font-size 0.42666667rem
    font-family PingFangSC-Regular
    font-weight 400
    color rgba(102,102,102,1)
  }
  .nav-tap span{
    height 100%
  }
  .nav-tap-wrap .active span{
    font-size 0.42666667rem
    font-family PingFangSC-Medium
    font-weight 500
    color rgba(53,53,54,1)
    /* border-bottom 0.053333333rem solid #F8542E */
  }
  .list-wrap{
    box-sizing border-box
    padding 0 0 0 .4rem
  }
  .list-item-right-wrap{
    font-size .4rem
    font-family PingFangSC-Regular
    font-weight 400
    color rgba(255,167,10,1)
    line-height 0.42666667rem
    position absolute
    right .4rem
    top 50%
    transform translateY(-50%)
  }
  .class-0{
    color rgba(255,167,10,1)
  }
  .color-1{
    color rgba(248,84,46,1)
  }
  .bottom-line{
    display block
    width 0%
    height 0.053rem
    background #F8542E
    border-radius 0.066666667rem
  }
  .nav-tap-wrap .active .bottom-line{
    display block
    width 100%
    height 0.053rem
    background #F8542E
    border-radius 0.066666667rem
  }
  .d-list-wrap{
    flex 1
    overflow hidden
    background #fff
  }
  .num-unit{
    font-size 0.293rem
    font-family PingFangSC-Regular
    font-weight 400
    color rgba(255,255,255,1)
    box-sizing border-box
    padding-left 0.053rem
  }
  .had-icon{
    background url(/images/had-num@2x.png) no-repeat
    background-size cover
  }
  .nav-wrap{
    width 100%
    line-height: .7rem;
    border-bottom 1px solid rgba(219,219,219,1)
    background #fff
  }
  .list-wrap{
    box-sizing border-box
    padding 0 0 0 .4rem
  }
  .list-item-wrap{
    width 100%
    position relative
    box-sizing border-box
    padding 0.50666667rem 0 .4rem 0rem
    border-bottom 1px solid rgba(239,243,245,1)
  }
  .list-item-title{
    font-size .4rem
    font-family PingFangSC-Regular
    font-weight 400
    color rgba(53,53,54,1)
  }
  .nav-wrap .before-trigger span{
    font-size .3rem
    color #ccc
  }
  .nav-wrap .cube-pulldown-loaded span{
    font-size .3rem
    color #ccc
  }
  .detail-list-wrap{
    background #fff
  }
  .detail-list-wrap .tab-panel-li{
    box-sizing border-box
    padding 0rem 0rem 0rem .4rem
  }
  .item-wrap{
    width 100%
    box-sizing border-box
    position relative
    padding .53rem .4rem .4rem 0rem
    border-bottom 1px solid rgba(239,243,245,1)
  }
  .klass-time{
    position absolute
    right .4rem
    top 50%
    transform translateY(-50%)
    font-size .4rem
    font-family PingFangSC-Regular
    font-weight 400
  }
  .item-title{
    box-sizing border-box
    padding 0 0 .2667rem 0
    font-size .4rem
    font-family PingFangSC-Regular
    font-weight 400
    color rgba(53,53,54,1)
  }
  .item-time{
    font-size 0.293rem
    font-family PingFangSC-Regular
    font-weight 400
    color rgba(199,199,199,1)
  }
  .in-klass{
    color rgba(248,84,46,1)
  }
  .out-klass{
    color rgba(255,167,10,1)
  }

  .d-top-wrap{
    .cube-tab_active{
      color #F8542E
    }
    .cube-tab-bar-slider{
      background-color #F8542E
    }
  }
}
</style>
