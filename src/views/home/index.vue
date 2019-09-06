<template>
  <div>
    <router-view></router-view>
    <van-nav-bar title="黑马头条" fixed />
    <van-tabs animated v-model="activeIndex">
      <van-tab v-for="channel in channelsList" :key="channel.id" :title="channel.name"  >
        <!-- <van-list v-model="loading" :finished="finished" finished-text="没有更多了" >
          <van-cell v-for="article in artTitleList" :title="article.title" :key="article.art_id.toString()" />
        </van-list> -->
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getChannels } from '@/api/channels'
import { getArticlesTitle } from '@/api/articles'
export default {
  data () {
    return {
      // 获取频道列表
      channelsList: [],
      // 文章标题列表
      artTitleList: [],
      loading: false,
      finished: false,
      activeIndex: 0
    }
  },

  methods: {
    // 获取频道
    async getChannelList () {
      try {
        let res = await getChannels()
        this.channelsList = res.channels
      } catch (error) {
        console.log(error)
      }
    },
    // 获取文章标题列表
    async getArticles () {
      try {
        let res = await getArticlesTitle()
        this.artTitleList = res.results
      } catch (error) {
        console.log(error)
      }
    }
  },
  created () {
    this.getChannelList()
    // this.getArticles()
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
