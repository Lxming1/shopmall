<template>
<div v-if="">
  <detail-navbar @navbarClick="navbarClick" ref="detnav"/>
  <bscroll class="detailContent"
           :probe="3"
           :pullUpLoad="true"
           ref="detailScroll"
           @isShow="isShow">
    <detail-swiper :detailSwiper="swiperImg"/>
    <detail-base-info :Goods="goods"/>
    <detail-comment :commentInfo="commentInfo" :commentCount="commentCount" ref="comment"/>
    <detail-shop-mes :Shop="shop"/>
    <detail-goods-info :detailInfo="detailInfo" @detailLoad="detailLoad" ref="goodsDetail"/>
    <detail-item-params :itemParams="itemParams"/>
    <detail-goods-recommend/>
<!--    <backtop/>-->
  </bscroll>
</div>
</template>

<script>
import bscroll from 'components/common/bscroll/bscroll'
import backtop from '../../components/content/backtop/backtop'
import {getDetailMes, Goods, Shop} from 'network/detail'
import {debounce} from 'common/utils'

import DetailNavbar from './childComponents/detail_navbar'
import DetailSwiper from './childComponents/detail_swiper'
import DetailBaseInfo from './childComponents/detail_baseInfo'
import DetailShopMes from './childComponents/detail_shopMes'
import DetailGoodsInfo from './childComponents/detail_goodsInfo'
import DetailItemParams from './childComponents/detail_itemParams'
import DetailComment from './childComponents/detail_comment'
import DetailGoodsRecommend from './childComponents/detail_goodsInfo'

export default {
  name: "detail",
  components:{
    bscroll,
    backtop,
    DetailNavbar,
    DetailSwiper,
    DetailBaseInfo,
    DetailComment,
    DetailShopMes,
    DetailGoodsInfo,
    DetailItemParams,
    DetailGoodsRecommend
  },
  data(){
    return {
      iid: null,    //该页面的id
      swiperImg: [],    //轮播图信息
      goods: {},    //最上面的基本信息
      shop: {},    //商家信息
      detailInfo: {},   //详情
      itemParams: {},   //参数
      commentInfo: {},    //评论
      goodsRecommend: {},   //推荐
      commentCount: 0,
      mesHeight: 0,
      commentHeight: 0,
    }
  },
  created() {
    //保存每个不同信息的信息
    this.iid = this.$route.params.id
    getDetailMes(this.iid).then(res => {
      //请求基础信息数据
      this.goods = new Goods(res.result)
      //请求轮播图图片
      this.swiperImg = this.goods.swiperImg
      //请求商家数据
      this.shop = new Shop(res.result)
      //请求详情数据
      this.detailInfo = res.result.detailInfo
      //请求参数信息
      this.itemParams = res.result.itemParams
      //请求评论信息
      this.commentCount = res.result.rate.cRate
      if(res.result.rate.list !== undefined){
        this.commentInfo = res.result.rate.list[0]
      }else {
        this.commentInfo = {}
      }
      console.log(this.commentInfo)
    })
  },
  mounted() {
    this.$bus.$on('swiperLoad', ()=>{
      if(this.$refs.goodsDetail !== undefined){
        this.mesHeight = this.$refs.goodsDetail.$el.offsetTop
        this.commentHeight = this.$refs.comment.$el.offsetTop
      }
    })
  },
  methods:{
    navbarClick(index){
      switch (index) {
        case 0:
          this.$refs.detailScroll.scrollTo(0, 0, 100)
          break
        case 1:
          this.$refs.detailScroll.scrollTo(0, -this.commentHeight, 100)
          break
        case 2:
          this.$refs.detailScroll.scrollTo(0, -this.mesHeight, 100)
          break
        case 3:
      }
    },
    isShow(pos){
      if(-pos.y < this.commentHeight){
        this.$refs.detnav.currentIndex = 0
      }else if(-pos.y >= this.commentHeight && -pos.y < this.mesHeight){
        this.$refs.detnav.currentIndex = 1
      }else if(-pos.y >= this.mesHeight){
        this.$refs.detnav.currentIndex = 2
      }
    },
    detailLoad(){
      const refresh = debounce(this.$refs.detailScroll.refresh, 100)
      refresh()
    }
  }
}
</script>

<style scoped>
.detailContent{
  overflow: hidden;
  /*height: calc(100% - 59px);*/
  position: absolute;
  top: 44px;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>