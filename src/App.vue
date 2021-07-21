<template>
  <div id="app">
    <h1>{{title}}</h1>
    <router-view/>
    <!-- <el-row>
      <el-button disabled>默认按钮</el-button>
      <el-button type="primary" disabled>主要按钮</el-button>
      <el-button type="success" disabled>成功按钮</el-button>
      <el-button type="info" disabled>信息按钮</el-button>
      <el-button type="warning" disabled>警告按钮</el-button>
      <el-button type="danger" disabled>危险按钮</el-button>
    </el-row>

    <el-row>
      <el-button plain >朴素按钮</el-button>
      <el-button type="primary" plain >主要按钮</el-button>
      <el-button type="success" plain >成功按钮</el-button>
      <el-button type="text" plain round>信息按钮</el-button>
      <el-button type="warning" plain round>警告按钮</el-button>
      <el-button type="danger" plain round>危险按钮</el-button>
    </el-row>
    <el-row>
      <el-button icon="el-icon-search" circle></el-button>
      <el-button type="primary" icon="el-icon-edit" circle></el-button>
      <el-button type="success" icon="el-icon-check" circle></el-button>
      <el-button type="info" icon="el-icon-message" circle>邮箱</el-button>
      <el-button type="warning" icon="el-icon-star-off" circle>收藏</el-button>
      <el-button type="danger" icon="el-icon-delete" circle>删除</el-button>
    </el-row>
    <el-button type="primary" :loading="true">加载中</el-button>
    <el-input-number
    v-model="mun"
    :min="1"
    :max="10"
    label="文字描述"
    ></el-input-number>
    {{mun}} -->
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      title: '欢迎使用Vue',
      mun: 3
    }
  }
}
</script>

<style lang="less">

</style>
