<template>
  <div>
    <van-nav-bar title="搜索结果" left-text="返回" left-arrow @click-left="$router.back()" />
    <!-- 搭建搜索列表组件 -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell
        v-for="article in searchList"
        :key="article.art_id.toString()"
        :title="article.title"
      >
        <!-- 插入图片（使用cell中的插槽） -->
        <div slot="label">
          <!-- type封面类型，0-无封面，1-1张封面图片，3-3张封面 -->
          <van-grid :column-num="3" v-if="article.cover.type" :border="false">
            <van-grid-item v-for="(img,index) in article.cover.images" :key="img + index">
              <van-image height="80" :src="img" lazy-load>
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
            <span>{{article.comm_count}}评论</span>&nbsp;
            <span>{{article.pubdate | fmtDate}}</span>
          </p>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getSearch } from '@/api/search'
export default {
  name: 'SearchResult',
  props: ['q'],
  data () {
    return {
      searchList: [],
      loading: false,
      finished: false,
      // 页码参数
      page: 1, // 页数默认不传为1
      per_page: 10 // 每页多少条，不传有后端决定
    }
  },
  methods: {
    async onLoad () {
      try {
        let res = await getSearch({
          page: this.page,
          per_page: this.per_page,
          q: this.q
        })
        // 将获取到的数据添加到数组里
        this.searchList.push(...res.results)
        this.page++
        // 加载状态结束
        this.loading = false
        // 判断数据是否全部加载完成
        if (res.results.length === 0) {
          this.finished = true
        }
      } catch (error) {
        this.$toast.fail('获取搜索结果失败')
      }
    }
  },
  created () {}
}
</script>

<style lang="less" scoped>
.van-list {
  // margin-top: 46px;
}
</style>
