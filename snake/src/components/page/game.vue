<template>
	<div class="box">
		<img class="bg" src="../../../static/images/timg.jpg">
		<div class="main">
		<header class="wrap">
	    <h1>—— SNAKE ——</h1>
	    <p class="score">Score: <span id="score_value">0</span></p>
		</header>
		<canvas class="wrap" id="snake" width="800" height="800" tabindex="1"></canvas>

		<!-- Game Over Screen -->
		<div id="gameover">
		    <h2>Game Over</h2>
		    <p>press <span style="background-color: #FFFFFF; color: #000000">space</span> to begin a</p>
		    <a id="newgame_gameover">new game</a>
		    <a id="setting_gameover">settings</a>
		</div>

		<!-- Setting screen -->
		<div id="setting">
		    <h2>Settings</h2>

		    <a id="newgame_setting">new game</a>

		    <p>Speed:
		        <input id="speed1" type="radio" name="speed" value="120" checked/>
		        <label for="speed1">Slow</label>
		        <input id="speed2" type="radio" name="speed" value="75" />
		        <label for="speed2">Normal</label>
		        <input id="speed3" type="radio" name="speed" value="35" />
		        <label for="speed3">Fast</label>
		    </p>

		    <p>Wall:
		        <input id="wallon" type="radio" name="wall" value="1" checked/>
		        <label for="wallon">On</label>
		        <input id="walloff" type="radio" name="wall" value="0" />
		        <label for="walloff">Off</label>
		    </p>

		</div>

		<!-- Main Menu Screen -->
		<div id="menu">
		    <h2>Snake</h2>

		    <a id="newgame_menu">new game</a>
		    <a id="setting_menu">settings</a>
		</div>
		</div>
	</div>
</template>
<script>
	import game from '../../../static/js/game.js'  
    export default {  
        components: {
        	game,
        },
        data () {

        },
        created () { //页面加载前生命周期函数
		},
		methods: {
    	}
    }
</script>
<style scoped>
@import '../../../static/css/game.css'
</style>