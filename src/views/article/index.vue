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
          <el-radio-group v-model="status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">太审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="channelId" placeholder="请选择频道">
            <el-option
            label="全部"
            :value="null"></el-option>
            <el-option
            :label="item.name"
            :value="item.id"
            v-for="(item, index) in channels"
            :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="rangeDate"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button :disabled="isLoading" type="primary" @click="loadArticles(1)">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 表格数据 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        根据筛选条件共查询到 {{totalCount}} 条结果：
      </div>
      <el-table
        :data="articles"
        stripe
        border
         v-loading="isLoading"
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
          <template slot-scope="scope">
            <el-button
              circle
              type="primary"
              icon="el-icon-edit"
              size="mini"></el-button>
            <el-button
              size="mini"
              circle
              icon="el-icon-delete"
              type="danger"
              @click="onDeleteArticle(scope)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        layout="prev, pager, next"
        background
        class="paging"
        :disabled="isLoading"
        @current-change="currentChange"
        :total="totalCount">
      </el-pagination>
    </el-card>
  </div>
</template>
<script>
import { getArticles, getArticleChannels } from '@/api/article'

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
      totalCount: 0, // 默认总数0，等后端传来的数据总数
      pageCount: 10, // 默认一页显示十条数据
      status: null, // 默认查询状态为空
      channels: [], // 文章频道列表
      channelId: null, // 频道id
      rangeDate: [], // 日期筛选
      isLoading: true
    }
  },
  props: {},
  components: {},
  methods: {
    loadArticles (page = 1) {
      this.isLoading = true
      getArticles({
        page,
        per_page: this.pageCount,
        status: this.status,
        channel_id: this.channelId,
        begin_pubdate: this.rangeDate ? this.rangeDate[0] : null,
        end_pubdate: this.rangeDate ? this.rangeDate[1] : null
      }).then(res => {
        // console.log(res)
        this.totalCount = res.data.data.total_count
        this.articles = res.data.data.results
        this.isLoading = false
      })
    },
    // 分页按钮，调用loadArticle方法请求数据，转入page页数
    currentChange (page) {
      this.loadArticles(page)
    },
    loadChannels () {
      getArticleChannels().then(res => {
        // console.log(res)
        this.channels = res.data.data.channels
      })
    },
    // 删除文章事件
    onDeleteArticle (articleId) {
      this.$confirm('你不会真的要删除吧', '删除提示', {
        confirmButtonText: '真的',
        cancelButtonText: '假的',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!',
          duration: 2000
        })
        // 删除文章请求
        // deleteArticle(articleId).then(res => {
        //   console.log(res)
        // })

        // 删除 data 里面的数据
        this.articles.splice(articleId.$index, 1)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
          duration: 2000
        })
      })
    }
  },
  created () {
    this.loadArticles()
    this.loadChannels()
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
