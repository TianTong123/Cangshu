<template>
  <div class="index">
     <div class="wrap">
      <!-- 返回按钮 -->
      <div class="return-btn" @click="returnbtn" v-show="showReturnbtn"></div>
      <!-- 用户按钮 -->
      <div class="user-btn" @click="showUserInfo"></div>
      <!-- 背景音乐 -->
      <div class="bg-music"><video src=""></video></div>
      <!-- logo -->     
      <div ref="logoWrap" :style="{'margin-top': logoMarginTop+'px', 'margin-left': logoMarginLeft +'px'}" class="logo-wrap">
        <logo 
          :openBottom="openBottomFlag" :closeBottom="closeBottomFlag"
          :openTop="openTop" :closeTop="closeTop"
          :runLogo="openRunLogo" :closeLogo="closeRunLogo"></logo>
      </div>
      <!-- 遮罩 -->
      <div class="shade" @click="contiueStart()" v-if="shade"><div class="big-title">点击任意处开始!</div></div>
      <!-- 按钮条 -->
      <div class="content-inner" v-show="contentShow">
        <div class="btn">开始</div>
        <div class="btn" @click="showLoginWrap()">登录</div>
        <div class="btn" @click="showRankWrap">排行榜</div>
      </div>
      <!-- 登录框显示 -->
      <div v-if="loginShow" class="login-content-wrap">
        <div class="login-wrap"><router-view></router-view></div>
      </div>
      <!-- 排行榜显示 -->
      <div class="rank-wrap">
        <div class="rank-content"><!-- <router-view></router-view> --></div>
      </div>
      <!-- 用户详细信息 -->
      <div class="user-wrap">
        <div class="user-content"><!-- <router-view></router-view> --></div>
      </div>
    </div>
  </div>
</template>
<script>
import logo from "../compon/logo.vue"
export default {
  name:"index",
  components:{logo},
  mounted() {
     this.fullScreen();
  },
  data(){
    return{
      logoMarginTop: -250,//logo的垂直位置
      logoMarginLeft: -350,//logo的水平位置
      shade: true,
      contentShow: false,//开始游戏按钮
      showReturnbtn: false,//左上角的返回按钮
      returnEvent: 0, // 1：登录返回，2：排行榜返回，3：用户返回
      loginShow: false,//登录内容显示
      openBottomFlag: false,//logo底部的杠的开关
      closeBottomFlag: false,
      openTop: false,//logo顶部的杠
      closeTop: false,
      openRunLogo: false,//旋转logo
      closeRunLogo: false,
    }
  },
  methods:{
    contiueStart(){
      this.shade = false;
      this.contentShow = true;
      this.logoMarginTop = -300;
    },
    /**
     * 登录
     */
    showLoginWrap(){
      this.$router.push({ path: "/snake/login" });//跳转到登录页
      this.openBottomFlag = true;
      this.closeBottomFlag = false;
      this.contentShow = false;
      this.showReturnbtn = true;
      this.returnEvent = 1;
      this.logoMarginTop = -450;
      this.loginShow = true;
    },
    /**
     * 排行榜
     */
    showRankWrap(){
      this.openTop = true;//打开logo顶部杠
      this.closeTop = false;
      this.openBottomFlag = true;//打开logo底部杠
      this.closeBottomFlag = false;
      this.showReturnbtn = true;//显示返回按钮
      this.returnEvent = 2;
      this.logoMarginLeft = -950;//移动logo至左边
      this.logoMarginTop = -250;
      this.contentShow = false;//隐藏按钮
    },
    /**
     * 用户
     */
    showUserInfo(){
      this.closeBottomFlag= false;
      this.closeTop = false;
      this.openRunLogo = true;//旋转logo
      this.closeRunLogo = false;
      this.showReturnbtn = true;
      this.returnEvent = 3;
      this.logoMarginTop = -450;
      this.contentShow = false;
    },
    /**
     * 返回按钮
     */
    returnbtn(){
      switch( this.returnEvent){
        case 1:
          this.openBottomFlag = false;
          this.closeBottomFlag= true;
          this.closeRunLogo = false;
          this.closeTop = false;
          break;
        case 2:
          this.openBottomFlag = false;
          this.closeBottomFlag= true;
          this.openTop = false;
          this.closeTop = true;
          this.closeRunLogo = false;
          break;
        case 3:
          this.openRunLogo = false;
          this.closeRunLogo = true;
          this.closeBottomFlag= false;
          this.closeTop = false;
          break;
      }  
      this.contentShow = true;
      this.showReturnbtn = false;
      this.logoMarginTop = -250;
      this.logoMarginLeft = -350;
      this.loginShow = false;
    },
    fullScreen(){
      let element = document.documentElement;
      if (element.requestFullscreen) {
          element.requestFullscreen();
      } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
      } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
      } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
      }
    }
  }
}
</script>
<style scoped>
@import '../../../static/css/index.css'
</style>