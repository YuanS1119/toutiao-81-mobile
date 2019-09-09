<template>
  <van-popup
    :value="value"
    @input="$emit('input',$event)"
    position="left"
    :style="{ width: '80%' ,height:'100%'}"
  >
    <van-cell icon="cross" />
    <van-cell title="我的频道">
      <van-button round plain type="danger" class="edit" v-show="!isEdit" @click="isEdit=true">编辑</van-button>
      <van-button round plain type="danger" class="edit" v-show="isEdit" @click="isEdit=false">完成</van-button>
    </van-cell>
    <van-cell class="myChannel">
        <van-grid :border="false">
            <van-grid-item v-for="value in 8" :key="value">
                <van-icon slot="icon" name="close" class="icon" v-show="isEdit" />
            </van-grid-item>
       </van-grid>
    </van-cell>
    <van-cell title="频道推荐" />
    <van-cell class="channelRecommend">
        <van-grid :border="false">
            <van-grid-item v-for="value in 8" :key="value"/>
       </van-grid>
    </van-cell>
  </van-popup>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      // 是否进入编辑模式
      isEdit: false
    }
  }
}
</script>

<style lang="less" scoped>
.edit{
    height: 20px;
    line-height: 20px;
}
.icon{
    position: absolute;
    top:0px;
    right: 0px;
}
// .van-grid-item__content{
//     background-color: #ccc;
//     padding: 2px;
//     box-sizing: border-box;
// }
</style>
