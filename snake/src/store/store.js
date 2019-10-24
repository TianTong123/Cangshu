import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'

Vue.use(Vuex);
/**
 * Vuex全局状态管理
 */
const store = new Vuex.Store({
  state: {
    userInfo: {
      userName: "",
      account: "",
      uid: "",
      id: "",
      userNick: "",
      maxLength: 120,
      maxScore: 755,
    },//当前登陆人信息
    token: "",
    maxLength: 120,
    maxScore: 755,
    baseUrl: 'http://192.168.43.203:8080',
  },

  mutations: {
    
  }
});

export default store;
