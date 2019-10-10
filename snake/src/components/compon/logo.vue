<template>
  <div :class="{'logo': true, 'run-logo': runLogo, 'close-run-logo': closeLogo}">
    <div class="wrap">
      <!-- 顶部的杠 -->
      <div :class="{'logo-bg':true, 'logo-top':true , 'openTop':openTop, 'closeTop':closeTop}"></div>
      <!-- 中间的三个字 -->
      <div class="logo-bg logo-font num1"></div>
      <div class="logo-bg logo-font num2"></div>
      <div class="logo-bg logo-font num3"></div>
      <!-- 下面的杠 -->
      <div :class="{'logo-bg':true, 'logo-bottom':true,'openBottom':openBottom, 'closeBottom':closeBottom}" ></div>
    </div>
  </div>
</template>
<script>
export default {
  name:"logo",
  data(){
    return{
    }
  },
  props:["openBottom", "closeBottom", "openTop", "closeTop", "runLogo", "closeLogo"],
  methods:{
  },
}
</script>
<style scoped>
@import '../../../static/css/logo.css'
</style>