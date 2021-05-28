<template>
<div class="tabbar">
  <tab-bar>
    <tab-bar-item path="/Home" activeColor="red" @click="homeclick">
      <img slot="picture" src="~assets/img/tabbar/home.svg" alt="">
      <img slot="picture_active" src="~assets/img/tabbar/home_active.svg" alt="">
      <div slot="text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/Category" activeColor="red">
      <img slot="picture" src="~assets/img/tabbar/category.svg" alt="">
      <img slot="picture_active" src="~assets/img/tabbar/category_active.svg" alt="">
      <div slot="text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/Cart" activeColor="red">
      <img slot="picture" src="~assets/img/tabbar/cart.svg" alt="">
      <img slot="picture_active" src="~assets/img/tabbar/cart_active.svg" alt="">
      <div slot="text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/Profile" activeColor="red">
      <img slot="picture" src="~assets/img/tabbar/profile.svg" alt="">
      <img slot="picture_active" src="~assets/img/tabbar/profile_active.svg" alt="">
      <div slot="text">我的</div>
    </tab-bar-item>
  </tab-bar>
</div>
</template>

<script>
import tabBar from '../../common/tabbar/tabbar'
import tabBarItem from '../../common/tabbar/tabbaritem'
export default {
  name: "mainTabbar",
  components:{
    tabBar,
    tabBarItem
  },
  methods:{
    homeclick(){
      this.$bus.$emit('homeclick')
    }
  }
}
</script>

<style scoped>
.tabbar{
  z-index: 9
}
</style>
