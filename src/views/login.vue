<template>
  <div>
    <van-nav-bar title="标题" />
    <van-cell-group>
      <van-field
        v-validate="'required|digits:11'"
        name="mobile"
        clearable
        :error-message="errors.first('mobile')"
        v-model="user.mobile"
        left-icon="phone-o"
        placeholder="请输入手机号"
      />
        <van-field
        v-validate="'required|digits:6'"
        name="code"
        :error-message="errors.first('code')"
        v-model="user.code"
        left-icon="star-o"
        placeholder="请输入验证码">
        <van-button slot="button" type="default" size="small">获取验证码</van-button>
      </van-field>
    </van-cell-group>
    <div class="login_btn">
      <van-button type="info" @click="handleLogin" :loading="locading" loading-type="spinner" loading-text="登录中..." >登录</van-button>
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
        mobile: '',
        code: ''
      },
      locading: false
    }
  },
  methods: {
    ...mapMutations(['setUser']),
    async handleLogin () {
      this.locading = true
      try {
        const valid = await this.$validator.validate()
        if (!valid) {
          this.locading = false
          return
        }
        let data = await login(this.user)
        this.setUser(data)
        this.$router.push('/')
        this.$toast.success('登录成功')
      } catch (error) {
        this.$toast.fail('登录失败')
      }
    }
  },
  created () {
    const dict = {
      custom: {
        mobile: {
          required: '请输入手机号码',
          digits: '手机号必须是11位的数字'
        },
        code: {
          required: () => '请输入验证码',
          digits: '验证码必须是6位的数字'
        }
      }
    }
    // or use the instance method
    this.$validator.localize('custom', dict)
  }
}
</script>

<style lang='less' scoped>
.login_btn {
  padding: 30px 20px;
  .van-button--normal {
    width: 100%;
    border-radius: 5px;
  }
}
</style>
