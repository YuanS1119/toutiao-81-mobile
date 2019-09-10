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
        <van-grid >
            <van-grid-item v-for="(channel,index) in channelsList" :key="channel.id" @click="handleChannelActive(index)">
                <div slot="text" :class="{active: activeIndex === index}" >{{channel.name}}</div>
                <van-icon slot="icon" name="close" class="icon" v-show="isEdit" />
            </van-grid-item>
       </van-grid>
    </van-cell>
    <van-cell title="频道推荐" />
    <van-cell class="channelRecommend">
        <!-- <van-tag class="tagnew" v-for="reChannel in recommendChannels" :key="reChannel.id" :text="reChannel.name" /> -->
        <van-grid>
            <van-grid-item v-for="reChannel in recommendChannels" :key="reChannel.id" :text="reChannel.name"  />
        </van-grid>
    </van-cell>
  </van-popup>
</template>

<script>
import { getdefaultOrUserChannel } from '@/api/channels'
export default {
  props: {
    value: {
      type: Boolean,
      required: true
    },
    channelsList: {
      type: Array,
      required: true
    },
    activeIndex: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      // 是否进入编辑模式
      isEdit: false,
      //   全部频道
      allChannels: []
    }
  },
  computed: {
    recommendChannels () {
      const ids = this.channelsList.map((channel) => {
        return channel.id
      })
      return this.allChannels.filter((channel) => {
        return !ids.includes(channel.id)
      })
    }
  },
  methods: {
    async getAllChannels () {
      try {
        let res = await getdefaultOrUserChannel()
        this.allChannels = res.channels
      } catch (error) {
        console.log(error)
      }
    },
    handleChannelActive (index) {
      if (!this.isEdit) {
        this.$emit('changeChannel', index)
        return
      }
      console.log(this.isEdit)
    }
  },
  created () {
    this.getAllChannels()
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
.active{
color: red;
}
// .tagnew{
//     height: 67px;
//     width: 45px;
// }
// .van-grid-item__content{
//     background-color: #ccc;
//     padding: 2px;
//     box-sizing: border-box;
// }
</style>
