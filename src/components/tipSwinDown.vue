<template>
  <van-dialog :value="value" @input="$emit('input',$event)" :showConfirmButton="false" closeOnClickOverlay >
    <!-- 弹框提示信息 -->
    <van-cell-group v-show="!showReport">
      <van-cell icon="location-o" title="不感兴趣" />
      <van-cell icon="location-o" title="反馈垃圾内容" is-link @click="showReport = true"/>
      <van-cell icon="location-o" title="拉黑作者" />
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
export default {
  name: 'tipSwinDown',
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      showReport: false
    }
  }
}
</script>

<style>
</style>
