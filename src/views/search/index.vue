<template>
  <div>
    <van-search
      v-model="value"
      placeholder="请输入搜索关键词"
      show-action
      @search="onSearch"
      @cancel="onCancel"
      @input="saveSuggest"
      clearable
      background="#3e9df8"
    />
    <!-- 搜索提示 -->
    <van-cell-group v-show="value">
      <van-cell v-for="suggest in suggestList" :key="suggest" :title="suggest" icon="search" />
    </van-cell-group>

    <!-- 历史记录 -->
    <van-cell-group v-show="!value">
      <van-cell title="历史记录">
        <!-- 自定义右侧内容 -->
        <div>
          <span>全部删除</span>&nbsp;
          <span>完成</span>&nbsp;
          <van-icon name="delete" size="18px" />
        </div>
      </van-cell>
      <van-cell title="单元格">
        <!-- 自定义右侧内容 -->
        <van-icon name="close" size="18px" />
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { getSuggestSearch } from '@/api/search'
export default {
  data () {
    return {
      value: '',
      suggestList: []
    }
  },
  methods: {
    onSearch () {},
    onCancel () {},
    async saveSuggest () {
      if (this.value.lenght === 0) {
        return
      }
      try {
        let params = { q: this.value }
        let res = await getSuggestSearch(params)
        this.suggestList = res.options
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style>
</style>
