<template>
	<div class="box">
		<div class="bg-music" @click="pausemusic"> 
			<audio class="snake-audio" loop="loop">
				<source src="../../../static/music/bg.mp3" type="audio/mpeg">
			</audio>
			<audio class="eat-audio">
				<source src="../../../static/music/eat.mp3" type="audio/mpeg">
			</audio>
			<audio class="over-audio">
				<source src="../../../static/music/over.mp3" type="audio/mpeg">
			</audio>
		</div>
		<img class="bg" src="../../../static/images/timg.jpg">
		<div class="user"><img src="../../../static/images/banana.jpg"></div>
		<div class="return-btn" @click="returnbtn"></div>
		<div class="pause-btn" id="pause-btn" @click="pause"></div>
		<div class="start-btn" id="start-btn" @click="start"></div>
		<div class="wallon-btn" id="wallon-btn" @click="wallon_off('1')"></div>
		<div class="walloff-btn" id="walloff-btn" @click="wallon_off('0')"></div>
		<div id="box_2"></div>
		<div class="main">
			<div id="yard">
				<img src="../../../static/images/game.png">
				<canvas id="canvas" height="800px" width="800px"></canvas>
			</div>
			<img id="over" src="../../../static/images/over.png">
			<div class="notice_2">
				<img src="../../../static/images/notice3.png">
			</div>
			<p id="overmsg">Press <span style="background-color: #FFFFFF; color: #000000">Space</span> To Begin A</p>
			<!-- <p id="continuemsg">press <span style="background-color: #FFFFFF; color: #000000">Enter</span> to continue</p> -->
	        <div class="score">
	            <div id="mark">Score: <span id="mark_con"></span></div>
	            <div id="next">Next: <span id="next_con"></span></div>
	            <div id="speed"><span id="speed_con"></span></div>
	        </div>
		</div>
		<div class="gamename">
			<img src="../../../static/images/name.png">
		</div>
		<div class="lawn">
			<img src="../../../static/images/lawn.png">
		</div>
		<div class="notice">
			<img src="../../../static/images/notice.png">
			<div class="notice_score"><span>2000</span></div>
		</div>
		<div class="time"><span id="time"></span></div>
		<div class="explain">
			<span>游戏说明：</span>
			<p>按 ↑ ↓ ← → 键来控制蛇的移动方向</p>
			<p>游戏中 回车(Enter)暂停/继续</p>
			<p>死亡后 空格(Space)重新开始</p>
			<p>分数达到一定时，蛇的移动速度加快，难度提高</p>
		</div>
	</div>
</template>
<script>
	import {init, pause, pausemusic, time, displayTime, setWall, clearTime} from '../../../static/js/game.js'  
    export default {  
        components: {   
		},
        data() {
			return {
			}
		},
		mounted(){
			init();
			time();
			displayTime();
		},
		methods: {
			returnbtn() {
				this.$router.push({ path: '/snake/index' });//跳转到首页
				clearTime();
			},
			pause() {
				pause();
			},
			start() {
				pause();
			},
			wallon_off(msg) {
				setWall(msg);
			},
			pausemusic() {
				pausemusic();
			},
    	}
    }
</script>
<style scoped>
@import '../../../static/css/game.css'
</style>