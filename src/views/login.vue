<template>
  <div>
    <van-nav-bar title="标题" />
    <van-cell-group>
      <van-field left-icon="phone-o" placeholder="请输入手机号" />
      <van-field left-icon="bag-o" placeholder="请输入验证码" />
    </van-cell-group>
    <div class="login_btn">
      <van-button type="info">登录</van-button>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang='less' scoped>
.login_btn{
  padding: 30px 20px;
  .van-button--normal{
    width: 100%;
    border-radius: 5px;
  }
}
</style>
