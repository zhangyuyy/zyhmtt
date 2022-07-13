module.exports = {
  plugins: {
    autoprefixer: {
      browsers: ['Android >= 4.0', 'iOS >= 8']
    },
    'postcss-pxtorem': {
      //设计稿1rem的大小
      // vant组件库是根据37.5设置
      rootValue:(module)=>(/vant/gi.test(module.file) ? 37.5 : 75),
      //   适配的属性*代表所有都转为rem
      propList: ['*']
    }
  }
}
