<template>
  <div>
    <van-nav-bar
      title="我的出租"
      class="navbar"
      left-arrow
      fixed
      @click-left="onClickLeft"
    />
    <van-cell-group class="user-txte">
      <van-cell
        @click="godetai(index)"
        :title="item.title"
        title-class="title"
        v-for="(item, index) in Mycollection"
        :key="index"
      >
        <template #icon>
          <van-image class="img" :src="baseU + item.houseImg" />
        </template>
        <template #label>
          <div class="label">
            <div class="text1">{{ item.desc }}</div>
            <div v-for="(arr, index) in item.tags" :key="index" class="text2">
              {{ arr }}
            </div>
            <div class="text3">{{ item.price }} <span>元/月</span></div>
          </div>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { Myhouseslist } from '@/api/user'
export default {
  name: '',
  data () {
    return {
      Mycollection: [],
      baseU: 'http://liufusong.top:8080'
    }
  },
  created () {
    this.Favoritelistff()
  },
  mounted () {},
  computed: {
    ...mapState(['user'])
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    // 获取收藏列表
    async Favoritelistff () {
      try {
        const res = await Myhouseslist(this.user.token)
        // console.log(res)
        this.Mycollection = res.data.body
      } catch (error) {
        console.log(error)
      }
    },
    // 跳转出租房源页
    godetai (index) {
      this.$router.push({
        path: '/detai',
        query: {
          id: this.Mycollection[index].houseCode
        }
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
.user-txte {
  margin-top: 50px;
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
</style>
