<template>
<div class="tabbar">
  <tab-bar>
    <tab-bar-item path="/Home" activeColor="red" @click.native="homeBack">
      <img slot="picture" src="~assets/img/tabbar/home.svg" alt="">
      <img slot="picture_active" src="~assets/img/tabbar/home_active.svg" alt="">
      <div slot="text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/Category" activeColor="red" @click.native="categoryBack">
      <img slot="picture" src="~assets/img/tabbar/category.svg" alt="">
      <img slot="picture_active" src="~assets/img/tabbar/category_active.svg" alt="">
      <div slot="text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/Cart" activeColor="red" @click.native="shopCartBack">
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
import tabBar from 'components/common/tabbar/tabbar'
import tabBarItem from 'components/common/tabbar/tabbaritem'
export default {
  name: "mainTabbar",
  components:{
    tabBar,
    tabBarItem
  },
  data(){
    return{
      homeFlag: false,
      start: true,
      shopCartFlag: false,
      categoryFlag: false
    }
  },
  mounted() {
    this.$bus.$on('homeZero',()=>{
      this.homeFlag = false
    })
    this.$bus.$on('shopCartZero',()=>{
      this.shopCartFlag = false
    })
    this.$bus.$on('categoryZero',()=>{
      this.categoryFlag = false
    })
  },
  methods:{
    homeBack(){
      if(this.homeFlag || this.start){
        this.$bus.$emit('homeBackTop')
        this.start = false
      }
      this.homeFlag = true
    },
    shopCartBack(){
      if(this.shopCartFlag){
        this.$bus.$emit('shopCartBackTop')
      }
      this.shopCartFlag = true
    },
    categoryBack(){
      if(this.categoryFlag){
        this.$bus.$emit('categoryBackTop')
      }
      this.categoryFlag = true
    }
  }
}
</script>

<style scoped>
.tabbar{
  z-index: 9;
}
div{
  font-size: 13px;
}
</style>
