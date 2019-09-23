import Vue from 'vue'
import App from './App'
import router from './router'
import VueAxios from 'vue-axios'
import axios from 'axios'
import httpService from './service/service';//封装axios接口强求/*

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);

axios.defaults.baseURL = '/api'//改成/api才能用proxyTable跨域,反正这个就是把那个瞎写的路径配进去的实现
Vue.prototype.$axios = httpService; //新增，有影响就删除 
Vue.prototype.$ajax = axios

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
