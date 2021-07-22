<template>
    <div class="login-container">
      <!--
        配置 Form 表单验证：
        1. 必须给 el-form 组件绑定 model 为表单数据对象
        2. 给需要验证的表单项 el-form-item 绑定 prop属性
           注意：prop 属性需要制定表单对象中的数据名称
        3. 通过 el-form 组件的 rules 属性配置验证规则

        手动触发表单验证：
        1. 给 el-form 组件设置 ref
        2. 通过 ref 获取 el-form 组件，调用组件的 validate 进行验证
      -->
      <el-form
      class="login-form"
      ref="login-form"
      :rules="fromRules"
      :model="user">
        <h2>头条发布系统</h2>
        <el-form-item prop="mobile">
          <el-input
          v-model="user.mobile"
          placeholder="请输手机号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
          v-model="user.code"
          placeholder="请输入验证码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="isAgree">
          <el-checkbox v-model="user.isAgree">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn" type="primary" :loading="isLogin" @click="onLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>
<script>

import { login } from '@/api/user'

export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '',
        code: '',
        isAgree: false // 是否勾选同意协议
      },
      isLogin: false, // 记录登录状态
      fromRules: { // 表单验证规则匹配
      // 要验证的数据名称：规则列表[]
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'change' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入正确的手机号格式', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'change' },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码格式', trigger: 'blur' }
        ],
        isAgree: [
          {
            // 自定义校验规则
            // 验证通过：callback()
            // 验证失败：callback(new Error('错误信息'))
            validator: (rule, value, callback) => {
              if (value) {
                callback()
              } else {
                callback(new Error('请同意用户协议'))
              }
            },
            trigger: 'change'
          }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  cteated () {},
  mounted () {},
  methods: {
    onLogin () {
      // 表单验证
      this.$refs['login-form'].validate(valid => {
        // 如果表单验证失败，停止请求提交
        if (!valid) {
          return
        }
        // 验证通过，请求登录
        this.login()
      })
    },
    login () { // 请求登录方法
      // 登录isLogin为true
      this.isLogin = true

      login(this.user).then(res => {
        console.log(res)
        this.$message({
          message: '登录成功！',
          type: 'success'
        })
        // 登录成功改变isLogin为false
        this.isLogin = false
        // 跳转到首页
        this.$router.push('/layout')
      }).catch(err => {
        console.log(err)
        this.$message.error('登录失败，手机号或验证码错误！')
        // 登录失败改变isLogin为false
        this.isLogin = false
      })
      // this.$message.error('登录失败！')
    }
  }
}
</script>

<style lang="less" scoped>
.login-container{
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('../../assets/img/loginbg.jpg');
  background-size: cover;
  .login-form{
    background-color: rgba(8, 129, 19, 0.5);
    padding: 20px 50px;
    min-width: 300px;
    h2{
      color: lightblue;
      text-align: center;
      font-family: '微软雅黑';
      font-weight: bolder;
    }
    .login-btn{
      margin-top: 20px;
      width: 100%;
    }
  }
}
</style>
