<template>
  <div class="index">
    <!-- 背景 -->
    <div class="bg"></div>
    <!-- <canvas id="canvas"></canvas> -->
    <!-- 返回按钮 -->
    <div class="return-btn" @click="returnbtn" v-show="showReturnbtn"></div>
    <!-- 用户按钮 -->
    <div class="user-btn" @click="showUserInfo"></div>
    <!-- 音乐按钮 -->
    <div class="bg-music" @click="bgmBtn($event)"> 
      <audio loop autoplay ref="bgm">
        <source src="../../../static/music/bg.mp3" type="audio/mp3"/>
      </audio>
    </div>
    <div class="wrap">
      <!-- logo -->     
      <div ref="logoWrap" :style="{'margin-top': logoMarginTop+'px', 'margin-left': logoMarginLeft +'px', 'transform': tsfDeg}" class="logo-wrap">
        <logo 
          :openBottom="openBottomFlag" :closeBottom="closeBottomFlag"
          :openTop="openTop" :closeTop="closeTop"
          :runLogo="openRunLogo" :closeLogo="closeRunLogo"></logo>
      </div>
      <!-- 遮罩 -->
      <div class="shade" @click="contiueStart()" v-if="shade"><div class="big-title">点击任意处开始!</div></div>
      <!-- 按钮条 -->
      <div class="content-inner" v-show="contentShow">
        <div class="btn" @click="startGame">开始</div>
        <div class="btn" @click="showLoginWrap">登录</div>
        <div class="btn" @click="showRankWrap">排行榜</div>
      </div>
      <!-- 登录框显示 -->
      <div v-if="loginShow" class="login-content-wrap">
        <div class="login-wrap"><router-view></router-view></div>
      <!-- 排行榜显示 -->
      </div>
      <div class="rank-wrap" v-if="rankShow"><router-view></router-view></div>
      <!-- 用户详细信息 -->
      <div class="user-wrap" v-if="infoShow"><router-view></router-view></div>
    </div>
  </div>
</template>
<script>
import logo from "../compon/logo.vue"

export default {
  name:"index",
  components:{logo},
  mounted() {

  }, 
  data(){
    return{
      logoMarginTop: -250,//logo的垂直位置
      logoMarginLeft: -350,//logo的水平位置
      tsfDeg: 'rotate(0deg)',//logo 旋转角度
      shade: true,//开始游戏的遮罩
      musicBtn: true,//true播放音乐，反之暂停音乐
      contentShow: false,//开始游戏按钮
      showReturnbtn: false,//左上角的返回按钮
      returnEvent: 0, // 1：登录返回，2：排行榜返回，3：用户返回
      loginShow: false,//登录内容显示
      rankShow: false,//排行榜内容显示
      infoShow: false,//用户页内容显示
      openBottomFlag: false,//logo底部的杠的开关
      closeBottomFlag: false,
      openTop: false,//logo顶部的杠
      closeTop: false,
      openRunLogo: false,//旋转logo
      closeRunLogo: false,
    }
  },
  methods:{
    /**
     * 开始游戏
     */
    contiueStart(){
      this.shade = false;
      this.contentShow = true;
      this.logoMarginTop = -300;
      this.fullScreen();//全屏
      this.$refs.bgm.play();//播放音乐
    },
    /**
     * 登录
     */
    showLoginWrap(){
      this.$router.push({ path: '/snake/login' });//跳转到登录页
      this.openBottomFlag = true;
      this.closeBottomFlag = false;
      this.contentShow = false;
      this.showReturnbtn = true;
      this.returnEvent = 1;
      this.logoMarginTop = -420;
      this.loginShow = true;
    },
    /**
     * 开始游戏
     */
    startGame(){
      this.$router.push({ path: '/game' });//跳转到登录
    },
    /**
     * 音乐按钮
     */
    bgmBtn(e){
      let e1 = event.currentTarget;
      if(this.musicBtn){
        this.$refs.bgm.pause();
        e1.style.animationPlayState = "paused";
      }else{
        this.$refs.bgm.play();
        e1.style.animationPlayState = "running";
      }    
      this.musicBtn = !this.musicBtn;
    },
    /**
     * 排行榜
     */
    showRankWrap(){
      this.$router.push({ path: '/snake/rank' });//跳转到排行页
      this.rankShow = true;//显示排行榜 
      this.openTop = true;//打开logo顶部杠
      this.closeTop = false;
      this.openBottomFlag = true;//打开logo底部杠
      this.closeBottomFlag = false;
      this.showReturnbtn = true;//显示返回按钮
      this.returnEvent = 2;
      this.logoMarginLeft = -950;//移动logo至左边
      this.logoMarginTop = -200;
      this.contentShow = false;//隐藏按钮
      this.tsfDeg = 'rotate(30deg)';//旋转logo
    },
    /**
     * 用户
     */
    showUserInfo(){
      this.$router.push({ path: '/snake/info' });//跳转到用户页
      this.infoShow = true;//显示用户信息页
      this.closeBottomFlag= false;
      this.closeTop = false;
      this.openRunLogo = true;//旋转logo
      this.closeRunLogo = false;
      this.showReturnbtn = true;
      this.returnEvent = 3;
      this.logoMarginTop = 0;
      this.tsfDeg = 'rotate(90deg)';
      this.logoMarginLeft = -100;
      this.contentShow = false;
    },
    /**
     * 返回按钮
     */
    returnbtn(){
      switch( this.returnEvent){
        case 1://登录返回
          this.openBottomFlag = false;
          this.closeBottomFlag= true;
          this.closeRunLogo = false;
          this.closeTop = false;
          break;
        case 2: //排行榜返回
          this.openBottomFlag = false;
          this.closeBottomFlag= true;
          this.openTop = false;
          this.closeTop = true;
          this.closeRunLogo = false;
          break;
        case 3://用户返回
          this.openRunLogo = false;
          this.closeRunLogo = true;
          this.closeBottomFlag= false;
          this.closeTop = false;
          break;
      }  
      this.$router.push({ path: '/snake/index' });//跳转到首页
      this.contentShow = true;
      this.showReturnbtn = false;
      this.logoMarginTop = -250;
      this.logoMarginLeft = -350;
      this.rankShow = false;
      this.loginShow = false;
      this.infoShow = false;
      this.tsfDeg = 'rotate(0deg)';//旋转logo
    },
    /**
     * 全屏
     */
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