<template>
  <div>
    <!-- 顶部搜索 -->
    <van-nav-bar left-arrow @click-left="$router.push('/')" class="navbar">
      <template #title>
        <div class="search">
          <van-search
            v-model="value"
            class="search-nav"
            placeholder="请输入小区或地址"
            background="unset"
          >
            <template #label>
              <div>
                <span class="text" @click="$router.push('/city')"
                  >{{ city }}▾</span
                >
              </div>
            </template>
          </van-search>
        </div>
      </template>
      <template #right>
        <i class="iconfont icon-ditu1" @click="$router.push('/map')"></i>
      </template>
    </van-nav-bar>
    <!-- 下拉菜单 -->
    <van-dropdown-menu active-color="#21b97a">
      <van-dropdown-item v-model="value1" title="区域" ref="closeFn">
        <template #default>
          <div>
            <van-picker
              class="xuanxiang"
              show-toolbar
              ref="region"
              value-key="label"
              toolbar-position="bottom"
              :columns="regionn"
              @confirm="RegionnConfirm"
            >
              <template #confirm>
                <van-button class="confirm" type="primary">确认</van-button>
              </template>
              <template #cancel>
                <van-button class="cancel" type="default" @click="closeFn"
                  >取消
                </van-button>
              </template>
            </van-picker>
          </div>
        </template>
      </van-dropdown-item>
      <van-dropdown-item v-model="value1" title="方式" ref="closeFn1">
        <template #default>
          <div>
            <van-picker
              class="xuanxiang"
              show-toolbar
              value-key="label"
              toolbar-position="bottom"
              :columns="mode"
              @confirm="ModeConfirm"
            >
              <template #confirm>
                <van-button class="confirm" type="primary">确认</van-button>
              </template>
              <template #cancel>
                <van-button class="cancel" type="default" @click="closeFn1"
                  >取消
                </van-button>
              </template>
            </van-picker>
          </div>
        </template>
      </van-dropdown-item>
      <van-dropdown-item v-model="value2" title="租金" ref="closeFn2">
        <template #default>
          <div>
            <van-picker
              class="xuanxiang"
              show-toolbar
              value-key="label"
              toolbar-position="bottom"
              :columns="rent"
              @confirm="RentConfirm"
            >
              <template #confirm>
                <van-button class="confirm" type="primary">确认</van-button>
              </template>
              <template #cancel>
                <van-button class="cancel" type="default" @click="closeFn2"
                  >取消
                </van-button>
              </template>
            </van-picker>
          </div>
        </template>
      </van-dropdown-item>
      <van-dropdown-item
        v-model="value2"
        title="筛选"
        @open="RightShow = true"
      />
    </van-dropdown-menu>
    <van-popup
      v-model="RightShow"
      class="filterMore"
      position="right"
      :style="{ height: '100%', width: '70%' }"
    >
      <div>
        <div class="housetitle">户型</div>
        <div class="house-typemessage">
          <span
            v-for="(item, index) in typemessage"
            :key="index"
            :class="{ active: newType.includes(item) }"
            @click="isClickFn(item)"
            >{{ item.label }}</span
          >
        </div>
        <div class="housetitle">朝向</div>
        <div class="house-orientationss">
          <span
            v-for="(item, index) in orientationss"
            :key="index"
            :class="{ active: newOrient.includes(item) }"
            @click="isClickFn1(item)"
            >{{ item.label }}</span
          >
        </div>
        <div class="housetitle">楼层</div>
        <div class="house-floormessage">
          <span
            v-for="(item, index) in floormessage"
            :key="index"
            :class="{ active: newFloor.includes(item) }"
            @click="isClickFn2(item)"
            >{{ item.label }}</span
          >
        </div>
        <div class="housetitle">房屋亮点</div>
        <div class="house-highlights">
          <span
            v-for="(item, index) in highlights"
            :key="index"
            :class="{ active: newHighligh.includes(item) }"
            @click="isClickFn3(item)"
            >{{ item.label }}</span
          >
        </div>
      </div>
    </van-popup>
    <van-popup
      class="btnpopup"
      v-model="RightShow"
      position="right"
      :overlay="false"
      :style="{ height: '8%', width: '78%' }"
    >
      <footer class="vanbtn">
        <span class="qingchu" @click="clearMone">清除</span>
        <span class="queding" @click="moreMessage">确定</span>
      </footer>
    </van-popup>
    <!-- 房屋信息区域 -->
    <houseMeassage :houseMeassage="houseMeassage"></houseMeassage>
  </div>
