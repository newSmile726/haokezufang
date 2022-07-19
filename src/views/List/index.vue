<template>
  <div>
    <!-- 顶部搜索 -->
    <van-nav-bar left-arrow @click-left="onClickLeft" class="navbar">
      <template #title>
        <div class="search">
          <van-search v-model="value" placeholder="请输入搜索关键词" background='unset' />
        </div>
      </template>
      <template #right>
        <i class="iconfont icon-ditu1"></i>
      </template>
    </van-nav-bar>
  </div>
</template>
<script>
export default {
  name: '',
  data () {
    return {
      value: ''
    }
  },
  created () {},
  mounted () {},
  computed: {},
  methods: {
    onClickLeft () {
      console.log(111)
    }
  }
}
</script>
<style scoped lang='less'>
//搜索栏
.navbar{
background-color: #21b97a;
.van-nav-bar{
  color: #fff;
}
.search{
  width: 274px;
  height: 34px;
  padding: 0;
}
}
</style>
