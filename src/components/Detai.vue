<template>
  <div class="detail">
    <!-- 顶部标题 -->
    <van-nav-bar :title="list.community" left-arrow @click-left="onClickLeft" />
    <!-- 大图区域 -->
    <van-swipe :autoplay="3000">
      <van-swipe-item
        class="my-swipe"
        v-for="(image, index) in list.houseImg"
        :key="index"
      >
        <img v-lazy="base + image" />
      </van-swipe-item>
    </van-swipe>
    <!-- 房屋信息 -->
    <div class="House-Detail">
      <div class="house-title">
        <h3 class="top">{{ list.title }}</h3>
        <p class="buttom">近地铁</p>
      </div>
      <div class="house-message">
        <div>
          <div class="txt">{{ list.price }} <span>/月</span></div>
          <div class="mitxt">租金</div>
        </div>
        <div>
          <div class="txt">{{ list.roomType }}</div>
          <div class="mitxt">房型</div>
        </div>
        <div>
          <div class="txt">{{ list.size }}平米</div>
          <div class="mitxt">面积</div>
        </div>
      </div>
      <div class="house-ff">
        <div>
          <p><span>装修：</span>精装</p>
          <p><span>楼层：</span>{{ list.floor }}</p>
        </div>
        <div>
          <p><span>朝向：</span>东</p>
          <p><span>类型：</span>普通住宅</p>
        </div>
      </div>
    </div>
    <!--  小区地理位置-->
    <div class="Cell-location">
      <div class="title"><span>小区：</span>天山星城</div>
      <div class="map img">
        <baidu-map
          class="map"
          :center="map.center"
          :zoom="map.zoom"
          @ready="handler"
        >
          <!--缩放-->
          <bm-navigation anchor="BMAP_ANCHOR_TOP_LEFT"></bm-navigation>
          <!--定位-->
          <bm-geolocation
            anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
            :showAddressBar="true"
            :autoLocation="true"
          ></bm-geolocation>
          <!--点-->
          <bm-marker
            :position="map.center"
            :dragging="map.dragging"
            animation="BMAP_ANIMATION_DROP"
          >
            <!--提示信息-->
            <bm-info-window class="mapshowss" :show="map.show">天山星城</bm-info-window>
          </bm-marker>
        </baidu-map>
      </div>
    </div>
    <!-- 房屋配套 -->
    <div class="Housing-supporting">
      <div class="title">房屋配套</div>
      <div class="supporting">
        <div class="text"><span class="iconfont icon-yigui"></span>衣柜</div>
        <div class="text"><span class="iconfont icon-dianshi"></span> 电视</div>
      </div>
    </div>
    <!-- 房源概况 -->
    <div class="Housing-set">
      <div class="title">房源概况</div>
      <div class="userFd">
        <div class="img">
          <img src="../assets/avatar.png" alt="" />
        </div>
        <div class="Fdname">
          王女士
          <div class="renzheng">
            <i class="iconfont icon-gerenziliao"></i>已认证房主
          </div>
        </div>
        <div class="xiaoxi">发消息</div>
      </div>
      <div class="message">
        1.周边配套齐全，地铁四号线陶然亭站，交通便利，公交云集，距离北京南站、西站都很近距离。
        2.小区规模大，配套全年，幼儿园，体育场，游泳馆，养老院，小学。
        3.人车分流，环境优美。
        4.精装两居室，居家生活方便，还有一个小书房，看房随时联系。
      </div>
    </div>
    <!-- 猜你喜欢 -->
    <div class="like-info">
      <div class="user-Like">猜你喜欢</div>
      <div>
        <van-cell-group class="user-txte">
          <van-cell title="安贞西里 3室1厅" title-class="title">
            <template #icon>
              <van-image class="img" src="../assets/avatar.png" />
            </template>
            <template #label>
              <div class="label">
                <div class="text1">72.32㎡/南北</div>
                <div class="text2">近地铁</div>
                <div class="text3">4500<span>元/月</span></div>
              </div>
            </template>
          </van-cell>
          <van-cell title="天居园 2室1厅" title-class="title">
            <template #icon>
              <van-image class="img" src="../assets/avatar.png" />
            </template>
            <template #label>
              <div class="label">
                <div class="text1">83㎡</div>
                <div class="text2">近地铁</div>
                <div class="text3">7200 <span>元/月</span></div>
              </div>
            </template>
          </van-cell>
          <van-cell title="角门甲4号院 1室1厅" title-class="title">
            <template #icon>
              <van-image class="img" src="../assets/avatar.png" />
            </template>
            <template #label>
              <div class="label">
                <div class="text1">52㎡</div>
                <div class="text2">近地铁</div>
                <div class="text3">5000 <span>元/月</span></div>
              </div>
            </template>
          </van-cell>
        </van-cell-group>
      </div>
    </div>
    <!-- 底部菜单 -->
    <div class="footer-nav">
      <span class="f1"><i class="iconfont icon-wodeshoucang"></i> 收藏</span>
      <span class="f2">在线咨询</span>
      <span class="f3">电话预约</span>
    </div>
  </div>
