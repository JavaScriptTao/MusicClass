<template>
  <div class="home-wrap">
    <cube-scroll @pulling-down="onPullingDown" @pulling-up="onPullingUp" ref="scrollList" :options="scrollOptions">
      <div class="top-two-swip-wrap">
        <div class="top-swp-wrap">
          <swiper v-if="top_banners.length > 0" :options="swiperOptionTop">
            <swiper-slide @click.native="clickImg(slide, index)" class="top-banner" v-for="(slide, index) in top_banners" :key="index">
              <div>
                <img :src="slide.cover">
              </div>
              </swiper-slide>
          </swiper>
        </div>
        <div class="bottom-swp-wrap">
          <div class="one-title-wrap">
            <i class="title-icon-read"></i>
            <span class="read-label">推荐阅读</span>
          </div>
          <swiper :options="swiperOptionMid">
              <swiper-slide class="middle-banner" v-for="(slide, index) in suggested_reading" :key="index">
                <div @click="clickImgMid(slide, index)" class="a-block">
                  <img v-if = 'slide.cover' :src="url(slide.cover)">
                </div>
                <div @click="clickImgMid(slide, index)" class="img-dis-wrap">
                  <p class = 'img-t-discrib'>{{slide.title}}</p>
                  <p class = 'img-m-discrib'>{{slide.sub_title}}</p>
                </div>
                </swiper-slide>
            </swiper>
        </div>
      </div>
      <div class="msg-list-wrap">
        <div class="one-title-wrap two-title-wrap">
          <i class="title-icon-klass"></i>
          <span class="read-label">大师课堂</span>
        </div>
        <ul class="list-wrap">
          <li v-for="(item,key) in lists" :key="key" class="item-wrap">
            <div class="list-item">
              <div class="item-img-wrap">
                <img :src="url(item.cover)" alt="">
              </div>
              <div class="r-msg-wrap">
                <div class="r-msg-top">
                  <span class="free-title"><span class="free-btn">{{item.type == 1?'':''}}</span>{{item.title}}</span>
                </div>
                <div @click="onGoToDetail(item.id)" class="item-botoom-wrap">
                  <p class="btn"> </p>
                  <p class="readed">{{item.clicks}}人观看</p>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="bottom-banner">
        <p class="logo-img"></p>
      </div>
      </cube-scroll>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
import sendEvent from '@/tool/buriedPoint.js';
import { sendShareInfo2Native } from '@/tool/bridge.js';
import { imageAddressProcessing } from '@/tool/imgUrlTool.js';
import api from '@/api';
import { debug } from 'util';

