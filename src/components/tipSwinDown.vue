<template>
  <van-dialog :value="value" @input="$emit('input',$event)" :showConfirmButton="false" closeOnClickOverlay >
    <!-- 弹框提示信息 -->
    <van-cell-group v-show="!showReport">
      <van-cell icon="location-o" title="不感兴趣" @click="handle('dislike')" />
      <van-cell icon="location-o" title="反馈垃圾内容" is-link @click="showReport = true"/>
      <van-cell icon="location-o" title="拉黑作者" @click="handle('blackUser')"  />
    </van-cell-group>
    <!-- 举报弹框 -->
   <van-cell-group v-show="showReport">
      <van-cell icon="arrow-left" @click="showReport = false"/>
     <van-cell v-for="item in reportList" :key="item.type" :title="item.title" @click="handle('report',item.type)"/>
    </van-cell-group>
  </van-dialog>
</template>

<script>
import { dislikeArticle, reportArticle } from '@/api/articles'
import { blackUser } from '@/api/user'
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
      showReport: false,
      // 举报类型： 0-其他问题，1-标题夸张，2-低俗色情，3-错别字多，4-旧闻重复，5-广告软文，6-内容不实，7-涉嫌违法犯罪，8-侵权'
      reportList: [
        { type: 1, title: '标题夸张' },
        { type: 2, title: '低俗色情' },
        { type: 3, title: '错别字多' },
        { type: 4, title: '旧闻重复' },
        { type: 5, title: '广告软文' },
        { type: 6, title: '内容不实' },
        { type: 7, title: '涉嫌违法犯罪' },
        { type: 8, title: '侵权' },
        { type: 0, title: '其他问题' }
      ]
    }
  },
  methods: {
    async handle (type, reportType) {
      switch (type) {
        case 'dislike':
          this.dislike()
          break
        case 'blackUser':
          this.blackUser()
          break
        case 'report':
          this.report(reportType)
          break
      }
    },
    async dislike () {
      try {
        await dislikeArticle(this.article.art_id)
        this.$toast.success('操作成功')
        this.$emit('handleSuccess')
      } catch (error) {
        this.$toast.fail('操作失败')
      }
    },
    async blackUser () {
      try {
        await blackUser(this.article.aut_id)
        this.$emit('handleSuccess')
        this.$toast.success('操作成功')
      } catch (error) {
        // console.dir(error)
        this.$toast.fail('操作失败')
      }
    },
    async report (reportType) {
      try {
        let res = await reportArticle({
          target: this.article.art_id,
          type: reportType
        })
        console.log(res)
        this.$emit('input', false)
        this.$toast.success('操作成功')
      } catch (error) {
        // console.dir(error)
        this.$toast.fail('操作失败')
      }
    }

  }
}
</script>

<style>
</style>
