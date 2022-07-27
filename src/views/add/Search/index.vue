<template>
  <div>
    <form action="/">
      <van-search
        v-model="value"
        show-action
        background="#f6f5f6"
        placeholder="请输入搜索关键词"
        @input="onSearch"
        @cancel="onCancel"
      />
    </form>
    <van-cell-group>
      <van-cell v-for="(item,index) in cityList" :key="index" :title="item.communityName" @click="giveValue(item)"/>
    </van-cell-group>
  </div>
</template>
<script>
import { KeywordQuery } from '@/api/area'
import { getCity } from '@/utils/auth'
export default {
  name: 'search',
  data () {
    return {
      value: '',
      cityId: '',
      cityList: []
    }
  },
  created () {
    this.cityId = getCity().value
  },
  mounted () {},
  computed: {},
  methods: {
    async onSearch () {
      const res = await KeywordQuery(this.value, this.cityId)
      console.log(res)
      this.cityList = res.data.body
    },
    onCancel () {
      this.$router.back()
    },
    giveValue (item) {
      this.$router.push({
        name: 'add',
        params: { item }
      })
    }
  }
}
</script>
<style scoped lang="less">
:deep(.van-search__content) {
  background-color: #fff;
}
:deep(.van-search__action) {
  color: #6b7072;
}
</style>
