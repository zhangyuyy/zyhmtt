<template>
  <!-- 弹框 -->
  <van-popup
    v-model="isShow"
    position="bottom"
    :style="{ height: '100%' }"
    closeable
  >
    <div class="popupMain">
      <!-- 我的频道 -->
      <div class="my-channel">
        <van-cell title="我的频道">
          <van-button
            size="small"
            round
            class="edit-btn"
            @click="isEdit = !isEdit"
            >{{ isEdit ? '完成' : '编辑' }}</van-button
          >
        </van-cell>
        <van-grid :border="false" gutter="10px">
          <van-grid-item
            :text="item.name"
            v-for="(item, index) in myChannels"
            :key="item.id"
            :class="{ activeChannel: item.name === '推荐' }"
            @click="onClickMychannel(item, index)"
          >
            <template #icon>
              <van-icon v-show="isEdit && item.name !== '推荐'" name="cross" />
            </template>
          </van-grid-item>
        </van-grid>
        <div class="recommend-channel">
          <van-cell title="推荐频道"> </van-cell>

          <van-grid :border="false" gutter="10px">
            <van-grid-item
              v-for="item in recommendChannels"
              :key="item.id"
              :text="item.name"
              icon="plus"
              @click="addMychannel(item)"
            >
            </van-grid-item>
          </van-grid>
        </div>
      </div>
      <!--  -->
    </div>
  </van-popup>
</template>

<script>
import { getAllchannels } from '@/api'

export default {
  data() {
    return {
      isShow: true,
      allchannels: [],
      isEdit: false
    }
  },
  props: {
    myChannels: {
      type: Array,
      default: () => []
    }
  },
  created() {
    this.getAllchannels()
  },
  methods: {
    async getAllchannels() {
      const { data } = await getAllchannels()
      this.allchannels = data.data.channels
    },
    onClickMychannel(channel, index) {
      if (this.isEdit && channel.name !== '推荐') {
        return this.$emit('del-mychanel', channel.id)
      }
      if (!this.isEdit) {
        this.isShow = false
        this.$emit('change-active', index)
      }
    },
    // 添加频道
    addMychannel(myChannel) {
      // { ...myChannel }浅客隆,把值传给父组件去改值
      this.$emit('add-myChannel', { ...myChannel })
    }
  },
  computed: {
    recommendChannels() {
      return this.allchannels.filter(
        (item) => !this.myChannels.find((i) => i.id === item.id)
      )
      // return this.allChannels.filter((item) => {
      //   const result = this.myChannels.find((i) => i.id === item.id)
      //   if (result) {
      //     return false
      //   } else {
      //     return true
      //   }
      // })
    }
  }
}
</script>

<style scoped lang="less">
.popupMain {
  padding-top: 100px;
  //   按钮的样式
  .edit-btn {
    color: red;
    padding: 0 30px;
    height: 45px;
    border: 0.02667rem solid red;
  }
}
.activeChannel {
  /deep/.van-grid-item__text {
    color: red;
  }
}

.my-channel {
  :deep(.van-grid-item__content) {
    position: relative;
    background-color: #eee;
    .van-grid-item__icon-wrapper {
      position: absolute;
      top: 0;
      right: 0;
      .van-icon-cross {
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(20%, -35%);
        border: 0.02667rem solid #000;
        border-radius: 50%;
        text-align: center;
        line-height: 0.32rem;
        width: 35px;
        height: 35px;
      }
      .van-icon-cross:before {
        font-size: 26px;
      }
    }

    .van-grid-item__icon-wrapper {
      position: absolute;
      top: 0;
      right: 0;

      .van-icon-cross {
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(20%, -35%);
        border: 0.02667rem solid #000;
        border-radius: 50%;
        text-align: center;
        line-height: 0.32rem;
      }
    }
  }
}
// 推荐频道的样式
.recommend-channel {
  // 推荐频道加号样式
  :deep(.van-grid-item__content) {
    flex-direction: row;
    .van-grid-item__icon {
      font-size: 0.5rem;
    }
    .van-grid-item__text {
      margin-top: 0;
    }
  }
}
</style>
