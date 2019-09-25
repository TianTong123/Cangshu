import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: '跳转snake',
      redirect: '/snake/index',
    },
    {
      path: '/snake',
      name: '首页',
      redirect: '/snake/index',
      meta: {
         keepAlive: true // 需要被缓存 
      },
      component: resolve => require(['../components/page/index.vue'], resolve),
      children:[
        {
          path: 'index',
          name: '首页内容',
          meta: {
             keepAlive: true // 需要被缓存 
          },
          component: resolve => require(['../components/page/index.vue'], resolve)
        },
        {
          path: 'login',
          name: '登录',
          meta: {
             keepAlive: true // 需要被缓存 
          },
          component: resolve => require(['../components/page/login.vue'], resolve)
        },
      ]
    },
  ]
})
