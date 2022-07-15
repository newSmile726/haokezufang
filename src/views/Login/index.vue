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
        v-model="user.username"
        name="账号"
        placeholder="请输入账号"
        :rules="userFormRules.username"
      />
      <van-field
        v-model="user.password"
        type="password"
        name="密码"
        placeholder="请输入密码"
        :rules="userFormRules.password"
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
export default {
  name: 'Login',
  data () {
    return {
      user: {
        username: '',
        password: ''
      },
      userFormRules: {
        username: [
          {
            required: true
          },
          {
            // 账号以字母开头5-16位
            parrern: /^[a-zA-Z]\w{4,15}$/,
            message: '手机号格式错误'
          }
        ],
        password: [
          {
            required: true
          },
          {
            // 密码强度
            parrern:
              /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/,
            message: '验证码格式错误'
          }
        ]
      }
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
      try {
        const res = await login(this.user)
        this.$store.commit('setUser', res.data.body)
        if (res.data.status === 200) {
          this.$toast.success('登录成功')
          setTimeout(() => this.$router.push('/home/profile'), 1500)
        } else {
          this.$toast.fail('登录失败')
        }
      } catch (err) {
        console.log(err)
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
