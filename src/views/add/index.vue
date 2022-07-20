<template>
  <div class="addHouse">
    <!--标题 -->
    <van-nav-bar
      title="发布房源"
      class="navbar"
      left-arrow
      fixed
      @click-left="onClickLeft"
    />
    <div class="title-min">房源信息</div>
    <van-cell-group clickable>
      <van-field
        class="xqname"
        v-model="value1"
        label="小区名称"
        right-icon="arrow"
        placeholder="请输入小区名称"
        input-align="right"
        @click="$router.push('/search')"
      />
      <van-field
        v-model="value2"
        class="momney-txet"
        placeholder="请输入租金/月"
      >
        <template #label>
          <div class="label-zujin"><span>租</span>金</div>
        </template>
        <template #extra> ￥/月 </template>
      </van-field>
      <van-field
        v-model="value3"
        class="built-up"
        clearable
        label="建筑面积"
        placeholder="请输入建筑面积"
      >
        <template #extra> ㎡ </template>
      </van-field>
    </van-cell-group>
    <van-cell v-model="housetype" is-link @click="isHousetype = true">
      <template #title>
        <div class="House-title"><span>户</span>型</div>
      </template>
    </van-cell>
    <van-popup
      v-model="isHousetype"
      position="bottom"
      :style="{ height: '44%' }"
    >
      <van-picker
        @confirm="confirm"
        @cancel="cancel"
        show-toolbar
        :columns="housetypes"
      />
    </van-popup>
    <van-cell
      v-model="floor"
      title="所在楼层"
      is-link
      @click="isFloor = true"
    ></van-cell>
    <van-popup v-model="isFloor" position="bottom" :style="{ height: '44%' }">
      <van-picker
        @confirm="confirms"
        @cancel="cancels"
        show-toolbar
        :columns="floors"
      />
    </van-popup>
    <van-cell v-model="orientations" is-link @click="isOrientations = true">
      <template #title>
        <div class="House-title"><span>朝</span>向</div>
      </template>
    </van-cell>
    <van-popup
      v-model="isOrientations"
      position="bottom"
      :style="{ height: '44%' }"
    >
      <van-picker
        @confirm="confirmsNoe"
        @cancel="cancelsNoe"
        show-toolbar
        :columns="orientationss"
      />
    </van-popup>
    <div class="house-txt">房屋标题</div>
    <van-field
      class="house-txt-value"
      v-model="houseValue"
      placeholder="请输入标题（例如：整租 小区名 2室 5000元）"
      input-align="left"
    />
    <div class="house-txt">房屋图像</div>
    <div class="house-imgff">
      <van-uploader v-model="fileList" multiple />
    </div>
    <div class="house-configure">房屋配置</div>
    <van-grid
      clickable
      square
      :border="false"
      :column-num="5"
      class="configure"
    >
      <van-grid-item @click="gridFn" :class="{ activebtn: iscalssyg }">
        <template #icon>
          <i class="iconfont icon-yigui"></i>
        </template>
        <template #text> 衣柜 </template>
      </van-grid-item>
      <van-grid-item @click="gridFn">
        <template #icon>
          <i class="iconfont icon-xiyiji"></i>
        </template>
        <template #text> 洗衣机 </template>
      </van-grid-item>
      <van-grid-item @click="gridFn">
        <template #icon>
          <i class="iconfont icon-kongdiao"></i>
        </template>
        <template #text> 空调 </template>
      </van-grid-item>
      <van-grid-item @click="gridFn">
        <template #icon>
          <i class="iconfont icon-meiqitianranqi"></i>
        </template>
        <template #text> 天然气 </template>
      </van-grid-item>
      <van-grid-item @click="gridFn">
        <template #icon>
          <i class="iconfont icon-bingxiang"></i>
        </template>
        <template #text> 冰箱 </template>
      </van-grid-item>
      <van-grid-item @click="gridFn">
        <template #icon>
          <i class="iconfont icon-shuinuanqigongcheng"></i>
        </template>
        <template #text> 暖气 </template>
      </van-grid-item>
      <van-grid-item @click="gridFn">
        <template #icon>
          <i class="iconfont icon-dianshi"></i>
        </template>
        <template #text> 电视 </template>
      </van-grid-item>
      <van-grid-item @click="gridFn">
        <template #icon>
          <i class="iconfont icon-haofangtuo400iconfont2reshuiqi"></i>
        </template>
        <template #text> 热水器 </template>
      </van-grid-item>
      <van-grid-item @click="gridFn">
        <template #icon>
          <i class="iconfont icon-dianshi"></i>
        </template>
        <template #text> 宽带 </template>
      </van-grid-item>
      <van-grid-item @click="gridFn">
        <template #icon>
          <i class="iconfont icon-haofangtuo400iconfont2shafa"></i>
        </template>
        <template #text> 沙发 </template>
      </van-grid-item>
    </van-grid>
    <div class="housedescribe">房屋描述</div>
    <van-field
      class="house-housedescribe"
      v-model="housedescribe"
      placeholder="请输入房屋描述信息"
    />
    <div class="footer-btn">
      <!-- 提交按钮 -->
      <van-button class="btn1" @click="cancelFn">取消</van-button>
      <van-button class="btn2">提交</van-button>
    </div>
  </div>
