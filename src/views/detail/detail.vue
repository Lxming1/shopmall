<template>
  <div id="detail">
    <detail-navbar @navbarClick="navbarClick" ref="detnav"/>
    <bscroll class="detailContent"
             :probe="3"
             ref="scroll"
             @isShow="isShow">
      <detail-swiper :detailSwiper="swiperImg" @bigImg="bigImg"/>
      <detail-base-info :Goods="goodsInfo"/>
      <detail-comment :commentInfo="commentInfo" :commentCount="commentCount" ref="comment" @bigImg="bigImg"/>
      <detail-shop-mes :Shop="shop"/>
      <detail-goods-info :detailInfo="detailInfo" ref="goodsDetail" @detailLoad="detailLoad"/>
      <detail-item-params :itemParams="itemParams"/>
      <detail-goods-list :goodsRecommends="goodsRecommends" ref="goodsList"/>
    </bscroll>
    <backtop v-show="showT" @click.native="backClick"/>
    <detail-bottom-bar @addToCart="addToCart"/>
    <div class="showImg" v-show="showimg" @click="noShow">
      <img :src="commentImg" alt="">
    </div>
  </div>
</template>

<script>
import bscroll from 'components/common/bscroll/bscroll'
import {getDetailMes, getRecommendMes, Goods, Shop} from 'network/detail'
import {debounce} from 'common/utils'
import {mapActions} from 'vuex'
import {backTop} from 'common/mixin'

import DetailNavbar from './childComponents/detail_navbar'
import DetailSwiper from './childComponents/detail_swiper'
import DetailBaseInfo from './childComponents/detail_baseInfo'
import DetailShopMes from './childComponents/detail_shopMes'
import DetailGoodsInfo from './childComponents/detail_goodsInfo'
import DetailItemParams from './childComponents/detail_itemParams'
import DetailComment from './childComponents/detail_comment'
import DetailGoodsList from './childComponents/detail_goods'
import DetailBottomBar from './childComponents/detail_bottomBar'

export default {
  name: "detail",
  mixins:[backTop],
  components:{
    bscroll,
    DetailNavbar,
    DetailSwiper,
    DetailBaseInfo,
    DetailComment,
    DetailShopMes,
    DetailGoodsInfo,
    DetailItemParams,
    DetailGoodsList,
    DetailBottomBar
  },
  data(){
    return {
      iid: null,    //该页面的id
      swiperImg: [],    //轮播图信息
      goodsInfo: {},    //最上面的基本信息
      shop: {},    //商家信息
      detailInfo: {},   //详情
      itemParams: {},   //参数
      commentInfo: {},    //评论
      goodsRecommends: [],   //推荐
      commentCount: 0,
      mesHeight: 0,
      commentHeight: 0,
      goodsListHeight: 0,
      showT:false,
      showimg: false,
      commentImg: null,
      isClick: true
    }
  },
  created() {
    //保存每个不同信息的信息
    this.iid = this.$route.params.id
    getDetailMes(this.iid).then(res => {
      //请求基础信息数据
      this.goodsInfo = new Goods(res.result)
      //请求轮播图图片
      this.swiperImg = this.goodsInfo.swiperImg
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
    }).catch(e =>{
      this.$toast.show('该商品已下架')
    })
    getRecommendMes().then(res =>{
      this.goodsRecommends = res.data.list
    })
  },
  mounted() {
    this.$bus.$on('swiperLoad', ()=>{
      if(this.$refs.goodsDetail !== undefined && this.$refs.comment !== undefined){
        this.mesHeight = this.$refs.goodsDetail.$el.offsetTop
        this.commentHeight = this.$refs.comment.$el.offsetTop
      }
    })
  },
  methods:{
    ...mapActions(['addCart']),
    navbarClick(index){
      switch (index) {
        case 0:
          this.$refs.scroll.scrollTo(0, 0, 100)
          break
        case 1:
          this.$refs.scroll.scrollTo(0, -this.commentHeight, 100)
          break
        case 2:
          this.$refs.scroll.scrollTo(0, -this.mesHeight, 100)
          break
        case 3:
          this.$refs.scroll.scrollTo(0, -this.goodsListHeight, 100)
      }
    },
    isShow(pos){
      this.showT = pos.y < -1000
      if(-pos.y < this.commentHeight){
        this.$refs.detnav.currentIndex = 0
      }else if(-pos.y >= this.commentHeight && -pos.y < this.mesHeight){
        this.$refs.detnav.currentIndex = 1
      }else if(-pos.y >= this.mesHeight && -pos.y < this.goodsListHeight){
        this.$refs.detnav.currentIndex = 2
      }else{
        this.$refs.detnav.currentIndex = 3
      }
    },
    detailLoad(){
      const refresh = debounce(this.$refs.scroll.refresh, 10)
      refresh()
      if(this.$refs.goodsList !== undefined){
        this.goodsListHeight = this.$refs.goodsList.$el.offsetTop
      }
    },
    addToCart(){
      const product = {}
      product.image = this.swiperImg[0]
      product.title = this.goodsInfo.title
      product.desc = this.goodsInfo.desc
      product.price = this.goodsInfo.realPrice
      product.id = this.iid
      if(product.price){
        if(this.isClick){
          this.isClick = false
          this.addCart(product).then(res =>{
            this.$toast.show(res, 1500)
            this.$bus.$emit('addItem')
            console.log(res)
            setTimeout(()=>{
              this.isClick = true
            }, 1000)
          })
        }
      }
    },
    bigImg(item){
      this.showimg = true
      this.commentImg = item
    },
    noShow(){
      this.showimg = false
    }
  }
}
</script>

<style scoped>
.detailContent{
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 50px;
  left: 0;
  right: 0;
}
.showImg{
  position: fixed;
  display: flex;
  align-items: center;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 20;
  /*background-color: rgba(241, 241, 241, 0.4);*/
  background-color: black;
}
.showImg img{
  width: 100%;
}
</style>