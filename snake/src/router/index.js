import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: '跳转首页',
      redirect: '/snake/login',
    },
    {
      path: '/snake',
      name: '跳转首页',
      redirect: '/snake/index',
      children: [
      
      ]
    },
    {
      path: '/snake/login',
      name: '登录',
      meta: {
         keepAlive: true // 需要被缓存 
      },
      component: resolve => require(['../components/compon/login.vue'], resolve)
    },
  ]
})
