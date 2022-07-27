<template>
  <div>
 <van-cell-group class="user-txte" >
      <van-cell @click="godetai(index)" :title="item.title" title-class='title' v-for="(item,index) in houseMeassage" :key="index">
        <template #icon>
          <van-image
          class="img"
            :src="baseU + item.houseImg"
          />
        </template>
          <template #label>
        <div class="label">
            <div class="text1">{{item.desc}}</div>
            <div v-for="(arr,index) in item.tags" :key="index" class="text2">{{arr}}</div>
            <div class="text3">{{item.price}} <span>元/月</span></div>
        </div>
          </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>
<script>
export default {
  name: '',
  data () {
    return {
      baseU: 'http://liufusong.top:8080'
    }
  },
  props: {
    houseMeassage: {
      type: Array,
      required: true
    }
  },
  created () {
  },
  mounted () {},
  methods: {
    godetai (index) {
      this.$router.push({
        path: '/detai',
        query: {
          id: this.houseMeassage[index].houseCode
        }
      })
    }
  }
}
</script>
<style scoped lang="less">
.user-txte {
    margin-bottom: 50px;
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
