<template>
  <div>
    <router-view></router-view>
    <van-nav-bar title="黑马头条" fixed />
    <van-tabs animated v-model="activeIndex">
      <van-tab v-for="channel in channelsList" :key="channel.id" :title="channel.name">
        <!-- 下拉更新 -->
        <van-pull-refresh
          v-model="currentChannel.pullLoading"
          @refresh="onRefresh"
          :success-text="successText"
        >
          <!-- 对应的频道的文章列表获取 -->
          <van-list
            v-model="currentChannel.loading"
            :finished="currentChannel.finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell
              v-for="article in currentChannel.articles"
              :key="article.art_id.toString()"
              :title="article.title"
            >
              <!-- 插入图片（使用cell中的插槽） -->
              <div slot="label">
                <!-- type封面类型，0-无封面，1-1张封面图片，3-3张封面 -->
                <van-grid :column-num="3" v-if="article.cover.type" :border="false">
                  <van-grid-item v-for="(img,index) in article.cover.images" :key="img + index">
                    <van-image height="80" :src="img"  lazy-load>
                      <!-- lazy-load图片懒加载 -->
                      <!-- 图片加载提示 -->
                      <template v-slot:loading>
                        <van-loading type="spinner" size="20" />
                      </template>
                      <!-- 加载失败提示 -->
                       <template v-slot:error>加载失败</template>
                    </van-image>
                  </van-grid-item>
                </van-grid>
                <p>
                  <span>{{article.aut_name}}</span>&nbsp;
                  <span>{{article.comm_count}}</span>&nbsp;
                  <span>{{article.pubdate | fmtDate}}</span>
                  <van-icon name="close" class="close" />
                </p>
              </div>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getdefaultOrUserChannel } from '@/api/channels'
import { getArticles } from '@/api/articles'
// 图片懒加载全局可用
import Vue from 'vue'
import { Lazyload } from 'vant'

// options 为可选参数，无则不传
Vue.use(Lazyload)

export default {
  data () {
    return {
      // 频道数据
      channelsList: [], // 获取频道列表
      activeIndex: 0, // 获取当前频道索引
      // 下拉更新成功提示文字
      successText: ''
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
        res.channels.forEach(channel => {
          channel.timestamp = null
          channel.articles = []
          // 上拉更新
          channel.finished = false
          channel.loading = false
          // 下拉更新
          channel.pullLoading = false
        })
        this.channelsList = res.channels
      } catch (error) {
        console.log(error)
      }
    },
    // 获取文章标题列表
    async onLoad () {
      try {
        let res = await getArticles({
          channelId: this.currentChannel.id,
          timestamp: this.currentChannel.timestamp || Date.now(),
          withTop: 1
        })
        this.currentChannel.timestamp = res.pre_timestamp
        this.currentChannel.articles = res.results
        this.currentChannel.articles.push(...res.results)
        this.currentChannel.loading = false
        // 如果一个频道加载完毕，其它频道中的finished也是加载完毕
        if (res.results.length === 0) {
          this.currentChannel.finished = true
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 下拉更新加载更多
    async onRefresh () {
      let res = await getArticles({
        channelId: this.currentChannel.id,
        timestamp: Date.now(),
        withTop: 1
      })
      this.currentChannel.pullLoading = false
      // 把当前数据放到最前面
      this.currentChannel.articles.unshift(...res.results)
      this.successText = `当前加载了${res.results.length}条数据`
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
  .close {
    float: right;
  }
}
</style>
