<template>
  <div id="shopcart">
    <nav-bar id="shopcart_navbar">
      <div slot="center" @click="navBarClick">购物车({{getCount}})</div>
      <div slot="right" v-if="isSet" class="set" @click="isSet = false">管理</div>
      <div slot="right" v-else class="set" @click="isSet = true">完成</div>
    </nav-bar>
    <scroll class="shopContent" ref="scroll" :probe="3" @isShow="isShow">
      <shop-cart-isNot v-if="this.$store.state.cartList.length === 0"/>
      <shop-cart-shop-cart v-else ref="shopcart"/>
      <shop-cart-recommend :goodsRecommends="goodsRecommends"/>
    </scroll>
    <shop-cart-bottom-bar :isSet="isSet"/>
  </div>
</template>

<script>
import navBar from '@/components/common/navbar/navbar'
import shopCartBottomBar from './childComponents/shopcart_bottombar'
import shopCartItem from './childComponents/shopcart_item'
import shopCartShopCart from './childComponents/shopcart_shopcart'
import shopCartRecommend from './childComponents/shopcart_recommend'
import shopCartIsNot from './childComponents/shopcart_isNot'

import scroll from 'components/common/bscroll/bscroll'
import {getRecommendMes} from 'network/detail'
import { mapGetters } from 'vuex'
import { cNavBackTop } from 'common/mixin'

export default {
  name: "shopcart",
  mixins:[cNavBackTop],
  components:{
    navBar,
    shopCartBottomBar,
    shopCartItem,
    shopCartIsNot,
    shopCartShopCart,
    shopCartRecommend,
    scroll
  },
  data(){
    return {
      goodsRecommends: [],
      currentIndex: null,
      isSet: true,
      saveY: 0
    }
  },
  activated() {
    this.$refs.scroll.refresh()
    this.$refs.scroll.scrollTo(0,this.saveY)
    this.isSet = true
  },
  deactivated() {
    //发出事件到navbar，让下下次点击购物车可以回到顶部
    this.$bus.$emit('shopCartZero')
    this.saveY = this.$refs.scroll.bscroll.y
  },
  created() {
    getRecommendMes().then(res =>{
      this.goodsRecommends = res.data.list
    })
  },
  updated() {
    //双击底部回到顶部
    this.$bus.$on('shopCartBackTop',()=>{
      this.$refs.scroll.scrollTo(0, 0, 200)
    })
    //添加商品后，再回到购物车页面时，直接置顶
    this.$bus.$on('addItem',()=>{
      this.saveY = 0
    })
  },
  methods:{
    isShow(pos){
      if(this.$store.state.cartList.length !== 0){
        this.$refs.shopcart.$refs.shopcart.map(n =>{
          n.showType = true
        })
      }
    }
  },
  computed:{
    ...mapGetters(['getCount'])
  }
}
</script>

<style scoped>
.set{
  font-size: 14px;
}
#shopcart_navbar{
  font-size: 16px;
  background-color: #ff8198;
  text-align: center;
  color: white;
}
.shopContent{
  background-color: #f1eeef;
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 99px;
  left: 0;
  right: 0;
}
</style>