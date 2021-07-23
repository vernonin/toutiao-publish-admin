<template>
  <div class="article-container">
    <el-card class="query-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form ref="form" :model="form" label-width="50px" size="mini">
        <el-form-item label="状态">
          <el-radio-group v-model="form.resource">
            <el-radio label="全部"></el-radio>
            <el-radio label="草稿"></el-radio>
            <el-radio label="太审核"></el-radio>
            <el-radio label="审核通过"></el-radio>
            <el-radio label="审核失败"></el-radio>
            <el-radio label="已删除"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="form.date1"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 表格数据 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        根据筛选条件共查询到 46147 条结果：
      </div>
      <el-table
        :data="articles"
        stripe
        border
        class="list-table"
        size="mini"
        style="width: 100%">
        <el-table-column
          label="封面">
          <template slot-scope="scope">
            <img v-if="scope.row.cover.images[0]" class="article-cover" :src="scope.row.cover.images[0]">
            <img v-else class="article-cover" src="@/assets/img/none.jpg">
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态">
          <template slot-scope="scope">
            <el-tag :type="articlesStatus[scope.row.status].type"
            >{{ articlesStatus[scope.row.status].text }}</el-tag>
            <!-- <el-tag v-if="scope.row.status === 0">草稿</el-tag>
            <el-tag type="info" v-else-if="scope.row.status === 1">待审核</el-tag>
            <el-tag type="success" v-else-if="scope.row.status === 2">审核通过</el-tag>
            <el-tag type="warning" v-else-if="scope.row.status === 3">审核失败</el-tag>
            <el-tag type="danger" v-else-if="scope.row.status === 4">已删除</el-tag> -->
          </template>
        </el-table-column>
        <el-table-column
          prop="pubdate"
          label="发布时间">
        </el-table-column>
        <el-table-column
          label="操作">
          <template>
            <el-button
              circle
              type="primary"
              icon="el-icon-edit"
              size="mini"></el-button>
            <el-button
              size="mini"
              circle
              icon="el-icon-delete"
              type="danger"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        layout="prev, pager, next"
        background
        class="paging"
        @current-change="currentChange"
        :total="totalCount">
      </el-pagination>
    </el-card>
  </div>
</template>
<script>
import { getArticles } from '@/api/article'

export default {
  name: 'LayoutArticle',
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
        desc: ''
      },
      articles: [],
      articlesStatus: [
        { status: 0, text: '草稿', type: '' },
        { status: 1, text: '待审核', type: 'info' },
        { status: 2, text: '审核通过', type: 'success' },
        { status: 3, text: '审核失败', type: 'warning' },
        { status: 4, text: '已删除', type: 'danger' }
      ],
      totalCount: 0
    }
  },
  props: {},
  components: {},
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    loadArticles (page = 1) {
      getArticles({
        page
      }).then(res => {
        // console.log(res)
        this.totalCount = res.data.data.total_count
        this.articles = res.data.data.results
      })
    },
    // 分页按钮，调用loadArticle方法请求数据，转入page页数
    currentChange (page) {
      this.loadArticles(page)
    }
  },
  created () {
    this.loadArticles()
  }
}
</script>
<style lang="less" scoped>
.query-card{
  margin-bottom: 25px;
}
.paging{
  margin-top: 20px;
  text-align: right;
}
.list-table{
  text-align: center;
  .article-cover{
    width: 100px;
  }
}
</style>
