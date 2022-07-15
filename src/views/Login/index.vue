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
    <van-form ref="form" class="form" @submit="login">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
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
        :rules="codeRules"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template #right-icon>
          <!-- 倒计时 -->
          <van-count-down
            v-if="isShowCountDown"
            :time="3 * 1000"
            @finish="isShowCountDown = false"
          />
          <!-- 点击显示 v-else-->
          <van-button
            class="code-btn"
            size="mini"
            round
            @click="sendCode"
            v-else
            native-type="button"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div class="tijiao" style="margin: 16px">
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendCode } from '@/api/user'
import { mobileRules, codeRules } from './rules'

export default {
  data() {
    return {
      mobile: '',
      code: '',
      mobileRules,
      codeRules,
      isShowCountDown: false
    }
  },
  methods: {
    async sendCode() {
      try {
        // 验证手机号码
        await this.$refs.form.validate('mobile')
        // 发送请求，获取验证
        await sendCode(this.mobile)
        // 显示倒计时
        this.isShowCountDown = true
      } catch (error) {
        // this.$toast.fail('手机非法！')
        // 1 表单校验失败
        if (!error.response) {
          this.$toast.fail('手机格式不正确！')
        } else {
          const status = error.response.status
          if (status === 404 || status === 429) {
            this.$toast.fail(error.response.data.message)
          }
        }
      }
    },

    // 返回来之前的页面
    backToprepage() {
      this.$router.back()
    },

    // 登录获取请求
    async login() {
      // loading登录成功失败
      // 1 await 修饰什么 promises
      // 2 res拿到的是promises resolve的结果
      this.$toast.loading({ message: '加载中...', forbidClick: true })

      try {
        const res = await login(this.mobile, this.code)
        console.log(res)
        this.$store.commit('setUser', res.data.data)
        this.$toast.success('登录成功')
        this.$router.push('/profile')
      } catch (error) {
        console.log(error)
        // this.$toast.fail('登录失败')
        // 拿到状态码
        const status = error.response.status
        let message = '登录错误,请刷新~'
        if (status === 400) {
          message = error.response.data.message
        }
        this.$toast.fail(message)

        // switch (status) {
        //   case 400:
        //     // 提示错误
        //     this.$toast.fail(error.response.data.message)
        //     break
        //   case 507:
        //     // 服务端的错误
        //     this.$toast.fail('登录错误,请刷新~')
        //     break
        //   default:
        //     this.$toast.fail('登录错误,请刷新~')
        // }
      }
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
