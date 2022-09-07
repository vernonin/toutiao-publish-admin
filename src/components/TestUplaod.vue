<template>
  <el-dialog
    title="上传文件"
    :visible.sync="dialogVisible"
    append-to-body
    width="50%"
    :before-close="handleClose">
    <div class="radio">
      <el-radio v-model="radio1" label="1" border>阿里云</el-radio>
      <el-radio v-model="radio1" label="2" border>腾讯云</el-radio>
      <el-radio v-model="radio1" label="3" border>华为云</el-radio>
    </div>
    <el-upload
      class="upload"
      drag
      action="https://jsonplaceholder.typicode.com/posts/"
      :http-request="httpRequest"
      multiple>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
// var ObsClient = require('esdk-obs-nodejs')

export default {
  name: 'TestUpload',
  data () {
    return {
      dialogVisible: false,
      radio1: '1'
    }
  },
  methods: {
    handleClose (done) {
      // done()
    }
    // httpRequest (options) {
    //   console.log(options)
    //   console.log(options.file)
    //   const file = options.file
    //   var obsClient = new ObsClient({
    //     access_key_id: 'WOBHEDNAYVQ8JTMZFWUV',
    //     secret_access_key: 'DJSFP0sPyQL6BE612OOma0437JEuOVfIQDirFHMm',
    //     server: 'https://obs.cn-south-1.myhuaweicloud.com'
    //   })
    //   obsClient.putObject({
    //     Bucket: 'hltest',
    //     Key: file.name,
    //     SourceFile: file
    //   }, function (err, result) {
    //     if (err) {
    //       console.error('Error-->' + err)
    //     } else {
    //       console.log(result.InterfaceResult.Content)
    //       console.log(result)
    //       console.log('Status-->' + result.CommonMsg.Status)
    //       obsClient.getObject({
    //         Bucket: 'hltest',
    //         Key: file.name
    //       }, function (err, result) {
    //         if (!err) {
    //           if (result.CommonMsg.Status < 300) {
    //             // 获取RequestId
    //             console.log('RequestId-->' + result.InterfaceResult.RequestId)
    //             // 获取其他参数
    //             console.log('Content-->' + result.InterfaceResult.Content)
    //             console.log(result)
    //           } else {
    //             // 获取Code和Message
    //             console.log('Code-->' + result.CommonMsg.Code)
    //             console.log('Message-->' + result.CommonMsg.Message)
    //           }
    //         }
    //       })
    //     }
    //   })
    // }
  }
}
</script>

<style>
.radio{
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
</style>