let vm = null;
export default {
  name: 'home',
  components: {
    swiper,
    swiperSlide,
  },
  data() {
    return {
      swiperOptionMid: {
        spaceBetween: 0,
        slidesPerView: 'auto',
        loop: true,
        pagination: {
          el: '.swiper-pagination',
        },
      },
      swiperOptionTop: {
        spaceBetween: 0,
        slidesPerView: 'auto',
        loop: true,
        on: {
          click(e) {
            // @click="clickImg(slide, index)"
            // 这里有坑，需要注意的是：this 指向的是 swpier 实例，而不是当前的 vue， 因此借助 vm，来调用 methods 里的方法
            // console.log(this); // -> Swiper
            // 当前活动块的索引，与activeIndex不同的是，在loop模式下不会将 复制的块 的数量计算在内。
            const realIndex = this.realIndex;
            vm.clickImg(realIndex);
          },
        },
        pagination: {
          el: '.swiper-pagination',
        },
        effect: 'coverflow',
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        speed: 700,
        coverflowEffect: {
          rotate: 0,
          stretch: 0, // slide左右距离
          depth: 400, // slide前后距离
          modifier: 0.5, //
          slideShadows: false, // 滑块遮罩层
        },
      },
      items: [],
      lists: [],
      loop: false,
      listData: [],
      scrollOptions: {
        pullDownRefresh: {
          threshold: 90,
          stop: 60,
          stopTime: 800,
          txt: '刷新成功',
        },
        pullUpLoad: {
          threshold: 0,
          txt: {
            more: '加载更多',
            noMore: '没有更多数据啦',
          },
        },
        click: true,
        bounceTime: 1000,
      },
      offset: 0,
      limit: 5,
      currentPage: 1,
      totalPage: 1,
      suggested_reading: [],
      top_banners: [],
      isPullDown: true,
    };
  },
  computed: {
    isShowList() {
      return this.listData.length;
    },
  },
  created() {
    vm = this;
    this.getUserBannders();
    this.getClassList();
  },
  destroyed() {
    vm = null;
  },
  methods: {
    clickImgMid(data, index) {
      // bannerID	bannerID
      // bannerName	banner名称
      // bannerSequece	banner顺序
      // bannerURL	banner链接
      // current_position	当前模块
      sendShareInfo2Native({
        title: data.title,
        cover: data.cover,
        kID: data.id,
        url: data.link,
      });
      window.location.href = data.link;
    },
    clickImg(index) {
      const data = this.top_banners[index];
      if (!data) return;
      // bannerID	bannerID
      // bannerName	banner名称
      // bannerSequece	banner顺序
      // bannerURL	banner链接
      // current_position	当前模块
      sendShareInfo2Native({
        title: data.name || '',
        cover: data.cover || '',
        kID: '',
        url: data.url,
      });
      sendEvent('clickBanner', {
        bannerID: '',
        bannerName: data.name || '',
        bannerSequece: index,
        bannerURL: data.url || '',
        current_position: '互动课堂banner',
      });
      window.location.href = this.urlHref(data.url);
    },
    urlHref(aRef) {
      if (aRef) return aRef;
      return 'javascript:void(0);';
    },
    url(cover) {
      if (cover) return imageAddressProcessing(cover);
    },
    changePage() {
    },
    clickHandler() {
    },
    onPullingDown() {
      this.currentPage = 1;
      this.lists = [];
      this.isPullDown = true;
      this.getClassList();
    },
    onPullingUp() {
      this.isPullDown = false;
      if (this.currentPage > this.totalPage) {
        this.currentPage = this.currentPage + 1;
        this.getClassList();
      } else {
        this.$refs.scrollList.forceUpdate();
      }
    },
    getClassList() {
      api.getUserZeusLists(this.currentPage).then((res) => {
        if (res.status === 200) {
          this.totalPage = Math.ceil(parseInt(res.data.data.total, 10) / this.limit);
          if (this.isPullDown) {
            this.lists = res.data.data.list;
            this.$refs.scrollList.forceUpdate();
            return;
          }
          this.lists = this.lists.concat(res.data.data.list);
          this.currentPage++;
        }
      });
    },
    getUserBannders() {
      api.getUserZeus().then((res) => {
        if (res.status === 200) {
          this.top_banners = res.data.data.top_banners;
          this.suggested_reading = res.data.data.suggested_reading;
        }
      });
    },
    onGoToDetail(id) {
      this.$router.push(`/home/${id}`);
    },
  },
};
</script>

