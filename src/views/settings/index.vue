<template>
    <div class="home-container">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>个人设置</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <el-form ref="form" :model="form" label-width="90px">
          <el-form-item label="编号:">
            <div>1</div>
          </el-form-item>
          <el-form-item label="手机:">
            <div>13911111111</div>
          </el-form-item>
          <el-form-item label="媒体名称:">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="媒体介绍:">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item label="邮箱:">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存设置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
</template>

<script>

export default {
  name: 'LayoutSettings',
  components: {},
  props: {},
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        email: 2762565371
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style lang="less" scoped>

</style>