</template>
<script>
import { sethouseMeassage } from '@/api/house'
import { mapState } from 'vuex'
export default {
  name: 'add',
  data () {
    return {
      iscalssyg: false,
      value1: '', // 小区名称
      value2: '', // 租金
      value3: '', // 面积
      houseValue: '', // 房源标题内容
      housedescribe: '', // 房屋描述
      fileList: [{ url: 'https://img01.yzcdn.cn/vant/leaf.jpg' }], // 房屋图像
      housetype: '请选择', // 户型
      floor: '请选择', // 所在楼层
      orientations: '请选择', // 朝向
      isHousetype: false, // 控制户型弹出
      isFloor: false, // 控制楼层
      isOrientations: false, // 控制朝向弹出
      housetypes: [],
      floors: [],
      orientationss: [],
      list: [] // 全部数据
    }
  },
  created () {
    this.sethouseMeassage()
  },
  mounted () {},
  computed: {
    ...mapState(['user'])
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    // 户型value
    confirm (value) {
      //   console.log(value)
      this.housetype = value
      this.isHousetype = false
    },
    cancel () {
      this.isHousetype = false
    },
    // 楼层value
    confirms (value) {
      //   console.log(value)
      this.floor = value
      this.isFloor = false
    },
    cancels () {
      this.isFloor = false
    },
    // 朝向value
    confirmsNoe (value) {
      //   console.log(value)
      this.orientations = value
      this.isOrientations = false
    },
    cancelsNoe () {
      this.isOrientations = false
    },
    cancelFn () {
      this.$dialog
        .confirm({
          title: '提示',
          message: '放弃发布房源',
          confirmButtonText: '继续编辑',
          confirmButtonColor: '#108ee9'
        })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          // on cancel
          this.$router.back()
        })
    },
    gridFn () {
      this.iscalssyg = !this.iscalssyg
      //   console.log(111) activebtn
    },
    // 获取发布房屋数据
    async sethouseMeassage () {
      const { data } = await sethouseMeassage(this.user.token)
      this.list = data.body
      // 楼层数据
      const floorss = Array.from(this.list.floor, ({ label }) => label)
      this.floors = floorss
      // 房屋数据
      const housetypess = Array.from(this.list.roomType, ({ label }) => label)
      this.housetypes = housetypess
      // 房屋朝向
      const orientationssA = Array.from(this.list.oriented, ({ label }) => label)
      this.orientationss = orientationssA
      console.log(data)
      console.log(this.list)
    }
  }
}
</script>
<style scoped lang="less">
.addHouse {
  position: relative;
  background-color: #f6f5f6;
  overflow-x: hidden;
}
//头部标题css
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
//房源信息css样式
.title-min {
  width: 100%;
  height: 42px;
  margin-top: 50px;
  font-size: 15px;
  color: #21b97a;
  padding: 10px 0 0 15px;
  background-color: #fff;
}
.xqname {
  margin-top: -14px;
}
.momney-txet {
  color: #8a8c8c;
  .label-zujin {
    span {
      padding-right: 28px;
    }
  }
}
.built-up {
  color: #8a8c8c;
}
.House-title {
  span {
    padding-right: 28px;
  }
}
.van-picker {
  :deep(.van-picker__toolbar) {
    border-bottom: 1px solid #eaeaea;
  }
  :deep(.van-picker__confirm) {
    color: #108ee9;
  }
  :deep(.van-picker__cancel) {
    color: #108ee9;
  }
}
//房屋标题
.house-txt {
  width: 375px;
  height: 28px;
  font-size: 14px;
  color: #333;
  background-color: #fff;
  padding: 12px 0 0 10px;
  border-bottom: 1px solid #eaeaea;
}
.house-txt-value {
  height: 44px;
  padding-right: 15px;
}
//房源图像css
.house-imgff {
  background-color: #fff;
  padding-top: 8px;
}
.text2 {
  display: none;
}
//房屋配置css
.house-configure {
  width: 375px;
  height: 28px;
  font-size: 14px;
  color: #333;
  background-color: #fff;
  padding: 12px 0 0 10px;
  border-bottom: 1px solid #eaeaea;
}
.configure {
  font-size: 14px;

  color: #333333;
  i.iconfont {
    font-size: 23px;
  }
}
.activebtn {
  color: #21b97a;
}
//房屋描述
.housedescribe {
  width: 375px;
  height: 28px;
  font-size: 14px;
  color: #333;
  background-color: #fff;
  padding: 12px 0 0 10px;
  border-bottom: 1px solid #eaeaea;
  margin-top: 15px;
}
.house-housedescribe {
  width: 375px;
  height: 147px;
  margin-bottom: 60px;
}
//底部按钮
.footer-btn {
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  width: 375px;
  height: 45px;
  background-color: #fff;
  .btn1 {
    color: #21b97a;
    flex: 1;
  }
  .btn2 {
    background-color: #21b97a;
    color: #fff;
    flex: 1;
  }
}
</style>
