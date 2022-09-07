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
          @click="isDialogUploadVisible = true">上传素材</el-button>
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
      <upload-file
      :dialogUploadVisible="isDialogUploadVisible"
      @closepop="closeDialog"/>
    </div>
</template>

<script>
import { getImages, collectImage, deleteImage } from '@/api/image'
import UploadFile from './UploadFile.vue'

export default {
  name: 'ImageList',
  data () {
    return {
      collect: false,
      imagesList: [], // 图片素材列表数据
      totalCount: 0, // 总图片数量
      pageSize: 10, // 每页10条数据(写死)
      isDialogUploadVisible: false,
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
  components: {
    UploadFile
  },
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
    // 页面变化按钮
    onPageChange (page) {
      this.loadImages(page)
    },
    // 关闭对话框
    closeDialog () {
      this.isDialogUploadVisible = false
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
