<template>
  <div class="home-detail-ctn needsclick dropdown-toggle" data-toggle="dropdown" style="overflow: hidden;">
    <div class="h-d-top-video-wrap">
      <div class="player">
        <videoPlayer
          ref="videoPlayer"
          :playsinline="true"
          :events="events"
          :options="playerOptions"
          @ready="playerReadied"
          @fullscreenchange="onPlayerFullScreenchange($event)"
          @play="onPlayerPlay($event)"
          @pause="onPlayerPause($event)"
          @ended="onPlayerEnded($event)"
          @loadeddata="onPlayerLoadeddata($event)"
          @waiting="onPlayerWaiting($event)"
          @playing="onPlayerPlaying($event)"
          @timeupdate="onPlayerTimeupdate($event)"
          @canplay="onPlayerCanplay($event)"
          @canplaythrough="onPlayerCanplaythrough($event)"
          @statechanged="playerStateChanged($event)"
          class="video-player vjs-custom-skin"
        >
        </videoPlayer>
       </div>
    </div>
    <div class="h-d-top-tab-wrap">
      <cube-tab-bar v-model="selectedLabel" show-slider>
        <cube-tab v-for="(item, index) in tabs" :icon="item.icon" :label="item.label" :key="index">
        </cube-tab>
      </cube-tab-bar>
        <cube-tab-panels v-model="selectedLabel" class="detail-panels-warp">
          <cube-tab-panel v-for="(item, index) in tabs" :label="item.label" :key="index">
            <ul v-if= 'index === 0'>
              <li class="item-wtap">
                <div class="top-t-wrap">
                  <i></i>
                  <p>{{msgData.title}}</p>
                </div>
                <div class="middle-wrap">
                  <div class="left-time">
                    <i></i>
                    <p>{{'课程时长：'}}{{msgData.duration}}</p>
                  </div>
                  <div class="right-read">
                    <i></i>
                    <p>{{`已有${msgData.clicks}人观看`}}</p>
                  </div>
                </div>
                <div class="describe">
                  {{msgData.coach_desc}}
                </div>
                <div class="des-content" v-html="convertLineBreak(msgData.description)">
                </div>
                <!-- <div v-for="(type,inx) in msg.msgs" :key="inx">
                  <div class="type-item">
                    <p>{{`${type.type}、${type.title}`}}</p>
                    <p v-for="(detail,dinx) in type.children" :key="dinx">
                      {{`${parseInt(dinx)+1} ${detail}`}}
                    </p>
                  </div>
                </div> -->
              </li>
            </ul>
            <ul v-if = 'index === 1'>
              <li class="item-wtap">
                <div class="top-r-wrap">
                  <div class="img-wrap">
                    <img :src="url(msgData.coach_avatar)" alt="">
                  </div>
                  <div class="persion-dis">
                    <p class="name">{{msgData.coach_name}}</p>
                    <div>
                      <p class="job" v-for="(job,index) in msgData.coach_tag" :key="index">
                        {{job}}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <div class="disc-wrap">
                    <p>{{msgData.coach_desc}}</p>
                      <!-- <p v-for="(disc,dinx) in item.discribe" :key="dinx">
                        {{disc}}
                      </p> -->
                    </div>
                </div>
              </li>
            </ul>
          </cube-tab-panel>
        </cube-tab-panels>
      </div>
  </div>
</template>

<script>
import api from '@/api';
import { videoPlayer } from 'vue-video-player';
import 'video.js/dist/video-js.css';
import sendEvent from '@/tool/buriedPoint.js';
import { sendShareInfo2Native } from '@/tool/bridge.js';
import { imageAddressProcessing } from '@/tool/imgUrlTool.js';

require('vue-video-player/src/custom-theme.css');

