<template>
  <div class="login">
    <div class="wrap" v-show="!editRegisterShow">
      <div class="title title_box">登&nbsp;录</div>
      <div class="inp snake_yello"><input type="text" v-model="loginForm.userName" placeholder="请输入账号"><span></span> </div>
      <div class="inp snake_yello"><input type="password" v-model="loginForm.userPassword" placeholder="请输入密码"><span></span></div>
      <div class="btn fir" @click="login()">确&nbsp;&nbsp;认</div>
      <div class="btn" @click="showRegister()">注&nbsp;&nbsp;册</div>
    </div>
    <!-- 注册 -->
    <div class="editimg editpwd" v-show="editRegisterShow">
      <div class="title"><div class="title_box2 bg"></div><span>注册</span></div>
      <div class="editinp">账号:&nbsp;&nbsp;<input type="text" v-model="registerForm.userName" placeholder="请输入原密码"><span>{{codeTip}}</span></div>
      <div class="editinp">密码:&nbsp;&nbsp;<input type="password" v-model="registerForm.userPassword" placeholder="密码长度为6以上哦（＞人＜；）"><span>{{codeTip}}</span></div>
      <div class="editinp">
         验证码:
        <div class="identifying_code">
          <div class="progress" ref="probg"></div>
          <img src="../../../static/images/slide1.png" ref="block">
          <div class="airBroad" ref="air" @mousedown="down(1)" @mousemove="identifying($event)" @mouseup="down(2)"></div>
        </div>
        <span>{{codeTip}}</span>
      </div>
      <div class="btn-wrap">
        <div class="btn" @click="register()">确认</div>
        <div class="btn" @click="showRegister()">取消</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name:"login",
  data(){
    return{
      editRegisterShow: false,//显示注册
      registerForm:{
        userName: "",
        userPassword: "",
      },
      loginForm:{
        userName: "",
        userPassword: "",
      },
      baseUrl: this.$store.state.baseUrl,//基础路径
      //验证码
      mDown: false,//检测是否按下，按下为true 松手为 false
      codeTip: ""//验证码成功提示
    }
  },
  methods:{
    /**
     * 登录
     */
    login(){
      let url = "/user/user/userLogin"
      let params = new URLSearchParams();
      params.append('userName', this.loginForm.userName);
      params.append('userPassword', this.loginForm.userPassword);
      this.axios.post(url, params).then(res=>{
        if(res.data.code == 0){
          this.$store.state.userInfo = res.data.data.user;
          this.$store.state.token = res.data.data.token;
          this.$router.push({ path: '/snake/index' });//跳转到首页
          alert("登录成功！");
        }else{
          this.loginForm.userPassword = "";
          alert("登录失败！");
        }     
      })  
    },
     /**
     * 注册
     * @userName 用户名
     * @userPassword 用户密码
     */
    register(){
      let url =  "/user/user/registered"; //注册接口路径
      let params = new URLSearchParams();
      params.append('userName', this.registerForm.userName);
      params.append('userPassword', this.registerForm.userPassword);
      this.axios.post(url, params).then(res=>{
        this.editRegisterShow = false;//隐藏注册界面
        this.loginForm.userName = this.registerForm.userName;//更新登录账号
        alert("注册成功");
      })  
    },
    /**
     * 显示注册窗口
     */
    showRegister(){ 
      //显示/关闭窗口
      this.editRegisterShow = !this.editRegisterShow;
    },

    down(flag){
      if(flag == 1)
        this.mDown = true;
      else
        this.mDown = false;
    },
    /**
     * 验证码
     */
    identifying(e){
      if(this.mDown && e.offsetX>30 && e.offsetX < 185){
        this.$refs['block'].style.left = parseInt(e.offsetX) - 15 + "px";
        this.$refs['probg'].style.width = parseInt(e.offsetX) + 15 + "px";
      }
      if(e.offsetX >= 185){
        this.$refs['block'].style.left = 170 + "px";
        this.$refs['probg'].style.width = 200 + "px";
        this.$refs['air'].style.display = "none";
        this.codeTip = "验证成功";
      }
    }
  }
}
</script>
<style scoped>
@import '../../../static/css/login.css';
@import '../../../static/css/icon.css';
</style>