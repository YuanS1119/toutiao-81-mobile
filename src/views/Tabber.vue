<template>
  <div>
    <router-view></router-view>
    <van-tabbar>
      <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="ask" icon="search">问答</van-tabbar-item>
      <van-tabbar-item to="video" icon="friends-o">视频</van-tabbar-item>
      <van-tabbar-item to="self" icon="setting-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'tabbar'
}
</script>

<style>
</style>
