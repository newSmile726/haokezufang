<template>
  <div>
<van-nav-bar
  title="收藏列表"
  class="navbar"
  left-arrow
  fixed
  @click-left="onClickLeft"
/>
<van-cell-group>
  <van-cell title="单元格" value="内容" />
  <van-cell title="单元格" value="内容" label="描述信息" />
</van-cell-group>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { Favoritelist } from '@/api/user'
export default {
  name: '',
  data () {
    return {

    }
  },
  created () {
    this.Favoritelistff()
  },
  mounted () {

  },
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
        const res = await Favoritelist(this.user)
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
<style scoped lang="less">
.navbar{
    background-color: #21b97a;
    /deep/.van-nav-bar__title{
        color: #fff;
        font-size: 18px;
    }
   /deep/ .van-icon-arrow-left{
        color: #fff;
    }
}
</style>
