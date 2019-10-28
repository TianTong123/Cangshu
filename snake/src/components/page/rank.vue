<template>
  <div class="rank">
    <div :class="['card',  'order'+id, {'snake_red': id==0, 'snake_purple': id==1, 'snake_yello': id>1 }]" v-for="(e, id) in list" :key="id">
      <div :class="'num num'+id">{{id+1}}</div>
      <div class="numName">st</div>
      <div class="score">{{e.scoreSC}}</div>
      <div class="data">{{e.gmtModified}} 甜筒</div>
    </div>
  </div>
</template>

<script>
export default {
  mounted () {
    this.getRank();
  },
  data(){
    return{
      list: ""
    }
  },
  methods: {
    getRank(){
      let url = "/score/score/getScoreList"
      this.axios.get(url+"?scoreDifficulty=" + '低').then(res=>{
        this.list = res.data.records;
        console.log(this.list);
      })  
    }
  }
}
</script>

<style scoped>
@import '../../../static/css/rank.css';
@import '../../../static/css/icon.css';
</style>