</template>
<script>
import { getCity } from '@/utils/auth'
import { ObtainHousingQueryConditions, ConditionQueryHouse } from '@/api/house'
import houseMeassage from './house-message'
export default {
  name: '',
  components: { houseMeassage },
  data () {
    return {
      RightShow: false,
      value: '',
      city: '',
      value1: 0,
      value2: 'a',
      houseMeassage: [], // 房屋信息
      mode: [], //   租房方式
      rent: [], //  租金
      regionn: [], // 租房区域
      typemessage: [], // 筛选 户型
      newType: [],
      orientationss: [], // 筛选 朝向
      newOrient: [],
      floormessage: [], // 筛选 楼层
      newFloor: [],
      highlights: [], // 筛选 房屋亮点
      newHighligh: [],
      cityId: this.$store.state.City.value, // 地区id
      area: '', // 区域
      subway: '', // 地铁
      rentType: '', // 整租合租
      price: '', // 租金价格
      more: '', // 复合
      roomType: '', // 房屋类型
      oriented: '', // 朝向
      characteristic: '', // 房屋亮点标签
      floor: '', // 楼层
      forbidClick: false // 加载状态
    }
  },
  created () {
    this.ObtainHousingQueryConditions()
    this.ConditionQueryHouse(this.cityId)
    this.city =
      getCity()?.label ??
      { label: '北京', value: 'AREA|88cff55c-aaa4-e2e0' }.label
  },
  mounted () {},
  computed: {
    params () {
      return {
        cityId: this.cityId, // 地区id
        area: this.area, // 区域
        subway: this.subway, // 地铁
        rentType: this.rentType, // 整租合租
        price: this.price, // 租金价格
        more: this.more, // 复合查询
        roomType: this.roomType, // 房屋类型
        oriented: this.oriented, // 朝向
        characteristic: this.characteristic, // 房屋亮点标签
        floor: this.floor, // 楼层
        start: 1,
        end: 20
      }
    },
    mores () {
      return [
        ...this.newType,
        ...this.newOrient,
        ...this.newFloor,
        ...this.newHighligh
      ]
    }
  },
  methods: {
    // 根据条件查询房屋
    async ConditionQueryHouse () {
      this.$toast.loading({
        message: '加载中...',
        duration: 0
      })
      try {
        const res = await ConditionQueryHouse(this.params)
        // console.log(res)
        this.houseMeassage = res.data.body.list
        this.rentType = ''
        this.price = ''
        this.area = ''
        this.subway = ''
        this.roomType = ''
        this.oriented = ''
        this.floor = ''
        this.characteristic = ''
        this.$toast.success('获取成功')
      } catch (error) {
        this.$toast.fail('加载失败')
      }
    },
    // 根据区域查询
    RegionnConfirm () {
      const res = this.$refs.region.getValues()
      // console.log(res)
      if (res[0].value === 'area') {
        if (res[2].value !== null) {
          this.area = res[2].value
        } else if (res[1].value !== null) {
          this.area = res[1].value
        } else if (res[0].value == null) {
          this.area = res[0].value
        }
      } else {
        if (res[2].value !== null) {
          this.subway = res[2].value
        } else if (res[1].value !== null) {
          this.subway = res[1].value
        } else if (res[0].value === 'subway') {
          this.subway = res[0].value
        }
      }

      this.ConditionQueryHouse()
      this.closeFn()
    },
    // 根据租房方式查询
    ModeConfirm (value) {
      // console.log(value)
      this.rentType = value.value
      this.ConditionQueryHouse()
      this.closeFn1()
    },
    // 根据租金查询
    RentConfirm (value) {
      // console.log(value)
      this.price = value.value
      this.ConditionQueryHouse()
      this.closeFn2()
    },
    // 筛选查询
    moreMessage () {
      const res = this.newType.map((item) => item.value)
      // console.log(res.join(','))
      this.roomType = res.join(',')
      const res1 = this.newOrient.map((item) => item.value)
      this.oriented = res1.join(',')
      const res2 = this.newFloor.map((item) => item.value)
      this.floor = res2.join(',')
      const res3 = this.newHighligh.map((item) => item.value)
      this.characteristic = res3.join(',')
      // const res = this.mores.map(item => item.value)
      // console.log(res)
      // this.mores = res.join(',')
      this.ConditionQueryHouse()
      this.RightShow = false
    },
    isClickFn (item) {
      if (this.newType.includes(item)) {
        this.newType = this.newType.filter((ele) => ele !== item)
      } else {
        this.newType.push(item)
      }
    },
    isClickFn1 (item) {
      if (this.newOrient.includes(item)) {
        this.newOrient = this.newOrient.filter((ele) => ele !== item)
      } else {
        this.newOrient.push(item)
      }
    },
    isClickFn2 (item) {
      if (this.newFloor.includes(item)) {
        this.newFloor = this.newFloor.filter((ele) => ele !== item)
      } else {
        this.newFloor.push(item)
      }
    },
    isClickFn3 (item) {
      if (this.newHighligh.includes(item)) {
        this.newHighligh = this.newHighligh.filter((ele) => ele !== item)
      } else {
        this.newHighligh.push(item)
      }
    },
    clearMone () {
      this.newType = []
      this.newOrient = []
      this.newFloor = []
      this.newHighligh = []
    },
    region () {
      this.regionn[0].children[0].children = [{ label: '' }]
      this.regionn[1].children[0].children = [{ label: '' }]
    },
    // 获取房屋查询条件
    async ObtainHousingQueryConditions () {
      const res = await ObtainHousingQueryConditions(
        this.$store.state.City.value
      )
      // console.log(res)
      //  租房区域
      const ele = res.data.body.area
      const ele1 = res.data.body.subway
      this.regionn = [ele, ele1]
      // console.log(this.regionn)
      this.region()
      // 租房方式
      this.mode = res.data.body.rentType
      // 租金
      this.rent = res.data.body.price
      // 筛选区域
      // 户型  typemessage
      this.typemessage = res.data.body.roomType
      // 朝向 orientationss
      this.orientationss = res.data.body.oriented
      // 楼层 floormessage
      this.floormessage = res.data.body.floor
      // 房屋亮点 highlights
      this.highlights = res.data.body.characteristic
    },
    closeFn () {
      this.$refs.closeFn.toggle()
    },
    closeFn1 () {
      this.$refs.closeFn1.toggle()
    },
    closeFn2 () {
      this.$refs.closeFn2.toggle()
    }
  }
}
</script>
<style scoped lang="less">
//搜索栏
.navbar {
  background-color: #21b97a;
  .iconfont {
    width: 20px;
    height: 20px;
    font-size: 20px;
    color: #fff;
    border: 2px solid #fff;
    border-radius: 50%;
  }
  :deep(.van-nav-bar__right) {
    margin-right: 6px;
  }
}
:deep(.van-icon) {
  color: #ebeff2;
  font-size: 20px;
  margin-left: -8px;
}
.search-nav {
  position: absolute;
  top: 7px;
  left: 30px;
  width: 300px;
  height: 34px;
  border-radius: 5px;
  .text {
    margin-left: -5px;
    margin-right: 8px;
    font-size: 16px;
    color: rgb(78, 76, 76);
  }
}
// 下拉标签css样式
.xuanxiang {
  position: relative;
  overflow-x: hidden;
  .confirm {
    width: 250px;
    height: 50px;
    color: #fff;
    font-size: 18px;
    margin-left: -20px;
    background-color: #21b97a;
    margin-right: -5px;
  }
  .cancel {
    width: 120px;
    height: 50px;
    color: #21b98b;
    font-size: 18px;
  }
  :deep(.van-picker__cancel) {
    padding: 0;
  }
}
// 弹出层css样式
.active {
  border: 1px solid #21b97a !important;
  color: #21b97a;
  background-color: #defaef;
}
.filterMore {
  padding: 0 15px;
  span {
    display: inline-block;
    width: 70px;
    height: 32px;
    color: #888888;
    font-size: 12px;
    border: 1px solid #e4e4e4;
    margin: 0 18px 15px 0;
    line-height: 32px;
    text-align: center;
  }
}
.housetitle {
  margin: 20px 0;
  color: #333333;
  font-size: 15px;
}
//户型
.house-typemessage {
  margin-left: 40px;
  padding-bottom: 14px;
  border-bottom: 1px solid #eeeeee;
}
//朝向
.house-orientationss {
  margin-left: 40px;
  padding-bottom: 14px;
  border-bottom: 1px solid #eeeeee;
}
//楼层
.house-floormessage {
  margin-left: 40px;
  padding-bottom: 14px;
  border-bottom: 1px solid #eeeeee;
}
//房屋亮点
.house-highlights {
  margin-left: 40px;
  padding-bottom: 14px;
  border-bottom: 1px solid #eeeeee;
  margin-bottom: 50px;
}
//按钮
.btnpopup {
  margin-top: 46vh;
  overflow: hidden;
  .vanbtn {
    position: fixed;
    height: 50px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 3;
    display: flex;
    .qingchu {
      width: 98px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      color: #21b97a;
      font-size: 18px;
      border: 1px solid #e9e9e9;
    }
    .queding {
      width: 196px;
      height: 50px;
      line-height: 50px;
      font-size: 18px;
      text-align: center;
      color: #fff;
      background-color: #21b97a;
    }
  }
}
</style>
