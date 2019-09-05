<template>
  <div>
    <router-view></router-view>
    <van-nav-bar title="黑马头条" left-arrow fixed />
    <van-tabs animated>
      <van-tab v-for="index in 8" :title="'标签 ' + index" :key="index">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <van-cell v-for="item in list" :key="item" :title="item" />
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      loading: false,
      finished: false
    }
  },

  methods: {
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 500)
    }
  }
}
</script>

<style lang='less' scoped>
  // .van-tabs /deep/ .van-tabs__content {
  //   margin: 46px 0 50px;
  // }
  .van-tabs{
    /deep/ .van-tabs__warp{
      position: fixed;
      left: 0;
      top: 46px;
      z-index: 100;
    }
    /deep/ .van-tabs__content{
       margin: 46px 0 50px;
    }
  }
</style>
