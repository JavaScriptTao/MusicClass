<template>
  <div class="fareacode-ctn">
    <div class="fareacode-wrap">
      <div v-for="(item, index) in areacodeArr" :key="index">
        <div :id="gernerateId(index)">
          <h2 class="group-name">{{item.group_name}}</h2>
          <div @click="onSelectCode(area.code)" v-for="(area, index) in item.area_group" :key="index" :class="area.code === current  ? 'select' : ''" class="code-list">
            <p>{{area.name}}</p>
            <p>+{{area.code}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="list-right-wrap">
      <div v-for="(item, index) in areacodeArr" :key="index">
        <a :href="getId(index)">{{item.group_name}}</a>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api';
import { mapGetters, mapActions } from 'vuex';

export default {
  props: {
    selectCode: String,
    // areacode:{
    //   type: Object,
    //   required:true,
    // },
  },
  data() {
    return {
      areacodeArr: [],
      group_name: '',
    };
  },
  created() {
    this.getAreacodeList();
  },
  computed: {
    ...mapGetters(['getAreacode']),
    current() {
      return this.getAreacode;
    },
  },
  methods: {
    ...mapActions(['setAreacode']),
    gernerateId(index) {
      return `code${index}`;
    },
    getId(index) {
      return `#code${index}`;
    },
    onSelectCode(val) {
      // this.$emit('sendAreaCode', this.current)
      this.$router.push('/reserve');
      this.setAreacode(val);
    },
    getAreacodeList() {
      api.getAreacode().then((res) => {
        this.areacodeArr = res.data.content;
      });
    },
  },
};
</script>
<style lang="stylus">
  .areacode-ctn{
    height 100%
    overflow auto
  }
  .fareacode-wrap{
    padding-left 5px
    padding-right 35px
  }
  .group-name{
    font-size 20px
    color #353536
    line-height 50px
    padding-left 10px
  }
  .code-list{
    display flex
    align-items center
    justify-content space-between
  }
  .code-list{
    padding 10px
  }

  .select{
    color #FF542E
    font-weight 600
  }
  .list-right-wrap{
    position absolute
    top 50%;
    transform translateY(-50%);
    right 0
  }
  .list-right-wrap div{
    padding 3px 3px
    text-align center
  }
</style>