export default {
  components: { videoPlayer },
  data() {
    return {
      events: ['fullscreenchange', 'mutedchange'],
      isShowControl: false,
      isOne: true,
      isFull: false,
      playTime: 0,
      playerOptions: {
        autoplay: false,
        muted: false,
        loop: false,
        preload: 'auto',
        language: 'zh-CN',
        fullscreen: true,
        aspectRatio: '16:9',
        fluid: true,
        sources: [{
          type: 'video/mp4',
          src: '',
        }],
        poster: '',
        width: document.documentElement.clientWidth,
        notSupportedMessage: '视频链接中，请稍后...',
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true,
          volumePanel: false,
        },
        // controls:false
      },
      selectedLabel: '课程介绍',
      msgData: {},
      tabs: [{
        label: '课程介绍',
        heroes: [],
        data: [{
          title: '你知道中国第一个会流畅弹钢琴的人是谁吗？',
          klassTime: '30分钟',
          readedNum: '640',
          discribe: '本次课程主要从以下三个方面进行阐述：',
          msgs: [
            {
              type: 'A',
              title: '中国钢琴教学与世界钢琴演奏德、俄学派的渊源 ',
              children: [],
            },
            {
              type: 'B',
              title: '钢琴演奏技能基础的教学原理 ',
              children: ['力量之源始于放松的训练', '手指、手腕与手臂的力量传导 '],
            },
            {
              type: 'A',
              title: '中国钢琴教学与世界钢琴演奏德、俄学派的渊源 ',
              children: [],
            },
            {
              type: 'C',
              title: '学生教学案例,高尖演奏技术解码 ',
              children: ['踏入专业钢琴演奏殿堂的起点', '优秀钢琴演奏者的进阶要点'],
            },
          ],
        }],
      }, {
        label: '讲师介绍',
        heroes: [],
        imgUrl: '',
        name: '孙韵',
        jobs: ['美国钢琴演奏博士', '实力型青年钢琴家和教育家'],
        discribe: ['孙韵十一岁时师从钢琴家殷承宗,在十二岁时成为周广仁教授在中央音乐学院附中唯一的学生。她十六岁获得美国纽约曼哈顿音乐学院钢琴预科的最高奖学金赴美留学,先后获得钢琴学士、硕士、高级演奏文凭及钢琴演奏博士学位。', '孙韵曾在美国纽约举行的第22届国际艺术家比赛中,获钢琴一等奖。她先后师从出自于俄罗斯流派涅高兹门下的纽约曼尼斯音乐学院钢琴教授尼娜·斯维特拉诺娃和欧洲施奈贝尔学派的美国朱丽亚音乐学院罗伯特·麦当劳教授。', '孙韵是目前在国内少有的深得西方音乐界德俄两大学派精髓钢d琴家,掌握了科学的钢琴演奏技巧及全面的音乐演奏风格。从2002年9月起,孙韵执教上海音乐学院钢琴系,现受聘为外籍教授,她的学生在国内国际比赛中屡次获奖。'],
        data: [],
      }],
    };
  },
  methods: {
    /**
        互动课堂-开始播放视频_App
        playerClick_H5		videoLink	视频链接	字符串
                          videoID	视频ID	数值
                          videoName	视频名称	字符串
        互动课堂-暂停播放视频_App
        pauseClick_H5		videoLink	视频链接	字符串
                        videoID	视频ID	数值
                        videoName	视频名称	字符串
        互动课堂-关闭播放视频_App
        closeClick_H5		videoLink	视频链接	字符串
                        videoID	视频ID	数值
                        videoName	视频名称	字符串
                        videoDuration	视频播放时长	数值
        互动课堂-全屏播放视频_App
        fullscreenChange_H5		videoLink	视频链接	字符串
                              videoID	视频ID	数值
                              videoName	视频名称	字符串
     */
    onPlayerPlay(player) {
      sendEvent('playerClick_H5', {
        videoLink: this.msgData.video_cover,
        videoID: this.msgData.id,
        videoName: this.msgData.title,
      });
    },
    onPlayerPause(player) {
      sendEvent('pauseClick_H5', {
        videoLink: this.msgData.video_cover,
        videoID: this.msgData.id,
        videoName: this.msgData.title,
      });
    },
    onPlayerEnded(player) {
      // console.log('player ended!', player)
    },
    onPlayerLoadeddata(player) {
      // console.log('player Loadeddata!', player)
    },
    onPlayerWaiting(player) {
      // console.log('player Waiting!', player)
    },
    onPlayerPlaying(player) {
      // console.log('player Playing!', player)
    },
    onPlayerTimeupdate(player) {
      // console.log('player Timeupdate!', player.currentTime())
    },
    onPlayerCanplay(player) {
      // console.log('player Canplay!', player)
    },
    onPlayerCanplaythrough(player) {
      // console.log('player Canplaythrough!', player)
    },
    onPlayerFullScreenchange(play) {
      if (this.isFull !== play.isFullscreen_) {
        this.isFull = play.isFullscreen_;
        if (this.isFull) {
          sendEvent('fullscreenChange_H5', {
            videoLink: this.msgData.video_cover,
            videoID: this.msgData.id,
            videoName: this.msgData.title,
          });
        } else {
          setTimeout(() => this.$refs.videoPlayer.player.play(), 500);
          sendEvent('closeClick_H5', {
            videoLink: this.msgData.video_cover,
            videoID: this.msgData.id,
            videoName: this.msgData.title,
            videoDuration: this.playTime,
          });
        }
      }
    },
    // or listen state event
    playerStateChanged(playerCurrentState) {
      this.playTime = playerCurrentState.timeupdate || 0;
    },
    convertLineBreak(str) {
      return (str || '').replace(/\s+/g, '<br>');
    },
    url(cover) {
      if (cover) return imageAddressProcessing(cover);
    },
    getUserZeusListsDetail() {
      api.getUserZeusListsDetail(this.$route.params.id).then((res) => {
        this.msgData = res.data.data;
        this.playerOptions.poster = imageAddressProcessing(this.msgData.cover);
        this.playerOptions.sources[0].src = this.msgData.video_cover;
        sendShareInfo2Native({
          title: this.msgData.title,
          cover: this.msgData.cover,
          kID: this.msgData.id,
          url: window.location.href,
        });
      });
    },
    // player is ready
    playerReadied(player) {
      this.addClass(document.querySelector('.vjs-control-bar'));
      // 清除默认的poster
      (document.querySelector('.h-d-top-video-wrap video') || {}).poster = '/images/';
      // player.isFullscreen(true);
      //  player.exitFullscreen();
      //   player.isFullscreen(false);
    },
    addClass(el) {
      if (el.children && el.children.length > 0) {
        !el.classList.contains('needsclick') && el.classList.add('needsclick');
        Array.from(el.children).forEach(e => this.addClass(e));
      } else {
        !el.classList.contains('needsclick') && el.classList.add('needsclick');
      }
    },
  },
  mounted() {
    // 清除默认的poster
    (document.querySelector('.h-d-top-video-wrap video') || {}).poster = '/images/';
  },
  beforeCreate() {
    (document.querySelector('.h-d-top-video-wrap video') || {}).poster = '/images/';
  },
  created() {
    (document.querySelector('.h-d-top-video-wrap video') || {}).poster = '/images/';
    this.getUserZeusListsDetail();
  },
};
</script>

