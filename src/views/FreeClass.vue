<template>
  <div class="free-class-ctn">
    <div class="free-class-bg" ref="freeBg"></div>
    <div class="free-class-logo-bg"></div>
    <div class="free-class-bottom-bg"></div>
    <div class="receive-bg-wrap">
      <div class="receive-bg">
        <div class="class-form">
          <div class="mobile-input">
            <p @click="goAreaCode()" class="select-code">+{{selectedCode}}</p>
            <span></span>
            <input
              @focus="onShowMobile()"
              @blur="onBlur()"
              type="tel"
              name
              value
              v-model="mobile"
              placeholder="请输入您的手机号"
              maxlength="11"
            >
          </div>
          <div class="code-input">
            <input
              @focus="onShowCode()"
              type="tel"
              name
              value
              v-model="verify_code"
              placeholder="请输验证码"
              oninput="if(value.length>6)value=value.slice(0,6)"
              maxlength="6"
            >
            <p class="cut">|</p>
            <button class="get-code" :style="{color:disabled?'#afacab':'#FFA80B'}" :disabled="disabled" @click="onGetCode">{{content}}</button>
          </div>
          <p class="error-msg" :style="{ visibility : errorMsg }">{{errorMassage}}</p>
          <p class="receive-class" @click="lonLogin">领取免费体验课</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api';
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      areacode: '',
      mobile: '',
      verify_code: '',
      content: '获取验证码',
      disabled: false,
      errorMassage: '验证码错误',
      errorMsg: 'hidden',
      totalTime: 60,
      type: 'receive_trial_klass',
      accountId: '',
      status: '',
      promoterId: this.$route.query.promoter_id,
      clock: null,
    };
  },
  computed: {
    ...mapGetters(['getAreacode']),
    selectedCode() {
      return this.getAreacode;
    },
  },
  methods: {
    ...mapActions(['setAccountId', 'setClassStatus']),
    onShowMobile() {
      this.errorMsg = 'hidden';
    },
    onShowCode() {
      this.errorMsg = 'hidden';
    },
    onBlur() {
      let e;
      let eCode;
      if (this.getAreacode === '86') {
        e = /^1[3-9]\d{9}$/;
        eCode = e.test(this.mobile);
      }
      if (!this.mobile) {
        this.errorMsg = 'visible';
        this.errorMassage = '请输入手机号';
      } else if ((this.getAreacode === '86' && !eCode) || (this.getAreacode !== '86' && this.mobile.length < 7)) {
        this.errorMsg = 'visible';
        this.errorMassage = '请输入有效手机号';
      }
    },
    onGetCode() {
      let e;
      let eCode;
      if (this.getAreacode === '86') {
        e = /^1[3-9]\d{9}$/;
        eCode = e.test(this.mobile);
      }
      if (!this.mobile) {
        this.errorMsg = 'visible';
        this.errorMassage = '请输入手机号';
      } else if ((this.getAreacode === '86' && eCode) || (this.getAreacode !== '86' && this.mobile.length > 6)) {
        if (!this.disabled) {
          this.disabled = true;
          this.postVerifyCode();
          this.clock = window.setInterval(() => {
            this.totalTime--;
            this.content = `${this.totalTime}s后重新发送`;
            if (this.totalTime < 1) {
              window.clearInterval(this.clock);
              this.content = '重新发送验证码';
              this.totalTime = 60;
              this.disabled = false;
            }
          }, 1000);
        }
      }
    },
    postVerifyCode() {
      api.postVerifyCode({ area_code: this.selectedCode, mobile: this.mobile, type: this.type });
    },
    lonLogin() {
      let behavior = getNVCVal();
      let e;
      let eCode;
      if (this.getAreacode === '86') {
        e = /^1[3-9]\d{9}$/;
        eCode = e.test(this.mobile);
      }
      if (!this.mobile) {
        this.errorMsg = 'visible';
        this.errorMassage = '请输入手机号';
      } else if ((this.getAreacode === '86' && !eCode) || (this.getAreacode !== '86' && this.mobile.length < 7)) {
        this.errorMsg = 'visible';
        this.errorMassage = '请输入有效手机号';
      } else if (!this.verify_code && ((this.getAreacode === '86' && eCode) || (this.getAreacode !== '86' && this.mobile.length > 6))) {
        this.errorMsg = 'visible';
        this.errorMassage = '请输入验证码';
      } else if ((((this.getAreacode === '86' && eCode) && this.verify_code) && this.verify_code) || ((this.getAreacode !== '86' && this.mobile.length > 6))) {
        api.postReceive({
          area_code: this.selectedCode, mobile: this.mobile, verify_code: this.verify_code, promoter_id: this.promoterId, type: 'receive_trial_klass', behavior, page: 'app',
        }).then((res) => {
          if (res.data.ret === true) {
            this.accountId = res.data.data.account_id;
            this.setAccountId(this.accountId);
            this.status = res.data.data.status;
            this.setClassStatus(this.status);
            if (this.status === -1 || this.status === 0) {
              this.$router.push('/AboutClass');
            } else {
              this.$router.push('/ClassStatus');
            }
          } else if (res.data.ret === false) {
            this.errorMsg = 'visible';
            this.errorMassage = res.data.error;
          }
        });
      }
    },
    goAreaCode() {
      this.$router.push('/Areacode');
    },
  },
};
</script>

