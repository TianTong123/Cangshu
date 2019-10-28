<template>
  <div class="rank"  >
    <div class="selectbtn">
      <ul>
        <li>{{dlist[0]}}</li>
        <li @click="selectDifficulty(1)">{{dlist[1]}}</li>
        <li @click="selectDifficulty(2)">{{dlist[2]}}</li>
      </ul>
    </div>
    <div v-if="fresh">
      <div :class="['card',  'order'+id, {'snake_red': id==0, 'snake_purple': id==1, 'snake_yello': id>1 }]" v-for="(e, id) in list" :key="id">
        <div :class="'num num'+id">{{id+1}}</div>
        <div class="numName">st</div>
        <div class="score">{{e.scoreSC}}</div>
        <div class="data">{{e.gmtModified}} 甜筒</div>
      </div>
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
      list: [],
      dlist: ['低', '中', '高'],
      fresh: true,
    }
  },
  methods: {
    getRank(){
      this.fresh = false;//刷新页面
      let url = "/score/score/getScoreList"
      this.axios.get(url+"?scoreDifficulty=" + this.dlist[0]).then(res=>{
        if(res.data.code = 0 )
          this.list = res.data.records;
        this.fresh = true;
      })  
    },
    selectDifficulty( index ){
      //不知道为什么，要整个改变才能刷新数据，真实神奇
      let tlist = [];
      tlist[0] = this.dlist[0];
      tlist[1] = this.dlist[1];
      tlist[2] = this.dlist[2];
      let temp = tlist[0];
      tlist[0] = tlist[index];
      tlist[index] = temp;
      this.dlist = tlist;//刷新显示数据
      //刷新排行榜
      this.getRank();
    }
  }
}
</script>

<style scoped>
@import '../../../static/css/rank.css';
@import '../../../static/css/icon.css';
</style>