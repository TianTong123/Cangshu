<template>
  <div class="hello">
    <div class="bg">
      <div class="x-line" v-for="(e,id) in 79" :key="id"></div>  
    </div>
    <div class="bg">
      <div class="y-line" v-for="(e,id) in 100" :key="id"></div>
    </div>

    <div ref="snake" class="block"></div>
    <div v-for="(e,id) in userList" 
         :key="id" :ref="'otherSnake' + id" 
         class="block other" 
         :style="'left:'+ e.user.snake.x + 'px; top:' + e.user.snake.y+'px'"></div>


    <button style="position: absolute; left: 1000px; top: 200px;" @click="joinRoom()">加入房间</button>
    <input v-model="roomNumber" style="position: absolute; left: 1000px;  top:230px;" placeholder="房间id">
    <input v-model="user.uId" style="position: absolute; left: 1000px;  top:260px;" placeholder="用户id">
    <button style="position: absolute; left: 1000px;" @click="testX()">左</button>
    <button style="position: absolute; left: 1030px;" @click="testY()">加入蛇</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      roomNumber: "",
      url: "/demo/Client2",
      userList: [],
      user: {
        uId: "123",//用户id
        /* name: "",//用户名字
        score:"",//分数
        snake: {
          x: 20,
          y: 0,
          length: 3,
          body: [],//蛇身
          color: "",//先当作皮肤来看
          /* leftFlag: false,
          rightFlag: false,
          topFlag: false,
          bottomFlag: false, 
        } */
      },
      
    }
  },
  computed:{
    snakeX(){
      return snake.x
    },
    snakeY(){
      return snake.y
    },
  },
  mounted: function () {
    this.$nextTick(function () {
     

    })  
  },
  methods:{
    testX(){
      setInterval(() => {
          this.moveX();
      }, 600);
      
    },
    testY(){
      this.userList.push(this.newUser(Math.ceil(Math.random()*100) *10,Math.ceil(Math.random()*80)*10, "haha"));
      console.log(this.userList)
    },
    joinRoom(){
      
      let params = new URLSearchParams();
      params.append('user', this.user.toString());
      //params.append('roomNumber', this.roomNumber); 
      let config = {
        headers:{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
      };
      console.log(this.user);
      this.axios.post(this.url, params).then(res=>{
       // this.user.snake = res.data; 
      })     
      
      /**
       * 每帧刷新(60帧)
       */
      //setInterval(() => {
      //  this.getData();
     // }, 1000/60);
    },
    getData(){
      let params = new URLSearchParams();
      params.append('user', this.user.snake);
      params.append('roomNumber', this.roomNumber); 
      this.axios.post(this.url, params).then(res=>{
        this.userList = this.data;
      })  
    },
    
    newUser( ox, oy, name){
      let otherUser ={ 
        user:{ 
          uId: "",//用户id
          name: name,//用户名字
          score:"",//分数
          snake: {
            x: ox,
            y: oy,
            length: 3,
            body: [],//蛇身
            color: "",//先当作皮肤来看
            leftFlag: false,
            rightFlag: false,
            topFlag: false,
            bottomFlag: false,
          }
      }}
      return otherUser;
    },
    moveX(object){
     this.user.snake.x += 10;
    }
    
  },
  watch: {
    'user.snake.x'(){
      this.$refs.snake.style.left = this.user.snake.x + "px";
    },
  }
}
</script>

<style scoped>
.hello{
  position: relative;
  margin: 0 auto;
  width: 1000px;
  height: 800px;
  border: 1px solid #ccc;
}
.hello .block{
  position: absolute;
  display: block;
  width: 10px;
  height: 10px;
  background-color: blue;
}
.hello .bg{
  position: absolute;
  width: 100%;
  height: 100%;
}
.bg .x-line{
  position: relative;
  margin-top: 9px;
  height: 1px;
  width: 100%;
  background-color: #eee;
}
.hello  .other{
  background-color: #f00;
}
.bg .y-line{
  position: relative;
  display: inline-block;
  margin-left: 9px;
  height: 100%;
  width: 1px;
  background-color: #eee;
}
</style>
