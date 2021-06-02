<template>
<div v-if="Object.keys(Shop).length !== 0" class="shopMes">
  <div class="shopname">
    <div class="logo">
      <a :href="Shop.url"><img :src="Shop.logo" alt=""></a>
    </div>
    <a :href="Shop.url">
      <span class="shopName">{{Shop.name}}</span>
    </a>
    <span class="fanc">粉丝:{{getRealSells(Shop.fans)}}</span>
  </div>
  <div class="midShop">
    <div class="midLeft">
      <div class="midLeftItem">
        <span>
          <span>{{getRealSells(Shop.sells)}}</span>
          <span style="font-size: 10px; margin-top: 8px;">总销量</span>
        </span>
        <span>
          <span>{{Shop.goodsCount}}</span>
          <span style="font-size: 10px; margin-top: 8px;">全部宝贝</span>
        </span>
      </div>
    </div>
    <div class="midRight">
      <div class="midRightItem" >
        <table>
          <tr v-for="item in Shop.score">
            <td class="td" v-if="item.name">{{item.name}}</td>
            <td :class="tdTextClass(item)" >{{item.score}}</td>
            <td v-if="item.isBetter" :class="betterClass(item)">高</td>
            <td v-else :class="betterClass(item)">低</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
  <div class="buttondiv">
    <a :href="Shop.url">
      <button class="button">进店逛逛</button>
    </a>
  </div>
</div>
</template>

<script>
export default {
  name: "detail_shopMes",
  props:{
    Shop: {
      type: Object,
      default(){
        return {}
      }
    }
  },
  data(){
    return {
      shop: null
    }
  },
  mounted() {
    this.shop = this.Shop
  },
  methods:{
    getRealSells(Sell){
      if(Sell.toString().length >= 5){
        return (Sell/10000).toFixed(1) + "万"
      }else {
        return Sell
      }
    },
    betterClass(item){
      return [{better: true},{activetwo: item.isBetter}]
    },
    tdTextClass(item){
      return [{td: true}, {activeone: item.isBetter}, {td1: !item.isBetter}]
    }
  }
}
</script>

<style scoped>
.shopMes{
  border-top: 5px solid #f2f5f8;
}
.shopname{
  margin-top: 25px;
  display: flex;
  justify-content: left;
  text-align: center;
  height: 60px;
  line-height: 60px;
  margin-left: 25px;
  margin-bottom: 4px;
  position: relative;
}
.logo{
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid #d2d2d2;
}
.shopName{
  margin-left: 15px;
  color: black;
  font-size: 18px;
  position: relative;
  top: -7px;
}
.fanc{
  color: black;
  font-size: 12px;
  position: absolute;
  left: 76px;
  top: 15px;
}
.logo img{
  width: 100%;
  height: 100%;
}
.midShop{
  color: black;
  display: flex;
  width: 100%;
}
.midShop div{
  flex: 1;
}
.midLeftItem{
  font-size: 17px;
  text-align: center;
  margin: 25px 0;
  display: flex;
  justify-content: space-evenly;
  border-right: 1px solid #d2d2d2;
}
.midLeftItem span span{
  display: block;
  position: relative;
  left: 4px;
}
.midRightItem{
  margin-left: 22px;
  font-size: 13px;
}
table{
  margin-top: 3px;
}
.td{
  padding: 5px 8px;
}
.td1{
  color: limegreen;
}
.better{
  background-color: limegreen;
  display: inline-block;
  position: relative;
  top: 4px;
  color: white;
}
.activeone{
  color: red;
}
.activetwo{
  background-color: red;
}
.buttondiv{
  text-align: center;
  margin-top: 4px;
  margin-bottom: 25px;
}
.button{
  width: 150px;
  height: 30px;
  background-color: #f2f5f8;
  border: 0;
  text-align: center;
  line-height: 30px;
  border-radius: 10px;
  color: #717070;
  font-size: 14px;
}
.button:focus{
  outline: none;
}
</style>