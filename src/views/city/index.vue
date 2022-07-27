<template>
  <div>
    <!-- 顶部标题 -->
    <van-nav-bar
      title="城市列表"
      class="navbar"
      left-arrow
      fixed
      @click-left="onClickLeft"
    />
    <!-- 列表栏 -->
    <van-index-bar
      class="index-bar"
      :index-list="indexList"
      :sticky-offset-top="60"
      :z-index="0"
      highlight-color="#21b97a"
    >
      <div v-for="(item, index) in indexList" :key="index">
        <van-index-anchor :index="index">{{ getTitle(item) }}</van-index-anchor>
        <van-cell
          @click="chooseFn(item1)"
          clickable
          center
          :title="item1.label"
          v-for="(item1, index1) in CityList[index]"
          :key="index1"
        />
      </div>
    </van-index-bar>
  </div>
</template>
<script>
import { resolveIndex, resolveData } from '@/utils/chulushuju'
import { getCityList, hotCityList } from '@/api/area'
import { getCity } from '@/utils/auth'
export default {
  name: 'City',
  data () {
    return {
      indexList: [],
      CityList: [],
      currentCity: [{ label: '北京', value: 'AREA|88cff55c-aaa4-e2e0' }]
    }
  },
  created () {
    this.getCityList()
  },
  mounted () {},
  computed: {},
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    async getCityList () {
      const res = await getCityList(1)
      const res1 = await hotCityList()
      // console.log(res.data.body)
      this.indexList = resolveIndex(res.data.body)
      // console.log(res1)
      this.CityList = [
        [{ label: '北京' }],
        res1.data.body,
        ...resolveData(this.indexList, res.data.body)
      ]
      this.indexList = ['#', '热', ...this.indexList]
      // console.log(this.CityList)
      // console.log(this.indexList)
    },
    getTitle (item) {
      if (item === '#') return '当前城市'
      if (item === '热') return '热门城市'
      return item
    },
    chooseFn (item) {
      // setCity(item)
      this.$store.commit('setCity', item)
      this.currentCity[0].label = getCity().label
      this.$router.back()
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
.index-bar {
  margin-top: 46px;
}
:deep(.van-index-bar__sidebar) {
  right: -3px;
  margin-top: 15px;
  height: 580px;
  justify-content: space-around;
}
:deep(.van-cell) {
  padding: 0 15px;
  height: 50px;
  font-size: 16px;
}
:deep(.van-index-anchor) {
  font-size: 14px;
  // padding: 10px 15px;
  color: #999;
  height: 36px;
}
</style>
