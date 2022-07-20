<template>
  <div>
    <form action="/">
      <van-search
        v-model="value"
        show-action
        background="#f6f5f6"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
    <van-cell-group>
      <van-cell title="单元格"/>
    </van-cell-group>
  </div>
</template>
<script>
import { KeywordQuery } from '@/api/area'
export default {
  name: 'search',
  data () {
    return {
      value: ''
    }
  },
  created () {},
  mounted () {},
  computed: {},
  methods: {
    async onSearch (val) {
      const res = await KeywordQuery(val)
      console.log(res)
    },
    onCancel () {
      this.$router.back()
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
