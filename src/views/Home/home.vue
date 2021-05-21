<template>
<div id="home">
  <nav-bar id="home_navbar"><div slot="center">购物车</div></nav-bar>
  <swiper :banners="banners"/>
  <recommend :recommend="recommend"/>
</div>
</template>

<script>
import navBar from 'components/common/navbar/navbar'
import swiper from './childComponents/home_swiper'
import recommend from '@/views/Home/childComponents/home_recommend'
import {getHomeMultidata} from '@/router/home'

export default {
  name: "home",
  data(){
    return {
      banners: [],
      recommend: []
    }
  },
  components:{
    navBar,
    swiper,
    recommend
  },
  created() {
    getHomeMultidata().then(res => {
      this.banners = res.data.banner.list
      this.recommend = res.data.recommend.list
    })
  }
}
</script>

<style scoped>
#home_navbar{
  background-color: #ff8198;
  text-align: center;
  color: white;
}
</style>