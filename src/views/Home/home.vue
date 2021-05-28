<template>
<div id="home">
  <nav-bar id="home_navbar"><div slot="center">购物街</div></nav-bar>
  <tab-control @homeclick="hclick"
               ref="tabcon1"
               v-show="isTabFix"
               class="tabcon"/>
  <bscroll class="content"
           ref="scroll"
           @isShow="isShowT"
           @loadmore="loadmore"
           :probe="3"
           :pullUpLoad="true">
    <swiper :banners="banners" @imageload="imageload"/>
    <recommend :recommend="recommend"/>
    <feature />
    <tab-control @homeclick="hclick"
                 ref="tabcon2"/>
    <goods-list :goods="showGoods"/>
  </bscroll>
      <!--  监听组件点击是需要加.native-->
  <backtop v-show="showT" @click.native="backtopClick"/>
</div>
</template>

<script>
import {getHomeMultidata, getHomegoods} from 'network/home'
import bscroll from 'components/common/bscroll/bscroll'
import {debounce} from 'common/utils'

import navBar from 'components/common/navbar/navbar'
import swiper from './childComponents/home_swiper'

import recommend from './childComponents/home_recommend'
import feature from './childComponents/home_feature'
import tabControl from './childComponents/home_tabcontrol'
import goodsList from '../../components/content/goods/goodsList'
import backtop from '../../components/content/backtop/backtop'
import {states} from '../../store'

export default {
  name: "home",
  data(){
    return {
      banners: [],
      recommend: [],
      goods:{
        'pop': {page: 0, list:[]},
        'new': {page: 0, list:[]},
        'sell': {page: 0, list:[]}
      },
      currentType:'pop',
      scroll: null,
      showT: false,
      tabOffsetTop: 0,
      isTabFix: false,
      showFace: true,
      saveY: 0
    }
  },
  components:{
    navBar,
    swiper,
    recommend,
    feature,
    tabControl,
    goodsList,
    bscroll,
    backtop
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
    this.$refs.scroll.scrollTo(0, this.saveY)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    //this.$refs.scroll.bscroll.y监听滚动的位置
    this.saveY = this.$refs.scroll.bscroll.y
  },
  mounted(){
    const refresh = debounce(this.$refs.scroll.refresh, 10)
    //修复上拉偶尔卡住的bug
    this.$bus.$on('imageload',()=>{
      refresh()
    })
  },
  methods:{
    //监听轮播图一张图片加载完成，为了计算tabContral的高度
    imageload(){
      this.tabOffsetTop += this.$refs.tabcon2.$el.offsetTop
    },
    //点击tabContral时监听点了哪个并赋值对应的type
    hclick(index){
      switch (index){
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabcon1.$refs.tabcon.isIndex = index
      this.$refs.tabcon2.$refs.tabcon.isIndex = index
      if(-this.$refs.scroll.bscroll.y >= this.tabOffsetTop){
        this.$refs.scroll.scrollTo(0,-this.$refs.tabcon2.$el.offsetTop,150)
      }
    },
    //点击回到顶部
    backtopClick(){
      this.$refs.scroll.scrollTo(0, 0, 200)
    },

    //滑动到某个位置显示回到顶部按钮，监听滚动
    isShowT(pos){
      this.showT = pos.y < -850;
      this.isTabFix = -pos.y > this.tabOffsetTop
    },

    //上拉加载更多
    loadmore(){
      this.getHomegoods(this.currentType)
    },

    getHomeMultidata(){
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list
        this.recommend = res.data.recommend.list
      })
    },
    getHomegoods(type){
      const page = this.goods[type].page + 1
      getHomegoods(type, page).then(res =>{
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        this.$refs.scroll.finishPullUp()  //允许再次上拉加载
      })
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
  padding-top: 44px;
  height: 100vh;
  position: relative;
}
#home_navbar{
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