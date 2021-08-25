<template>
    <div class="iamge-list">
      <div>
        <div class="action-head">
          <el-radio-group
          @change= "loadImages()"
          v-model="collect">
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
          </el-radio-group>
          <el-button
          v-if="isShowAddBtn"
          type="success"
          @click="dialogUploadVisible = true">上传素材</el-button>
        </div>
        <!-- 素材列表 -->
        <el-row :gutter="10">
          <el-col
          v-for="(item, index) in imagesList"
          :key="index"
          :xs="12" :sm="6" :lg="4"
          @click.native="selected = index"
          class="image-item">
            <el-image
            style="height: 100px"
            :src="item.url"
            fit="cover">
            </el-image>
            <div class="selected" v-if="isShowSelected && selected === index"></div>
            <!-- 小圆点 -->
            <div v-if="isShowActive" class="image-action">
              <i :class="item.is_collected ? 'el-icon-star-on' : 'el-icon-star-off'"
              @click="onCollect(item)"
              ></i>
              <i
              class="el-icon-delete"
              @click="onDelete(item.id)"></i>
            </div>
          </el-col>
        </el-row>
        <!-- 分页 -->
        <el-pagination
          background
          layout="prev, pager, next"
          :total="totalCount"
          :page-size="pageSize"
          @current-change="onPageChange">
        </el-pagination>
      </div>
      <!-- 上传素材弹出框 -->
      <el-dialog
        title="上传素材"
        :visible.sync="dialogUploadVisible"
        :append-to-body="true">
        <!--
          upload组件本身就支持请求提交上传操作，
          使用它就不用自己去发请求，它会自己发送请求
          请求方法：默认是POST
          请求路径：action，必须写完整路径
          请求头：headers
        -->
        <el-upload
          class="upload-demo"
          drag
          action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
          :headers="uploadHeaders"
          name="image"
          multiple
          :show-file-list="false"
          :on-success="onUploadSuccess">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-dialog>
    </div>
</template>

<script>
import { getImages, collectImage, deleteImage } from '@/api/image'
const user = JSON.parse(window.localStorage.getItem('user'))
export default {
  name: 'ImageList',
  data () {
    return {
      collect: false,
      imagesList: [], // 图片素材列表数据
      totalCount: 0, // 总图片数量
      pageSize: 10, // 每页10条数据(写死)
      dialogUploadVisible: false,
      uploadHeaders: {
        Authorization: `Bearer ${user.token}`
      },
      selected: null
    }
  },
  props: {
    isShowAddBtn: {
      type: Boolean,
      default: true
    },
    isShowActive: {
      type: Boolean,
      default: true
    },
    isShowSelected: {
      type: Boolean,
      default: false
    }
  },
  created () {
    // 初始化加载第一页数据
    this.loadImages()
  },
  components: {},
  methods: {
    loadImages (page = 1) {
      getImages({
        collect: this.collect,
        page,
        per_page: this.pageSize
      }).then(res => {
        this.imagesList = res.data.data.results
        this.totalCount = res.data.data.total_count
      })
    },
    // 全部和收藏切换的方法
    // onChangeRadrio () {
    //   this.loadImages()
    // },
    // 上传功能回调的方法
    onUploadSuccess () {
      // 关闭弹出框
      this.dialogUploadVisible = false
      // 更新素材列表内容.
      this.loadImages()
    },
    // 页面变化按钮
    onPageChange (page) {
      this.loadImages(page)
    },
    // 点击收藏按钮方法
    onCollect (value) {
      // 如果已收藏，则取消收藏
      // 如果没有收藏，则添加收藏
      collectImage(value.id, !value.is_collected).then(res => {
        value.is_collected = !value.is_collected
      })
    },
    // 删除素材的方法
    onDelete (imageId) {
      console.log(imageId)
      deleteImage(imageId).then(res => {
        this.loadImages()
      })
    }
  }
}
</script>

<style lang="less" scoped>
.action-head{
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
}
.image-item{
  position: relative;
  .image-action{
    display: flex;
    justify-content: space-evenly;
    font-size: 22px;
    color: rgb(26, 25, 25);
    position: absolute;
    background-color: rgba(204, 204, 204, .4);
    left: 5px;
    right: 15px;
    bottom: 0;
    i{
      cursor:pointer;
    }
  }
}
.selected{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  opacity: .5;
  justify-content: center;
  align-items: center;
  background-image: url('./selected.jpeg');
  background-size: 100% 100%;
}
</style>
