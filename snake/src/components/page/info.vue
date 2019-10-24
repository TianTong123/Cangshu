<template>
  <div class="info">
    <!-- canva特效 -->
    <canvas id="canvasBg" style="display:none;"></canvas>
    <canvas id="canvas"></canvas>
    <!-- 背景 -->
    <div class="left-bg"></div>
    <!-- 主题内容 -->
    <div class="wrap" id="wrap">
      <!-- 用户信息 -->
      <div class="user-info">
        <!-- uid -->
        <div class="option3">
          <ul>
            <li></li><li></li><li></li>
          </ul>
          <div class="uid">
              <div class="title">UID</div> 
              <i class="line"></i>
              <span>{{userInfo.id}}</span> 
          </div>
        </div>

        <!-- 遮罩 -->
        <div class="shade" v-show="editImgShow || editPwdShow"></div>

        <!-- 更换头像 -->
        <div class="editimg" v-show="editImgShow">
          <div class="title"><div class="title_box2 bg"></div><span>修改头像</span></div>
          <input type="file" ref="img" @change="getImgBase()">
          <div class="add-img-btn preview" @click="selectImg()"></div>
          <div class="preview">
            <img src="../../../static/images/addimage.png" v-show="addImgBtn">
            <img :src="imgPreview" alt="">
          </div>
          <div class="btn-wrap">
            <div class="btn">确认</div>
            <div class="btn" @click="showEditImg()">取消</div>
          </div>
        </div>

        <!-- 修改密码 -->
        <div class="editimg editpwd" v-show="editPwdShow">
          <div class="title"><div class="title_box2 bg"></div><span>修改密码</span></div>
          <div class="editinp">原密码:&nbsp;&nbsp;<input type="password" v-model="editPwForm.oPwd" placeholder="请输入原密码"><span>{{editPwForm.oTip}}</span></div>
          <div class="editinp">新密码:&nbsp;&nbsp;<input type="password" v-model="editPwForm.nPwd" placeholder="密码长度为6以上哦（＞人＜；）"><span>{{editPwForm.nTip}}</span></div>
          <div class="editinp">新密码:&nbsp;&nbsp;<input type="password" v-model="editPwForm.rPwd" placeholder="重新输入一遍防止打错哦(●ˇ∀ˇ●)"><span>{{editPwForm.rTip}}</span></div>
          <div class="btn-wrap"> 
            <div class="btn" @click="updatePwd()">确认</div>
            <div class="btn" @click="showEditPwd()">取消</div>
          </div>
        </div>
        
        <!-- 右边的内容 -->
        <div class="user">
          <!-- 头像 -->
          <div class="user-img title_box1" @click="showEditImg()">
            <div class="flame-img"><img src="../../../static/images/banana.jpg" alt=""> </div>
          </div>
          <!-- 名字 -->
          <div class="name-wrap">
            <div class="name"> 
              &nbsp;&nbsp;名字:&nbsp;&nbsp;&nbsp;&nbsp;{{userInfo.userNick}}
              <div class="inp" v-show="editInfoFlag"><input type="text" v-model="userInfo.userNick" :placeholder="userInfo.userName"></div>
            </div>     
            <div class="edit" v-show="!editInfoFlag" @click="showEditName()">修改</div>
            <div class="edit" v-show="editInfoFlag" @click="updateName()">确认</div>
          </div>
          <!-- 账号 -->
          <div class="name-wrap account">&nbsp;&nbsp;账号:&nbsp;&nbsp;&nbsp;&nbsp;{{userInfo.userName}}</div>
          <div class="bar"></div>
          <div class="snake snake_yello">最大长度:&nbsp;&nbsp;{{maxLength}}</div>
          <div class="snake snake_red">最高分数:&nbsp;&nbsp;{{maxScore}}</div>
          <div class="btn-wrap">
            <div class="btn">账号登出</div>
            <div class="btn" @click="showEditPwd()">修改密码</div>
          </div> 
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {init} from '../../../static/js/InfoCanvas.js';
export default {
  mounted: function(){
    init();
    this.userInfo = this.$store.state.userInfo;
  },
  data(){
    return{
      editInfoFlag: false,//编辑用户信息
      editImgShow: false, //修改图片窗口显示
      editPwdShow: false,//修改密码窗口显示
      imgPreview: "", //预览图像
      addImgBtn: true,//选择图片的按钮
      baseUrl: this.$store.state.baseUrl,//基础路径
      formFlag: false,//表单验证flag
      maxLength: this.$store.state.maxLength,
      maxScore: this.$store.state.maxScore,
      userInfo:{ //用户信息
        userName: "",
        account: "",
        uid: "",
      },
      editPwForm:{ //修改密码
        oPwd: "",
        oTip: "",
        nPwd: "",
        nTip: "",
        rPwd: "",
        rTip: "",
      }
    }
  },
  methods:{
    /**
     * 修改密码
     */
    updatePwd(){
      //格式检验
      if(this.editPwForm.oPwd != "" && this.editPwForm.oPwd.length >= 6){
        this.editPwForm.oTip = "";
        if(this.editPwForm.nPwd != "" && this.editPwForm.oPwd.length >= 6){
          this.editPwForm.nTip = "";
          if(this.editPwForm.rPwd == this.editPwForm.nPwd){
             this.editPwForm.rTip = "";
               let url =  "/user/user/updatePassWord"
               let params = new URLSearchParams();
               params.append('token',this.$store.state.token);
               params.append('userPassword', this. editPwForm.oPwd);
               params.append('userNewPassword', this.editPwForm.nPwd);
               this.axios.post(url, params).then(res=>{
                  this.editPwdShow = false;
                  alert(res.data.msg);
               }) 
          }else
            this.editPwForm.rTip = "两次密码不一致啊";      
        }else
          this.editPwForm.nTip = "新密码不能为空或长度不足6位";    
      }else
        this.editPwForm.oTip = "密码不能为空或长度不足6位";
    },
    /**
     * 修改昵称
     */
    updateName(){
      this.editInfoFlag = false;
        let url = "/user/user/updateNick"
        let params = new URLSearchParams();
        params.append('token',this.$store.state.token);
        params.append('userNick', this.userInfo.userNick);
        this.axios.post(url, params).then(res=>{
          this.userList = this.data;
        })  
    },
    /**
     * 显示更换图片窗口
     */
    showEditImg(){ 
      //显示/关闭窗口
      this.editImgShow = !this.editImgShow;
      //清空预览图像
      this.imgPreview = "";
      //恢复  “选择图片”的图标
      this.addImgBtn = true;
    },
    /**
     * 显示修改密码窗口
     */
    showEditPwd(){ 
      //显示/关闭窗口
      this.editPwdShow = !this.editPwdShow;
    },
    /**
     * 显示修改用户名窗口
     */
    showEditName(){ this.editInfoFlag = !this.editInfoFlag},

    /**
     * 选择头像（触发input type="file"）
     */
    selectImg(){this.$refs.img.click();},

    /**
     * 本地上传图片进行预览
     */
    getImgBase(){
      var _this = this;
      var event = event || window.event;
      var file = event.target.files[0];
      var reader = new FileReader(); 
      //转base64
      reader.onload = function(e) {
          _this.imgPreview = e.target.result;
      }
      reader.readAsDataURL(file);
      //隐藏  “选择图片”的图标
      this.addImgBtn = false;
    },
  }
}
</script>

<style scoped>
@import '../../../static/css/info.css';
@import '../../../static/css/musicBox.css';
@import '../../../static/css/icon.css';
</style>