<template>
  <div>
    <!-- 顶部标题 -->
    <van-nav-bar
      title="地图找房"
      class="navbar"
      left-arrow
      fixed
      @click-left="$router.back()"
    />
    <!-- 地图区域 -->
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
        <bm-info-window :show="map.show">找房</bm-info-window>
      </bm-marker>
    </baidu-map>
  </div>
</template>
<script>
export default {
  name: 'Map',
  data () {
    return {
      map: {
        center: { lng: 115.929912, lat: 28.683191 },
        zoom: 15,
        show: true,
        dragging: true
      }
    }
  },
  created () {},
  mounted () {},
  computed: {},
  methods: {
    handler ({ BMap, map }) {
    //   const me = this
    //   console.log(BMap, map)
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
.navbar {
  background-color: #21b97a;
  /deep/.van-nav-bar__title {
    color: #fff;
    font-size: 18px;
  }
  /deep/ .van-icon-arrow-left {
    color: #fff;
  }
}
.map {
    margin-top: 50px;
  width: 100%;
  height: 800px;
}
</style>
