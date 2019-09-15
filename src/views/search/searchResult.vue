<template>
  <div>
    <van-nav-bar title="搜索结果" left-text="返回" left-arrow @click-left="$router.back()" />
    <!-- 搭建搜索列表组件 -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="item in searchList" :key="item.art_id.toString()" :title="item.title" />
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
      per_page: 10// 每页多少条，不传有后端决定
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
      // // 异步更新数据
      // setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     this.searchList.push(this.searchList.length + 1)
      //   }
      //   // 加载状态结束
      //   this.loading = false

      //   // 数据全部加载完成
      //   if (this.searchList.length >= 40) {
      //     this.finished = true
      //   }
      // }, 500)
    }

  },
  created () {

  }
}
</script>

<style lang="less" scoped>
.van-list {
  margin-top: 46px;
}
</style>
