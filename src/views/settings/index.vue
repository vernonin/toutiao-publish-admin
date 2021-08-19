<template>
    <div class="home-container">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>个人设置</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <el-row v-loading="isUserLoading">
          <el-col :span="14">
            <el-form ref="form" :model="user" label-width="90px">
              <el-form-item label="编号:">
                {{user.id}}
              </el-form-item>
              <el-form-item label="手机:">
                {{user.mobile}}
              </el-form-item>
              <el-form-item label="媒体名称:">
                <el-input v-model="user.name"></el-input>
              </el-form-item>
              <el-form-item label="媒体介绍:">
                <el-input type="textarea" v-model="user.intro"></el-input>
              </el-form-item>
              <el-form-item label="邮箱:">
                <el-input v-model="user.email"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onUpdataUser">保存设置</el-button>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col style="text-align: center" :offset="2" :span="6">
            <el-avatar v-loading="isPhotoLoading" shape="square" :size="150" :src="user.photo"></el-avatar>
            <p style="cursor: pointer" @click="$refs.file.click()">点击修改头像</p>
            <input type="file" ref="file" hidden @change="onFileChange">
          </el-col>
        </el-row>
      </el-card>
      <!-- 弹出裁剪图片框 -->
      <el-dialog
        title="修改图片"
        :visible.sync="dialogVisible"
        append-to-body
        @opened="onDialogOpened"
        @closed="onDialogClosed"
        width="30%">
        <div class="preview-img-wrap">
          <img class="preview-img"
            ref="preview-img"
            :src="previewImg">
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary"
          @click="onUpdataPhoto">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
// 引入图片剪切库
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'

import { getUserProfile, updataUserPhoto, updataUser } from '@/api/user'
export default {
  name: 'LayoutSettings',
  components: {},
  props: {},
  data () {
    return {
      user: {
        id: 0,
        mobile: 0,
        name: '',
        intro: '',
        email: 0,
        photo: ''
      },
      dialogVisible: false,
      previewImg: '',
      cropper: null, // 裁切器实例
      isPhotoLoading: false,
      isUserLoading: false
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadUser()
  },
  mounted () {},
  methods: {
    loadUser () {
      getUserProfile().then(res => {
        this.user = res.data.data
      })
    },
    onFileChange () {
      // 处于图片预览
      const file = this.$refs.file
      const blobData = window.URL.createObjectURL(file.files[0])
      this.previewImg = blobData
      // 展示弹出层，预览用户选择图片
      this.dialogVisible = true

      // 解决选择相同文件不触发 chang事件问题
      this.$refs.file.value = ''
    },
    // 对话框完打开动画结束时的回调
    onDialogOpened () {
      /**
       * 图片裁剪器必须基于 img 进行初始化
       * 注意：img必须是可见状态才能正常完成初始化
       *      因为我们这里要在对话框里面初始化裁剪器
       * 所以务必要在对话框完全打开的状态去进行初始化
       */
      // 获取图片(img) dom节点
      const image = this.$refs['preview-img']
      /**
       * 第1次初始化好以后，如果预览裁切的图片发送了变化，裁切器默认不回更新图片
       * 如果需要预览图片发生变化更新裁切器：
       *  方法一：裁切器.replace 方法
       *  方法二：裁剪完成后，销毁裁切器，重新初始化
       */
      // 裁切器初始化
      this.cropper = new Cropper(image, {
        aspectRatio: 1,
        crop (event) {
          // console.log(event.detail.x)
          // console.log(event.detail.y)
          // console.log(event.detail.width)
          // console.log(event.detail.height)
          // console.log(event.detail.rotate)
          // console.log(event.detail.scaleX)
          // console.log(event.detail.scaleY)
        }
      })
    },
    // 对话框关闭动画结束时的回调
    onDialogClosed () {
      // 对话框关闭，销毁裁切器
      this.cropper.destroy()
    },
    // 对话框确认按钮方法
    onUpdataPhoto () {
      // 打开加载动画效果
      this.isPhotoLoading = true
      // 获取裁切图片对象
      this.cropper.getCroppedCanvas().toBlob(file => {
        const fd = new FormData()
        fd.append('photo', file)
        console.log(fd)
        // 请求提交 fd
        updataUserPhoto(fd).then(res => {
          console.log(res)
          // 关闭对话框
          this.dialogVisible = false
          // 关闭加载动画效果
          this.isPhotoLoading = false
          // 显示更新头像成功提示消息
          this.$message({
            message: '恭喜你，更新头像成功',
            type: 'success'
          })
          // 更新视图(页面)展示
          this.loadUser()
        })
      })
    },
    // 更新用户信息分发
    onUpdataUser () {
      this.isUserLoading = true
      const { name, intro, email } = this.user
      updataUser({ name, intro, email }).then(res => {
        this.loadUser()
        this.isUserLoading = false
        this.$message({
          message: '恭喜你，修改个人信息成功',
          type: 'success'
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.preview-img-wrap{
  .preview-img{
    display: block;
    /* This rule is very important, please don't ignore this */
    max-width: 100%;
  }
}
</style>
