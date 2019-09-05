<template>
  <div>
    <router-view></router-view>
    <van-nav-bar title="黑马头条" left-arrow />
    <van-tabs animated>
      <van-tab v-for="index in 8" :title="'标签 ' + index" :key="index">内容 {{ index }}</van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: ''
    }
  }
}
</script>

<style>
</style>
