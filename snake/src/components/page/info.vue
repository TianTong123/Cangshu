<template>
  <div class="info">
    <!-- 背景 -->
    <canvas id="canvasBg" style="display:none;"></canvas>
    <canvas id="canvas"></canvas>
    <div id="wrap" class="wrap">
      <!-- 用户头部 -->
		  <div class="header">
		  	<div class="bg"></div>
		  	<div class="wrap">
		  		<!-- 更换头像 -->
		  		<div class="user-img"><img src="../../../static/images/banana.jpg" alt=""></div>
		  		<div class="user-name">某科学得超级计算稽</div>
		  		<div class="user-vip">VIP</div>
		  		<div class="info">这是一个个性签名！</div>
		  	</div>
		  </div>

      <!-- 战绩 -->
      <div class="military-exploits">
        <div class="content">
          <div class="melogo"></div>
          <div class="title">最高战绩</div>
        </div>
        <div class="content">
          <div class="melogo"></div>
          <div class="title"></div>
        </div>
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
}
</script>

<style scoped>
@import '../../../static/css/info.css'
</style>