<template>
    <el-container class="layout-container">
      <el-aside class="aside" width="200px">
        <layout-aside class="aside-menu"/>
      </el-aside>
      <el-container>
        <el-header class="header">
          <div class="headder-title">
            <i class="el-icon-s-fold"></i>
            黄琳科技有限公司
          </div>
          <div class="header-info">
            <img class="header-user-img" :src="user.photo">
            <el-dropdown>
            <!-- <img class="header-user-img" src="@/assets/img/user.jpg" alt=""> -->
              <span class="el-dropdown-link">
                {{user.intro}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人设置</el-dropdown-item>
                <el-dropdown-item>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>
        <el-main class="main">
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
</template>

<script>
import LayoutAside from './components/LayoutAside'
import { getUserProfile } from '@/api/user'
export default {
  name: 'LayoutIndex',
  components: {
    LayoutAside
  },
  props: {},
  data () {
    return {
      user: {}
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadUserProfile()
  },
  mounted () {
  },
  methods: {
    loadUserProfile () {
      getUserProfile().then(res => {
        this.user = res.data.data
      })
    }
  }
}
</script>

<style lang="less" scoped>
.layout-container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  .aside {
    .aside-menu{
      height: 100%;
    }
  }
  .header {
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .headder-title{
      font-size: 18px;
    }
    .header-info{
      display: flex;
      align-items: center;
      .header-user-img{
        width: 25px;
        height: 25px;
        border-radius: 50%;
        margin-right: 5px;
      }
    }
  }
  .main{
    background-color: lightblue;
  }
}
</style>
