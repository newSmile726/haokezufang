<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar class="navbar" title="账号登录" @click-left="goProPage">
      <template #left>
        <van-icon name="arrow-left" />
      </template>
    </van-nav-bar>
    <!-- 账号密码表单 -->
    <van-form @submit="login">
      <van-field
        v-model="username"
        name="账号"
        placeholder="请输入账号"
        :rules="usernameRules"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        placeholder="请输入密码"
        :rules="passwordRules"
      />
      <div style="margin: 16px">
        <van-button class="denglu" round block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
    <div class="am-flexbox-item">
      <a class="atext" href="#">还没有账号，去注册~</a>
    </div>
  </div>
</template>
<script>
import { login } from '@/api/user'
import { usernameRules, passwordRules } from './rules'
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      usernameRules,
      passwordRules
    }
  },
  created () {},
  mounted () {},
  computed: {},
  methods: {
    goProPage () {
      // 点击返回上一个页面
      this.$router.back()
    },
    async login () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      try {
        const res = await login(this.username, this.password)
        this.$store.commit('setUser', res.data.body)
        const status = res.data.status
        if (status === 200) {
          this.$router.push('/home/profile')
          this.$toast.success('登录成功')
        } else {
          this.$toast.fail(res.data.description)
        }
      } catch (e) {
        this.$toast.fail('登录失败，请刷新~')
      }
    }
  }
}
</script>
<style scoped lang="less">
.navbar {
  background-color: #21b97a;
  font-size: 18px;
  /deep/.van-nav-bar__title {
    color: #fff;
  }
  /deep/.van-icon-arrow-left:before {
    color: #fff;
  }
}
.denglu {
  width: 347px;
  height: 44px;
  background-color: #1cb676;
  border-radius: 5px;
  border: none;
  font-size: 15px;
  margin: 20px 0;
}
.am-flexbox-item {
  a {
    display: block;
    text-align: center;
    color: #666;
  }
  .atext{
    font-size: 12px;
  }
}

</style>
