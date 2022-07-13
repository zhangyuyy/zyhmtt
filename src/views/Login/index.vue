<template>
  <div>
    <!-- 输入框表头 -->
    <van-nav-bar class="navbar" title="登录" @click-left="backToprepage">
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>
    <!-- 手机号验证码表单 -->
    <!-- form 里input 必须给name ，用于标识 -->
    <van-form class="form" @submit="login">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="[{ required: true, message: '请输入手机号' }]"
      >
        <template #label>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>

      <van-field
        v-model="code"
        type="text"
        name="code"
        placeholder="请输入验证码"
        :rules="[{ required: true, message: '请输入验证码' }]"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template #right-icon>
          <van-button class="code-btn" size="mini" round>发送验证码</van-button>
        </template>
      </van-field>
      <div class="tijiao" style="margin: 16px">
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login } from '@/api/user'

export default {
  data() {
    return { mobile: '', code: '' }
  },

  methods: {
    // 返回来之前的页面
    backToprepage() {
      this.$router.back()
    },
    // 登录获取请求
    async login() {
      const res = await login(this.mobile, this.code)
      console.log(res)
    }
  }
}
</script>

<style scoped lang="less">
.navbar {
  background-color: #3296fa;
  // 样式穿透
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
  .van-icon {
    color: #fff;
  }
}
.form {
  :deep(.van-field__label) {
    flex: 1;
  }
  :deep(.van-cell__value) {
    flex: 20;
  }
  .toutiao {
    font-size: 0.49333rem;
  }
}
// 验证码样式
.code-btn {
  background-color: #eee;
  padding: 0 10px;
  color: #666;
}
.tijiao {
  width: 9.25333rem;
  height: 1.17333rem;
  background: #6db4fb;
  border: none;
  border-radius: 0.13333rem;
}
</style>
