<template>
  <div>
    <router-view></router-view>
    <van-nav-bar title="黑马头条" fixed />
    <van-tabs animated v-model="activeIndex">
      <van-tab v-for="channel in channelsList" :key="channel.id" :title="channel.name">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <van-cell v-for="article in currentChannel.articles" :key="article.art_id.toString()" :title="article.title" />
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>s

<script>
import { getdefaultOrUserChannel } from '@/api/channels'
import { getArticles } from '@/api/articles'
export default {
  data () {
    return {
      // 频道数据
      channelsList: [], // 获取频道列表
      activeIndex: 0, // 获取当前频道索引
      // 文章标题列表
      artTitleList: [],
      loading: false,
      finished: false
    }
  },
  computed: {
    // 当前的频道
    currentChannel () {
      return this.channelsList[this.activeIndex]
    }
  },
  methods: {
    // 获取频道列表
    async getChannel () {
      try {
        let res = await getdefaultOrUserChannel()
        res.channels.forEach((channel) => {
          channel.timestamp = null
          channel.articles = []
        })
        this.channelsList = res.channels
      } catch (error) {
        console.log(error)
      }
    },
    // 获取文章标题列表
    async onLoad () {
      try {
        let res = await getArticles(
          {
            channelId: this.currentChannel.id,
            timestamp: this.currentChannel.timestamp || Date.now(),
            withTop: 1
          }
        )
        this.currentChannel.timestamp = res.pre_timestamp
        this.currentChannel.articles = res.results
        this.currentChannel.articles.push(...res.results)
        this.loading = false
      } catch (error) {
        console.log(error)
      }
    }
  },
  created () {
    this.getChannel()
  }
}
</script>

<style lang='less' scoped>
.van-tabs {
  /deep/ .van-tabs__wrap {
    position: fixed;
    top: 46px;
    left: 0;
    right: 10px;
    z-index: 100;
  }
  /deep/ .van-tabs__content {
    margin-top: 90px;
    margin-bottom: 50px;
  }
}
</style>
