<template>
  <div id="home">
    <nav-bar id="home_navbar"><div slot="center" @click="navBarClick">购物街</div></nav-bar>
    <tab-control @clickitem="tabClick"
                 :titles="['新品','综合','推荐']"
                 ref="tabcon1"
                 v-show="isTabFix"
                 class="tabcon"/>
    <scroll class="content"
             ref="scroll"
             @isShow="isShowT"
             @loadmore="loadmore"
             :probe="3"
             :pullUpLoad="true">
      <swiper :banners="banners" @imageload="imageload" ref="swiper"/>
      <recommend :recommend="recommend"/>
      <feature />
      <tab-control @clickitem="tabClick"
                   :titles="['新品','综合','推荐']"
                   ref="tabcon2"/>
      <goods-list :goods="showGoods"/>
    </scroll>
    <!--  监听组件点击是需要加.native-->
    <backtop v-show="showT" @click.native="backClick"/>
  </div>
</template>

<script>
import {getHomeMultidata, getHomegoods} from 'network/home'
import scroll from 'components/common/bscroll/bscroll'
import {debounce} from 'common/utils'
import {cNavBackTop, backTop, tabCon} from 'common/mixin'

import navBar from 'components/common/navbar/navbar'
import swiper from './childComponents/home_swiper'

import recommend from './childComponents/home_recommend'
import feature from './childComponents/home_feature'
import tabControl from 'components/common/tabControl/tabControl'
import goodsList from 'components/content/goods/goodsList'

export default {
  name: "home",
  mixins:[cNavBackTop,backTop,tabCon],
  data(){
    return {
      banners: [],
      recommend: [],
      goods:{
        'pop': {page: 0, list:[]},
        'new': {page: 0, list:[]},
        'sell': {page: 0, list:[]}
      },
      scroll: null,
      showT: false,
      tabOffsetTop: 0,
      isTabFix: false,
      showFace: true,
      saveY: 0,
      flag: 0
    }
  },
  components:{
    navBar,
    swiper,
    recommend,
    feature,
    tabControl,
    goodsList,
    scroll
  },
  created() {
    //获取展示数据
    this.getHomeMultidata()

    //获取商品数据
    this.getHomegoods('pop')
    this.getHomegoods('new')
    this.getHomegoods('sell')
  },
  activated() {
    this.$refs.scroll.refresh()
    this.$refs.scroll.scrollTo(0, this.saveY)
    // this.startTimer()
  },
  deactivated() {
    //this.$refs.scroll.bscroll.y监听滚动的位置
    this.saveY = this.$refs.scroll.bscroll.y
    // this.stopTimer()
    this.$bus.$emit('homeZero')
  },
  updated() {
    //单击底部回到顶部
    this.$bus.$on('homeBackTop',()=>{
      this.$refs.scroll.scrollTo(0, 0)
    })
  },
  methods:{
    //监听轮播图一张图片加载完成，为了计算tabContral的高度
    imageload(){
      this.tabOffsetTop = this.$refs.tabcon2.$el.offsetTop
    },
    //滑动到某个位置显示回到顶部按钮，监听滚动
    isShowT(pos){
      this.showT = pos.y < -850;
      this.isTabFix = -pos.y > this.tabOffsetTop
      // console.log(pos.y)
    },
    //上拉加载更多
    loadmore(){
      this.getHomegoods(this.currentType)
    },
    //获取轮播图数据
    getHomeMultidata(){
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list
        this.recommend = res.data.recommend.list
      })
    },
    //获取商品数据
    getHomegoods(type){
      const page = this.goods[type].page + 1
      getHomegoods(type, page).then(res =>{
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        this.$refs.scroll.finishPullUp()  //允许再次上拉加载
      })
    },
    startTimer(){
      if(this.flag !== 0){
        this.$refs.swiper.$refs.swiper.startTimer()
      }
      this.flag++
    },
    stopTimer(){
      this.$refs.swiper.$refs.swiper.stopTimer()
    }
  },
  computed:{
    //给子组件传递goods数据
    showGoods(){
      return this.goods[this.currentType].list
    }
  }
}
</script>

<style scoped>
#home{
  background-color: #f1eeef;
  padding-top: 44px;
  height: 100vh;
  position: relative;
}
#home_navbar{
  font-size: 16px;
  background-color: var(--color-tint);
  text-align: center;
  color: white;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}
.content{
  overflow: hidden;
  /*height: calc(100% - 59px);*/
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.tabcon{
  position: relative;
  top: 0;
  z-index: 9;
}
</style>