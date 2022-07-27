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
      <span class="text" @click="$router.push('/city')" >{{city}}▾</span>
    </template>
    </van-search>
    <i class="ditu iconfont icon-ditu1" @click="$router.push('/map')"></i>
    <!-- 轮播图区域 -->
    <!-- 租房方式选择 -->
    <van-grid>
        <van-grid-item text="整租" to='/home/list'>
          <template #icon>
            <div class="iconfont icon-fangwuxinxi"></div>
          </template>
        </van-grid-item>
        <van-grid-item text="合租" to='/home/list'>
          <template #icon>
            <div class="iconfont icon-duoren"></div>
          </template>
        </van-grid-item>
        <van-grid-item text="地图找房" @click="$router.push('/map')">
          <template #icon>
            <div class="iconfont icon-ditu"></div>
          </template>
        </van-grid-item>
        <van-grid-item to='/add' text="去出租">
          <template #icon>
            <div class="iconfont icon-fangwuxinxi"></div>
          </template>
        </van-grid-item>
    </van-grid>
    <!-- 租房小组 -->
    <div class="home-rent">
      <div class="rent-title">
        <span class="text">租房小组</span>
        <span class="text1">更多</span>
      </div>
      <van-grid
      class="rent-message"
      :column-num="2"
      :gutter="10"
      clickable
       direction="horizontal">
        <van-grid-item class="rent-text" v-for="item in rentHouse" :key="item.id">
          <template #icon>
          <img class="img" :src="aa+item.imgSrc" alt="">
          </template>
          <template #text>
            <span class="text">{{item.title}}{{item.desc}}</span>
          </template>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>
<script>
import { swiper, homeRent } from '@/api/home'
import { getCity } from '@/utils/auth'
export default {
  name: '',
  data () {
    return {
      city: '',
      value: '',
      swiper: [], // 轮播图
      rentHouse: [], // 租房小组
      aa: 'http://liufusong.top:8080'
    }
  },
  created () {
    // 轮播图
    this.onswiper()
    // 租房小组
    this.homeRentDown()
    // 当前城市
    this.city = getCity()?.label ?? { label: '北京', value: 'AREA|88cff55c-aaa4-e2e0' }.label
  },
  mounted () {},
  computed: {},
  methods: {
    onSearch () {
      console.log(this.value)
    },
    // 轮播图请求
    async onswiper () {
      const res = await swiper()
      this.swiper = res.data.body
      // console.log(this.swiper)
    },
    // 租房小组请求
    async homeRentDown () {
      try {
        const res = await homeRent()
        // console.log(res)
        this.rentHouse = res.data.body
      } catch (error) {
        console.log(error)
      }
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
.van-grid{
  height: 108px;
  font-size: 16px;
  color: #000;
.iconfont{
  background-color: #f2fbf7;
  border-radius:50% ;
  color: #09b16b;
  text-align: center;
  line-height: 50px;
  width: 60px;
  height: 50px;
  font-size: 40px;
  margin-bottom: 18px;
}
}
// 租房小组css样式
.home-rent{
  width: 375px;
  height: 188px;
  background-color: #f6f5f6;
  .van-grid-item__content{
    height: 40px;
  }
  .rent-title{
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    margin: 13px 15px;
    .text{
      margin-top: 15px;
      font-weight: 700;    }
      .text1{
        margin-top: 15px;
        color: #787d82;
      }
  }
  .rent-message{
    margin: 0 10px;
    .img{
      width: 40px;
      height: 40px;
    }
    .rent-text{
      :deep(.van-grid-item__content){
        padding: 8px;
      }
        .text{
          margin-left: 20px;
          font-size: 15px;
          font-weight: 300;
    }
    }

  }
}
}

</style>
