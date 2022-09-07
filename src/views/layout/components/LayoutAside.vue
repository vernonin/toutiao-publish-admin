<template>
    <el-menu
      :default-active="$route.path"
      background-color="#303030"
      text-color="#AAAAAA"
      active-text-color="#FFD700"
      :collapse="isCollapse"
      router>
      <el-menu-item :index="route.path" :key="route.path" v-for="route in layoutRoutes">
        <i :class="route.meta.icon"></i>
        <span slot="title">{{route.meta.title}}</span>
      </el-menu-item>
    </el-menu>
</template>

<script>
import { routes } from '../../../router/'
export default {
  name: 'LayoutAside',
  props: ['is-collapse'],
  data () {
    return {
      layoutRoutes: []
    }
  },
  created () {
    routes.forEach(route => {
      if (route.path === '/') {
        this.layoutRoutes = route.children
      }
    })
  }
}
</script>

<style lang="less" scoped>

</style>
