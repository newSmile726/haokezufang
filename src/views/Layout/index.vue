<template>
  <div>
    <!-- 二级路由出口 -->
    <router-view></router-view>
    <van-tabbar route>
      <van-tabbar-item to="/home">
        <span>首页</span>
        <template #icon>
          <i class="iconfont icon-fangwuxinxi"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/home/list">
        <span>找房</span>
        <template #icon>
          <i class="iconfont icon-sousuo"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/home/news">
        <span>资讯</span>
        <template #icon>
          <i class="iconfont icon-zixun"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/home/profile">
      <span>我的</span>
        <template #icon>
          <i class="iconfont icon-wode"></i>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  name: '',
  data () {
    return {
      active: 0
    }
  },
  created () {},
  mounted () {},
  computed: {
  },
  methods: {}
}
</script>
<style scoped lang="less">
.iconfont {
  font-size: 24px;
}
</style>