</template>
<script>
import { houseMeassage } from '@/api/house'
export default {
  name: 'Detai',
  data () {
    return {
      map: {
        center: { lng: 115.929912, lat: 28.683191 },
        zoom: 15,
        show: true,
        dragging: true
      },
      id: this.$route.query.id, // 上一页传过来的id
      list: {},
      base: 'http://liufusong.top:8080'
    }
  },
  created () {
    this.houseMeassage()
  },
  mounted () {},
  computed: {},
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    async houseMeassage () {
      const res = await houseMeassage(this.id)
      this.list = res.data.body
      console.log(res)
    },
    handler ({ BMap, map }) {
      // const me = this
      // console.log(BMap, map)
      // 鼠标缩放
      map.enableScrollWheelZoom(true)
      // 点击事件获取经纬度
      map.addEventListener('click', function (e) {
        console.log(e.point.lng, e.point.lat)
      })
    }
  }
}
</script>
<style scoped lang="less">
//body  css
.detail {
  position: relative;
  background-color: #f6f5f6;
  overflow-x: hidden;
}
// 顶部标题css
:deep(.van-nav-bar__content) {
  background-color: #21b97a;
  .van-nav-bar__title {
    color: #fff;
  }
}
:deep(.van-icon) {
  color: #fff;
}
//轮播图区域css样式
.my-swipe {
  width: 375px;
  height: 252px;
  line-height: 150px;
  text-align: center;
  img {
    width: 100%;
    height: 100%;
  }
}
//房屋信息css样式
.House-Detail {
  display: flex;
  flex-direction: column;
  width: 376px;
  height: 267px;
  background-color: #fff;
  div {
    flex: 1;
  }
  .house-title {
    padding: 15px 0 0 15px;
    .top {
      font-weight: 400;
      font-size: 16px;
      color: #333333;
      margin: 16px 0;
    }
    .buttom {
      display: block;
      background-color: #e1f5f8;
      color: #40c5db;
      width: 46px;
      height: 20px;
      font-size: 12px;
      line-height: 20px;
      padding-left: 5px;
    }
  }
  .house-message {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    border-top: 1px solid #d5d5d5;
    border-bottom: 1px solid #d5d5d5;
    div {
      text-align: center;
    }
    .txt {
      font-size: 18px;
      color: #fa5741;
      font-weight: 700;
      span {
        font-size: 12px;
      }
    }
    .mitxt {
      font-size: 14px;
      color: #999999;
    }
  }
  .house-ff {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;
    padding-left: 15px;
    p {
      color: #333333;
      span {
        color: #999999;
      }
    }
  }
}
//地理位置css样式
.Cell-location {
  width: 375px;
  height: 189px;
  margin-top: 10px;
  background-color: #fff;
  .title {
    font-size: 14px;
    color: #333333;
    margin: 0 12px;
    span {
      color: #666666;
    }
  }
}
//地图
.map {
  width: 100%;
  height: 145px;
}
//房屋配套
.Housing-supporting {
  width: 375px;
  height: 129px;
  background-color: #fff;
  margin-bottom: 10px;
  padding: 0 10px;
  .title {
    font-size: 15px;
    color: #333333;
    font-weight: 700;
    margin-bottom: 10px;
    padding: 14px 0;
    border-bottom: 1px solid #d5d5d5;
  }
  .supporting {
    display: flex;
    font-size: 14px;
    .text {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 10px 15px;
      color: #333333;
      .iconfont {
        font-size: 23px;
      }
    }
  }
}
//房源概况
.Housing-set {
  width: 375px;
  height: 266px;
  background-color: #fff;
  .title {
    font-weight: 700;
    font-size: 15px;
    padding: 15px 0;
    margin-left: 8px;
    color: #333333;
    border-bottom: 1px solid #999999;
  }
  .userFd {
    display: flex;
    margin: 10px 0;
    .img img {
      width: 52px;
      height: 52px;
      margin: 5px 10px 0 10px;
    }
    .Fdname {
      font-size: 14px;
      color: #333333;
      margin-top: 10px;
      .renzheng {
        margin-top: 6px;
        font-size: 12px;
        color: #fa5741;
        .iconfont {
          margin-right: 4px;
          font-size: 16px;
        }
      }
    }
    .xiaoxi {
      width: 74px;
      height: 29px;
      font-size: 14px;
      color: #33be85;
      margin-left: 125px;
      border: 1px solid #7dd6b1;
      text-align: center;
      line-height: 29px;
      border-radius: 5px;
      margin-top: 18px;
    }
  }
  .message {
    font-size: 14px;
    padding: 10px 9px;
    color: #333333;
  }
}
//猜你喜欢
.like-info {
  margin-top: 10px;
  margin-bottom: 50px;
  background-color: #fff;
  .user-Like {
    height: 48px;
    color: #333333;
    font-weight: 700;
    font-size: 15px;
    padding: 15px 10px;
    margin-bottom: -30px;
  }
  .user-txte {
    border-top: 1px solid #dcdcdc;
    .title {
      font-size: 15px;
      font-weight: 700;
      color: #394043;
    }
    .img {
      width: 106px;
      height: 80px;
      margin-right: 5px;
    }
    .label {
      .text1 {
        font-size: 12px;
        color: #afb2b3;
        margin-top: -3px;
      }
      .text2 {
        display: inline-block;
        border-radius: 5px;
        width: 40px;
        height: 15px;
        line-height: 20px;
        font-size: 12px;
        color: #39becd;
        background-color: #e1f5f8;
        padding: 2px 2px;
        margin: 2px 0;
      }
      .text3 {
        font-size: 16px;
        color: #fa5741;
        span {
          font-size: 12px;
        }
      }
    }
  }
}
//底部菜单栏
.footer-nav {
  width: 375px;
  height: 50px;
  background-color: #fff;
  position: fixed;
  left: 0;
  bottom: 0;
  border: 1px solid #d7d7d7;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 17px;
  color: #999999;
  .f1 {
    .iconfont {
      font-size: 16px;
      color: #ff4f00;
      padding-left: 30px;
    }
  }
  .f2 {
    padding: 10px 0px 10px 32px;
    border-left: 1px solid #eaeaeb;
  }
  .f3 {
    width: 120px;
    height: 50px;
    color: #fff;
    background-color: #21b97a;
    text-align: center;
    line-height: 50px;
  }
}
</style>
