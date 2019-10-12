import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router);
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  routes: [
    {
      path: '/',
      name: '跳转snake',
      redirect: '/snake/index',
    },
    {
      path: '/game',
      name: '游戏',
      meta: {
         keepAlive: false // 需要被缓存 
      },
      component: resolve => require(['../components/page/game.vue'], resolve)
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
        {
          path: 'rank',
          name: '排行',
          meta: {
             keepAlive: true // 需要被缓存 
          },
          component: resolve => require(['../components/page/rank.vue'], resolve)
        },
        {
          path: 'info',
          name: '用户页面',
          meta: {
             keepAlive: true // 需要被缓存 
          },
          component: resolve => require(['../components/page/info.vue'], resolve)
        },
      ]
    },
  ]
})
