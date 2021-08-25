<template>
    <div class="uplaod-cover-container">
      <div class="cover-wrap" @click="showCoverSelect">
        <img ref="cover-img" class="cover-img" :src="value">
      </div>
      <el-dialog
        title="选择封面"
        append-to-body
        :visible.sync="dialogVisible"
        width="70%">
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="素材库" name="first">
            <image-list
            ref="image-list"
            :isShowAddBtn="false"
            :isShowActive="false"
            :isShowSelected="true"/>
          </el-tab-pane>
          <el-tab-pane label="本地上传" name="localUpload">
            <input ref="file" type="file" @change="onFileChange"><br/>
            <img ref="preview-img" width="140">
          </el-tab-pane>
        </el-tabs>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="onCoverConfirm">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
import { uploadImg } from '@/api/image'
import ImageList from '@/components/ImageList'
export default {
  name: 'UploadCover',
  components: {
    ImageList
  },
  props: ['value'],
  data () {
    return {
      dialogVisible: false,
      activeName: 'first'
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    showCoverSelect () {
      this.dialogVisible = true
    },
    onFileChange () {
      // 获取文件对象
      const file = this.$refs.file.files[0]
      // 图片预览
      const blob = window.URL.createObjectURL(file)
      this.$refs['preview-img'].src = blob
    },
    onCoverConfirm () {
      // 如果是本地上传，并且input-file有选择文件，才执行上传图片操作
      if (this.activeName === 'localUpload') {
        const file = this.$refs.file.files[0]
        if (!file) {
          this.$message('请选择文件')
          return
        }
        const fd = new FormData()
        fd.append('image', file)
        uploadImg(fd).then(res => {
          // 关闭弹出框
          this.dialogVisible = false
          // 展示上传的图片
          this.$refs['cover-img'].src = res.data.data.url
          // 将图片地址发送给父组件
          this.$emit('input', res.data.data.url)
        })
      } else if (this.activeName === 'first') {
        const imageList = this.$refs['image-list']
        const selected = imageList.selected
        // 判断是否已选择图片
        if (selected === null) {
          this.$message('请选择封面图片')
          return
        }
        // 关闭弹出框
        this.dialogVisible = false
        // 修改父组件绑定数据
        this.$emit('input', imageList.imagesList[selected].url)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.cover-wrap{
  width: 120px;
  height: 100px;
  border: 1px dashed #999;
  .cover-img{
    width: 120px;
    height: 100px;
  }
}
</style>
