<template>
  <div class="info">
    <!-- 背景 -->
    <canvas id="canvasBg" width = '1200' height = '300' style="display:none" ></canvas>
    <canvas id="canvas" width = '1200' height = '300'>
    </canvas>
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
.info{
  width: 1200px;
  height: auto;
}
#canvas{
  opacity: .6;
}
</style>