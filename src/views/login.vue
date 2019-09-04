<template>
  <div>
    <van-nav-bar title="标题" />
    <van-cell-group>
      <van-field v-model="user.mobile" left-icon="phone-o" placeholder="请输入手机号" />
      <van-field v-model="user.code" left-icon="bag-o" placeholder="请输入验证码" />
    </van-cell-group>
    <div class="login_btn">
      <van-button type="info" @click="handleLogin">登录</van-button>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    async handleLogin () {
      try {
        let res = await login(this.user)
        console.log(res, 'login')
      } catch (error) {
        console.log(error)
      }
    }
  }
}
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
