import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const SET_LOGIN_STATUS = 'SET_LOGIN_STATUS';
const SET_AREACODE = 'SET_AREACODE';
const SET_ACCOUNTID = 'SET_ACCOUNTID';
const SET_CLASS_STATUS = 'SET_CLASS_STATUS';

export default new Vuex.Store({
  state: {
    isLogin: JSON.parse(localStorage.getItem('isLogin')) || false,
    areacode: '86',
    accountId: '',
    classStatus: '',
  },
  getters: {
    loginStatus: s => s.loginStatus,
    getAreacode: s => s.areacode,
    getAccountId: s => s.accountId,
    getClassStatus: s => s.classStatus,
  },
  mutations: {
    [SET_LOGIN_STATUS](s, status) {
      s.loginStatus = status;
    },
    [SET_AREACODE](s, areacode) {
      s.areacode = areacode;
    },
    [SET_ACCOUNTID](s, accountId) {
      s.accountId = accountId;
      console.log(s.accountId);
    },
    [SET_CLASS_STATUS](s, classStatus) {
      s.classStatus = classStatus;
      console.log(s.classStatus);
    },
  },
  actions: {
    setAreacode({ commit }, areacode) {
      commit(SET_AREACODE, areacode);
    },
    setAccountId({ commit }, accountId) {
      commit(SET_ACCOUNTID, accountId);
    },
    setClassStatus({ commit }, classStatus) {
      commit(SET_CLASS_STATUS, classStatus);
    },
  },
});
