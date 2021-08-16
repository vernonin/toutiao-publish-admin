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
          :data="articlesData"
          style="width: 100%">
          <el-table-column
            prop="title"
            label="标题"
            width="240">
          </el-table-column>
          <el-table-column
            prop="total_comment_count"
            label="总评论数"
            width="180">
          </el-table-column>
          <el-table-column
            prop="fans_comment_count"
            label="粉丝评论数"
            width="180">
          </el-table-column>
          <el-table-column
            prop="comment_status"
            label="状态"
            width="120">
            <template slot-scope="scope">
              <el-tag :type="scope.row.comment_status ? 'success' : 'warning'">{{scope.row.comment_status ? '正常' : '异常'}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="操作">
            <el-button size="mini" type="danger">关闭评论</el-button>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount">
        </el-pagination>
      </el-card>
    </div>
</template>

<script>
import { getArticles } from '@/api/article'
export default {
  name: 'LayoutComment',
  components: {},
  props: {},
  data () {
    return {
      currentPage4: 1,
      totalCount: 0,
      articlesData: []
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadComment()
  },
  mounted () {},
  methods: {
    handleSizeChange () {},
    // 点击分页数字的方法
    handleCurrentChange (value) {
      console.log(value)
      this.loadComment(value)
    },
    // 请求文章评论的方法
    loadComment (page) {
      getArticles({
        response_type: 'comment',
        page
      }).then(res => {
        // console.log(res)
        this.articlesData = res.data.data.results
        this.totalCount = res.data.data.total_count
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
