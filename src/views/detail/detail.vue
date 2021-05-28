<template>
<div v-if="">
  <detail-navbar />
  <bscroll class="detailContent"
           :probe="3"
           :pullUpLoad="true" ref="detailScroll">
    <detail-swiper :detailSwiper="swiperImg"></detail-swiper>
    <detail-base-info :Goods="goods"/>
    <detail-shop-mes :Shop="shop"/>
    <detail-goods-info :detailInfo="detailInfo" @imgLoad="imgLoad"/>
    <ul>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </bscroll>
</div>
</template>

<script>
import DetailNavbar from './childComponents/detail_navbar'
import {getDetailMes, Goods, Shop} from 'network/detail'
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
      detailInfo: {}
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
  methods:{
    imgLoad(){
      this.$refs.detailScroll.refresh()
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