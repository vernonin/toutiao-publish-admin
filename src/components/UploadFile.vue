<template>
  <el-dialog
    title="上传素材"
    :visible.sync="dialogUploadVisible"
    :before-close="handleClose"
    :append-to-body="true">
    <!--
      upload组件本身就支持请求提交上传操作，
      使用它就不用自己去发请求，它会自己发送请求
      请求方法：默认是POST
      请求路径：action，必须写完整路径
      请求头：headers
    -->
    <el-upload
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
</template>

<script>
const user = JSON.parse(window.localStorage.getItem('user'))
export default {
  name: 'UploadFile',
  data () {
    return {
      uploadHeaders: {
        Authorization: `Bearer ${user.token}`
      }
    }
  },
  props: {
    dialogUploadVisible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // 上传功能回调的方法
    onUploadSuccess () {
      // 关闭弹出框
      this.$emit('closepop')
      // 更新素材列表内容.
      this.loadImages()
    },
    handleClose () {
      this.$emit('closepop')
    }
  }
}
</script>

<style>

</style>