<style lang="stylus">
.home-wrap{
  width 100%
  box-sizing border-box
  padding-top 14px
  display flex
  flex-direction column
  background #fff
  img{
    border-radius 5px
  }
  .top-swp-wrap{
    height 170px
    .swiper-container{
      height 100%
    }
  }
  .top-two-swip-wrap{
    box-sizing border-box
  }
  .img-t-discrib{
    font-size 15px
    font-family PingFangSC-Medium
    font-weight 500
    color rgba(53,53,55,1)
    padding-bottom 10px
    box-sizing border-box
    text-overflow -o-ellipsis-lastline
    overflow hidden
    text-overflow ellipsis
    display -webkit-box
    -webkit-line-clamp: 1
    line-clamp 1
    -webkit-box-orient vertical
    height 20px
    line-height 20px
  }
  .img-m-discrib{
    padding-top 3px
    font-size 13px
    font-family PingFangSC-Regular
    font-weight 400
    color rgba(155,155,157,1)
    padding-bottom 10px
    box-sizing border-box
    text-overflow -o-ellipsis-lastline
    overflow hidden
    text-overflow ellipsis
    display -webkit-box
    -webkit-line-clamp: 1
    line-clamp 1
    -webkit-box-orient vertical
    height 20px
    line-height 20px
  }

  .middle-banner.swiper-slide {
    padding-right 10px
  }
  .top-banner.swiper-slide {
    box-sizing border-box
    padding 0 20px
  }
  .msg-list-wrap{
    flex 1
  }
  .bottom-swp-wrap{
    margin-left 20px
    min-height 200px
    .cube-slide{
      // height 180px
    }
    .swiper-slide{
      width 250px
    }
    .img-dis-wrap{
      box-sizing border-box
      padding 12px 0
      display flex
      flex-direction column
    }
    .a-block{
      display inline-block
      width 250px
      height 140px
      background url(/images/placeImg@2x.png) no-repeat
      background-size 50%
      background-position center
    }
  }
  .item-wrap{
    width 100%
    box-sizing border-box
    padding-bottom 15px
    margin-bottom 15px
    border-bottom 0.5px dashed #eff3f5
  }
  .one-title-wrap{
    display flex
    padding  36px 0 14px
    align-items center
    .title-icon-read,.title-icon-klass{
      display inline
      width 23px
      height 22px
    }
    .title-icon-read{
      background url('/images/yuedu@2x.png') no-repeat
      background-size contain
    }
    .title-icon-klass{
      background url('/images/meiti@2x.png') no-repeat
      background-size contain
    }
  }
  .two-title-wrap{
    padding  19px 0 14px 20px
  }
  .read-label{
    font-size 18px
    font-family PingFangSC-Medium
    font-weight 500
    color rgba(53,53,54,1)
    box-sizing border-box
    padding-left 10px
  }
  .list-item{
    width 100%
    height 90px
    background #fff
    display flex

    .item-img-wrap{
      width 125px
      height 100%
      // background url(/images/listPlaceImg@2x.png) no-repeat;
      // background-size contain
      img{
        object-fit: cover;
      }
    }
    .r-msg-wrap{
      flex 1
      box-sizing border-box
      padding 1px 2px 0px 14.5px
      display flex
      flex-direction column
      justify-content space-between
      .r-msg-top{
        display flex
        position relative
        height 40px
        padding-top 5px
      }
      .free-btn{
        display inline-block
        width 35px
        height 16px
        background url('/images/free@2x.png') no-repeat
        background-size contain
        margin-right 2px
        position relative
        top 1px
      }
      .free-title{
        font-size 15px
        font-family PingFangSC-Medium
        font-weight 500
        color rgba(53,53,55,1)
        display inline
        padding 0 0 0 4px
        text-overflow  -o-ellipsis-lastline
        overflow  hidden
        text-overflow  ellipsis
        display  -webkit-box
        -webkit-line-clamp  2
        line-clamp  2
        -webkit-box-orient  vertical
        overflow hidden
        position absolute
        top 3px
        line-height 22px
        vertical-align middle
        word-break break-all
      }
    }
    .item-botoom-wrap{
      display flex
      justify-content space-between
      align-items center
      .btn{
        width 90px
        height 30px
        background rgba(248,84,46,1)
        border-radius 15px
        display flex
        align-items center
        justify-content center
        font-family PingFangSC-Regular
        font-weight 400
        color rgba(255,255,255,1)
        background url('/images/jrgk_button_icon@3x.png') no-repeat
        background-size contain
      }
      .readed{
        font-size 12px
        font-family PingFangSC-Regular
        font-weight 400
        color rgba(199,199,199,1)
      }
    }
  }
  .list-wrap{
    box-sizing border-box
    padding  0 20px 20px
  }
  .bottom-banner{
    display flex
    justify-content center
    align-items center
    margin-bottom 30px
    p{
      width 100px
      height 29px
      background url('/images/logo@2x.png') no-repeat
      background-size 100% 100%

    }
  }
  .cube-pulldown{
    .cube-pulldown-wrapper{
      span{
        font-size .3rem
        color #ccc
      }
    }
  }
  .cube-pullup-wrapper {
    position relative
    height 0
    .before-trigger {
      position absolute
      top 0
    }
  }
}
</style>
