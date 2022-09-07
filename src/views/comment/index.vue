<template>
    <div class="home-container">
     <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>评论管理</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <!-- 表格列表 -->
        <el-table
          v-loading="isLoading"
          :data="articlesData"
          border
          style="width: 100%">
          <el-table-column prop="title" label="标题" align="center" />
          <el-table-column prop="total_comment_count" label="总评论数" width="180" align="center" />
          <el-table-column prop="fans_comment_count" label="粉丝评论数" width="180" align="center" />
          <el-table-column prop="comment_status" label="状态" width="100" align="center">
            <template slot-scope="scope">
              <el-tag :type="scope.row.comment_status ? 'success' : 'warning'">{{scope.row.comment_status ? '正常' : '关闭'}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120" align="center">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.comment_status"
                @change="onStatusChange(scope.row)"
                :disabled="scope.row.statusDisabled"
                active-color="#13ce66"
                inactive-color="#ff4949">
              </el-switch>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[10, 20, 50]"
          :page-size.sync="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount"
          style="margin-top: 12px;text-align: right">
        </el-pagination>
      </el-card>
    </div>
</template>

<script>
import { getArticles, changStatus } from '@/api/article'
export default {
  name: 'LayoutComment',
  components: {},
  props: {},
  data () {
    return {
      isLoading: true,
      currentPage: 1,
      totalCount: 0,
      articlesData: [],
      pageSize: 10
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadComment()
  },
  mounted () {},
  methods: {
    handleSizeChange () {
      console.log(this.pageSize)
      this.loadComment()
    },
    // 点击分页数字的方法
    handleCurrentChange (value) {
      console.log(value)
      this.loadComment(value)
    },
    // 请求文章评论的方法
    loadComment (page = 1) {
      // 开始请求，显示加载动画
      this.isLoading = true
      this.currentPage = page
      getArticles({
        response_type: 'comment',
        page,
        per_page: this.pageSize
      }).then(res => {
        const { results } = res.data.data
        results.forEach(article => {
          article.statusDisabled = false
        })
        console.log(results)
        this.articlesData = results
        this.totalCount = res.data.data.total_count
        // 请求成功，关闭加载动画
        this.isLoading = false
      })
    },
    // 开个评论方法
    onStatusChange (article) {
      article.statusDisabled = true
      changStatus(article.id, article.comment_status).then(res => {
        article.statusDisabled = false
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
