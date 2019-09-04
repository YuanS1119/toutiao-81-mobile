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
import { mapMutations } from 'vuex'
// import Vue from 'vue'
// import { Toast } from 'vant'
// Vue.use(Toast)
export default {
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      }
    }
  },
  methods: {
    ...mapMutations(['setUser']),
    async handleLogin () {
      try {
        let data = await login(this.user)
        // this.$store.commit('setUser', data)
        this.setUser(data)
        this.$router.push('/')
        this.$toast.success('登录成功')
      } catch (error) {
        this.$toast.fail('登录失败')
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
