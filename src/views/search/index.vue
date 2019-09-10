<template>
  <div>
    <van-search
      v-model="value"
      placeholder="请输入搜索关键词"
      show-action
      @search="onSearch(value)"
      @cancel="onCancel"
      @input="saveSuggest"
      clearable
      background="#3e9df8"
    />
    <!-- 搜索提示 -->
    <van-cell-group v-show="value">
      <van-cell v-for="suggest in suggestList" :key="suggest" :title="suggest" icon="search" @click="onSearch(suggest)"/>
    </van-cell-group>

    <!-- 历史记录 -->
    <van-cell-group v-show="!value">
      <van-cell title="历史记录">
        <!-- 自定义右侧内容 -->
        <div v-show="isDel">
          <span>全部删除</span>&nbsp;
          <span @click="isDel=false">完成</span>&nbsp;
        </div>
          <van-icon name="delete" size="18px" v-show="!isDel" @click="isDel=true"/>
      </van-cell>
      <van-cell v-for="(item,index) in histories" :key="item" :title="item">
        <!-- 自定义右侧内容 -->
        <van-icon v-show="isDel" name="close" size="18px" @click="delHistory(index)" />
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { getSuggestSearch } from '@/api/search'
import * as storageTools from '@/utils/localStorage'
import { mapState } from 'vuex'

export default {
  name: 'search',
  data () {
    return {
      // input的value值
      value: '',
      //   搜索建议列表
      suggestList: [],
      //   历史记录中控制删除与完成的显隐
      isDel: false,
      // 历史纪录
      histories: []

    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    onSearch (suggest) {
      // 判断histories中是否存在suggest
      if (this.histories.includes(suggest)) {
        return
      }
      //   如果没有则把suggest存到histories
      this.histories.push(suggest)
      //   判断用户是否登录
      if (this.user) {
        return
      }
      //   如果用户没有登录存入本地
      storageTools.setItem('histories', this.histories)
    },
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
    },
    // 删除历史记录
    delHistory (index) {
      this.histories.splice(index, 1)
      storageTools.setItem('histories', this.histories)
    }
  },
  created () {
    if (this.user) {
      return
    }
    this.histories = storageTools.getItem('history') || []
  }
}
</script>

<style>
</style>
