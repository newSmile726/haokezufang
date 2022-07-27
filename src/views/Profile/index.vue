<template>
  <div class="profile-info">
    <!-- 未登录页面 -->
    <div v-if="!isLogin">
      <div class="title-img"></div>
    <div class="My_info__eOYeg">
      <van-image
      class="touxiang"
        round
        src="https://img01.yzcdn.cn/vant/cat.jpeg"
      />
      <p class="yonghuming">游客</p>
      <van-button class="denglu" type="primary" @click="$router.push('/login')">去登录</van-button>
    </div>
    </div>
    <!-- 登录成功页面 -->
  <div v-else class="title-img1">
    <div class="My_info__eOYeg">
      <van-image
      class="touxiang"
        round
        :src="base+userInfo.avatar"
      />
      <p class="yonghuming">{{userInfo.nickname}}</p>
      <van-button class="denglu" type="primary" @click="dropout">退出</van-button>
      <span class="text">编辑个人资料►</span>
    </div>
  </div>
    <!-- 登录成功页面 -->
    <van-grid class="van-grid-test" :border="false" :column-num="3">
      <van-grid-item to="/favorate" text="我的收藏">
        <template #icon>
          <i class="iconfont icon-wodeshoucang"></i>
        </template>
      </van-grid-item>
      <van-grid-item to="/rent" text="我的出租">
        <template #icon>
          <i class="iconfont icon-fangwuxinxi"></i>
        </template>
      </van-grid-item>
      <van-grid-item text="看房记录">
        <template #icon>
          <i class="iconfont icon-jilu"></i>
        </template>
      </van-grid-item>
       <van-grid-item text="成为房主">
        <template #icon>
          <i class="iconfont icon-haofangtuo400iconfonthaoanjie"></i>
        </template>
      </van-grid-item>
      <van-grid-item text="个人资料">
        <template #icon>
          <i class="iconfont icon-gerenziliao"></i>
        </template>
      </van-grid-item>
       <van-grid-item text="联系我们">
        <template #icon>
          <i class="iconfont icon-lianxiwomen"></i>
        </template>
      </van-grid-item>
    </van-grid>
    <div class="footer-img"></div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { profile } from '@/api/user.js'
import '@/utils/RouteGuard'
export default {
  name: 'Profile',
  data () {
    return {
      userInfo: {},
      base: 'http://liufusong.top:8080'
    }
  },
  created () {
    if (this.isLogin) {
      this.messageInfo()
    }
  },
  mounted () {},
  computed: {
    ...mapState(['user']),
    isLogin () {
      return !!this.$store.state.user.token
    }
  },
  methods: {
    // 退出按钮
    dropout () {
      this.$dialog.confirm({
        title: '提示',
        message: '是否确定退出'
      })
        .then(() => {
          this.$store.commit('setUser', {})
        })
        .catch(() => {
          // on cancel
        })
    },
    // 获取用户信息
    async messageInfo () {
      try {
        const res = await profile(this.user.token)
        // console.log(res)
        this.userInfo = res.data.body
      } catch (error) {
        this.$toast.fail('请重新登录~~')
      }
    }
  }
}
</script>
<style scoped lang="less">
.profile-info {
  position: relative;
  .title-img {
    widows: 375px;
    height: 191px;
    background: url('../../assets/bg.png');
    background-size: 100% 100%;
  }
    .title-img1 {
    widows: 100%;
    height: 315px;
    background: url('../../assets/avatar.png');
    background-size: 100% 120%;
    z-index: 5;
    margin-bottom: -48px;
     .My_info__eOYeg {
    display: flex;
    flex-direction:column;
    align-items: center;
    position: absolute;
    background: #fff;
    width: 319px;
    height: 210px;
    top: 168px;
    left: 188px;
    box-shadow: 0 0 10px 3px #ddd;
    transform: translateX(-50%);
    z-index: 2;
    .touxiang{
      width: 60px;
      height: 60px;
      margin-top: -35px;
      border: 5px solid #eee;
    }
    .yonghuming{
      font-size: 13px;
      color: rgb(111, 106, 106);
      margin: 15px 0;
    }
    .denglu{
      width: 60px;
      height: 20px;
      font-size: 12px;
      border-radius:25px ;
      background-color: #21b97a;
    }
    .text{
      margin-top: 30px;
      font-size: 12px;
      color: #999;
    }
  }
  }
  .My_info__eOYeg {
    display: flex;
    flex-direction:column;
    align-items: center;
    position: absolute;
    background: #fff;
    width: 319px;
    height: 165px;
    top: 135px;
    left: 188px;
    box-shadow: 0 0 10px 3px #ddd;
    transform: translateX(-50%);
    z-index: 2;
    .touxiang{
      width: 60px;
      height: 60px;
      margin-top: -35px;
      border: 5px solid #eee;
    }
    .yonghuming{
      font-size: 13px;
      color: rgb(111, 106, 106);
      margin: 20px 0;
    }
    .denglu{
      width: 80px;
      height: 30px;
      border-radius:4px ;
      background-color: #21b97a;
    }
  }
  .van-grid-test {
    padding-top: 130px;
    i.iconfont{
      font-size: 23px;
    }
    .text{
      font-size: 13px;
    }
  }
  .footer-img {
    width: 345px;
    height: 85px;
    background: url('../../assets/join.png');
    background-size: 100% 100%;
    margin: 24px auto;
  }
}
</style>
