<template>
  <div>
    <van-nav-bar title="搜索结果" left-text="返回" left-arrow @click-left="$router.back()" />
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="item in searchList" :key="item.art_id" :title="item.title" />
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
      finished: false
    }
  },
  methods: {
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.searchList.push(this.searchList.length + 1)
        }
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.searchList.length >= 40) {
          this.finished = true
        }
      }, 500)
    },
    async getSearchList () {
      try {
        let data = await getSearch()
        this.searchList = data.results
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }

  }
}
</script>

<style lang="less" scoped>
.van-list {
  // margin-top: 46px;
}
</style>
