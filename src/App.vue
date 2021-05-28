<template>
  <div id="app">
    <keep-alive exclude="detail">
      <router-view/>
    </keep-alive>
    <maintabbar v-show="$route.path.indexOf('/detail') === -1"/>
  </div>
</template>

<script>
import maintabbar from '@/components/content/mainTabbar/mainTabbar'
export default {
  name: 'App',
  components:{
    maintabbar
  }
}
</script>

<style>
@import "assets/css/base.css";
</style>
