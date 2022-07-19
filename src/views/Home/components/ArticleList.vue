<template>
  <div>
    <van-pull-refresh v-model="refreshLoading" @refresh="loadNextPage">
      <van-list
        @load="loadNextPage"
        v-model="loading"
        :finished="isFinished"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        finished-text="没有更多了~~~"
      >
        <Articleltem
          v-for="item in articles"
          :key="item.art_id"
          :articleInfo="item"
        ></Articleltem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleList } from '@/api'
import Articleltem from './Articleltem.vue'

export default {
  name: 'ArticleList',
  data() {
    return {
      articles: [],
      pre_timestamp: '',
      loading: false,
      isFinished: false,
      error: false,
      refreshLoading: false
    }
  },
  components: {
    Articleltem
  },
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  created() {
    this.getArticleList()
  },
  methods: {
    // 获取新闻列表
    async getArticleList() {
      try {
        const { data } = await getArticleList(this.id, +new Date())
        // 重新在赋一次值，保存第一次页码
        this.pre_timestamp = data.data.pre_timestamp
        this.articles = data.data.results
        console.log(data)
      } catch (error) {
        const status = error.response.status
        if (status === 400) {
          // 把错误向外抛出
          throw new Error(error.response.data.message)
        } else {
          this.$toast.fail('获取文章列表失败,请重新刷新')
        }
      }
    },
    async loadNextPage() {
      try {
        const { data } = await getArticleList(this.id, this.pre_timestamp) //

        // 下拉刷新
        if (this.refreshLoading) {
          // 讲第n页的数据，放在articles
          this.articles.unshift(...data.data.results)
        } else {
          this.articles.push(...data.data.results)
        }

        // 更新页数
        this.pre_timestamp = data.data.pre_timestamp
        // 把loading重新设置为false，让数据重新加载
        this.loading = false
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
        this.refreshLoading = false
      }
    }
  }
}
</script>

<style></style>
