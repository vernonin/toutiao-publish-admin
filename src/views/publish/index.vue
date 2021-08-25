<template>
  <div class="publish-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{$route.query.id ? '修改文章' : '发布文章'}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form
      :model="article"
      :rules="formRules"
      ref="publish-form"
      label-width="50px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <!-- <el-input type="textarea" v-model="article.content"></el-input> -->
          <el-tiptap
          lang="zh"
          v-model="article.content"
          :extensions="extensions"/>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="article.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <!--
            需要把选择的封面图片的地址放到artice.cover.images中
           -->
          <template v-if="article.cover.type > 0">
            <upload-cover
            v-for="(cover, index) in article.cover.type"
            :key="index"
            v-model="article.cover.images[index]"/>
          </template>
        </el-form-item>
        <el-form-item label="频道" prop="channel_id">
          <el-select v-model="article.channel_id" placeholder="请选择频道">
            <el-option
            :label="item.name"
            v-for="(item, index) in channels"
            :key="index"
            :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onPublish(false)">发表</el-button>
          <el-button @click="onPublish(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { getArticleChannels, addArticle, getArticle, updateArticle } from '@/api/article'
// 引入富文本插件
import 'element-tiptap/lib/index.css'
import {
  ElementTiptap,
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Image,
  Underline,
  Italic,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  Preview,
  Fullscreen
} from 'element-tiptap'

import { uploadImg } from '@/api/image'
import UploadCover from './components/UploadCover'

export default {
  name: 'LayoutPublish',
  data () {
    return {
      article: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: { // 文章封面
          type: 0,
          images: []
        },
        channel_id: null
      },
      channels: [],
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 5 }),
        new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
        new Image({
          // 默认会把图片生成base64字符串，如果需要自定义图片：
          uploadRequest (file) {
            const fd = new FormData()
            fd.append('image', file)
            return uploadImg(fd).then(res => {
              return res.data.data.url
            })
          }
        }),
        new Underline({ bubble: true, menubar: false }), // 在气泡菜单而不在菜单栏中渲染菜单按钮
        new Italic(),
        new Strike(),
        new ListItem(),
        new BulletList(),
        new OrderedList(),
        new Preview(),
        new Fullscreen()
      ],
      formRules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 5, max: 30, message: '标题字数为 5 到 30', trigger: 'blur' }
        ],
        content: [
          // { required: true, message: '请输入文章内容', trigger: 'change' }
          {
            validator (rule, value, callback) {
              if (value === '<p></p>' || value === '') {
                callback(new Error('请输入文章内容'))
              } else {
                callback()
              }
            }
          }
        ],
        channel_id: [
          { required: true, message: '请选择文章频道' }
        ]
      }
    }
  },
  props: {},
  created () {
    this.loadChannels()
    // 当当前路有对象有参数id(点编辑按钮跳转过来)时
    if (this.$route.query.id) {
      this.loadArticle()
    }
  },
  components: {
    // 注册副本吧组件
    'el-tiptap': ElementTiptap,
    UploadCover
  },
  methods: {
    // 获取频道方法
    loadChannels () {
      getArticleChannels().then(res => {
        this.channels = res.data.data.channels
      })
    },
    // 发布文章方法
    onPublish (draft) {
      // 校验表单
      this.$refs['publish-form'].validate(valid => {
        if (!valid) {
          return
        }
        if (this.$route.query.id) {
          updateArticle(this.$route.query.id, this.article, draft).then(res => {
            // console.log(res)
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            // 修改成功，跳转到内容管理页面
            this.$router.push('/article')
          })
        } else {
          addArticle(this.article, draft).then(res => {
            // console.log(res)
            this.$message({
              message: `${draft ? '存入草稿' : '发布'}成功`,
              type: 'success'
            })
            // 发布成功，跳转到内容管理页面
            this.$router.push('/article')
          })
        }
      })
    },
    // 修复文章方法
    loadArticle () {
      getArticle(this.$route.query.id).then(res => {
        // console.log(res)
        this.article = res.data.data
      })
    },
    // 监听子组件发送的自定义事件(上传封面图片)
    onUpdataCover (index, url) {
      this.article.cover.images[index] = url
    }
  }
}
</script>
<style lang="less" scoped>

</style>