<style lang="stylus">
  .free-class-ctn {
    width: 100%;
    height: 100%;
    background: #fff0d2;
  }

  .free-class-ctn input {
    background: none;
    font-size: 16px;
  }

  .free-class-bg {
    width: 375px;
    height: 365px;
    background: url('../../public/images/backgronud.gif') no-repeat;
    background-size: 100%;
  }

  img {
    width: 100%;
    height: 100%;
  }

  .receive-bg {
    width: 90%;
    background: #fff;
    margin: -40px auto;
    position: absolute;
    left: 50%;
    top: 64%;
    margin-left: -45%;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .class-form {
    width: 85%;
    margin: 0 auto;
  }

  .select-code {
    color: #38383A;
    font-size: 16px;
  }

  .mobile-input input {
    width: 75%;
    margin-left: 8px;
  }

  .mobile-input span {
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #ccc;
  }

  .code-input input {
    width: 35%;
  }

  .cut {
    color: #E4E4E4;
  }

  .class-form>div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    background: #EFF3F5;
    border-radius: 25px;
    padding: 0 20px;
  }

  .mobile-input {
    margin-bottom: 15px;
  }

  .error-msg {
    color: #F8542E;
    font-size: 10px;
    margin: 4px 20px;
  }

  .receive-class {
    text-align: center;
    line-height: 50px;
    color: #fff;
    background: #F8542E;
    border-radius: 25px;
    font-size: 18px;
  }

  .get-code {
    border: none;
    color: #FFA80B;
    background: none;
    font-size: 16px;
    padding-right: 20px;
  }
  input::-webkit-input-placeholder {
    line-height 20px;
    font-size: 16px;
  }
  input::-moz-placeholder {
    line-height 20px;
    font-size: 16px;
  }
  @media screen and (min-width: 767px) and (max-width: 1024px) {
    .free-class-bg {
      width: 384px;
      height: 354px;
      background: url('../../public/images/backgronud2.gif') no-repeat;
      background-size: 100% 100%;
    }

    .receive-bg {
      top: 75%;
      padding-top: 12px;
      padding-bottom: 12px;
    }

    .class-form>div {
      height: 30px;
    }

    .receive-class {
      line-height: 30px;
      color: #fff;
      background: #F8542E;
      border-radius: 25px;
      font-size: 14px;
    }
    .free-class-ctn input {
      font-size: 12px;
    }
    .select-code {
      font-size: 12px;
    }
    .get-code {
      font-size: 12px;
    }
    .mobile-input {
      margin-bottom: 7px;
    }
    input::-webkit-input-placeholder {
      line-height 14px;
      font-size: 12px;
    }
    input::-moz-placeholder {
      line-height 14px;
      font-size: 12px;
    }
  }
</style>
