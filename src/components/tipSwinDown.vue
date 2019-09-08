<template>
  <van-dialog :value="value" @input="$emit('input',$event)" :showConfirmButton="false" closeOnClickOverlay >
    <!-- 弹框提示信息 -->
    <van-cell-group v-show="!showReport">
      <van-cell icon="location-o" title="不感兴趣" @click="handle('dislike')" />
      <van-cell icon="location-o" title="反馈垃圾内容" is-link @click="showReport = true"/>
      <van-cell icon="location-o" title="拉黑作者" @click="handle('blackAuthor')"  />
    </van-cell-group>
    <!-- 举报弹框 -->
   <van-cell-group v-show="showReport">
      <van-cell icon="arrow-left" @click="showReport = false"/>
      <van-cell title="标题夸张" />
      <van-cell title="低俗色情" />
      <van-cell title="错别字多" />
      <van-cell title="旧闻重复" />
      <van-cell title="广告软文" />
      <van-cell title="内容不实" />
      <van-cell title="涉嫌违法犯罪" />
      <van-cell title="侵权" />
      <van-cell title="其他问题" />
    </van-cell-group>
  </van-dialog>
</template>

<script>
import { dislikeArticle } from '@/api/articles'
export default {
  name: 'tipSwinDown',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    // 接收父组件的属性
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      showReport: false
    }
  },
  methods: {
    async handle (type) {
      switch (type) {
        case 'dislike':
          this.dislike()
          break
        case 'blackAuthor':
          break
      }
    },
    async dislike () {
      try {
        await dislikeArticle(this.article.art_id)
        this.$toast.success('操作成功')
      } catch (error) {
        this.$toast.fail('操作失败')
      }
    }
  },
  created () {
    // alert(this.article.art_id)
  }
}
</script>

<style>
</style>
