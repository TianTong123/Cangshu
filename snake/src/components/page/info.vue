<template>
  <div class="info">
    <canvas id="canvasBg" style="display:none;"></canvas>
    <canvas id="canvas"></canvas>
    <div class="left-bg"></div>
    <div class="wrap" id="wrap">
      <div class="type">
        <div class="nullbox"></div>
        <div class="btn selected" @click="switchContent(1)">玩家</div>
        <div class="btn" @click="switchContent(2)">战绩</div>
      </div>
      <!-- 用户信息 -->
      <div class="user-info">
        <div class="option3">
          <ul>
            <li></li><li></li><li></li>
          </ul>
          <div class="uid">
              <div class="title">UID</div> 
              <i class="line"></i>
              <span>4848785823</span> 
          </div>
        </div>
        <div class="user" v-show="contentShow">
          <div class="user-img title_box1">
            <div class="flame-img"><img src="../../../static/images/banana.jpg" alt=""> </div>
            <input type="file">
          </div>
          <div class="name-wrap">
            <div class="name"> 
              &nbsp;&nbsp;名字:&nbsp;&nbsp;&nbsp;&nbsp;某科学的超级计算稽
              <div class="inp"><input type="text" placeholder="某科学的超级计算稽"></div>
            </div>     
            <div class="edit">修改</div>
          </div>
          <div class="name-wrap account">&nbsp;&nbsp;账号:&nbsp;&nbsp;&nbsp;&nbsp;17765602411</div>
          <div class="bar"></div>
          <div class="snake snake_yello">最大长度:&nbsp;&nbsp;220</div>
          <div class="snake snake_red">最高分数:&nbsp;&nbsp;1433233</div>
          <div class="btn-wrap">
            <div class="btn">账号登出</div>
            <div class="btn">修改密码</div>
          </div> 
        </div>
      </div>
      <!-- 战绩信息 -->
      <div class="game-info" v-show="!contentShow">
      </div>
    </div>
  </div>
</template>

<script>
import {init} from '../../../static/js/InfoCanvas.js';
export default {
  mounted: function(){
    init()
    
  },
  data(){
    return{
      editInfoFlag: false,
      contentShow: true,
    }
  },
  methods:{
    switchContent( flag ){
      if( flag == 1 )
        this.contentShow = true;
      else
        this.contentShow = false;
    }
  }
}
</script>

<style scoped>
@import '../../../static/css/info.css';
@import '../../../static/css/musicBox.css';
@import '../../../static/css/icon.css';
</style>