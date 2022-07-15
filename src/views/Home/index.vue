<template>
  <div class="home-info">
    <!-- 轮播图区域 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" >
      <van-swipe-item v-for="(item,index) in swiper" :key="index">
        <template #default>
         <img class="imgInfo" :src="aa+item.imgSrc" />
        </template>
      </van-swipe-item>
    </van-swipe>
       <van-search
      v-model="value"
      class="search-nav"
      placeholder="请输入小区或地址"
      background="#ffff"
      @search="onSearch"
    >
    <template #left>
      <span class="text">北京▾</span>
    </template>
    </van-search>
    <i class="ditu iconfont icon-ditu1"></i>
    <!-- 轮播图区域 -->
    <!-- 租房方式选择 -->
    <van-grid>
        <van-grid-item text="整租">
          <template #icon>
            <i class="iconfont icon-fangwuxinxi"></i>
          </template>
        </van-grid-item>
        <van-grid-item text="合租">
          <template #icon>
            <i class="iconfont icon-duoren"></i>
          </template>
        </van-grid-item>
        <van-grid-item text="地图找房">
          <template #icon>
            <i class="iconfont icon-ditu"></i>
          </template>
        </van-grid-item>
        <van-grid-item text="去出租">
          <template #icon>
            <i class="iconfont icon-fangwuxinxi"></i>
          </template>
        </van-grid-item>
    </van-grid>
  </div>
</template>
<script>
import { swiper } from '@/api/home'
export default {
  name: '',
  data () {
    return {
      value: '',
      swiper: [],
      aa: 'http://liufusong.top:8080'
    }
  },
  created () {
    this.onswiper()
  },
  mounted () {},
  computed: {},
  methods: {
    onSearch () {
      console.log(this.value)
    },
    async onswiper () {
      const res = await swiper()
      this.swiper = res.data.body
      // console.log(this.swiper)
    }
  }
}
</script>
<style scoped lang="less">
.home-info{
  position: relative;
  .search-nav{
    position: absolute;
    top: 20px;
    left: 15px;
    width: 310px;
    height: 34px;
    border-radius: 5px;
    .van-cell{
      margin-left: -12px;
      padding-left: 13px;
      font-size: 13px;
      background-color: #fff;
      border-left:1px solid #eee ;
    }
    .text{
      margin-left: -5px;
      margin-right: 8px;
      font-size: 16px;
      color: rgb(78, 76, 76);
    }
  }
  .ditu{
    position:absolute;
    top: 25px;
    right: 10px;
      font-size: 21px;
      color: rgb(254, 252, 252);
      border: 2px solid #fff;
      border-radius: 50%;
    }
.my-swipe .van-swipe-item {
    color: #fff;
    height: 212px;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
    .imgInfo{
      width: 375px;
      height: 212px;
    }
  }

}

</style>
