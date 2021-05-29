<template>
<div v-if="">
  <detail-navbar @navbarClick="navbarClick" ref="detnav"/>
  <bscroll class="detailContent"
           :probe="3"
           :pullUpLoad="true"
           ref="detailScroll"
           @isShow="isShow">
    <detail-swiper :detailSwiper="swiperImg" @detailLoad="detailLoad"/>
    <detail-base-info :Goods="goods"/>
    <detail-shop-mes :Shop="shop"/>
    <detail-goods-info :detailInfo="detailInfo" ref="goodsDetail"/>
  </bscroll>
</div>
</template>

<script>
import DetailNavbar from './childComponents/detail_navbar'
import {getDetailMes, Goods, Shop} from 'network/detail'
import {debounce} from 'common/utils'
import DetailSwiper from './childComponents/detail_swiper'
import DetailBaseInfo from './childComponents/detail_baseInfo'
import bscroll from 'components/common/bscroll/bscroll'
import DetailShopMes from './childComponents/detail_shopMes'
import DetailGoodsInfo from './childComponents/detail_goodsInfo'

export default {
  name: "detail",
  components:{
    DetailNavbar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopMes,
    DetailGoodsInfo,
    bscroll
  },
  data(){
    return {
      iid: null,
      swiperImg: [],
      goods: {},
      shop: {},
      detailInfo: {},
      shopHeight: 0
    }
  },
  created() {
    //保存每个不同信息的信息
    this.iid = this.$route.params.id
    getDetailMes(this.iid).then(res => {
      console.log(res.result)
      //请求基础信息数据
      this.goods = new Goods(res.result)
      //请求轮播图图片
      this.swiperImg = this.goods.swiperImg
      //请求商家数据
      this.shop = new Shop(res.result)
      //请求参数数据
      this.detailInfo = res.result.detailInfo
      console.log(this.detailInfo)
    })
  },
  mounted() {
    const refresh = debounce(this.$refs.detailScroll.refresh, 50)
    this.$bus.$on('imgLoad', ()=>{
      refresh()
    })
  },
  methods:{
    navbarClick(index){
      switch (index){
        case 0:
          this.$refs.detailScroll.scrollTo(0,0,100)
          break
        case 1:
          this.$refs.detailScroll.refresh()
          this.$refs.detailScroll.scrollTo(0,-this.shopHeight,100)
      }
    },
    detailLoad(){
      this.shopHeight += this.$refs.goodsDetail.$el.offsetTop -19
    },
    isShow(pos){
      if(-pos.y < this.shopHeight){
        this.$refs.detnav.currentIndex = 0
      }
      else if(-pos.y >= this.shopHeight){
        this.$refs.detnav.currentIndex = 1
      }
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