<template>
  <div class="rank">
    <div :class="['card',  'order'+id, {'snake_red': id==0, 'snake_purple': id==1, 'snake_yello': id>1 }]" v-for="(e, id) in 5" :key="id">
      <div :class="'num num'+id">{{id+1}}</div>
      <div class="numName">st</div>
      <div class="score">1433233</div>
      <div class="data">2019/10/07 甜筒</div>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style scoped>
@import '../../../static/css/rank.css';
@import '../../../static/css/icon.css';
</style>