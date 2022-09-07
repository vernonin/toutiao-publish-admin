<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>vue2实现前端分页</span>
    </div>
    <el-table
        :data="pageData"
        border
        size="mini"
        style="width: 100%">
        <el-table-column prop="name" label="姓名" width="120" align="center" />
        <el-table-column prop="age" label="年龄" width="80" align="center" />
        <el-table-column prop="describe" label="描述" align="center" />
      </el-table>

      <el-pagination
        style="margin-top: 12px;text-align: right;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotal">
      </el-pagination>
  </el-card>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      // 总的数据
      tableData: [],
      // 分页的数据
      pageData: [],
      // 当前页 默认是第一页
      pageTotal: 0,
      // 每页大小 默认每页10条数据
      currentPage: 1,
      // 总数据量 默认为 0
      pageSize: 10
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    handleSizeChange (val) {
      this.pageSize = val

      this.pageData = this.queryByPage()
    },
    handleCurrentChange (val) {
      this.currentPage = val

      this.pageData = this.queryByPage()
    },
    // 获取全部数据
    async fetchData () {
      const { data } = await axios.get('/table_data.json')

      this.tableData = data.data
      this.pageTotal = data.data.length

      this.pageData = this.queryByPage()
    },
    // 实现分页的方法
    queryByPage () {
      // 起始位置 = (当前页 - 1) x 每页的大小
      const start = (this.currentPage - 1) * this.pageSize
      // 结束位置 = 当前页 x 每页的大小
      const end = this.currentPage * this.pageSize

      return this.tableData.slice(start, end)
    }
  }
}
</script>

<style>

</style>