<style lang = 'stylus'>
.home-detail-ctn{
  height 100%
  width 100%
  display flex
  flex-direction column
  background #fff

  .cube-tab_active{
    color #F8542E
  }
  .cube-tab-bar-slider{
    background-color #F8542E
  }
  .vjs-custom-skin > .video-js .vjs-big-play-button{
    background-color: #fff;
    height: 2em !important;
    width: 2em !important;
    line-height: 1.8em !important;
    border-radius: 50%;
    font-size 3em
    border 5px solid rgba(255,255,255,.7)
  }
  .video-js{
    background-color #fff
  }
  .vjs-icon-play, .video-js .vjs-big-play-button .vjs-icon-placeholder:before, .video-js .vjs-play-control {
    outline none
  }
  .vjs-icon-play, .video-js .vjs-big-play-button .vjs-icon-placeholder:before, .video-js .vjs-play-control .vjs-icon-placeholder{
    color rgb(243,64,35)
  }
	.video-js .vjs-modal-dialog {
		display none
	}

  .vjs-custom-skin > .video-js .vjs-loading-spinner{
    border-color #F8542E
  }
  .vjs-custom-skin > .video-js .vjs-play-progress{
    background-color #f34023
  }
  .vjs-custom-skin > .video-js .vjs-big-play-button{
    margin-left: 0;
    margin-top: -1em;
    transform: translateX(-50%);
  }
  .vjs-poster{
    background-color #fff
    background-size cover
  }
  .h-d-top-video-wrap{
    width 100%
    background #fff
    position relative
    .video-control{
      width 100%
      height 50px
      background rgba(23,27,33,.6)
      /* position absolute */
      bottom 0
    }
    .player{
      touch-action none !important
    }
  }
  .describe, .des-content{
    line-height 24px
    color #666
    font-size 14px
  }
  .h-d-top-tab-wrap{
    flex 1
    display flex
    flex-direction column
    .detail-panels-warp {
      flex 1
    }
    .cube-tab-panels-group {
      height 100%
      .cube-tab-panel {
        overflow scroll
      }
    }
    .cube-tab-bar{
      height 49px
      width 100%
      background #fff
      border-bottom 1px solid #EFF3F5
    }
    .item-wtap{
      flex 1
      background #fff
      box-sizing border-box
      padding 15px
      .top-t-wrap{
        display flex
        align-items center
        position relative
        i{
          position absolute
          top 3px
          left 0
          width 16px
          height 16px
          background url(/images/video.svg) no-repeat
          background-size contain
        }
        p{
          box-sizing border-box
          padding-left 0
          font-size 15px
          font-family PingFangSC-Medium
          font-weight 500
          color rgba(53,53,54,1)
          text-indent 1.5em
          line-height 24px
        }
      }
      .middle-wrap{
          display flex
          box-sizing border-box
          padding 15px 0
          .left-time{
            display flex
            align-items center
            box-sizing border-box
            padding-right 15px
            i{
              display inline
              width 13px
              height 13px
              background url(/images/time.svg) no-repeat
              background-size contain
            }
            p{
              font-size 13px
              font-family PingFangSC-Regular
              font-weight 400;
              color rgba(199,199,199,1)
              padding 0 5px
            }
          }
          .right-read{
            display flex
            align-items center
            i{
              display inline
              width 13px
              height 13px
              background url(/images/see.svg) no-repeat
              background-size contain
            }
            p{
              font-size 13px
              font-family PingFangSC-Regular
              font-weight 400
              color rgba(199,199,199,1)
              box-sizing border-box
              padding 0 5px
            }
          }
        }
        .describe,.type-item p{
          font-size 14px
          font-family PingFangSC-Regular
          font-weight 400
          color rgba(102,102,102,1)
          box-sizing border-box
        }
        .type-item p{
         box-sizing border-box
         padding 8px 0
        }
        .top-r-wrap{
          height 80px
          background #fff
          display flex
          .img-wrap{
            width 60px
            height 60px
            background #fff
            border-radius 50%
            align-self center
            img{
              width 100%
              height 100%
              border-radius 50%
              object-fit cover
            }
          }
          .persion-dis{
            display flex
            flex-direction column
            justify-content center
            box-sizing border-box
            padding 3px 0px 3px 15px
            flex 1
            .name{
              font-size 18px
              font-family PingFangSC-Medium
              font-weight 500
              color rgba(53,53,54,1)
              box-sizing border-box
              padding-bottom 8px
            }
            .job{
              font-size 14px
              font-weight 400
              font-family PingFangSC-Medium
              color rgba(155,155,157,1)
              line-height 20px
            }
          }
        }
      .disc-wrap{
        box-sizing border-box
        padding 15px 0
        p{
          font-size 14px
          font-family PingFangSC-Regular
          font-weight 400
          color rgba(102,102,102,1)
          line-height 24px
        }
      }
    }
  }
}
</style>
