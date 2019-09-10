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
            <van-grid-item v-for="(channel,index) in channelsList" :key="channel.id" @click="handleChannelActive(index,channel.id)">
                <div slot="text" :class="{active: activeIndex === index}" >{{channel.name}}</div>
                <van-icon slot="icon" name="close" class="icon" v-show="isEdit && index !== 0" />
                <!-- 为什么有v-show="isEdit && index !== 0" -->
            </van-grid-item>
       </van-grid>
    </van-cell>
    <van-cell title="频道推荐" />
    <van-cell class="channelRecommend">
        <van-grid>
            <van-grid-item v-for="reChannel in recommendChannels" :key="reChannel.id" :text="reChannel.name" @click="handleRemChannel(reChannel)" />
        </van-grid>
    </van-cell>
  </van-popup>
</template>

<script>
import { getdefaultOrUserChannel, delUserChannel, addChannels } from '@/api/channels'
import { mapState } from 'vuex'
import { setItem } from '@/utils/localStorage'
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
    ...mapState(['user']),
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
    // 频道菜单推荐频道操作
    async handleRemChannel (reChannel) {
      // set (target, key, val)
      this.$set(reChannel, 'timestamp', null)
      this.$set(reChannel, 'articles', [])
      this.$set(reChannel, 'finished', false)
      this.$set(reChannel, 'loading', false)
      this.$set(reChannel, 'pullLoading', false)
      this.channelsList.push(reChannel)
      if (this.user) {
        try {
          let channelsA = {
            id: reChannel.id,
            seq: this.channelsList.length
          }
          await addChannels(channelsA)
        } catch (error) {
          this.$toast.fail('操作失败')
        }
        return
      }
      setItem('channels', this.channelsList)
    },
    // 获取全部频道列表
    async getAllChannels () {
      try {
        let res = await getdefaultOrUserChannel()
        this.allChannels = res.channels
      } catch (error) {
      }
    },
    // 频道菜单弹层操作
    async handleChannelActive (index, channelId) {
      // alert(index)
      // 非编辑模式
      if (!this.isEdit) {
        this.$emit('changeChannel', index)
        return
      }
      // 编辑模式
      // 推荐不能删除
      if (this.channelsList[index].name === '推荐') {
        return
      }
      this.channelsList.splice(index, 1)
      // 用户登录
      if (this.user) {
        try {
          await delUserChannel(channelId)
        } catch (error) {
          this.$toast.fail('操作失败')
        }
      }
      // 用户未登录，讲频道存到本地
      setItem('channels', this.channelsList)
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
</style>
